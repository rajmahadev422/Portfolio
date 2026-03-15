"use client";
export default function Footer() {
  const year = new Date().getFullYear();
  

  return (
    <footer className="border-t px-6 md:px-10 py-6" style={{ background:"var(--bg)", borderColor:"var(--border)" }}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-mono text-[10px] tracking-wide" style={{ fontFamily:"'IBM Plex Mono',monospace", color:"var(--fg3)" }}>
          © {year} Mahadev Kumar. All rights reserved.
        </div>
        <div className="font-mono text-[10px]" style={{ fontFamily:"'IBM Plex Mono',monospace", color:"var(--fg3)" }}>
          Built with{" "}
          <span style={{ color:"var(--accent)" }}>Next.js</span>
          {" · "}
          <span style={{ color:"var(--accent2)" }}>Tailwind CSS</span>
          {" · "}
          <span style={{ color:"var(--fg2)" }}>Prisma + PostgresSQL + Supabase</span>
        </div>
        <div className="font-mono text-[10px]" style={{ fontFamily:"'IBM Plex Mono',monospace", color:"var(--fg3)" }}>
          Designed &amp; coded with ♥
        </div>
      </div>
    </footer>
  );
}
