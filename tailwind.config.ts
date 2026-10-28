import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ziki: {
          bg: "#070c18",
          card: "#0d1527",
          cardHover: "#111b33",
          border: "#18243c",
          borderLight: "#203050",
          tableHeader: "#101a30",
          textMuted: "#7e8fa6",
          textDim: "#54657e",
          blue: "#2f68ee",
          blueLight: "#3b82f6",
          blueBadge: "#1e3a6d",
          blueBadgeText: "#70a6ff",
          green: "#10b981",
          greenBadge: "#064e3b",
          greenText: "#34d399",
          gold: "#eab308",
        },
      },
    },
  },
  plugins: [],
};
export default config;
