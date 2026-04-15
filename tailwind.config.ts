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
        primary: {
          50: "#FFF0F3",
          100: "#FFD9E4",
          200: "#FFB3C9",
          300: "#F8BBD9",
          400: "#E91E63",
          500: "#C2185B",
          600: "#AD1457",
          700: "#880E4F",
          800: "#6A0F3B",
          900: "#4A0A2A",
        },
        accent: {
          50: "#FFF8F2",
          100: "#FFEDE3",
          200: "#FFDBC8",
          300: "#FFCCBC",
          400: "#FFB199",
          500: "#FF9676",
          600: "#E87A5C",
          700: "#CC5F42",
        },
        gold: {
          50: "#FFFAEF",
          100: "#FFF3D6",
          200: "#FFE4B0",
          300: "#F4C27F",
          400: "#E8A94F",
          500: "#D4912A",
          600: "#B87720",
        },
        plum: {
          DEFAULT: "#3E1A24",
          50: "#FDF5F7",
          100: "#F5E0E5",
          200: "#E5BDC7",
          300: "#C98D9E",
          400: "#A0687A",
          500: "#7A4A5E",
          600: "#5A3042",
          700: "#3E1A24",
        },
        ivory: "#FFF8F2",
        surface: "#FFFFFF",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      boxShadow: {
        glow: "0 0 20px -5px rgba(194, 24, 91, 0.3)",
        "glow-lg": "0 0 40px -10px rgba(194, 24, 91, 0.4)",
        "glow-gold": "0 0 30px -8px rgba(244, 194, 127, 0.5)",
        glass: "0 8px 32px rgba(62, 26, 36, 0.06)",
        "card-hover":
          "0 20px 40px -12px rgba(194, 24, 91, 0.15), 0 0 0 1px rgba(194, 24, 91, 0.06)",
        "card-soft": "0 4px 24px -4px rgba(62, 26, 36, 0.08)",
        premium:
          "0 25px 50px -12px rgba(62, 26, 36, 0.12), 0 0 0 1px rgba(248, 187, 217, 0.2)",
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "20px",
        "4xl": "28px",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-12px) rotate(3deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "gold-shimmer": {
          "0%": { backgroundPosition: "200% center" },
          "100%": { backgroundPosition: "-200% center" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        "slide-up": {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "bounce-gentle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 8s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        "gold-shimmer": "gold-shimmer 4s ease infinite",
        "pulse-soft": "pulse-soft 2s ease-in-out infinite",
        "slide-up": "slide-up 0.5s ease-out",
        "bounce-gentle": "bounce-gentle 2s ease-in-out infinite",
        "spin-slow": "spin-slow 12s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
