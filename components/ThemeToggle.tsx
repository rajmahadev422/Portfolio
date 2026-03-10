"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-[44px] h-[24px] rounded-full" style={{ background: "var(--bg3)", border: "1px solid var(--border)" }} />;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="theme-btn flex items-center"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
    >
      <span className="knob" />
      {/* Sun icon — light mode */}
      <span className={`absolute left-[4px] text-[10px] transition-opacity duration-300 ${isDark ? "opacity-0" : "opacity-70"}`}>
        ☀️
      </span>
      {/* Moon icon — dark mode */}
      <span className={`absolute right-[4px] text-[10px] transition-opacity duration-300 ${isDark ? "opacity-70" : "opacity-0"}`}>
        🌙
      </span>
    </button>
  );
}
