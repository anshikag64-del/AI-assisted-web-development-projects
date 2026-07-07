import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

export default function Stub({ title, tagline }) {
  return (
    <div className="max-w-3xl mx-auto pt-4">
      <Card className="rounded-3xl p-12 text-center bg-white dark:bg-white/5 border-[#E9DFFF] dark:border-white/10">
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-[#7C4DFF] to-[#FFB6C1] flex items-center justify-center mx-auto shadow-lg">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h1 className="mt-6 font-display text-4xl">{title}</h1>
        <p className="mt-3 text-[#3F3A5A] dark:text-gray-300 max-w-md mx-auto">{tagline}</p>
        <div className="mt-6 text-xs uppercase tracking-[0.25em] text-[#7C4DFF] font-semibold">In the next release</div>
      </Card>
    </div>
  );
}
