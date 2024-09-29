// @ts-check

import eslint from "@eslint/js"
import gitignore from "eslint-config-flat-gitignore"
import eslintConfigPrettier from "eslint-config-prettier"
import eslintPluginAstro from "eslint-plugin-astro"
import simpleImportSort from "eslint-plugin-simple-import-sort"
import solid from "eslint-plugin-solid/configs/typescript"
import globals from "globals"
import tsEslint from "typescript-eslint"

export default tsEslint.config(
  gitignore(),
  eslint.configs.recommended,
  ...tsEslint.configs.recommended,
  {
    files: ["**/*.stories.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-unsafe-assignment": "off",
    },
  },
  solid,
  ...eslintPluginAstro.configs.recommended,
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },
  eslintConfigPrettier,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  }
)
