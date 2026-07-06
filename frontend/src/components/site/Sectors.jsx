import React from "react";
import { SECTORS } from "../../data/site";

export const Sectors = () => {
  return (
    <section id="sectors" data-testid="sectors-section" className="relative px-6 lg:px-10 py-24 md:py-32 border-t border-white/10 bg-[#0A0A0A]">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <p className="overline mb-4">[ 02 · Sectors we deliver ]</p>
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] leading-[0.95] tracking-tighter max-w-3xl">
              From <span className="text-[#FF4500]">rural links</span> to national highways —
              we build every layer.
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md">
            A vertically integrated site capability: our teams handle earthworks, WMM, BC/DBM paving, RCC structures,
            bridge works and finishing under a single project head.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-3 min-h-[540px]">
          {SECTORS.map((s, i) => (
            <div
              key={s.key}
              data-testid={`sector-card-${s.key}`}
              className={`${s.span} relative overflow-hidden group border border-white/10 bg-[#141414]`}
            >
              <img
                src={s.image}
                alt={s.label}
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-90 transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/90 via-black/30 to-transparent" />
              <div className="relative z-10 p-6 md:p-8 flex flex-col justify-between h-full min-h-[240px]">
                <div className="flex justify-between items-start">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-zinc-300 uppercase">
                    0{i + 1} / {SECTORS.length.toString().padStart(2, "0")}
                  </span>
                  <span className="font-mono text-[10px] text-[#FF4500] tracking-[0.2em]">ACTIVE</span>
                </div>
                <div>
                  <div className="font-display text-3xl md:text-4xl tracking-tighter">{s.label}</div>
                  <p className="mt-3 text-sm text-zinc-300 max-w-md leading-relaxed">{s.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
