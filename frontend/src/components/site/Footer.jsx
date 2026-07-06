import React from "react";
import { COMPANY } from "../../data/site";

export const Footer = () => (
  <footer data-testid="site-footer" className="relative px-6 lg:px-10 py-12 border-t border-white/10 bg-black">
    <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
      <div>
        <div className="font-display text-lg tracking-tight">{COMPANY.name}</div>
        <div className="mt-1 text-xs font-mono uppercase tracking-[0.2em] text-zinc-500">
          Est. {COMPANY.founded} · Shahjahanpur, Uttar Pradesh
        </div>
      </div>
      <div className="text-xs font-mono uppercase tracking-[0.15em] text-zinc-500 flex flex-wrap gap-6">
        <span>© {new Date().getFullYear()} PKGT</span>
        <span>Civil Construction</span>
        <span>Reg. Contractor</span>
      </div>
    </div>
    <div className="max-w-[1440px] mx-auto mt-8 pt-6 border-t border-white/5 text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-600">
      Built for public infrastructure · India
    </div>
  </footer>
);
