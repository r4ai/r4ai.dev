import { getHighlighter, bundledLanguages } from "shiki"

export const highlighter = await getHighlighter({
  themes: [
    "material-theme-darker",
    "github-light",
    "github-dark",
    "one-dark-pro",
  ],
  langs: Object.keys(bundledLanguages),
})
