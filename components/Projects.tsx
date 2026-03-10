"use client";
import { useEffect, useRef, useState } from "react";

const PROJECTS = [
  { id:"01", title:"SmartShop", sub:"AI-Powered E-Commerce", desc:"Full-stack e-commerce with a collaborative-filtering ML recommendation engine. Boosted engagement by 38%.", type:"Full Stack", tc:"#E85D35", stack:["Next.js","Node.js","PostgreSQL","Python","Scikit-learn","Docker"], metrics:[{v:"50k+",l:"Users"},{v:"+38%",l:"Engagement"}], featured:true, live:"#", github:"#" },
  { id:"02", title:"PulseBoard", sub:"Real-Time Analytics Dashboard", desc:"High-performance analytics UI with live WebSocket data, D3.js charts, and a custom design system.", type:"Frontend", tc:"#2563EB", stack:["React","TypeScript","D3.js","Socket.io"], metrics:[{v:"20+",l:"Chart Types"},{v:"<50ms",l:"Latency"}], featured:false, live:"#", github:"#" },
  { id:"03", title:"TaskFlow API", sub:"Project Management Backend", desc:"REST + GraphQL API with RBAC, rate limiting, and Slack/GitHub webhook integrations. 99.9% uptime.", type:"Backend", tc:"#059669", stack:["Node.js","GraphQL","MongoDB","Redis","Docker"], metrics:[{v:"80+",l:"Endpoints"},{v:"99.9%",l:"Uptime"}], featured:false, live:"#", github:"#" },
  { id:"04", title:"SentimentScope", sub:"NLP Review Analyzer", desc:"Fine-tuned BERT for multi-class sentiment analysis. Wrapped in a clean React dashboard. 91% accuracy.", type:"ML", tc:"#7C3AED", stack:["Python","HuggingFace","FastAPI","React"], metrics:[{v:"91%",l:"Accuracy"},{v:"200/s",l:"Reviews"}], featured:false, live:"#", github:"#" },
  { id:"05", title:"DevConnect", sub:"Developer Community Platform", desc:"Social platform with code sharing, live chat, job listings, and profile portfolios. Microservices on AWS.", type:"Full Stack", tc:"#E85D35", stack:["Next.js","Express","PostgreSQL","Socket.io","AWS S3"], metrics:[{v:"2k+",l:"Members"},{v:"300+",l:"Posts/Day"}], featured:false, live:"#", github:"#" },
];

const FILTERS = ["All","Full Stack","Frontend","Backend","ML"];

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState("All");
  useEffect(() => {
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }), { threshold: 0.08 });
    ref.current?.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  const visible = filter === "All" ? PROJECTS : PROJECTS.filter(p => p.type === filter);

  return (
    <section id="projects" ref={ref} className="relative py-28 px-6 md:px-10 border-y"
      style={{ background: "var(--bg2)", borderColor: "var(--border)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="reveal flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="font-mono text-[10px] tracking-[0.18em] uppercase flex items-center gap-3 mb-4"
              style={{ fontFamily: "'IBM Plex Mono', monospace", color: "var(--accent)" }}>
              <span className="block w-7 h-px" style={{ background: "var(--accent)" }} />Selected Work
            </p>
            <h2 className="font-display tracking-tight leading-[1.05]"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem,5vw,3.6rem)", color: "var(--fg)" }}>
              Projects &amp; <em className="grad-text not-italic">Work</em>
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {FILTERS.map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className="font-mono text-[10px] tracking-widest uppercase px-4 py-2 transition-all duration-200"
                style={{ fontFamily: "'IBM Plex Mono', monospace", background: filter===f ? "var(--fg)" : "transparent", color: filter===f ? "var(--bg)" : "var(--fg3)", border: `1px solid ${filter===f ? "var(--fg)" : "var(--border)"}` }}>
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-4">
          {visible.map((p, i) => (
            <div key={p.id} className={`proj-card reveal border flex flex-col gap-4 p-6 group ${p.featured ? "lg:col-span-2" : ""}`}
              style={{ background: "var(--card)", borderColor: "var(--border)", transitionDelay: `${i*0.07}s` }}>
              <div className="flex items-start justify-between">
                <span className="font-mono text-[10px] px-2.5 py-1 border tracking-widest uppercase"
                  style={{ fontFamily: "'IBM Plex Mono', monospace", color: p.tc, borderColor: p.tc+"40" }}>{p.type}</span>
                <span className="font-display text-5xl leading-none select-none" style={{ fontFamily: "'Cormorant Garamond', serif", color: "color-mix(in srgb, var(--fg) 5%, transparent)" }}>{p.id}</span>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--fg)", fontSize: "1.4rem" }}>{p.title}</h3>
                <p className="font-mono text-[10px] tracking-wide" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "var(--fg3)" }}>{p.sub}</p>
              </div>
              <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--fg2)" }}>{p.desc}</p>
              <div className="flex gap-5">
                {p.metrics.map(m => (
                  <div key={m.l}>
                    <div className="font-display text-xl font-bold" style={{ fontFamily: "'Cormorant Garamond', serif", color: p.tc }}>{m.v}</div>
                    <div className="font-mono text-[9px] tracking-widest uppercase" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "var(--fg3)" }}>{m.l}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {p.stack.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
              <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: "var(--border)" }}>
                <div className="flex gap-4">
                  <a href={p.live} className="font-mono text-[10px] transition-colors" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "var(--fg3)" }}
                    onMouseEnter={e => (e.currentTarget.style.color="var(--accent)")} onMouseLeave={e => (e.currentTarget.style.color="var(--fg3)")}>↗ Live Demo</a>
                  <a href={p.github} className="font-mono text-[10px] transition-colors" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "var(--fg3)" }}
                    onMouseEnter={e => (e.currentTarget.style.color="var(--fg)")} onMouseLeave={e => (e.currentTarget.style.color="var(--fg3)")}>GitHub</a>
                </div>
                <span className="text-lg group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" style={{ color: "var(--accent)" }}>↗</span>
              </div>
            </div>
          ))}
        </div>
        <div className="reveal mt-10 text-center">
          <a href="https://github.com/rajmahadev422?tab=repositories" className="inline-flex items-center gap-3 font-mono text-[11px] tracking-widest uppercase px-8 py-3.5 border transition-all duration-200"
            style={{ fontFamily: "'IBM Plex Mono', monospace", borderColor: "var(--border)", color: "var(--fg3)" }}>
            All projects on GitHub →
          </a>
        </div>
      </div>
    </section>
  );
}
