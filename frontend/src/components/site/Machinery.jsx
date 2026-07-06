import React from "react";
import { MACHINERY } from "../../data/site";

export const Machinery = () => {
  return (
    <section id="capability" data-testid="machinery-section" className="relative px-6 lg:px-10 py-24 md:py-32 border-t border-white/10 overflow-hidden">
      {/* Background kinetic outline text */}
      <div className="absolute inset-0 flex items-center pointer-events-none opacity-[0.06] overflow-hidden">
        <div className="marquee-track">
          {Array(6).fill("CAPABILITY · MACHINERY · SCALE · ").map((t, i) => (
            <span key={i} className="font-display text-[18vw] leading-none tracking-tighter whitespace-nowrap text-white">
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="relative max-w-[1440px] mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <p className="overline mb-4">[ 05 · Engineering capability ]</p>
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] leading-[0.95] tracking-tighter max-w-3xl">
              33+ machines. <span className="text-[#FF4500]">In-house.</span>
              <br />Zero rental dependency.
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md leading-relaxed">
            End-to-end machinery ownership — from wet mix macadam plants to paver finishers, transit mixers,
            and a full civil-engineering laboratory suite.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 border-l border-t border-white/10">
          {MACHINERY.map((m, i) => (
            <div
              key={i}
              data-testid={`machinery-${i}`}
              className="p-5 border-r border-b border-white/10 bg-black/30 hover:bg-[#FF4500] hover:text-white transition-colors group cursor-default"
            >
              <div className="font-mono text-[10px] text-zinc-500 group-hover:text-white/70 tracking-[0.2em]">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="mt-2 font-display text-base leading-tight text-white">{m}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
