"use client";
import { useEffect, useRef } from "react";

const GROUPS = [
  { label: "Frontend", accent: "#E85D35", bars: [{ n: "React.js", p: 95 },{ n: "Next.js", p: 92 },{ n: "TypeScript", p: 88 },{ n: "Tailwind CSS", p: 90 }], tags: ["Redux","Zustand","Framer Motion","Shadcn UI","Vite","Storybook"] },
  { label: "Backend",  accent: "#2563EB", bars: [{ n: "Node.js / Express", p: 90 },{ n: "REST APIs", p: 92 },{ n: "GraphQL", p: 76 },{ n: "PostgreSQL / MongoDB", p: 82 }], tags: ["Redis","Prisma","Socket.io","JWT","Nginx","Docker"] },
  { label: "Languages",accent: "#059669", bars: [{ n: "JavaScript ES2024", p: 96 },{ n: "Python", p: 85 },{ n: "C++", p: 80 },{ n: "SQL", p: 83 }], tags: ["Algorithms","OOP","Functional","DSA","Competitive Prog"] },
  { label: "ML / AI",  accent: "#7C3AED", bars: [{ n: "NumPy / Pandas", p: 84 },{ n: "Scikit-learn", p: 77 },{ n: "TensorFlow / Keras", p: 68 },{ n: "NLP / HuggingFace", p: 71 }], tags: ["Jupyter","Matplotlib","OpenCV","FastAPI","Data Viz"] },
];

function Bar({ n, p, accent }: { n: string; p: number; accent: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && ref.current) ref.current.style.width = p + "%";
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current.parentElement!.parentElement!);
    return () => obs.disconnect();
  }, [p]);
  return (
    <div>
      <div className="flex justify-between mb-1.5">
        <span className="font-mono text-[11px]" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "var(--fg2)" }}>{n}</span>
        <span className="font-mono text-[11px]" style={{ fontFamily: "'IBM Plex Mono', monospace", color: accent }}>{p}%</span>
      </div>
      <div className="h-[2px] rounded-full overflow-hidden" style={{ background: "var(--bg3)" }}>
        <div ref={ref} className="skill-bar-fill" style={{ background: accent }} />
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }), { threshold: 0.1 });
    ref.current?.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" ref={ref} className="relative py-28 px-6 md:px-10"
      style={{ background: "var(--bg)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="reveal mb-14">
          <p className="font-mono text-[10px] tracking-[0.18em] uppercase flex items-center gap-3 mb-4"
            style={{ fontFamily: "'IBM Plex Mono', monospace", color: "var(--accent)" }}>
            <span className="block w-7 h-px" style={{ background: "var(--accent)" }} />Technical Expertise
          </p>
          <h2 className="font-display tracking-tight leading-[1.05]"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem,5vw,3.6rem)", color: "var(--fg)" }}>
            Skills &amp; <em className="grad-text not-italic">Technologies</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {GROUPS.map((g, gi) => (
            <div key={g.label} className="reveal p-7 border relative overflow-hidden transition-all duration-300"
              style={{ background: "var(--card)", borderColor: "var(--border)", transitionDelay: `${gi*0.09}s` }}>
              <div className="absolute top-0 left-0 right-0 h-[2.5px]" style={{ background: g.accent }} />
              <h3 className="font-mono text-[10px] tracking-[0.15em] uppercase mb-6"
                style={{ fontFamily: "'IBM Plex Mono', monospace", color: g.accent }}>{g.label}</h3>
              <div className="space-y-3.5 mb-6">
                {g.bars.map(b => <Bar key={b.n} n={b.n} p={b.p} accent={g.accent} />)}
              </div>
              <div className="flex flex-wrap gap-1.5 pt-5 border-t" style={{ borderColor: "var(--border)" }}>
                {g.tags.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>
          ))}
        </div>

        {/* Marquee */}
        <div className="reveal mt-14 overflow-hidden border-y py-4" style={{ borderColor: "var(--border)" }}>
          <div className="flex gap-10 animate-marquee whitespace-nowrap">
            {["React","Next.js","Node.js","TypeScript","Python","C++","Tailwind","PostgreSQL","MongoDB","Docker","AWS","GraphQL","TensorFlow","Prisma","Redis","Jest","Figma",
              "React","Next.js","Node.js","TypeScript","Python","C++","Tailwind","PostgreSQL","MongoDB","Docker","AWS","GraphQL","TensorFlow","Prisma","Redis","Jest","Figma"]
              .map((t, i) => (
                <span key={i} className="font-mono text-[10px] tracking-[0.15em] uppercase flex items-center gap-10"
                  style={{ fontFamily: "'IBM Plex Mono', monospace", color: "var(--fg3)" }}>
                  {t}<span style={{ color: "color-mix(in srgb, var(--accent) 40%, transparent)" }}>✦</span>
                </span>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
