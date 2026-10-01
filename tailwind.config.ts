import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--color-bg) / <alpha-value>)",
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        accent: {
          DEFAULT: "rgb(var(--color-accent) / <alpha-value>)",
          strong: "rgb(var(--color-accent-strong) / <alpha-value>)",
        },
      },
      opacity: {
        8: "0.08",
        72: "0.72",
        85: "0.85",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-source-sans)", "system-ui", "sans-serif"],
      },
      // Type scale from Figma: 18px base, ratio 1.333. h1 and h2 only reach their
      // Figma size (101.14px, 75.85px) at 1440px and shrink with the viewport below.
      fontSize: {
        caption: ["0.84375rem", { lineHeight: "1.25rem" }],
        button: ["1.0125rem", { lineHeight: "1.25rem" }],
        body: ["1.125rem", { lineHeight: "1.375rem" }],
        "body-loose": ["1.125rem", { lineHeight: "1.6875rem" }],
        lead: ["1.5rem", { lineHeight: "1.6875rem" }],
        h4: ["1.5rem", { lineHeight: "2.125rem" }],
        menu: ["2rem", { lineHeight: "2.5rem" }],
        index: ["2.5rem", { lineHeight: "3.5rem" }],
        h3: ["2.6667rem", { lineHeight: "3rem" }],
        numeral: ["3.5556rem", { lineHeight: "1" }],
        h2: ["clamp(3.25rem, 5.27vw, 4.7406rem)", { lineHeight: "1.055" }],
        h1: ["clamp(4.25rem, 7.03vw, 6.3213rem)", { lineHeight: "1.03" }],
      },
      spacing: {
        18: "4.5rem",
        26: "6.5rem",
        46: "11.5rem",
      },
      boxShadow: {
        card: "0 4px 6px rgb(29 29 27 / 0.08)",
        "card-hover": "0 20px 36px -10px rgb(var(--color-accent) / 0.22), 0 4px 10px rgb(var(--color-accent) / 0.08)",
        menu: "0 8px 24px rgb(29 29 27 / 0.12)",
      },
      maxWidth: {
        page: "1440px",
      },
    },
  },
  plugins: [],
};

export default config;
