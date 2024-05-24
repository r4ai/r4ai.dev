// @ts-check

import gitignore from "eslint-config-flat-gitignore"
import eslint from "@eslint/js"
import tseslint from "typescript-eslint"
import solid from "eslint-plugin-solid/dist/configs/typescript.js"
import prettier from "eslint-config-prettier"
import globals from "globals"
import simpleImportSort from "eslint-plugin-simple-import-sort"

export default tseslint.config(
  gitignore(),
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx,mts,cts}"],
    rules: {
      "no-undef": "off",
    },
  },
  // @ts-expect-error eslint-plugin-solid's type is not compatible with eslint-plugin-typescript
  solid,
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },
  prettier,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
)
