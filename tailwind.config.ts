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
        brand: {
          teal: "#1F2A3D",
          offwhite: "#FAF7F2",
          blush: "#F4B6C2",
          lavender: "#E89BAE",
          rose: "#E5879B",
          mustard: "#E89BAE",
        },
        primary: {
          50: "#FAF7F2",
          100: "#EFE4E6",
          200: "#F4B6C2",
          300: "#E89BAE",
          400: "#E5879B",
          500: "#1F2A3D",
          600: "#1A2434",
          700: "#151D2C",
          800: "#101724",
          900: "#0C111B",
        },
        accent: {
          50: "#FFF8FA",
          100: "#FDEEF1",
          200: "#FBDCE3",
          300: "#F4B6C2",
          400: "#EEA7B7",
          500: "#E89BAE",
          600: "#E5879B",
          700: "#D36E84",
        },
        gold: {
          50: "#FFF8FA",
          100: "#FDEEF1",
          200: "#FBDCE3",
          300: "#F4B6C2",
          400: "#E89BAE",
          500: "#E5879B",
          600: "#D36E84",
        },
        plum: {
          DEFAULT: "#1F2A3D",
          50: "#FAF7F2",
          100: "#EFE4E6",
          200: "#D6DCE3",
          300: "#A8B0BC",
          400: "#6B7280",
          500: "#4C5563",
          600: "#374151",
          700: "#1F2A3D",
        },
        success: {
          50: "#EDF4EB",
          100: "#D7E7D3",
          500: "#A7C4A0",
          600: "#8FAE88",
        },
        ivory: "#FAF7F2",
        surface: "#FFFFFF",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-poppins)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      boxShadow: {
        glow: "0 0 20px -5px rgba(232, 155, 174, 0.35)",
        "glow-lg": "0 0 40px -10px rgba(232, 155, 174, 0.45)",
        "glow-gold": "0 0 30px -8px rgba(232, 155, 174, 0.4)",
        glass: "0 8px 32px rgba(31, 42, 61, 0.08)",
        "card-hover":
          "0 20px 40px -12px rgba(31, 42, 61, 0.14), 0 0 0 1px rgba(232, 155, 174, 0.18)",
        "card-soft": "0 4px 24px -4px rgba(31, 42, 61, 0.08)",
        premium:
          "0 25px 50px -12px rgba(31, 42, 61, 0.12), 0 0 0 1px rgba(232, 155, 174, 0.22)",
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
