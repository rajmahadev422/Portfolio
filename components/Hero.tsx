"use client";
import { useEffect, useState } from "react";

const ROLES = ["React.js Developer","Next.js Engineer","Node.js Backend Dev","ML Enthusiast","C++ Programmer"];

export default function Hero() {
  const [role, setRole] = useState(0);
  const [txt, setTxt] = useState("");
  const [del, setDel] = useState(false);
  const [mount, setMount] = useState(false);

  useEffect(() => { setMount(true); }, []);
  useEffect(() => {
    const cur = ROLES[role];
    const t = setTimeout(() => {
      if (!del && txt.length < cur.length) setTxt(cur.slice(0, txt.length + 1));
      else if (!del && txt.length === cur.length) setDel(true);
      else if (del && txt.length > 0) setTxt(txt.slice(0, -1));
      else { setDel(false); setRole(i => (i+1) % ROLES.length); }
    }, del ? 100 : 200);
    return () => clearTimeout(t);
  }, [txt, del, role]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "var(--bg)" }}>
      {/* Grid bg */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{ backgroundImage: "linear-gradient(var(--fg) 1px,transparent 1px),linear-gradient(90deg,var(--fg) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

      {/* Glow orbs */}
      <div className="absolute top-1/3 right-10 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, color-mix(in srgb, var(--accent) 12%, transparent), transparent 70%)", filter: "blur(40px)" }} />
      <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, color-mix(in srgb, var(--accent2) 8%, transparent), transparent 70%)", filter: "blur(60px)" }} />

      {/* Left accent line */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] opacity-40"
        style={{ background: "linear-gradient(to bottom, transparent, var(--accent), transparent)" }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 pt-28 pb-16 w-full">
        <div className="grid lg:grid-cols-[1fr_240px] gap-12 items-center">
          <div>
            {/* Badge */}
            <div className={`inline-flex items-center gap-2.5 mb-8 px-3 py-1.5 border rounded-full opacity-0 ${mount ? "animate-fade-up" : ""}`}
              style={{ borderColor: "rgba(34,197,94,0.3)", background: "rgba(34,197,94,0.06)", animationDelay: "0.05s", animationFillMode: "forwards" }}>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping-slow" />
              <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-emerald-500"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}>Open to opportunities</span>
            </div>

            {/* Name */}
            <h1 className={`font-display leading-[0.92] tracking-[-0.02em] mb-6 opacity-0 ${mount ? "animate-fade-up" : ""}`}
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(4rem,12vw,9rem)", color: "var(--fg)", animationDelay: "0.15s", animationFillMode: "forwards" }}>
              Mahadev<br /><em className="grad-text not-italic">Kumar</em>
            </h1>

            {/* Typewriter */}
            <div className={`flex items-center gap-2 mb-8 opacity-0 ${mount ? "animate-fade-up" : ""}`}
              style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}>
              <span className="font-mono text-sm" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "var(--fg3)" }}>~/</span>
              <span className="font-mono text-sm md:text-base min-w-[230px]"
                style={{ fontFamily: "'IBM Plex Mono', monospace", color: "var(--fg)" }}>
                {txt}<span className="animate-blink" style={{ color: "var(--accent)" }}>_</span>
              </span>
            </div>

            {/* Bio */}
            <p className={`text-lg max-w-xl leading-[1.8] mb-10 opacity-0 ${mount ? "animate-fade-up" : ""}`}
              style={{ color: "var(--fg2)", animationDelay: "0.45s", animationFillMode: "forwards" }}>
              I build fast, beautiful web apps and intelligent systems — full stack, from the pixel to the API to the model.
            </p>

            {/* CTAs */}
            <div className={`flex flex-wrap gap-4 mb-14 opacity-0 ${mount ? "animate-fade-up" : ""}`}
              style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}>
              <button onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="font-mono text-[11px] tracking-widest uppercase px-8 py-3.5 transition-all duration-200"
                style={{ fontFamily: "'IBM Plex Mono', monospace", background: "var(--fg)", color: "var(--bg)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "var(--accent)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "var(--fg)"; }}>
                View Projects
              </button>
              <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="font-mono text-[11px] tracking-widest uppercase px-8 py-3.5 border transition-all duration-200"
                style={{ fontFamily: "'IBM Plex Mono', monospace", borderColor: "var(--border)", color: "var(--fg)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--accent)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--accent)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--fg)"; }}>
                Get In Touch
              </button>
              <a href="https://drive.google.com/file/d/13vmP6K7SM7ObNtUgFnWEbi2vFCqwTJGj/view" className="font-mono text-[11px] tracking-widest uppercase px-8 py-3.5 border transition-all duration-200" target="_main"
                style={{ fontFamily: "'IBM Plex Mono', monospace", borderColor: "var(--border)", color: "var(--fg3)" }}>
                ↓ Resume
              </a>
            </div>

            {/* Stats */}
            <div className={`flex flex-wrap gap-10 opacity-0 ${mount ? "animate-fade-up" : ""}`}
              style={{ animationDelay: "0.75s", animationFillMode: "forwards" }}>
              {[["4+","Years Exp."],["30+","Projects"],["15+","Clients"],["5★","Avg. Rating"]].map(([n,l]) => (
                <div key={l}>
                  <div className="font-display text-3xl leading-none" style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--fg)" }}>{n}</div>
                  <div className="font-mono text-[10px] tracking-widest uppercase mt-1" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "var(--fg3)" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Floating skill cards */}
          <div className="hidden lg:flex flex-col gap-2.5 animate-float">
            {[
              { label: "React.js",   pct: "95%", dot: "#61DAFB" },
              { label: "Next.js",    pct: "92%", dot: "var(--fg)" },
              { label: "Node.js",    pct: "90%", dot: "#68A063" },
              { label: "Python / ML",pct: "80%", dot: "#3776AB" },
              { label: "C++",        pct: "78%", dot: "var(--accent)" },
            ].map(s => (
              <div key={s.label} className="px-4 py-3 border flex items-center gap-3 transition-all duration-300"
                style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: s.dot }} />
                <span className="font-mono text-[11px] flex-1" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "var(--fg)" }}>{s.label}</span>
                <span className="font-mono text-[10px]" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "var(--fg3)" }}>{s.pct}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="w-px h-10" style={{ background: "linear-gradient(to bottom, var(--fg3), transparent)" }} />
        <span className="font-mono text-[9px] tracking-widest uppercase" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "var(--fg3)" }}>scroll</span>
      </div>
    </section>
  );
}
