import React from "react";
import { TEAM } from "../../data/site";

export const Team = () => {
  return (
    <section id="team" data-testid="team-section" className="relative px-6 lg:px-10 py-24 md:py-32 border-t border-white/10 bg-[#0A0A0A]">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <p className="overline mb-4">[ 07 · Leadership ]</p>
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] leading-[0.95] tracking-tighter max-w-3xl">
              Second-generation engineers.<br />
              <span className="text-[#FF4500]">First-generation discipline.</span>
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md">
            A small, high-accountability leadership team pairing decades of railway & PWD experience with new-generation
            engineering practice.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {TEAM.map((t, i) => (
            <div
              key={t.name}
              data-testid={`team-card-${i}`}
              className="p-8 border border-white/10 bg-[#141414] hover:border-[#FF4500] transition-colors group"
            >
              <div className="flex items-start justify-between mb-6">
                <span className="font-mono text-[10px] tracking-[0.2em] text-zinc-500 uppercase">
                  0{i + 1}
                </span>
                <span className="w-2 h-2 bg-[#FF4500] rounded-full" />
              </div>
              <div className="font-display text-2xl md:text-3xl tracking-tighter leading-tight">{t.name}</div>
              <div className="mt-3 text-sm text-[#FF4500] font-medium">{t.title}</div>
              <div className="mt-4 text-xs text-zinc-400 leading-relaxed border-t border-white/10 pt-4">{t.meta}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
