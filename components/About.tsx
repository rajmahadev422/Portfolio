"use client";
import { useEffect, useRef } from "react";

const CARDS = [
  { icon: "⚡", title: "Performance First", desc: "Core Web Vitals, optimal bundles, and smooth 60fps UX on every device.", color: "#E85D35" },
  { icon: "🧠", title: "ML-Integrated Apps", desc: "Bridging web dev with machine learning — recommendations, NLP, and smart features in production.", color: "#2563EB" },
  { icon: "🔐", title: "Security & Quality", desc: "Clean, tested, documented code that teams are proud to maintain.", color: "#059669" },
  { icon: "🚀", title: "Ship Fast, Ship Right", desc: "Concept to deployment — full lifecycle ownership, on time without cutting corners.", color: "#7C3AED" },
];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }), { threshold: 0.1 });
    ref.current?.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" ref={ref} className="relative py-28 px-6 md:px-10 border-y"
      style={{ background: "var(--bg2)", borderColor: "var(--border)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="reveal">
            <p className="font-mono text-[10px] tracking-[0.18em] uppercase flex items-center gap-3 mb-4"
              style={{ fontFamily: "'IBM Plex Mono', monospace", color: "var(--accent)" }}>
              <span className="block w-7 h-px" style={{ background: "var(--accent)" }} />About Me
            </p>
            <h2 className="font-display tracking-tight leading-[1.05] mb-8"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem,5vw,3.6rem)", color: "var(--fg)" }}>
              Crafting web <em className="grad-text not-italic">experiences</em><br />that matter
            </h2>
            <div className="space-y-4" style={{ color: "var(--fg2)", lineHeight: 1.85, fontSize: "0.95rem" }}>
              <p>I&apos;m a <strong style={{ color: "var(--fg)" }}>Full-Stack Web Developer</strong> with deep expertise in React, Next.js, and Node.js — building scalable, accessible products that solve real problems.</p>
              <p>Alongside core web work, I bring hands-on <strong style={{ color: "var(--fg)" }}>Machine Learning knowledge</strong> to production — recommendation engines, NLP pipelines, and data-driven features.</p>
              <p>Fluent in <strong style={{ color: "var(--fg)" }}>C++, Python, and JavaScript</strong>. My competitive programming roots give me a sharp algorithmic edge on hard problems.</p>
            </div>
            <div className="flex flex-wrap gap-3 mt-8">
              {[["Based in","Bihar, India"],["Timezone","IST (UTC+5:30)"],["Education","B.Tech, IIT Dhanbad"]].map(([l,v]) => (
                <div key={l} className="px-4 py-3 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                  <div className="font-mono text-[9px] tracking-widest uppercase mb-1" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "var(--fg3)" }}>{l}</div>
                  <div className="font-mono text-xs" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "var(--fg)" }}>{v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {CARDS.map((c, i) => (
              <div key={c.title} className="reveal p-5 border relative overflow-hidden group transition-all duration-300"
                style={{ background: "var(--card)", borderColor: "var(--border)", transitionDelay: `${i*0.09}s` }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = c.color + "60"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}>
                <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: c.color }} />
                <div className="text-2xl mb-3 group-hover:scale-110 transition-transform inline-block">{c.icon}</div>
                <h3 className="font-semibold text-sm mb-2" style={{ color: "var(--fg)" }}>{c.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--fg3)" }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
