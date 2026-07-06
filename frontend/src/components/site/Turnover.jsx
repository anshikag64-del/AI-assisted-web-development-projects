import React from "react";
import { TURNOVER } from "../../data/site";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

export const Turnover = () => {
  const total = TURNOVER.reduce((s, t) => s + t.value, 0).toFixed(2);
  return (
    <section id="turnover" data-testid="turnover-section" className="relative px-6 lg:px-10 py-24 md:py-32 border-t border-white/10">
      <div className="max-w-[1440px] mx-auto grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-5">
          <p className="overline mb-4">[ 06 · Financial growth ]</p>
          <h2 className="font-display text-[clamp(2rem,5vw,4rem)] leading-[0.95] tracking-tighter">
            Five years. <span className="text-[#FF4500]">₹ {total} Cr</span> delivered.
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed max-w-md">
            Steady growth against a backdrop of ambitious government infrastructure programmes across Uttar Pradesh.
            Turnover peaked in FY 2024-25 at ₹ 16.30 Crore, driven by highway restoration contracts.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <div className="border border-white/10 p-5">
              <p className="overline">FY 2024-25</p>
              <div className="font-display text-3xl mt-2 tracking-tighter">₹ 16.30 Cr</div>
              <p className="text-xs text-[#FF4500] font-mono mt-1">+98.8% YoY</p>
            </div>
            <div className="border border-white/10 p-5">
              <p className="overline">5-Yr Peak Load</p>
              <div className="font-display text-3xl mt-2 tracking-tighter">₹ 16.30 Cr</div>
              <p className="text-xs text-zinc-500 font-mono mt-1">All-time high</p>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-7">
          <div className="border border-white/10 bg-[#0F0F0F] p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="overline">Turnover · in ₹ Crore</p>
                <div className="font-display text-2xl tracking-tighter mt-1">Yearly delivery</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500">CAGR</div>
                <div className="font-display text-xl text-[#FF4500]">13.1%</div>
              </div>
            </div>
            <div className="w-full h-[360px]" data-testid="turnover-chart">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={TURNOVER} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                  <CartesianGrid stroke="rgba(255,255,255,0.06)" strokeDasharray="0" />
                  <XAxis dataKey="year" tick={{ fill: "#A1A1AA", fontSize: 11, fontFamily: "JetBrains Mono" }} axisLine={{ stroke: "rgba(255,255,255,0.15)" }} tickLine={false} />
                  <YAxis tick={{ fill: "#A1A1AA", fontSize: 11, fontFamily: "JetBrains Mono" }} axisLine={{ stroke: "rgba(255,255,255,0.15)" }} tickLine={false} />
                  <Tooltip
                    cursor={{ fill: "rgba(255,69,0,0.08)" }}
                    contentStyle={{ background: "#141414", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 0, fontFamily: "JetBrains Mono", fontSize: 12 }}
                    labelStyle={{ color: "#fff" }}
                    itemStyle={{ color: "#FF4500" }}
                    formatter={(v) => [`₹ ${v} Cr`, "Turnover"]}
                  />
                  <Bar dataKey="value" fill="#FF4500" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
