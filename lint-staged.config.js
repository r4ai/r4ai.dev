// @ts-check

/** @type {import("lint-staged").Configuration} */
export default {
  "*.{js,cjs,ts,jsx,tsx,astro}": ["eslint --fix", "prettier --write"],
  "*.{md,html,json,yaml,yml}": ["prettier --write"],
}
