import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { api } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Sparkles, Baby, Briefcase, Wallet, HeartPulse, Moon, Droplet, Smile, Flame, Calendar as CalIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, AreaChart, Area, CartesianGrid } from "recharts";

const productivity = [
  { d: "Mon", v: 62 }, { d: "Tue", v: 71 }, { d: "Wed", v: 58 },
  { d: "Thu", v: 80 }, { d: "Fri", v: 74 }, { d: "Sat", v: 66 }, { d: "Sun", v: 84 },
];

const sleepData = [
  { d: "Mon", h: 6.4 }, { d: "Tue", h: 5.8 }, { d: "Wed", h: 7.1 },
  { d: "Thu", h: 6.2 }, { d: "Fri", h: 6.9 }, { d: "Sat", h: 7.4 }, { d: "Sun", h: 6.6 },
];

const Ring = ({ value = 0, size = 140, stroke = 12, label = "", sub = "" }) => {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const off = c - (value / 100) * c;
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7C4DFF" />
            <stop offset="100%" stopColor="#FFB6C1" />
          </linearGradient>
        </defs>
        <circle cx={size/2} cy={size/2} r={r} stroke="#F3E8FF" strokeWidth={stroke} fill="none" />
        <circle
          cx={size/2} cy={size/2} r={r}
          stroke="url(#ringGrad)" strokeWidth={stroke} fill="none"
          strokeDasharray={c} strokeDashoffset={off}
          strokeLinecap="round"
          transform={`rotate(-90 ${size/2} ${size/2})`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="font-display text-4xl leading-none">{value}</div>
        {label && <div className="text-xs text-[#5B5476] mt-1">{label}</div>}
        {sub && <div className="text-[10px] text-gray-400">{sub}</div>}
      </div>
    </div>
  );
};

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/dashboard/summary");
        setData(data);
      } catch {}
    })();
  }, []);

  const sub = data?.sub_scores || {};

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Greeting */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="pt-2">
        <div className="text-xs uppercase tracking-[0.25em] text-[#7C4DFF] font-semibold">Good morning</div>
        <h1 className="font-display text-4xl sm:text-5xl mt-1 text-[#1F1B2E] dark:text-white">
          Hi {data?.user?.name?.split(" ")[0] || "there"} — here's your gentle plan.
        </h1>
      </motion.div>

      {/* Life Balance + AI Suggestion */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 rounded-3xl p-8 bg-white dark:bg-white/5 border-[#E9DFFF] dark:border-white/10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-[#5B5476]">Life Balance Score</div>
              <div className="mt-2 flex items-end gap-2">
                <div data-testid="life-balance-score" className="font-display text-6xl bg-clip-text text-transparent bg-gradient-to-r from-[#5B21D6] to-[#DB2777]">
                  {data?.life_balance_score ?? "—"}
                </div>
                <div className="text-[#5B5476] mb-2">/100</div>
              </div>
              <p className="mt-3 text-[#3F3A5A] dark:text-gray-300 max-w-md">A gentle blend of your career, baby, health, learning, finances, sleep and stress today.</p>
            </div>
            <Ring value={data?.life_balance_score ?? 0} label="Today" />
          </div>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { k: "career", label: "Career", icon: Briefcase },
              { k: "baby_care", label: "Baby", icon: Baby },
              { k: "health", label: "Health", icon: HeartPulse },
              { k: "learning", label: "Learning", icon: Sparkles },
              { k: "sleep", label: "Sleep", icon: Moon },
              { k: "finance", label: "Finance", icon: Wallet },
              { k: "stress", label: "Calm", icon: Smile },
            ].map(({ k, label, icon: Icon }) => (
              <div key={k} className="rounded-2xl p-4 bg-gradient-to-br from-white to-purple-50 dark:from-white/5 dark:to-white/0 border border-purple-100 dark:border-white/10">
                <div className="flex items-center justify-between">
                  <Icon className="w-4 h-4 text-[#7C4DFF]" />
                  <span className="font-display text-xl">{sub[k] ?? "—"}</span>
                </div>
                <div className="mt-2 text-xs text-[#5B5476]">{label}</div>
                <Progress value={sub[k] ?? 0} className="mt-2 h-1.5" />
              </div>
            ))}
          </div>
        </Card>

        <Card className="rounded-3xl p-8 bg-gradient-to-br from-[#7C4DFF] to-[#B388FF] text-white border-0">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] opacity-90">
            <Sparkles className="w-4 h-4" /> AI Suggestions
          </div>
          <ul className="mt-4 space-y-3">
            {(data?.suggestions || []).slice(0, 4).map((s, i) => (
              <li key={i} className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs mt-0.5 shrink-0">{i + 1}</div>
                <div className="text-sm leading-relaxed">{s}</div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Widgets row */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="rounded-3xl p-6 bg-white dark:bg-white/5 border-[#E9DFFF] dark:border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-[0.25em] text-[#5B5476]">Streak</span>
            <Flame className="w-4 h-4 text-[#FFB6C1]" />
          </div>
          <div className="mt-3 font-display text-4xl">7 <span className="text-lg text-[#5B5476]">days</span></div>
          <div className="mt-1 text-sm text-[#5B5476]">Small steps, big love.</div>
        </Card>
        <Card className="rounded-3xl p-6 bg-white dark:bg-white/5 border-[#E9DFFF] dark:border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-[0.25em] text-[#5B5476]">Water</span>
            <Droplet className="w-4 h-4 text-[#7C4DFF]" />
          </div>
          <div className="mt-3 font-display text-4xl">6 <span className="text-lg text-[#5B5476]">/ 8 cups</span></div>
          <Progress value={75} className="mt-3 h-1.5" />
        </Card>
        <Card className="rounded-3xl p-6 bg-white dark:bg-white/5 border-[#E9DFFF] dark:border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-[0.25em] text-[#5B5476]">Applied Jobs</span>
            <Briefcase className="w-4 h-4 text-[#7C4DFF]" />
          </div>
          <div className="mt-3 font-display text-4xl">{data?.counts?.jobs ?? 0}</div>
          <div className="mt-1 text-sm text-[#5B5476]">This month</div>
        </Card>
        <Card className="rounded-3xl p-6 bg-white dark:bg-white/5 border-[#E9DFFF] dark:border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-[0.25em] text-[#5B5476]">Baby log</span>
            <Baby className="w-4 h-4 text-[#FFB6C1]" />
          </div>
          <div className="mt-3 font-display text-4xl">{data?.counts?.baby_events ?? 0}</div>
          <div className="mt-1 text-sm text-[#5B5476]">Events tracked</div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 rounded-3xl p-6 bg-white dark:bg-white/5 border-[#E9DFFF] dark:border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-[#5B5476]">Weekly productivity</div>
              <div className="font-display text-2xl mt-1">A gentle rhythm</div>
            </div>
            <Badge className="rounded-full bg-purple-100 text-[#7C4DFF] border-0">+8% vs last week</Badge>
          </div>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={productivity}>
                <defs>
                  <linearGradient id="p" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7C4DFF" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#7C4DFF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="d" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #eee" }} />
                <Area type="monotone" dataKey="v" stroke="#7C4DFF" strokeWidth={3} fill="url(#p)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="rounded-3xl p-6 bg-white dark:bg-white/5 border-[#E9DFFF] dark:border-white/10">
          <div className="text-xs uppercase tracking-[0.25em] text-[#5B5476]">Baby sleep pattern</div>
          <div className="font-display text-2xl mt-1">Hours per night</div>
          <div className="mt-4 h-40">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sleepData}>
                <XAxis dataKey="d" stroke="#9ca3af" fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #eee" }} />
                <Line type="monotone" dataKey="h" stroke="#FFB6C1" strokeWidth={3} dot={{ r: 4, fill: "#FFB6C1" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Calendar + Upcoming */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="rounded-3xl p-6 bg-white dark:bg-white/5 border-[#E9DFFF] dark:border-white/10">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#5B5476]"><CalIcon className="w-4 h-4" /> Calendar</div>
          <Calendar mode="single" selected={date} onSelect={setDate} className="mt-2 rounded-2xl" />
        </Card>
        <Card className="lg:col-span-2 rounded-3xl p-6 bg-white dark:bg-white/5 border-[#E9DFFF] dark:border-white/10">
          <div className="text-xs uppercase tracking-[0.25em] text-[#5B5476]">Upcoming</div>
          <div className="font-display text-2xl mt-1">What's on the horizon</div>
          <div className="mt-4 space-y-3">
            {(data?.upcoming?.length ? data.upcoming : [
              { title: "Ava's 6-month vaccination", scheduled_at: "In 3 days", kind: "vaccination" },
              { title: "Interview: Product Manager at Nova", scheduled_at: "Next Tuesday", kind: "career" },
              { title: "Pediatrician check-up", scheduled_at: "Next Friday", kind: "doctor" },
            ]).slice(0, 6).map((u, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 dark:from-white/5 dark:to-white/0 border border-purple-100 dark:border-white/10">
                <div>
                  <div className="font-medium text-[#1F1B2E] dark:text-white">{u.title}</div>
                  <div className="text-xs text-[#5B5476] mt-0.5 capitalize">{u.kind}</div>
                </div>
                <div className="text-sm text-[#7C4DFF] font-medium">{u.scheduled_at}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
