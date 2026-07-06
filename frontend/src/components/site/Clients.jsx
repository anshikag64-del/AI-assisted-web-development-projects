import React from "react";
import { CLIENTS } from "../../data/site";

export const Clients = () => {
  return (
    <section data-testid="clients-section" className="relative py-16 border-t border-white/10 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 mb-8">
        <p className="overline">[ Trusted by public institutions ]</p>
      </div>
      <div className="relative w-full overflow-hidden">
        <div className="marquee-track">
          {[...CLIENTS, ...CLIENTS, ...CLIENTS].map((c, i) => (
            <div key={i} className="flex items-center gap-8 px-8">
              <span className="font-display text-3xl md:text-5xl text-zinc-600 hover:text-white transition-colors tracking-tighter whitespace-nowrap">
                {c}
              </span>
              <span className="text-[#FF4500] font-mono">◆</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
