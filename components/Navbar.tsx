"use client";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const NAV = ["About", "Skills", "Projects", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      for (const id of ["about","skills","projects","contact"]) {
        const el = document.getElementById(id);
        if (el) { const r = el.getBoundingClientRect(); if (r.top <= 100 && r.bottom > 100) setActive(id); }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setOpen(false); };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${scrolled ? "backdrop-blur-xl border-b" : ""}`}
      style={{ background: scrolled ? "color-mix(in srgb, var(--bg) 85%, transparent)" : "transparent", borderColor: scrolled ? "var(--border)" : "transparent" }}>
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between gap-6">

        {/* Logo */}
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-display text-xl tracking-tight shrink-0"
          style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--fg)" }}>
          Alex<em className="not-italic grad-text"> Morgan</em>
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8 flex-1 justify-center">
          {NAV.map(n => (
            <li key={n}>
              <button onClick={() => go(n.toLowerCase())}
                className="font-mono text-[11px] tracking-[0.12em] uppercase transition-colors duration-200 relative group"
                style={{ fontFamily: "'IBM Plex Mono', monospace", color: active === n.toLowerCase() ? "var(--accent)" : "var(--fg3)" }}>
                {n}
                <span className="absolute -bottom-1 left-0 h-px transition-all duration-300 group-hover:w-full"
                  style={{ background: "var(--accent)", width: active === n.toLowerCase() ? "100%" : "0" }} />
              </button>
            </li>
          ))}
        </ul>

        {/* Right: toggle + CTA */}
        <div className="flex items-center gap-3 shrink-0">
          <ThemeToggle />
          <button onClick={() => go("contact")}
            className="hidden md:block font-mono text-[11px] px-5 py-2.5 tracking-widest uppercase transition-all duration-200"
            style={{ fontFamily: "'IBM Plex Mono', monospace", background: "var(--fg)", color: "var(--bg)" }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "var(--accent)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "var(--fg)"; }}>
            Hire Me
          </button>
          {/* Hamburger */}
          <button className="md:hidden flex flex-col gap-[5px] p-1" onClick={() => setOpen(!open)}>
            {[0,1,2].map(i => (
              <span key={i} className={`block w-5 h-px transition-all duration-200`}
                style={{ background: "var(--fg)", transform: open && i===0 ? "rotate(45deg) translateY(7px)" : open && i===2 ? "rotate(-45deg) translateY(-7px)" : "", opacity: open && i===1 ? 0 : 1 }} />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t px-6 py-5 flex flex-col gap-4"
          style={{ background: "var(--bg)", borderColor: "var(--border)" }}>
          {NAV.map(n => (
            <button key={n} onClick={() => go(n.toLowerCase())}
              className="text-left font-mono text-[11px] tracking-[0.12em] uppercase transition-colors"
              style={{ fontFamily: "'IBM Plex Mono', monospace", color: "var(--fg3)" }}>
              {n}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
