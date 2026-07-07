import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Baby as BabyIcon, Milk, Moon, Syringe, Ruler, Pill, Trash2, Plus, Sparkles } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const KIND_META = {
  feeding: { icon: Milk, color: "bg-pink-100 text-pink-600" },
  sleep: { icon: Moon, color: "bg-purple-100 text-purple-600" },
  vaccination: { icon: Syringe, color: "bg-green-100 text-green-600" },
  growth: { icon: Ruler, color: "bg-yellow-100 text-yellow-700" },
  medicine: { icon: Pill, color: "bg-red-100 text-red-600" },
  milestone: { icon: Sparkles, color: "bg-indigo-100 text-indigo-600" },
};

export default function Baby() {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ kind: "feeding", title: "", notes: "", value: "", scheduled_at: "" });

  const load = async () => {
    try {
      const { data } = await api.get("/baby/events");
      setEvents(data || []);
    } catch (e) { toast.error("Couldn't load baby events"); }
  };

  useEffect(() => { load(); }, []);

  const submit = async () => {
    if (!form.title) return toast.error("Give it a title");
    try {
      await api.post("/baby/events", {
        kind: form.kind,
        title: form.title,
        notes: form.notes,
        value: form.value ? parseFloat(form.value) : null,
        scheduled_at: form.scheduled_at || null,
      });
      toast.success("Saved gently 💜");
      setOpen(false);
      setForm({ kind: "feeding", title: "", notes: "", value: "", scheduled_at: "" });
      load();
    } catch { toast.error("Failed to save"); }
  };

  const remove = async (id) => {
    await api.delete(`/baby/events/${id}`);
    setEvents(e => e.filter(x => x.id !== id));
    toast.success("Removed");
  };

  const growthData = events
    .filter(e => e.kind === "growth" && e.value)
    .slice(-8).reverse()
    .map((e, i) => ({ d: `#${i+1}`, v: e.value }));

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-end justify-between gap-4 pt-2">
        <div>
          <div className="text-xs uppercase tracking-[0.25em] text-[#7C4DFF] font-semibold">Little one</div>
          <h1 className="font-display text-4xl sm:text-5xl mt-1 text-[#1F1B2E] dark:text-white">Baby care, gently tracked.</h1>
          <p className="mt-2 text-[#3F3A5A] dark:text-gray-300 max-w-xl">Feeding, sleep, vaccinations, medicine, growth and milestones — all in one calm place.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button data-testid="baby-add-btn" className="rounded-full bg-[#7C4DFF] hover:bg-[#651FFF]"><Plus className="w-4 h-4 mr-2" /> Log something</Button>
          </DialogTrigger>
          <DialogContent className="rounded-3xl">
            <DialogHeader>
              <DialogTitle className="font-display text-2xl">Log a baby event</DialogTitle>
            </DialogHeader>
            <div className="space-y-3 mt-2">
              <Select value={form.kind} onValueChange={(v) => setForm(f => ({ ...f, kind: v }))}>
                <SelectTrigger data-testid="baby-form-kind"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.keys(KIND_META).map(k => <SelectItem key={k} value={k} className="capitalize">{k}</SelectItem>)}
                </SelectContent>
              </Select>
              <Input data-testid="baby-form-title" placeholder="Title (e.g. Morning feed, Nap, DTaP)" value={form.title} onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))} />
              <Input data-testid="baby-form-value" placeholder="Value (weight in kg, hours of sleep, ml…)" type="number" value={form.value} onChange={(e) => setForm(f => ({ ...f, value: e.target.value }))} />
              <Input data-testid="baby-form-scheduled" placeholder="Scheduled at (optional, e.g. 2026-03-15)" value={form.scheduled_at} onChange={(e) => setForm(f => ({ ...f, scheduled_at: e.target.value }))} />
              <Textarea data-testid="baby-form-notes" placeholder="Notes" value={form.notes} onChange={(e) => setForm(f => ({ ...f, notes: e.target.value }))} />
            </div>
            <DialogFooter>
              <Button data-testid="baby-form-save" onClick={submit} className="rounded-full bg-[#7C4DFF] hover:bg-[#651FFF]">Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Growth chart */}
      {growthData.length > 1 && (
        <Card className="rounded-3xl p-6 bg-white dark:bg-white/5 border-[#E9DFFF] dark:border-white/10">
          <div className="text-xs uppercase tracking-[0.25em] text-[#5B5476]">Growth</div>
          <div className="font-display text-2xl mt-1">Trend over recent entries</div>
          <div className="mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="d" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #eee" }} />
                <Line type="monotone" dataKey="v" stroke="#7C4DFF" strokeWidth={3} dot={{ r: 4, fill: "#B388FF" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      )}

      {/* Timeline */}
      <Card className="rounded-3xl p-6 bg-white dark:bg-white/5 border-[#E9DFFF] dark:border-white/10">
        <div className="text-xs uppercase tracking-[0.25em] text-[#5B5476]">Timeline</div>
        <div className="font-display text-2xl mt-1">Recent entries</div>
        {events.length === 0 ? (
          <div className="mt-8 text-center py-12">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-[#FFB6C1] to-[#B388FF] flex items-center justify-center mx-auto shadow-lg">
              <BabyIcon className="w-8 h-8 text-white" />
            </div>
            <div className="font-display text-xl mt-4">Your baby's journey starts here</div>
            <p className="text-[#5B5476] mt-1">Log your first event to see the timeline bloom.</p>
          </div>
        ) : (
          <div className="mt-6 space-y-3">
            {events.map((e) => {
              const meta = KIND_META[e.kind] || KIND_META.milestone;
              const Icon = meta.icon;
              return (
                <div key={e.id} data-testid={`baby-item-${e.id}`} className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-purple-50/50 to-pink-50/50 dark:from-white/5 dark:to-white/0 border border-purple-100 dark:border-white/10">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${meta.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-[#1F1B2E] dark:text-white">{e.title}</span>
                      <Badge variant="secondary" className="rounded-full text-[10px] capitalize">{e.kind}</Badge>
                      {e.value != null && <Badge className="rounded-full bg-purple-100 text-[#7C4DFF] border-0 text-[10px]">{e.value}</Badge>}
                    </div>
                    {e.notes && <div className="text-sm text-[#5B5476] mt-0.5 truncate">{e.notes}</div>}
                  </div>
                  <div className="text-xs text-gray-400 hidden sm:block">{new Date(e.created_at).toLocaleDateString()}</div>
                  <button data-testid={`baby-del-${e.id}`} onClick={() => remove(e.id)} className="text-gray-400 hover:text-red-500 p-2" aria-label="Delete">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}
