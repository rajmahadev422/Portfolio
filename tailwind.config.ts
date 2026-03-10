import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Cormorant Garamond'", "serif"],
        sans: ["'DM Sans'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
      colors: {
        // Light mode
        paper:   "#FAFAF8",
        paper2:  "#F2F1EE",
        paper3:  "#E8E6E1",
        ink:     "#111111",
        ink2:    "#444444",
        ink3:    "#888888",
        border:  "#E2E0DB",
        // Dark mode  
        void:    "#0C0C10",
        void2:   "#13131A",
        void3:   "#1C1C27",
        silver:  "#E2E2F0",
        silver2: "#9898B0",
        silver3: "#55556A",
        dborder: "rgba(255,255,255,0.08)",
        // Accent (same in both)
        accent:  "#E85D35",
        accent2: "#2563EB",
      },
      animation: {
        "fade-up":   "fadeUp 0.65s cubic-bezier(0.4,0,0.2,1) forwards",
        marquee:     "marquee 28s linear infinite",
        float:       "float 5s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        "ping-slow": "ping 2.5s cubic-bezier(0,0,0.2,1) infinite",
        blink:       "blink 1.1s step-end infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(22px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%":   { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%":     { transform: "translateY(-12px)" },
        },
        blink: {
          "0%,100%": { opacity: "1" },
          "50%":     { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
