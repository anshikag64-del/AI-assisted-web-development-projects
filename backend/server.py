from fastapi import FastAPI, APIRouter, HTTPException, Request, Response, UploadFile, File, Header, Query, Cookie
from fastapi.responses import StreamingResponse, JSONResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import json
import logging
import uuid
import requests
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional, Any
from datetime import datetime, timezone, timedelta

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

EMERGENT_LLM_KEY = os.environ.get("EMERGENT_LLM_KEY")
APP_NAME = "bloomnest"
STORAGE_URL = "https://integrations.emergentagent.com/objstore/api/v1/storage"
EMERGENT_AUTH_URL = "https://demobackend.emergentagent.com/auth/v1/env/oauth/session-data"

app = FastAPI()
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ===== Storage =====
storage_key = None

def init_storage():
    global storage_key
    if storage_key:
        return storage_key
    resp = requests.post(f"{STORAGE_URL}/init", json={"emergent_key": EMERGENT_LLM_KEY}, timeout=30)
    resp.raise_for_status()
    storage_key = resp.json()["storage_key"]
    return storage_key

def put_object(path: str, data: bytes, content_type: str) -> dict:
    key = init_storage()
    resp = requests.put(
        f"{STORAGE_URL}/objects/{path}",
        headers={"X-Storage-Key": key, "Content-Type": content_type},
        data=data, timeout=120
    )
    resp.raise_for_status()
    return resp.json()

# ===== Auth helpers =====
async def get_current_user(request: Request):
    """Retrieve current user from session_token cookie or Authorization header."""
    token = request.cookies.get("session_token")
    if not token:
        auth = request.headers.get("Authorization", "")
        if auth.startswith("Bearer "):
            token = auth[7:]
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")

    session = await db.user_sessions.find_one({"session_token": token}, {"_id": 0})
    if not session:
        raise HTTPException(status_code=401, detail="Invalid session")

    expires_at = session["expires_at"]
    if isinstance(expires_at, str):
        expires_at = datetime.fromisoformat(expires_at)
    if expires_at.tzinfo is None:
        expires_at = expires_at.replace(tzinfo=timezone.utc)
    if expires_at < datetime.now(timezone.utc):
        raise HTTPException(status_code=401, detail="Session expired")

    user = await db.users.find_one({"user_id": session["user_id"]}, {"_id": 0})
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user

# ===== Models =====
class SessionRequest(BaseModel):
    session_id: str

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = None

class BabyEvent(BaseModel):
    kind: str  # feeding | sleep | vaccination | milestone | medicine | growth
    title: str
    notes: Optional[str] = ""
    value: Optional[float] = None  # e.g., weight, sleep hours
    scheduled_at: Optional[str] = None

class JobEntry(BaseModel):
    company: str
    role: str
    status: str = "Applied"  # Applied | Interviewing | Offer | Rejected
    notes: Optional[str] = ""

class ResumeAnalyzeRequest(BaseModel):
    job_description: str
    resume_text: Optional[str] = None
    resume_file_id: Optional[str] = None

# ===== Auth Routes =====
@api_router.post("/auth/session")
async def create_session(payload: SessionRequest, response: Response):
    """Exchange session_id from Emergent auth for our session_token."""
    resp = requests.get(EMERGENT_AUTH_URL, headers={"X-Session-ID": payload.session_id}, timeout=15)
    if resp.status_code != 200:
        raise HTTPException(status_code=401, detail="Invalid session_id")
    data = resp.json()
    email = data["email"]
    name = data["name"]
    picture = data.get("picture", "")
    session_token = data["session_token"]

    existing = await db.users.find_one({"email": email}, {"_id": 0})
    if existing:
        user_id = existing["user_id"]
        await db.users.update_one({"user_id": user_id}, {"$set": {"name": name, "picture": picture}})
    else:
        user_id = f"user_{uuid.uuid4().hex[:12]}"
        await db.users.insert_one({
            "user_id": user_id,
            "email": email,
            "name": name,
            "picture": picture,
            "created_at": datetime.now(timezone.utc).isoformat(),
        })

    expires_at = datetime.now(timezone.utc) + timedelta(days=7)
    await db.user_sessions.insert_one({
        "user_id": user_id,
        "session_token": session_token,
        "expires_at": expires_at.isoformat(),
        "created_at": datetime.now(timezone.utc).isoformat(),
    })

    response.set_cookie(
        key="session_token", value=session_token,
        max_age=7*24*60*60, path="/",
        httponly=True, secure=True, samesite="none",
    )
    return {"user_id": user_id, "email": email, "name": name, "picture": picture}

