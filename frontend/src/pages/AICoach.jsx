import { useEffect, useRef, useState } from "react";
import { api, API } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Send, MessageCircleHeart } from "lucide-react";
import { toast } from "sonner";

const STARTERS = [
  "My baby didn't sleep well. What should I do today?",
  "I have a job interview tomorrow — help me prepare gently.",
  "I feel overwhelmed. Where do I even start?",
  "I want to build a career while raising my toddler.",
];

export default function AICoach() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const endRef = useRef();

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending]);

  const send = async (text) => {
    const msg = (text || input).trim();
    if (!msg || sending) return;
    setInput("");
    setSending(true);
    setMessages((m) => [...m, { role: "user", content: msg }, { role: "assistant", content: "" }]);

    try {
      const res = await fetch(`${API}/coach/chat`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, session_id: sessionId }),
      });
      if (!res.ok || !res.body) throw new Error("stream failed");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        const parts = buf.split("\n\n");
        buf = parts.pop() || "";
        for (const p of parts) {
          const line = p.replace(/^data:\s*/, "").trim();
          if (!line) continue;
          try {
            const evt = JSON.parse(line);
            if (evt.delta) {
              setMessages((m) => {
                const c = [...m];
                c[c.length - 1] = { role: "assistant", content: (c[c.length - 1].content || "") + evt.delta };
                return c;
              });
            }
            if (evt.session_id) setSessionId(evt.session_id);
            if (evt.error) toast.error(evt.error);
          } catch {}
        }
      }
    } catch (e) {
      toast.error("Chat failed");
      setMessages((m) => m.slice(0, -1));
    } finally { setSending(false); }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="pt-2">
        <div className="text-xs uppercase tracking-[0.25em] text-[#7C4DFF] font-semibold">AI Life Coach</div>
        <h1 className="font-display text-4xl sm:text-5xl mt-1 text-gray-900 dark:text-white">A calm voice, always here.</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300 max-w-xl">Powered by Claude Sonnet 4.5 — trained to listen first, and gently guide.</p>
      </div>

      <Card className="rounded-3xl p-4 sm:p-6 bg-white/80 dark:bg-white/5 border-purple-50 dark:border-white/10 min-h-[60vh] flex flex-col">
        <div className="flex-1 overflow-y-auto scrollbar-thin space-y-4 pr-2">
          {messages.length === 0 && (
            <div className="text-center py-14">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-[#7C4DFF] to-[#FFB6C1] flex items-center justify-center mx-auto shadow-lg">
                <MessageCircleHeart className="w-8 h-8 text-white" />
              </div>
              <div className="font-display text-2xl mt-4">Hi, I'm here. How are you feeling today?</div>
              <p className="text-gray-500 mt-1">Try one of these to start:</p>
              <div className="mt-5 flex flex-wrap gap-2 justify-center max-w-2xl mx-auto">
                {STARTERS.map((s, i) => (
                  <button
                    key={i}
                    data-testid={`starter-${i}`}
                    onClick={() => send(s)}
                    className="text-sm text-gray-700 dark:text-gray-200 bg-purple-50 hover:bg-purple-100 dark:bg-white/5 dark:hover:bg-white/10 rounded-full px-4 py-2 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                data-testid={`msg-${m.role}-${i}`}
                className={`max-w-[85%] px-5 py-3 rounded-3xl leading-relaxed ${
                  m.role === "user"
                    ? "bg-gradient-to-br from-[#7C4DFF] to-[#B388FF] text-white rounded-br-md"
                    : "bg-purple-50 dark:bg-white/5 text-gray-800 dark:text-gray-100 rounded-bl-md"
                } whitespace-pre-wrap`}
              >
                {m.content || (m.role === "assistant" && sending ? <span className="opacity-60">Thinking…</span> : null)}
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); send(); }}
          className="mt-4 flex items-center gap-2 pt-4 border-t border-purple-100 dark:border-white/10"
        >
          <Input
            data-testid="coach-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tell me what's on your heart…"
            className="rounded-full h-12 bg-white dark:bg-white/5 border-purple-100 dark:border-white/10"
            disabled={sending}
          />
          <Button data-testid="coach-send-btn" type="submit" disabled={sending || !input.trim()} className="rounded-full h-12 w-12 p-0 bg-[#7C4DFF] hover:bg-[#651FFF]">
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </Card>
    </div>
  );
}
