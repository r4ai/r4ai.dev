// @ts-check

/** @type {import("prettier").Options} */
export default {
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