@api_router.get("/auth/me")
async def auth_me(request: Request):
    user = await get_current_user(request)
    return user

@api_router.post("/auth/logout")
async def logout(request: Request, response: Response):
    token = request.cookies.get("session_token")
    if token:
        await db.user_sessions.delete_one({"session_token": token})
    response.delete_cookie("session_token", path="/")
    return {"ok": True}

# ===== AI Chat (Claude Sonnet 4.5) =====
COACH_SYSTEM = """You are BloomNest AI — a warm, empathetic, brilliant life coach for mothers.
You help mothers balance childcare, career, health, finances, and personal growth.
Tone: calming, kind, encouraging, never preachy. Speak like a trusted best friend who happens to be a life coach.
Keep answers concise and actionable. Use short paragraphs and gentle bullet points when useful.
When she shares a struggle, first validate her feelings, then offer 2-3 gentle, doable suggestions.
"""

@api_router.post("/coach/chat")
async def coach_chat(payload: ChatRequest, request: Request):
    user = await get_current_user(request)
    from emergentintegrations.llm.chat import LlmChat, UserMessage, TextDelta, StreamDone

    session_id = payload.session_id or f"coach_{user['user_id']}_{uuid.uuid4().hex[:8]}"

    # save user message
    await db.chat_messages.insert_one({
        "id": str(uuid.uuid4()),
        "user_id": user["user_id"],
        "session_id": session_id,
        "role": "user",
        "content": payload.message,
        "created_at": datetime.now(timezone.utc).isoformat(),
    })

    chat = LlmChat(
        api_key=EMERGENT_LLM_KEY,
        session_id=session_id,
        system_message=COACH_SYSTEM,
    ).with_model("anthropic", "claude-sonnet-4-5-20250929")

    async def event_gen():
        full_reply = ""
        try:
            async for ev in chat.stream_message(UserMessage(text=payload.message)):
                if isinstance(ev, TextDelta):
                    full_reply += ev.content
                    yield f"data: {json.dumps({'delta': ev.content})}\n\n"
                elif isinstance(ev, StreamDone):
                    break
        except Exception as e:
            logger.exception("coach chat error")
            yield f"data: {json.dumps({'error': str(e)})}\n\n"
        # persist assistant message
        await db.chat_messages.insert_one({
            "id": str(uuid.uuid4()),
            "user_id": user["user_id"],
            "session_id": session_id,
            "role": "assistant",
            "content": full_reply,
            "created_at": datetime.now(timezone.utc).isoformat(),
        })
        yield f"data: {json.dumps({'done': True, 'session_id': session_id})}\n\n"

    return StreamingResponse(
        event_gen(),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )

@api_router.get("/coach/history")
async def coach_history(request: Request, session_id: Optional[str] = None):
    user = await get_current_user(request)
    q = {"user_id": user["user_id"]}
    if session_id:
        q["session_id"] = session_id
    msgs = await db.chat_messages.find(q, {"_id": 0}).sort("created_at", 1).to_list(500)
    return msgs

