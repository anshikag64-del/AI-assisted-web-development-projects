import { useEffect, useRef, useState } from "react";
import { api, API } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { UploadCloud, FileText, Sparkles, Copy, Plus, Briefcase, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const STATUS_COLORS = {
  Applied: "bg-blue-100 text-blue-700",
  Interviewing: "bg-purple-100 text-purple-700",
  Offer: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
};

export default function Career() {
  const [resume, setResume] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [jd, setJd] = useState("");
  const [ats, setAts] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [cover, setCover] = useState("");
  const [coverLoading, setCoverLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [jobOpen, setJobOpen] = useState(false);
  const [jobForm, setJobForm] = useState({ company: "", role: "", status: "Applied", notes: "" });
  const fileRef = useRef();

  const loadResume = async () => {
    try { const { data } = await api.get("/career/resume/latest"); if (data && data.id) setResume(data); } catch {}
  };
  const loadJobs = async () => {
    try { const { data } = await api.get("/career/jobs"); setJobs(data || []); } catch {}
  };
  useEffect(() => { loadResume(); loadJobs(); }, []);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const { data } = await api.post("/career/resume/upload", fd, { headers: { "Content-Type": "multipart/form-data" } });
      toast.success(`Resume uploaded (${(data.size/1024).toFixed(1)} KB)`);
      loadResume();
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Upload failed");
    } finally { setUploading(false); }
  };

  const analyze = async () => {
    if (!jd.trim()) return toast.error("Paste a job description first");
    setAnalyzing(true); setAts(null);
    try {
      const { data } = await api.post("/career/ats", { job_description: jd });
      setAts(data);
    } catch (e) { toast.error(e?.response?.data?.detail || "Analysis failed"); }
    finally { setAnalyzing(false); }
  };

  const generateCover = async () => {
    if (!jd.trim()) return toast.error("Paste a job description first");
    setCoverLoading(true); setCover("");
    try {
      const { data } = await api.post("/career/cover-letter", { job_description: jd });
      setCover(data.cover_letter || "");
    } catch (e) { toast.error(e?.response?.data?.detail || "Failed"); }
    finally { setCoverLoading(false); }
  };

  const addJob = async () => {
    if (!jobForm.company || !jobForm.role) return toast.error("Company and role required");
    try {
      await api.post("/career/jobs", jobForm);
      toast.success("Added to your tracker");
      setJobOpen(false); setJobForm({ company: "", role: "", status: "Applied", notes: "" });
      loadJobs();
    } catch { toast.error("Failed to add"); }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="pt-2">
        <div className="text-xs uppercase tracking-[0.25em] text-[#7C4DFF] font-semibold">Career hub</div>
        <h1 className="font-display text-4xl sm:text-5xl mt-1 text-[#1F1B2E] dark:text-white">Your career, quietly compounding.</h1>
        <p className="mt-2 text-[#3F3A5A] dark:text-gray-300 max-w-xl">Upload your resume, get an AI ATS analysis, generate cover letters and track opportunities.</p>
      </div>

      <Tabs defaultValue="ats" className="w-full">
        <TabsList className="rounded-full bg-white/70 dark:bg-white/10 p-1">
          <TabsTrigger data-testid="tab-ats" value="ats" className="rounded-full">ATS Analysis</TabsTrigger>
          <TabsTrigger data-testid="tab-cover" value="cover" className="rounded-full">Cover Letter</TabsTrigger>
          <TabsTrigger data-testid="tab-jobs" value="jobs" className="rounded-full">Job Tracker</TabsTrigger>
        </TabsList>

        <TabsContent value="ats" className="mt-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="rounded-3xl p-6 bg-white dark:bg-white/5 border-[#E9DFFF] dark:border-white/10">
              <div className="text-xs uppercase tracking-[0.25em] text-[#5B5476]">Resume</div>
              {resume ? (
                <div className="mt-4 flex items-center gap-3 p-4 rounded-2xl bg-purple-50 dark:bg-white/5">
                  <FileText className="w-6 h-6 text-[#7C4DFF]" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{resume.original_filename}</div>
                    <div className="text-xs text-[#5B5476]">{(resume.size/1024).toFixed(1)} KB · uploaded {new Date(resume.created_at).toLocaleDateString()}</div>
                  </div>
                  <Button data-testid="resume-replace-btn" variant="outline" size="sm" onClick={() => fileRef.current?.click()} className="rounded-full">Replace</Button>
                </div>
              ) : (
                <button
                  data-testid="resume-upload-btn"
                  onClick={() => fileRef.current?.click()}
                  className="mt-4 w-full p-8 rounded-2xl border-2 border-dashed border-purple-200 hover:border-[#7C4DFF] hover:bg-purple-50/50 transition-colors text-center"
                >
                  <UploadCloud className="w-8 h-8 mx-auto text-[#7C4DFF]" />
                  <div className="mt-3 font-display text-xl">Upload your resume</div>
                  <div className="text-sm text-[#5B5476] mt-1">PDF, DOCX or TXT — we'll extract the text.</div>
                </button>
              )}
              <input ref={fileRef} type="file" accept=".pdf,.txt,.docx" hidden onChange={handleFile} data-testid="resume-file-input" />
              {uploading && <div className="mt-3 text-sm text-[#7C4DFF]">Uploading…</div>}

              <div className="mt-6 text-xs uppercase tracking-[0.25em] text-[#5B5476]">Job description</div>
              <Textarea
                data-testid="ats-jd-input"
                value={jd}
                onChange={(e) => setJd(e.target.value)}
                placeholder="Paste the job description here…"
                className="mt-2 min-h-[200px] rounded-2xl"
              />
              <Button data-testid="ats-analyze-btn" disabled={analyzing || !resume} onClick={analyze} className="mt-4 rounded-full bg-[#7C4DFF] hover:bg-[#651FFF] w-full">
                <Sparkles className="w-4 h-4 mr-2" /> {analyzing ? "Analyzing…" : "Analyze with AI"}
              </Button>
              {!resume && <div className="mt-2 text-xs text-[#5B5476] text-center">Upload a resume to enable analysis</div>}
            </Card>

            <Card className="rounded-3xl p-6 bg-white dark:bg-white/5 border-[#E9DFFF] dark:border-white/10 min-h-[400px]">
              <div className="text-xs uppercase tracking-[0.25em] text-[#5B5476]">ATS Report</div>
              {!ats && !analyzing && (
                <div className="mt-16 text-center text-[#5B5476]">
                  <Sparkles className="w-8 h-8 mx-auto text-purple-300" />
                  <p className="mt-3">Your beautiful AI ATS report will appear here.</p>
                </div>
              )}
              {analyzing && (
                <div className="mt-16 text-center">
                  <div className="w-12 h-12 rounded-full border-4 border-purple-100 border-t-[#7C4DFF] animate-spin mx-auto" />
                  <p className="mt-4 text-[#5B5476]">Reading between the lines…</p>
                </div>
              )}
              {ats && (
                <div className="mt-4 space-y-5" data-testid="ats-report">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-2xl p-4 bg-gradient-to-br from-[#7C4DFF] to-[#B388FF] text-white">
                      <div className="text-xs uppercase tracking-widest opacity-80">ATS Score</div>
                      <div className="font-display text-5xl mt-1">{ats.ats_score}<span className="text-lg opacity-70">/100</span></div>
                    </div>
                    <div className="rounded-2xl p-4 bg-gradient-to-br from-[#FFB6C1] to-[#B388FF] text-white">
                      <div className="text-xs uppercase tracking-widest opacity-80">Match</div>
                      <div className="font-display text-5xl mt-1">{ats.match_percent}%</div>
                    </div>
                  </div>
                  <div className="italic text-gray-700 dark:text-gray-200">"{ats.one_line_summary}"</div>
                  {ats.matched_keywords?.length > 0 && (
                    <div>
                      <div className="text-xs uppercase tracking-widest text-[#5B5476] mb-2">Matched keywords</div>
                      <div className="flex flex-wrap gap-2">
                        {ats.matched_keywords.map((k) => <Badge key={k} className="rounded-full bg-green-100 text-green-700 border-0">{k}</Badge>)}
                      </div>
                    </div>
                  )}
                  {ats.missing_keywords?.length > 0 && (
                    <div>
                      <div className="text-xs uppercase tracking-widest text-[#5B5476] mb-2">Missing keywords</div>
                      <div className="flex flex-wrap gap-2">
                        {ats.missing_keywords.map((k) => <Badge key={k} className="rounded-full bg-red-50 text-red-600 border-0">{k}</Badge>)}
                      </div>
                    </div>
                  )}
                  {ats.strengths?.length > 0 && (
                    <div>
                      <div className="text-xs uppercase tracking-widest text-[#5B5476] mb-2">Strengths</div>
                      <ul className="space-y-1 text-sm">{ats.strengths.map((s, i) => <li key={i}>✨ {s}</li>)}</ul>
                    </div>
                  )}
                  {ats.improvements?.length > 0 && (
                    <div>
                      <div className="text-xs uppercase tracking-widest text-[#5B5476] mb-2">Improvements</div>
                      <ul className="space-y-1 text-sm">{ats.improvements.map((s, i) => <li key={i}>💡 {s}</li>)}</ul>
                    </div>
                  )}
                  {ats.recommended_skills?.length > 0 && (
                    <div>
                      <div className="text-xs uppercase tracking-widest text-[#5B5476] mb-2">Skills to learn</div>
                      <div className="flex flex-wrap gap-2">
                        {ats.recommended_skills.map((k) => <Badge key={k} className="rounded-full bg-purple-100 text-[#7C4DFF] border-0">{k}</Badge>)}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="cover" className="mt-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="rounded-3xl p-6 bg-white dark:bg-white/5 border-[#E9DFFF] dark:border-white/10">
              <div className="text-xs uppercase tracking-[0.25em] text-[#5B5476]">Job description</div>
              <Textarea
                data-testid="cover-jd-input"
                value={jd}
                onChange={(e) => setJd(e.target.value)}
                placeholder="Paste the job description…"
                className="mt-2 min-h-[240px] rounded-2xl"
              />
              <Button data-testid="cover-generate-btn" disabled={coverLoading} onClick={generateCover} className="mt-4 rounded-full bg-[#7C4DFF] hover:bg-[#651FFF] w-full">
                <Sparkles className="w-4 h-4 mr-2" /> {coverLoading ? "Writing…" : "Generate cover letter"}
              </Button>
            </Card>
            <Card className="rounded-3xl p-6 bg-white dark:bg-white/5 border-[#E9DFFF] dark:border-white/10">
              <div className="flex items-center justify-between">
                <div className="text-xs uppercase tracking-[0.25em] text-[#5B5476]">Cover letter</div>
                {cover && (
                  <Button data-testid="cover-copy-btn" size="sm" variant="outline" onClick={() => { navigator.clipboard.writeText(cover); toast.success("Copied"); }} className="rounded-full">
                    <Copy className="w-3 h-3 mr-2" /> Copy
                  </Button>
                )}
              </div>
              <div className="mt-3 whitespace-pre-wrap text-gray-700 dark:text-gray-200 font-display text-lg leading-relaxed">
                {cover || (coverLoading ? "Crafting your voice…" : "Your AI-generated cover letter will appear here.")}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="jobs" className="mt-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-[#5B5476]">{jobs.length} tracked</div>
            <Dialog open={jobOpen} onOpenChange={setJobOpen}>
              <DialogTrigger asChild>
                <Button data-testid="job-add-btn" className="rounded-full bg-[#7C4DFF] hover:bg-[#651FFF]"><Plus className="w-4 h-4 mr-2" /> Add job</Button>
              </DialogTrigger>
              <DialogContent className="rounded-3xl">
                <DialogHeader><DialogTitle className="font-display text-2xl">Track a new opportunity</DialogTitle></DialogHeader>
                <div className="space-y-3 mt-2">
                  <Input data-testid="job-form-company" placeholder="Company" value={jobForm.company} onChange={(e) => setJobForm(f => ({ ...f, company: e.target.value }))} />
                  <Input data-testid="job-form-role" placeholder="Role" value={jobForm.role} onChange={(e) => setJobForm(f => ({ ...f, role: e.target.value }))} />
                  <Select value={jobForm.status} onValueChange={(v) => setJobForm(f => ({ ...f, status: v }))}>
                    <SelectTrigger data-testid="job-form-status"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {["Applied","Interviewing","Offer","Rejected"].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <Textarea placeholder="Notes" value={jobForm.notes} onChange={(e) => setJobForm(f => ({ ...f, notes: e.target.value }))} />
                </div>
                <DialogFooter><Button data-testid="job-form-save" onClick={addJob} className="rounded-full bg-[#7C4DFF] hover:bg-[#651FFF]">Add</Button></DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            {jobs.length === 0 && (
              <Card className="md:col-span-2 rounded-3xl p-10 text-center bg-white dark:bg-white/5 border-[#E9DFFF] dark:border-white/10">
                <Briefcase className="w-10 h-10 mx-auto text-purple-300" />
                <div className="font-display text-xl mt-4">Your opportunities begin here</div>
                <p className="text-sm text-[#5B5476] mt-1">Add the first job you're excited about.</p>
              </Card>
            )}
            {jobs.map((j) => (
              <Card key={j.id} data-testid={`job-card-${j.id}`} className="rounded-3xl p-6 bg-white dark:bg-white/5 border-[#E9DFFF] dark:border-white/10">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-display text-xl">{j.role}</div>
                    <div className="text-sm text-[#5B5476]">{j.company}</div>
                  </div>
                  <Badge className={`rounded-full border-0 ${STATUS_COLORS[j.status] || "bg-gray-100"}`}>{j.status}</Badge>
                </div>
                {j.notes && <p className="mt-3 text-sm text-[#3F3A5A] dark:text-gray-300">{j.notes}</p>}
                <div className="mt-4 text-xs text-gray-400">{new Date(j.created_at).toLocaleDateString()}</div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
