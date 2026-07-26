// @ts-check

import eslint from "@eslint/js"
import gitignore from "eslint-config-flat-gitignore"
import eslintConfigPrettier from "eslint-config-prettier"
import eslintPluginAstro from "eslint-plugin-astro"
import simpleImportSort from "eslint-plugin-simple-import-sort"
import solid from "eslint-plugin-solid/configs/typescript"
import sonarjs from "eslint-plugin-sonarjs"
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
  ...eslintPluginAstro.configs["jsx-a11y-strict"],
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
      sonarjs,
    },
    rules: {
      complexity: ["error", 8],
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "sonarjs/cognitive-complexity": ["error", 8],
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
