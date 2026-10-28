/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ziki: {
          bg: "#060b17",
          card: "#0d1527",
          cardHover: "#111b33",
          border: "#172338",
          borderLight: "#1f3050",
          tableHeader: "#0f182c",
          textMuted: "#8899b0",
          textDim: "#54657e",
          blue: "#2f68ee",
          blueLight: "#3b82f6",
          blueBadge: "#152e5a",
          blueBadgeText: "#70a6ff",
          green: "#10b981",
          greenBadge: "#064e3b",
          greenText: "#34d399",
          gold: "#eab308",
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
