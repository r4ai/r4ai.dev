import {
  defineConfig,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss"
import { theme } from "unocss/preset-wind"
import presetAnimations from "unocss-preset-animations"

export default defineConfig({
  presets: [
    presetUno({
      dark: {
        dark: '[data-color-scheme="dark"]',
        light: '[data-color-scheme="light"]',
      },
    }),
    presetAnimations(),
    presetIcons({
      collections: {
        lucide: () =>
          import("@iconify-json/lucide/icons.json").then((mod) => mod.default),
        // @ts-expect-error @iconify-json/simple-icons/icons.json is not typed?
        "simple-icons": () =>
          import("@iconify-json/simple-icons/icons.json").then(
            (mod) => mod.default,
          ),
        // @ts-expect-error why this type error happens???
        "fluent-emoji": () =>
          import("@iconify-json/fluent-emoji/icons.json").then(
            (mod) => mod.default,
          ),
      },
    }),
  ],
  transformers: [transformerVariantGroup(), transformerDirectives()],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
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
    },
    fontSize: {
      "4.5xl": "2.5rem",
    },
    fontFamily: {
      times: [
        "Times New Roman",
        "Times",
        theme.fontFamily?.["serif"] ?? "serif",
      ],
    },
    borderRadius: {
      lg: `var(--radius)`,
      md: `calc(var(--radius) - 2px)`,
      sm: "calc(var(--radius) - 4px)",
    },
    animation: {
      keyframes: {
        "accordion-down":
          "{ from { height: 0 } to { height: var(--kb-accordion-content-height) } }",
        "accordion-up":
          "{ from { height: var(--kb-accordion-content-height) } to { height: 0 } }",
        "collapsible-down":
          "{ from { height: 0 } to { height: var(--kb-collapsible-content-height) } }",
        "collapsible-up":
          "{ from { height: var(--kb-collapsible-content-height) } to { height: 0 } }",
      },
      timingFns: {
        "accordion-down": "ease-out",
        "accordion-up": "ease-out",
        "collapsible-down": "ease-out",
        "collapsible-up": "ease-out",
      },
      durations: {
        "accordion-down": "0.2s",
        "accordion-up": "0.2s",
        "collapsible-down": "0.2s",
        "collapsible-up": "0.2s",
      },
    },
  },
})
