import kobalte from "@kobalte/tailwindcss"
import type { Config } from "tailwindcss"

export default {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {},
  },
  plugins: [kobalte],
} satisfies Config
