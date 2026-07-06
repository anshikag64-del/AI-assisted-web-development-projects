import React, { useState, useMemo } from "react";
import { PROJECTS } from "../../data/site";

const CATEGORIES = ["All", "National Highway", "State Highway", "Rural Road", "Bridge", "Building", "Urban Road", "Civic Building"];

export const Projects = () => {
  const [filter, setFilter] = useState("All");

  const filtered = useMemo(
    () => (filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.cat === filter)),
    [filter]
  );

  return (
    <section id="projects" data-testid="projects-section" className="relative px-6 lg:px-10 py-24 md:py-32 border-t border-white/10">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <p className="overline mb-4">[ 03 · Recent projects ]</p>
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] leading-[0.95] tracking-tighter max-w-3xl">
              13 government contracts,<br />
              <span className="text-[#FF4500]">one delivery discipline.</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                data-testid={`project-filter-${c.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={() => setFilter(c)}
                className={`px-3 py-1.5 text-xs font-mono uppercase tracking-[0.15em] border transition-colors ${
                  filter === c
                    ? "bg-white text-black border-white"
                    : "text-zinc-400 border-white/15 hover:border-white/40 hover:text-white"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Table-style project listing */}
        <div className="border-t border-white/10">
          <div className="hidden md:grid grid-cols-12 gap-4 py-3 px-2 text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500 border-b border-white/10">
            <div className="col-span-1">Code</div>
            <div className="col-span-5">Project</div>
            <div className="col-span-3">Client</div>
            <div className="col-span-1">Year</div>
            <div className="col-span-2 text-right">Value</div>
          </div>

          {filtered.map((p) => (
            <div
              key={p.code}
              data-testid={`project-row-${p.code}`}
              className="group grid grid-cols-1 md:grid-cols-12 gap-4 py-6 px-2 border-b border-white/10 hover:bg-[#141414] transition-colors"
            >
              <div className="md:col-span-1 font-mono text-[11px] text-[#FF4500] tracking-[0.15em]">{p.code}</div>
              <div className="md:col-span-5">
                <div className="font-display text-lg md:text-xl tracking-tight text-white">{p.title}</div>
                <div className="mt-1 text-xs text-zinc-500 leading-relaxed">{p.scope}</div>
                <div className="mt-2 inline-block text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400 border border-white/15 px-2 py-0.5">
                  {p.cat}
                </div>
              </div>
              <div className="md:col-span-3 text-sm text-zinc-300">{p.client}</div>
              <div className="md:col-span-1 font-mono text-sm text-zinc-400">{p.year}</div>
              <div className="md:col-span-2 md:text-right font-display text-lg tracking-tight">{p.value}</div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="py-16 text-center text-zinc-500 text-sm" data-testid="projects-empty">
              No projects in this category yet.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
