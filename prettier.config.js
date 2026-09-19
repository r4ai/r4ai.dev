// @ts-check

/** @type {import("prettier").Options & { astroCompressHTML: boolean }} */
export default {
  // Match compressHTML in astro.config.ts to preserve rendered whitespace.
  astroCompressHTML: true,
  printWidth: 80,
  tabWidth: 2,
  plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
  semi: false,
  trailingComma: "es5",
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
}
