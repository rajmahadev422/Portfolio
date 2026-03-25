"use client";
import { useEffect, useRef, useState } from "react";

const PROJECTS = [
  {
    id: "01",
    title: "Campus",
    sub: "Management System",
    desc: "A comprehensive management platform designed to streamline campus operations. This project showcases a scalable MERN architecture, focusing on optimized frontend delivery and secure data handling.",
    type: "Full Stack",
    stack: ["React.js", "Node.js", "MongoDB", "Zustand", "Tailwindcss", "Render"],
    metrics: [
      { v: "15+", l: "Users" }
    ],
    live: "https://campus-hg1f.onrender.com/",
    github: "https://github.com/rajmahadev422/Campus.git",
  },
  {
    id: "02",
    title: "Laundary Mart",
    sub: "Laundry Service Management",
    desc: "Developed responsive web application for laundry service management using HTML5, CSS3, and JavaScript. Implemented mobile-first responsive design, interactive user interface, form validation, and image gallery integration. Organized modular code structure with semantic HTML5 markup for accessibility and SEO optimization.",
    type: "Frontend",
    stack: ["Html", "Css", "Javascript", "Email.js"],
    metrics: [
      { v: "20+", l: "Chart Types" },
      { v: "<50ms", l: "Latency" },
    ],
    live: "https://cosmic-cactus-b6eb0f.netlify.app/",
    github: "https://github.com/rajmahadev422/Laundary-Project.git",
  },
  {
    id: "03",
    title: "Vehicle Predictor",
    sub: "Vehicle Classification System",
    desc: "Engineered deep learning vehicle classification system using PyTorch CNN architecture. Built FastAPI server integrating pre-trained neural network model for real-time vehicle predictions. Developed responsive web interface with HTML/CSS for image upload and classification. Implemented complete ML pipeline from image preprocessing to model inference with production-ready deployment.",
    type: "ML",
    stack: ["Python", "PyTorch", "FastAPI", "Html", "CSS"],
    metrics: [
      { v: "98%", l: "Accuracy" },
    ],
    live: "https://github.com/rajmahadev422/Vehicle-Predictor.git",
    github: "https://github.com/rajmahadev422/Vehicle-Predictor.git",
  },
  {
    id: "04",
    title: "Learn-To-PR",
    sub: "Open Source Project",
    desc: "Learn-To-PR is an open-source web platform designed to help beginners start contributing to open source projects easily. The platform provides a structured environment with categorized issues, automated pull request labeling, and clear contribution guidelines to reduce the entry barrier for new developers.",
    type: "ML",
    stack: ["Github Action", "Html", "Css", "Javascript", "Github Pages"],
    metrics: [
      { v: "10+", l: "Fork" },
      { v: "50+", l: "Issues + Pull Request" },
    ],
    live: "https://github.com/rajmahadev422/Learn-To-PR/blob/main/.gitignore",
    github: "https://github.com/rajmahadev422/Learn-To-PR.git",
  },
  {
    id: "05",
    title: "Portfolio",
    sub: "My Portfolio",
    desc: "Portfolio",
    type: "Full Stack",
    stack: ["Next.js", "PostgresSQL", "Prisma", "Supabase", "Tailwindcss"],
    metrics: [
      { v: "2+", l: "Feedbacks/Day" },
    ],
    live: "https://portfolio-tau-three-ozpwygtbtt.vercel.app/",
    github: "https://github.com/rajmahadev422/Portfolio.git",
  },
];

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        }),
      { threshold: 0.08 },
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={ref}
      className="relative py-28 px-6 md:px-10 border-y"
      style={{ background: "var(--bg2)", borderColor: "var(--border)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="reveal flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p
              className="font-mono text-[10px] tracking-[0.18em] uppercase flex items-center gap-3 mb-4"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                color: "var(--accent)",
              }}
            >
              <span
                className="block w-7 h-px"
                style={{ background: "var(--accent)" }}
              />
              Selected Work
            </p>
            <h2
              className="font-display tracking-tight leading-[1.05]"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem,5vw,3.6rem)",
                color: "var(--fg)",
              }}
            >
              Projects &amp; <em className="grad-text not-italic">Work</em>
            </h2>
          </div>
         
        </div>

        <div className="grid lg:grid-cols-3 gap-4">
          {PROJECTS.map((p, i) => (
            <div
              key={p.id}
              className={`proj-card reveal border flex flex-col gap-4 p-6 group`}
              style={{
                background: "var(--card)",
                borderColor: "var(--border)",
                transitionDelay: `${i * 0.07}s`,
              }}
            >
              <div className="flex items-start justify-between">
                <span
                  className="font-mono text-[10px] px-2.5 py-1 border tracking-widest uppercase"
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    color: "blue",
                    borderColor: "blue"
                  }}
                >
                  {p.type}
                </span>
                <span
                  className="font-display text-5xl leading-none select-none"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    color: "color-mix(in srgb, var(--fg) 5%, transparent)",
                  }}
                >
                  {p.id}
                </span>
              </div>
              <div>
                <h3
                  className="font-display text-xl font-bold mb-1"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    color: "var(--fg)",
                    fontSize: "1.4rem",
                  }}
                >
                  {p.title}
                </h3>
                <p
                  className="font-mono text-[10px] tracking-wide"
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    color: "var(--fg3)",
                  }}
                >
                  {p.sub}
                </p>
              </div>
              <p
                className="text-sm leading-relaxed flex-1"
                style={{ color: "var(--fg2)" }}
              >
                {p.desc}
              </p>
              <div className="flex gap-5">
                {p.metrics.map((m) => (
                  <div key={m.l}>
                    <div
                      className="font-display text-xl font-bold"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        
                      }}
                    >
                      {m.v}
                    </div>
                    <div
                      className="font-mono text-[9px] tracking-widest uppercase"
                      style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        color: "var(--fg3)",
                      }}
                    >
                      {m.l}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {p.stack.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
              <div
                className="flex items-center justify-between pt-4 border-t"
                style={{ borderColor: "var(--border)" }}
              >
                <div className="flex gap-4">
                  <a
                    href={p.live}
                    className="font-mono text-[10px] transition-colors"
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      color: "var(--fg3)",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--accent)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--fg3)")
                    }
                    target="_main"
                  >
                    ↗ Live Demo
                  </a>
                  <a
                    href={p.github}
                    className="font-mono text-[10px] transition-colors"
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      color: "var(--fg3)",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--fg)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--fg3)")
                    }
                    target="_main"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="reveal mt-10 text-center">
          <a
            href="https://github.com/rajmahadev422?tab=repositories"
            className="inline-flex items-center gap-3 font-mono text-[11px] tracking-widest uppercase px-8 py-3.5 border transition-all duration-200"
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              borderColor: "var(--border)",
              color: "var(--fg3)",
            }}
            target="_blank"
          >
            All projects on GitHub →
          </a>
        </div>
      </div>
    </section>
  );
}
