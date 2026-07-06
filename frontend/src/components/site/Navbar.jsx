import React, { useEffect, useState } from "react";
import { COMPANY, NAV_LINKS } from "../../data/site";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      data-testid="site-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? "backdrop-blur-xl bg-black/70 border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <a href="#top" data-testid="nav-logo" className="flex items-center gap-3 group">
          <div className="w-8 h-8 border border-white/30 flex items-center justify-center">
            <span className="font-display font-semibold text-[13px] tracking-tighter">P</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-display text-sm font-medium tracking-tight">{COMPANY.short}</span>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500">
              Thekedar · Est. {COMPANY.founded}
            </span>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={`nav-link-${l.label.toLowerCase()}`}
              className="px-3 py-2 text-[13px] text-zinc-300 hover:text-white transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            data-testid="nav-cta-quote"
            className="hidden sm:inline-flex items-center gap-2 bg-[#FF4500] hover:bg-[#E03E00] text-white px-4 py-2 text-[13px] font-medium tracking-tight transition-colors"
          >
            Request a bid
            <span aria-hidden>→</span>
          </a>
          <button
            data-testid="nav-menu-toggle"
            className="md:hidden text-zinc-300 border border-white/15 px-3 py-2 text-[12px]"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/10 bg-black/95 backdrop-blur">
          <div className="px-6 py-4 grid grid-cols-2 gap-2">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-2 text-sm text-zinc-300 border-b border-white/5"
                data-testid={`mobile-nav-${l.label.toLowerCase()}`}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
