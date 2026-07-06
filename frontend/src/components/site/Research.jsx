import React from "react";
import { RESEARCH } from "../../data/site";

export const Research = () => {
  return (
    <section id="research" data-testid="research-section" className="relative px-6 lg:px-10 py-24 md:py-32 border-t border-white/10 bg-[#0A0A0A]">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <p className="overline mb-4">[ 04 · Research & insights ]</p>
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] leading-[0.95] tracking-tighter max-w-3xl">
              What we learn on-site,<br />
              <span className="text-[#FF4500]">turned into policy.</span>
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md leading-relaxed">
            Every project ships with a post-completion study — field data, safety incidents, delay drivers and
            traffic-impact metrics — feeding forward into our next bid.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 border border-white/10">
          {RESEARCH.map((r, i) => (
            <div
              key={i}
              data-testid={`research-card-${i}`}
              className="p-8 md:p-10 border-b lg:[&:nth-child(2n)]:border-l border-white/10 lg:[&:nth-child(2n-1)]:border-r lg:[&:nth-last-child(-n+2)]:border-b-0 hover:bg-[#141414] transition-colors group"
            >
              <div className="flex items-start justify-between gap-8">
                <div className="flex-1">
                  <p className="font-mono text-[10px] tracking-[0.2em] text-[#FF4500] uppercase">{r.tag}</p>
                  <h3 className="mt-3 font-display text-2xl md:text-3xl tracking-tighter">{r.title}</h3>
                  <p className="mt-4 text-sm text-zinc-400 leading-relaxed">{r.finding}</p>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-display text-4xl md:text-5xl tracking-tighter text-white">{r.metric}</div>
                  <div className="mt-1 text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500 max-w-[110px]">
                    {r.metricLabel}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Methodology note */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            ["Method", "Post-completion audits + drone survey + community feedback"],
            ["Data", "5-year field database, ~120 completed contracts"],
            ["Output", "Bid-strategy notes, safety SOPs, machinery allocation models"],
          ].map(([k, v], i) => (
            <div key={i} className="p-6 border border-white/10 bg-[#141414]" data-testid={`methodology-${i}`}>
              <p className="overline">{k}</p>
              <p className="mt-2 text-sm text-zinc-300 leading-relaxed">{v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
