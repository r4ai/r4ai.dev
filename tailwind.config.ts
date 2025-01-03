import containerQueries from "@tailwindcss/container-queries"
import type { Config } from "tailwindcss"
import defaultTheme from "tailwindcss/defaultTheme"
import animate from "tailwindcss-animate"

export default {
  darkMode: ["selector", "[data-color-scheme='dark']"],
  content: ["./src/**/*.{astro,js,jsx,ts,tsx,html,mdx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      minWidth: {
        "screen-sm": "640px",
        "screen-md": "768px",
        "screen-lg": "1024px",
        "screen-xl": "1280px",
        "screen-2xl": "1536px",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        stone: {
          1: "rgb(var(--stone-1) / <alpha-value>)",
          2: "rgb(var(--stone-2) / <alpha-value>)",
          3: "rgb(var(--stone-3) / <alpha-value>)",
          4: "rgb(var(--stone-4) / <alpha-value>)",
          5: "rgb(var(--stone-5) / <alpha-value>)",
          6: "rgb(var(--stone-6) / <alpha-value>)",
          7: "rgb(var(--stone-7) / <alpha-value>)",
          8: "rgb(var(--stone-8) / <alpha-value>)",
          9: "rgb(var(--stone-9) / <alpha-value>)",
          10: "rgb(var(--stone-10) / <alpha-value>)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        mono: ["UDEV Gothic LG", ...defaultTheme.fontFamily.mono],
        times: ["Times New Roman", "Times", "serif"],
      },
      fontSize: {
        "4.5xl": "2.5rem",
      },
      typography: {
        DEFAULT: {
          css: {
            "blockquote p:first-of-type::before": { content: "none" },
            "blockquote p:first-of-type::after": { content: "none" },
          },
        },
      },
    },
  },
  plugins: [animate, containerQueries],
} satisfies Config
