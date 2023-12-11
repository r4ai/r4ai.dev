// @ts-check
const { defineConfig } = require("eslint-define-config")

module.exports = defineConfig({
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:astro/recommended",
    "prettier",
  ],
  env: {
    browser: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "no-undef": "off",
  },
  plugins: ["@typescript-eslint"],
  ignorePatterns: ["node_modules", "dist"],
  overrides: [
    {
      // Define the configuration for `.astro` file.
      files: ["*.astro"],
      // Allows Astro components to be parsed.
      parser: "astro-eslint-parser",
      // Parse the script in `.astro` as TypeScript by adding the following configuration.
      // It's the setting you need when using TypeScript.
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
      rules: {
        // override/add rules settings here, such as:
        // "astro/no-set-html-directive": "error"
      },
    },
    {
      files: "*.cjs",
      rules: {
        "@typescript-eslint/no-var-requires": "off",
      },
    },
  ],
})
