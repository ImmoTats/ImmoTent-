import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0B1F1A",
        cream: "#F7F5F0",
        gold: "#C9A66B",
        sage: "#3D7068",
        sageLight: "#E7EFEC",
        goldLight: "#F6EEDD",
        line: "#E3DFD6",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        card: "0 2px 8px rgba(11,31,26,0.04), 0 12px 32px -12px rgba(11,31,26,0.10)",
        cardHover: "0 4px 16px rgba(11,31,26,0.06), 0 24px 48px -16px rgba(11,31,26,0.14)",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        countRing: {
          "0%": { strokeDashoffset: "var(--ring-full)" },
          "100%": { strokeDashoffset: "var(--ring-offset)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both",
        countRing: "countRing 1.4s cubic-bezier(0.22,1,0.36,1) forwards",
        shimmer: "shimmer 2.5s linear infinite",
        floatSlow: "floatSlow 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
