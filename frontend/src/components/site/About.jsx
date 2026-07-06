import React from "react";
import { CORE_VALUES } from "../../data/site";

export const About = () => {
  return (
    <section id="about" data-testid="about-section" className="relative px-6 lg:px-10 py-24 md:py-32 border-t border-white/10">
      <div className="max-w-[1440px] mx-auto grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-5">
          <p className="overline mb-6" data-testid="about-overline">[ 01 · About the firm ]</p>
          <h2 className="font-display text-[clamp(2rem,5vw,4rem)] leading-[0.95] tracking-tighter">
            Four decades of<br />
            <span className="text-[#FF4500]">infrastructure</span> under our belt.
          </h2>
        </div>

        <div className="col-span-12 lg:col-span-7 lg:pl-12 lg:border-l border-white/10">
          <p className="text-zinc-300 text-base md:text-lg leading-relaxed">
            <span className="text-white font-medium">M/s Pramod Kumar Gupta Thekedar</span> has been in civil construction since the 1980s —
            executing road works, irrigation projects, multi-storey buildings and government office construction across Uttar Pradesh.
          </p>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            Now led by the second generation under <span className="text-white">Eng. Abhishek Kumar Gupta (M.Tech, DCE-DU)</span>, the firm combines
            long-standing site experience with contemporary quality assurance, digital surveying, and machinery-heavy delivery capacity —
            enabling us to meet rigorous public infrastructure standards on aggressive timelines.
          </p>

          {/* Mission + Vision */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 bg-[#141414] border border-white/10">
              <p className="overline mb-2">Mission</p>
              <p className="text-zinc-300 text-sm leading-relaxed">
                Execute projects with consistent quality assurance, cost control and adherence to milestones — in a safe environment,
                seeking presence in new government priority areas.
              </p>
            </div>
            <div className="p-6 bg-[#141414] border border-white/10">
              <p className="overline mb-2">Vision</p>
              <p className="text-zinc-300 text-sm leading-relaxed">
                To be recognised as a world-class infrastructure company known for its execution capabilities and commitment to customer satisfaction.
              </p>
            </div>
          </div>
        </div>

        {/* Core values grid */}
        <div className="col-span-12 mt-20">
          <p className="overline mb-8">[ Core values ]</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-white/10">
            {CORE_VALUES.map((v, i) => (
              <div
                key={v.code}
                data-testid={`core-value-${i}`}
                className="p-8 border-r border-b border-white/10 last:border-r-0 sm:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(4n)]:border-r-0 hover:bg-[#141414] transition-colors"
              >
                <div className="font-mono text-xs text-[#FF4500] tracking-[0.2em]">{v.code}</div>
                <div className="mt-4 font-display text-2xl tracking-tighter">{v.title}</div>
                <p className="mt-3 text-sm text-zinc-400 leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
