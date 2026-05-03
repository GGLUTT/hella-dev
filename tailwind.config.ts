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
        ink: {
          950: "#07070a",
          900: "#0b0b10",
          800: "#111118",
          700: "#1a1a24",
        },
      },
      backgroundImage: {
        "grid-fade":
          "radial-gradient(ellipse at top, rgba(255,255,255,0.08), transparent 60%)",
      },
    },
  },
  plugins: [],
};

export default config;
