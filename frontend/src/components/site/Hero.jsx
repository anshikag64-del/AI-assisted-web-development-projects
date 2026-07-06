import React from "react";
import { motion } from "framer-motion";
import { COMPANY } from "../../data/site";

export const Hero = () => {
  return (
    <section id="top" data-testid="hero-section" className="relative min-h-[100svh] w-full overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/8860492/pexels-photo-8860492.jpeg"
          alt="Aerial highway interchange"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black" />
        <div className="absolute inset-0 grid-lines-bg opacity-40" />
      </div>

      {/* Top overline strip */}
      <div className="relative z-10 pt-24 md:pt-28 px-6 lg:px-10">
        <div className="max-w-[1440px] mx-auto border-t border-white/10 pt-4 flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-400">
          <span data-testid="hero-badge-location">Shahjahanpur · Uttar Pradesh</span>
          <span className="hidden sm:inline">Reg. Contractor · Cat A</span>
          <span data-testid="hero-badge-since">Est. {COMPANY.founded}</span>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 px-6 lg:px-10 mt-16 md:mt-24">
        <div className="max-w-[1440px] mx-auto grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 lg:col-span-9">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="overline mb-4"
              data-testid="hero-eyebrow"
            >
              [ Civil Construction · Since 1985 · Second Generation ]
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-display font-medium text-white text-[clamp(2.75rem,8.5vw,8.5rem)] leading-[0.9] tracking-[-0.03em]"
              data-testid="hero-headline"
            >
              We pour <span className="text-[#FF4500]">concrete</span>
              <br />
              into public trust.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 max-w-2xl text-zinc-300 text-base md:text-lg leading-relaxed"
              data-testid="hero-sub"
            >
              {COMPANY.name} — a civil construction firm with <strong className="text-white">{COMPANY.experience} years</strong> of engineering delivery across roads,
              national highways, bridges, irrigation and government buildings in North India.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="col-span-12 lg:col-span-3 flex flex-col gap-3"
          >
            <a
              href="#projects"
              data-testid="hero-cta-projects"
              className="group inline-flex items-center justify-between bg-[#FF4500] hover:bg-[#E03E00] text-white px-5 py-4 font-medium transition-colors"
            >
              <span>See our projects</span>
              <span className="group-hover:translate-x-1 transition-transform">↘</span>
            </a>
            <a
              href="#contact"
              data-testid="hero-cta-contact"
              className="inline-flex items-center justify-between border border-white/20 hover:border-white/60 text-white px-5 py-4 transition-colors"
            >
              <span>Start a project</span>
              <span>→</span>
            </a>
          </motion.div>
        </div>

        {/* Bottom stats strip */}
        <div className="max-w-[1440px] mx-auto mt-20 md:mt-32 mb-10 border-t border-white/10 grid grid-cols-2 md:grid-cols-4">
          {[
            ["35+", "Years in field"],
            ["₹ 60 Cr+", "Delivered (5 yr)"],
            ["13", "Recent projects"],
            ["12+", "Govt. departments"],
          ].map(([n, l], i) => (
            <div key={i} className="p-5 md:p-7 border-r last:border-r-0 border-white/10">
              <div className="font-display text-3xl md:text-4xl tracking-tighter text-white" data-testid={`hero-stat-${i}`}>{n}</div>
              <div className="mt-2 text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-500">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