# ===== Baby module =====
@api_router.post("/baby/events")
async def create_baby_event(evt: BabyEvent, request: Request):
    user = await get_current_user(request)
    doc = {
        "id": str(uuid.uuid4()),
        "user_id": user["user_id"],
        "kind": evt.kind,
        "title": evt.title,
        "notes": evt.notes or "",
        "value": evt.value,
        "scheduled_at": evt.scheduled_at,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.baby_events.insert_one(doc)
    doc.pop("_id", None)
    return doc

@api_router.get("/baby/events")
async def list_baby_events(request: Request, kind: Optional[str] = None):
    user = await get_current_user(request)
    q = {"user_id": user["user_id"]}
    if kind:
        q["kind"] = kind
    events = await db.baby_events.find(q, {"_id": 0}).sort("created_at", -1).to_list(500)
    return events

@api_router.delete("/baby/events/{event_id}")
async def delete_baby_event(event_id: str, request: Request):
    user = await get_current_user(request)
    await db.baby_events.delete_one({"id": event_id, "user_id": user["user_id"]})
    return {"ok": True}

# ===== Career =====
@api_router.post("/career/jobs")
async def add_job(job: JobEntry, request: Request):
    user = await get_current_user(request)
    doc = {
        "id": str(uuid.uuid4()),
        "user_id": user["user_id"],
        **job.model_dump(),
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.jobs.insert_one(doc)
    doc.pop("_id", None)
    return doc

@api_router.get("/career/jobs")
async def list_jobs(request: Request):
    user = await get_current_user(request)
    return await db.jobs.find({"user_id": user["user_id"]}, {"_id": 0}).sort("created_at", -1).to_list(500)

@api_router.patch("/career/jobs/{job_id}")
async def update_job(job_id: str, body: dict, request: Request):
    user = await get_current_user(request)
    await db.jobs.update_one({"id": job_id, "user_id": user["user_id"]}, {"$set": body})
    return {"ok": True}

@api_router.post("/career/resume/upload")
async def upload_resume(request: Request, file: UploadFile = File(...)):
    user = await get_current_user(request)
    ext = (file.filename.split(".")[-1] if "." in file.filename else "bin").lower()
    if ext not in ("pdf", "txt", "docx"):
        raise HTTPException(status_code=400, detail="Only PDF, TXT, DOCX allowed")
    file_id = str(uuid.uuid4())
    path = f"{APP_NAME}/uploads/{user['user_id']}/{file_id}.{ext}"
    data = await file.read()
    ct = file.content_type or "application/octet-stream"
    result = put_object(path, data, ct)

    # extract text (best-effort for pdf, plaintext for txt)
    text = ""
    if ext == "txt":
        try:
            text = data.decode("utf-8", errors="ignore")
        except Exception:
            text = ""
    elif ext == "pdf":
        try:
            from pypdf import PdfReader
            import io
            reader = PdfReader(io.BytesIO(data))
            text = "\n".join((p.extract_text() or "") for p in reader.pages)
        except Exception as e:
            logger.warning(f"pdf extract failed: {e}")

    await db.resumes.insert_one({
        "id": file_id,
        "user_id": user["user_id"],
        "storage_path": result["path"],
        "original_filename": file.filename,
        "content_type": ct,
        "size": result["size"],
        "text": text,
        "created_at": datetime.now(timezone.utc).isoformat(),
    })
    return {"id": file_id, "filename": file.filename, "size": result["size"], "text_extracted": bool(text)}

@api_router.get("/career/resume/latest")
async def latest_resume(request: Request):
    user = await get_current_user(request)
    doc = await db.resumes.find_one({"user_id": user["user_id"]}, {"_id": 0}, sort=[("created_at", -1)])
    return doc or {}

@api_router.post("/career/ats")
async def analyze_ats(payload: ResumeAnalyzeRequest, request: Request):
    user = await get_current_user(request)
    resume_text = payload.resume_text or ""
    if payload.resume_file_id:
        doc = await db.resumes.find_one({"id": payload.resume_file_id, "user_id": user["user_id"]}, {"_id": 0})
        if doc:
            resume_text = doc.get("text") or resume_text
    if not resume_text:
        latest = await db.resumes.find_one({"user_id": user["user_id"]}, {"_id": 0}, sort=[("created_at", -1)])
        if latest:
            resume_text = latest.get("text") or ""

    if not resume_text.strip():
        raise HTTPException(status_code=400, detail="No resume text available. Upload a resume first.")

    from emergentintegrations.llm.chat import LlmChat, UserMessage

    prompt = f"""Analyze this resume against the job description and respond ONLY with valid JSON (no markdown, no prose).

JOB DESCRIPTION:
{payload.job_description}

RESUME:
{resume_text[:8000]}

Return JSON with this exact shape:
{{
  "ats_score": <integer 0-100>,
  "match_percent": <integer 0-100>,
  "matched_keywords": [<string>, ...],
  "missing_keywords": [<string>, ...],
  "strengths": [<string>, ...],
  "improvements": [<string>, ...],
  "recommended_skills": [<string>, ...],
  "recommended_projects": [<string>, ...],
  "one_line_summary": "<string>"
}}"""

    chat = LlmChat(
        api_key=EMERGENT_LLM_KEY,
        session_id=f"ats_{user['user_id']}_{uuid.uuid4().hex[:6]}",
        system_message="You are an expert ATS resume analyzer. Reply with strict JSON only.",
    ).with_model("anthropic", "claude-sonnet-4-5-20250929")

    reply = None
    last_err = None
    for attempt in range(3):
        try:
            reply = await chat.send_message(UserMessage(text=prompt))
            break
        except Exception as e:
            last_err = e
            logger.warning(f"ATS attempt {attempt+1} failed: {e}")
    if reply is None:
        raise HTTPException(status_code=502, detail=f"AI upstream error: {last_err}")
    # Some SDKs return str, some object
    text = reply if isinstance(reply, str) else getattr(reply, "content", str(reply))
    # strip code fences if any
    t = text.strip()
    if t.startswith("```"):
        t = t.strip("`")
        if t.lower().startswith("json"):
            t = t[4:]
        t = t.strip()
    try:
        parsed = json.loads(t)
    except Exception:
        # find first { .. last }
        try:
            start = t.index("{")
            end = t.rindex("}") + 1
            parsed = json.loads(t[start:end])
        except Exception:
            raise HTTPException(status_code=500, detail="AI response not parseable")

    await db.ats_reports.insert_one({
        "id": str(uuid.uuid4()),
        "user_id": user["user_id"],
        "job_description": payload.job_description[:2000],
        "report": parsed,
        "created_at": datetime.now(timezone.utc).isoformat(),
    })
    return parsed

@api_router.post("/career/cover-letter")
async def cover_letter(payload: ResumeAnalyzeRequest, request: Request):
    user = await get_current_user(request)
    from emergentintegrations.llm.chat import LlmChat, UserMessage
    resume_text = payload.resume_text or ""
    if not resume_text:
        latest = await db.resumes.find_one({"user_id": user["user_id"]}, {"_id": 0}, sort=[("created_at", -1)])
        if latest:
            resume_text = latest.get("text") or ""
    prompt = f"""Write a warm, confident cover letter (max 250 words) for this job.
Applicant: {user['name']}

JOB DESCRIPTION:
{payload.job_description}

RESUME EXCERPT:
{resume_text[:4000]}

Return only the cover letter text."""
    chat = LlmChat(
        api_key=EMERGENT_LLM_KEY,
        session_id=f"cl_{user['user_id']}_{uuid.uuid4().hex[:6]}",
        system_message="You write concise, warm, high-signal cover letters for mothers returning to work.",
    ).with_model("anthropic", "claude-sonnet-4-5-20250929")
    reply = await chat.send_message(UserMessage(text=prompt))
    text = reply if isinstance(reply, str) else getattr(reply, "content", str(reply))
    return {"cover_letter": text}

# ===== Life Balance Score =====
@api_router.get("/dashboard/summary")
async def dashboard_summary(request: Request):
    user = await get_current_user(request)
    uid = user["user_id"]
    # counts
    job_count = await db.jobs.count_documents({"user_id": uid})
    baby_count = await db.baby_events.count_documents({"user_id": uid})
    chat_count = await db.chat_messages.count_documents({"user_id": uid, "role": "user"})
    ats_reports = await db.ats_reports.count_documents({"user_id": uid})

    # score components (simple heuristic + activity bonus)
    base = {
        "career": min(100, 55 + job_count * 5 + ats_reports * 4),
        "baby_care": min(100, 60 + baby_count * 3),
        "health": 72,
        "finance": 68,
        "learning": min(100, 60 + ats_reports * 6),
        "sleep": 70,
        "stress": 76,
    }
    overall = round(sum(base.values()) / len(base))

    upcoming = await db.baby_events.find(
        {"user_id": uid, "scheduled_at": {"$ne": None}},
        {"_id": 0}
    ).sort("scheduled_at", 1).to_list(5)

    recent_jobs = await db.jobs.find({"user_id": uid}, {"_id": 0}).sort("created_at", -1).to_list(5)

    suggestions = [
        "Practice SQL for 20 minutes today — small steps compound.",
        "Sleep 30 minutes after lunch — your baby's nap is your recharge.",
        "Apply to 2 jobs before dinner. Two good ones beat twenty rushed ones.",
        "Drink an extra 2 glasses of water — you deserve to feel good.",
        "Delay grocery shopping until tomorrow, batch errands together.",
    ]

    return {
        "user": {"name": user["name"], "email": user["email"], "picture": user.get("picture", "")},
        "life_balance_score": overall,
        "sub_scores": base,
        "suggestions": suggestions,
        "counts": {"jobs": job_count, "baby_events": baby_count, "chats": chat_count, "ats_reports": ats_reports},
        "upcoming": upcoming,
        "recent_jobs": recent_jobs,
    }

@api_router.get("/")
async def root():
    return {"message": "BloomNest AI API"}

# Storage init on startup (non-blocking best-effort)
@app.on_event("startup")
async def startup():
    try:
        init_storage()
        logger.info("Storage initialized")
    except Exception as e:
        logger.warning(f"Storage init deferred: {e}")

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
