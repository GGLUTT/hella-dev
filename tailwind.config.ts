import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
        display: ["var(--font-unbounded)", "ui-sans-serif", "system-ui"],
      },
      colors: {
        black: "rgb(var(--color-bg-black) / <alpha-value>)",
        white: "rgb(var(--color-text-white) / <alpha-value>)",
        zinc: {
          50: "rgb(var(--color-zinc-50) / <alpha-value>)",
          100: "rgb(var(--color-zinc-100) / <alpha-value>)",
          200: "rgb(var(--color-zinc-200) / <alpha-value>)",
          300: "rgb(var(--color-zinc-300) / <alpha-value>)",
          400: "rgb(var(--color-zinc-400) / <alpha-value>)",
          500: "rgb(var(--color-zinc-500) / <alpha-value>)",
          600: "rgb(var(--color-zinc-600) / <alpha-value>)",
          700: "rgb(var(--color-zinc-700) / <alpha-value>)",
          800: "rgb(var(--color-zinc-800) / <alpha-value>)",
          900: "rgb(var(--color-zinc-900) / <alpha-value>)",
          950: "rgb(var(--color-zinc-950) / <alpha-value>)",
        },
        ink: {
          950: "rgb(var(--color-ink-950) / <alpha-value>)",
          900: "rgb(var(--color-ink-900) / <alpha-value>)",
          800: "rgb(var(--color-ink-800) / <alpha-value>)",
          700: "rgb(var(--color-ink-700) / <alpha-value>)",
        },
      },
      backgroundImage: {
        "grid-fade":
          "radial-gradient(ellipse at top, rgb(var(--color-text-white) / 0.08), transparent 60%)",
      },
    },
  },
  plugins: [],
};

export default config;
