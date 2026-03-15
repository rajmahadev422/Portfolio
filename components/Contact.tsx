"use client";
import { useEffect, useRef, useState } from "react";

type Form = { name: string; email: string; subject: string; message: string };
type Touched = { [K in keyof Form]: boolean };

const EMOJIS = [
  { e: "🚀", label: "Excited" },
  { e: "💡", label: "Great idea" },
  { e: "🤝", label: "Collaborate" },
  { e: "❤️", label: "Love it" },
  { e: "⚡", label: "Urgent" },
];

const SOCIALS = [
  { label: "GitHub",     handle: "rajmahadev422",  href: "https://github.com/rajmahadev422/rajmahadev422/blob/2cc15ad1a624d2dd7a14030a17990bc9e478a39c/README.md", icon: "⟨/⟩" },
  { label: "LinkedIn",   handle: "Mahadev Kumar",       href: "https://www.linkedin.com/in/mahadev-kumar-15b2ba320", icon: "in"   }
];

const AVAILABILITY = [
  { label: "Freelance Projects",  open: true  },
  { label: "Full-Time Roles",     open: true  },
  { label: "Open Source Collab",  open: true  },
  { label: "Technical Mentoring", open: false },
];

function validate(f: Form) {
  const e: Partial<Form> = {};
  if (!f.name.trim())                                        e.name    = "Name is required";
  if (!f.email.trim() || !/^[^@]+@[^@]+\.[^@]+$/.test(f.email)) e.email = "Valid email required";
  if (!f.subject.trim())                                     e.subject = "Subject is required";
  if (f.message.trim().length < 20)                          e.message = "At least 20 characters";
  return e;
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [form,    setForm]    = useState<Form>({ name:"", email:"", subject:"", message:"" });
  const [touched, setTouched] = useState<Touched>({ name:false, email:false, subject:false, message:false });
  const [emoji,   setEmoji]   = useState<string>("");
  const [rating,  setRating]  = useState<number>(0);
  const [hover,   setHover]   = useState<number>(0);
  const [status,  setStatus]  = useState<"idle"|"sending"|"sent"|"error">("idle");
  const [copied,  setCopied]  = useState(false);
  const [errMsg,  setErrMsg]  = useState("");
  const MAX = 500;

  useEffect(() => {
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }), { threshold: 0.1 });
    sectionRef.current?.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const errors = validate(form);
  const isValid = Object.keys(errors).length === 0;
  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => setForm(p => ({...p,[k]:e.target.value}));
  const blur = (k: keyof Touched) => () => setTouched(p => ({...p,[k]:true}));

  const submit = async () => {
    setTouched({ name:true, email:true, subject:true, message:true });
    if (!isValid) return;
    setStatus("sending"); setErrMsg("");
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, emoji: emoji||null, rating: rating||null }),
      });
      const data = await res.json();
      if (!res.ok) { setErrMsg(data.error || "Something went wrong."); setStatus("error"); return; }
      setStatus("sent");
    } catch {
      setErrMsg("Network error. Please try again."); setStatus("error");
    } finally {
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const reset = () => {
    setForm({ name:"", email:"", subject:"", message:"" });
    setTouched({ name:false, email:false, subject:false, message:false });
    setEmoji(""); setRating(0); setStatus("idle"); setErrMsg("");
  };

  const copy = () => { navigator.clipboard.writeText("rajmahadev422@gmail.com"); setCopied(true); setTimeout(()=>setCopied(false),2200); };

  return (
    <section id="contact" ref={sectionRef} className="relative py-28 px-6 md:px-10 border-t overflow-hidden"
      style={{ background: "var(--bg2)", borderColor: "var(--border)" }}>
      {/* Decorative grid lines */}
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.03 }}>
        {Array.from({length:9}).map((_,i)=><div key={i} className="absolute top-0 bottom-0 w-px" style={{ left:`${11.11*(i+1)}%`, background:"var(--fg)" }} />)}
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="reveal mb-14">
          <p className="font-mono text-[10px] tracking-[0.18em] uppercase flex items-center gap-3 mb-4"
            style={{ fontFamily:"'IBM Plex Mono',monospace", color:"var(--accent)" }}>
            <span className="block w-7 h-px" style={{ background:"var(--accent)" }} />Get In Touch
          </p>
          <h2 className="font-display tracking-tight leading-[1.05]"
            style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(2rem,5vw,3.6rem)", color:"var(--fg)" }}>
            Let&apos;s build something <em className="grad-text not-italic">remarkable</em>
          </h2>
        </div>

        <div className="grid lg:grid-cols-[1fr_400px] gap-10 items-start">

          {/* ── FORM ── */}
          <div className="reveal border p-8 md:p-10" style={{ background:"var(--card)", borderColor:"var(--border)" }}>
            {status === "sent" ? (
              <div className="text-center py-14">
                <div className="text-6xl mb-5 animate-float">🎉</div>
                <h3 className="font-display text-2xl mb-3" style={{ fontFamily:"'Cormorant Garamond',serif", color:"var(--fg)" }}>
                  Message Saved!
                </h3>
                <p className="text-sm leading-relaxed mb-2" style={{ color:"var(--fg2)" }}>
                  Thanks <strong style={{ color:"var(--fg)" }}>{form.name}</strong>! Your feedback has been stored in the database.
                </p>
                <p className="font-mono text-[11px] mb-8" style={{ fontFamily:"'IBM Plex Mono',monospace", color:"var(--fg3)" }}>
                  I&apos;ll reply within 24 hours ✓
                </p>
                <button onClick={reset} className="font-mono text-[11px] tracking-widest uppercase px-6 py-3 border transition-all duration-200"
                  style={{ fontFamily:"'IBM Plex Mono',monospace", borderColor:"var(--fg)", color:"var(--fg)" }}>
                  Send Another
                </button>
              </div>
            ) : (
              <>
                <h3 className="font-display text-xl mb-8" style={{ fontFamily:"'Cormorant Garamond',serif", color:"var(--fg)" }}>
                  Send a message
                </h3>

                <div className="space-y-6">
                  {/* Name + Email */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    {(["name","email"] as const).map(k => (
                      <div key={k}>
                        <label className="font-mono text-[9px] tracking-widest uppercase block mb-2"
                          style={{ fontFamily:"'IBM Plex Mono',monospace", color:"var(--fg3)" }}>
                          {k==="name"?"Your Name *":"Email Address *"}
                        </label>
                        <input type={k==="email"?"email":"text"} value={form[k]} onChange={set(k)} onBlur={blur(k)}
                          placeholder={k==="name"?"John Doe":"john@example.com"} className="c-input" />
                        {touched[k] && errors[k] && (
                          <p className="font-mono text-[9px] text-red-500 mt-1" style={{ fontFamily:"'IBM Plex Mono',monospace" }}>⚠ {errors[k]}</p>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="font-mono text-[9px] tracking-widest uppercase block mb-2"
                      style={{ fontFamily:"'IBM Plex Mono',monospace", color:"var(--fg3)" }}>Subject *</label>
                    <input type="text" value={form.subject} onChange={set("subject")} onBlur={blur("subject")}
                      placeholder="Let's work together on..." className="c-input" />
                    {touched.subject && errors.subject && (
                      <p className="font-mono text-[9px] text-red-500 mt-1" style={{ fontFamily:"'IBM Plex Mono',monospace" }}>⚠ {errors.subject}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="font-mono text-[9px] tracking-widest uppercase"
                        style={{ fontFamily:"'IBM Plex Mono',monospace", color:"var(--fg3)" }}>Message *</label>
                      <span className="font-mono text-[9px]"
                        style={{ fontFamily:"'IBM Plex Mono',monospace", color: form.message.length > MAX*0.85 ? "var(--accent)" : "var(--fg3)" }}>
                        {form.message.length}/{MAX}
                      </span>
                    </div>
                    <textarea value={form.message} onChange={set("message")} onBlur={blur("message")}
                      maxLength={MAX} rows={5} placeholder="Tell me about your project, goals, timeline..."
                      className="c-input resize-none leading-relaxed" />
                    {touched.message && errors.message && (
                      <p className="font-mono text-[9px] text-red-500 mt-1" style={{ fontFamily:"'IBM Plex Mono',monospace" }}>⚠ {errors.message}</p>
                    )}
                  </div>

                  {/* Star Rating */}
                  <div>
                    <label className="font-mono text-[9px] tracking-widest uppercase block mb-3"
                      style={{ fontFamily:"'IBM Plex Mono',monospace", color:"var(--fg3)" }}>
                      Rate This Portfolio (optional)
                    </label>
                    <div className="flex gap-2 items-center">
                      {[1,2,3,4,5].map(s => (
                        <button key={s} type="button" className="star"
                          onMouseEnter={() => setHover(s)} onMouseLeave={() => setHover(0)}
                          onClick={() => setRating(rating===s ? 0 : s)}
                          style={{ color: s <= (hover||rating) ? "#FBBF24" : "var(--fg3)" }}>
                          ★
                        </button>
                      ))}
                      {rating > 0 && (
                        <span className="font-mono text-[10px] ml-2" style={{ fontFamily:"'IBM Plex Mono',monospace", color:"var(--fg3)" }}>
                          {["","Poor","Fair","Good","Great","Excellent!"][rating]}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Emoji Reaction */}
                  <div>
                    <label className="font-mono text-[9px] tracking-widest uppercase block mb-3"
                      style={{ fontFamily:"'IBM Plex Mono',monospace", color:"var(--fg3)" }}>
                      How are you feeling? (optional)
                    </label>
                    <div className="flex gap-3 flex-wrap">
                      {EMOJIS.map(({ e, label }) => (
                        <button key={e} type="button"
                          onClick={() => setEmoji(emoji===e ? "" : e)}
                          title={label}
                          className="flex flex-col items-center gap-1 px-3 py-2 border text-xl transition-all duration-150 hover:scale-110"
                          style={{ borderColor: emoji===e ? "var(--accent)" : "var(--border)", background: emoji===e ? "color-mix(in srgb, var(--accent) 10%, transparent)" : "transparent" }}>
                          {e}
                          <span className="font-mono text-[8px]" style={{ fontFamily:"'IBM Plex Mono',monospace", color:"var(--fg3)", fontSize:"8px" }}>{label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Error banner */}
                  {status === "error" && errMsg && (
                    <div className="p-3 border border-red-300 bg-red-50 dark:bg-red-950/30 dark:border-red-800">
                      <p className="font-mono text-[10px] text-red-600 dark:text-red-400" style={{ fontFamily:"'IBM Plex Mono',monospace" }}>
                        ⚠ {errMsg}
                      </p>
                    </div>
                  )}

                  {/* Submit */}
                  <button type="button" onClick={submit} disabled={status==="sending"}
                    className="w-full font-mono text-[11px] tracking-widest uppercase py-4 flex items-center justify-center gap-3 transition-all duration-200"
                    style={{ fontFamily:"'IBM Plex Mono',monospace",
                      background: status==="sending" ? "var(--fg3)" : isValid ? "var(--fg)" : "var(--bg3)",
                      color: status==="sending" || isValid ? "var(--bg)" : "var(--fg3)",
                      cursor: status==="sending" ? "wait" : "none" }}
                    onMouseEnter={e => { if(status!=="sending" && isValid) (e.currentTarget as HTMLButtonElement).style.background="var(--accent)"; }}
                    onMouseLeave={e => { if(status!=="sending" && isValid) (e.currentTarget as HTMLButtonElement).style.background="var(--fg)"; }}>
                    {status === "sending" ? (
                      <>
                        <span className="inline-block w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Saving to database...
                      </>
                    ) : "Send Message →"}
                  </button>

                  <p className="font-mono text-[9px] text-center" style={{ fontFamily:"'IBM Plex Mono',monospace", color:"var(--fg3)" }}>
                    Your message is stored securely in our database.
                  </p>
                </div>
              </>
            )}
          </div>

          {/* ── RIGHT PANEL ── */}
          <div className="space-y-4 reveal" style={{ transitionDelay:"0.1s" }}>

            {/* Email copy */}
            <div className="border p-5" style={{ background:"var(--card)", borderColor:"var(--border)" }}>
              <p className="font-mono text-[9px] tracking-widest uppercase mb-3"
                style={{ fontFamily:"'IBM Plex Mono',monospace", color:"var(--fg3)" }}>Direct Email</p>
              <button onClick={copy} className="w-full flex items-center justify-between gap-3 group py-1">
                <span className="font-mono text-sm group-hover:text-[var(--accent)] transition-colors"
                  style={{ fontFamily:"'IBM Plex Mono',monospace", color:"var(--fg)" }}>
                  rajmahadev422@gmail.com
                </span>
                <span className="font-mono text-[9px] transition-colors shrink-0"
                  style={{ fontFamily:"'IBM Plex Mono',monospace", color: copied ? "var(--accent)" : "var(--fg3)" }}>
                  {copied ? "✓ Copied!" : "⧉ Copy"}
                </span>
              </button>
            </div>
            
            {/* Availability */}
            <div className="border p-5" style={{ background:"var(--card)", borderColor:"var(--border)" }}>
              <p className="font-mono text-[9px] tracking-widest uppercase mb-4"
                style={{ fontFamily:"'IBM Plex Mono',monospace", color:"var(--fg3)" }}>Availability</p>
              <div className="space-y-3">
                {AVAILABILITY.map(a => (
                  <div key={a.label} className="flex items-center justify-between">
                    <span className="text-sm" style={{ color:"var(--fg2)" }}>{a.label}</span>
                    <span className="font-mono text-[9px] tracking-wide px-2.5 py-1 border"
                      style={{ fontFamily:"'IBM Plex Mono',monospace",
                        color: a.open ? "#059669" : "var(--fg3)",
                        borderColor: a.open ? "rgba(5,150,105,0.3)" : "var(--border)",
                        background: a.open ? "rgba(5,150,105,0.07)" : "transparent" }}>
                      {a.open ? "✓ Open" : "✗ Closed"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Response time */}
            <div className="border p-4 flex items-start gap-3"
              style={{ borderColor:"var(--border)", background:"var(--card)" }}>
              <span className="text-lg mt-0.5">⏱</span>
              <div>
                <p className="font-mono text-[9px] tracking-widest uppercase mb-1"
                  style={{ fontFamily:"'IBM Plex Mono',monospace", color:"var(--accent)" }}>Response Time</p>
                <p className="text-sm leading-relaxed" style={{ color:"var(--fg2)" }}>
                  Typically within <strong style={{ color:"var(--fg)" }}>24 hours</strong> on weekdays.
                </p>
              </div>
            </div>

            {/* Socials */}
            <div className="border p-5" style={{ background:"var(--card)", borderColor:"var(--border)" }}>
              <p className="font-mono text-[9px] tracking-widest uppercase mb-4"
                style={{ fontFamily:"'IBM Plex Mono',monospace", color:"var(--fg3)" }}>Find Me Online</p>
              <div className="space-y-3">
                {SOCIALS.map(s => (
                  <a key={s.label} href={s.href} className="flex items-center gap-3 group py-1.5 border-b last:border-0"
                    style={{ borderColor:"var(--border)" }}>
                    <span className="font-mono text-sm w-8 text-center transition-colors group-hover:text-[var(--accent)]"
                      style={{ fontFamily:"'IBM Plex Mono',monospace", color:"var(--fg3)" }}>{s.icon}</span>
                    <div className="flex-1">
                      <div className="font-mono text-[9px] tracking-widest uppercase" style={{ fontFamily:"'IBM Plex Mono',monospace", color:"var(--fg3)" }}>{s.label}</div>
                      <div className="font-mono text-xs transition-colors group-hover:text-[var(--accent)]"
                        style={{ fontFamily:"'IBM Plex Mono',monospace", color:"var(--fg)" }}>{s.handle}</div>
                    </div>
                    <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-sm" style={{ color:"var(--fg3)" }}>↗</span>
                  </a>
                ))}
              </div>
            </div>

            <a href="https://drive.google.com/file/d/13vmP6K7SM7ObNtUgFnWEbi2vFCqwTJGj/view?usp=drive_link" className="block text-center font-mono text-[11px] tracking-widest uppercase py-3.5 border transition-all duration-200"
              style={{ fontFamily:"'IBM Plex Mono',monospace", borderColor:"var(--fg)", color:"var(--fg)" }}
              onMouseEnter={e=>{(e.currentTarget as HTMLAnchorElement).style.background="var(--fg)";(e.currentTarget as HTMLAnchorElement).style.color="var(--bg)";}}
              onMouseLeave={e=>{(e.currentTarget as HTMLAnchorElement).style.background="transparent";(e.currentTarget as HTMLAnchorElement).style.color="var(--fg)";}}>
              ↓ Download Resume (PDF)
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
