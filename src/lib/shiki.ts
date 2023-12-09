import { getHighlighter } from "shikiji"

export const highlighter = await getHighlighter({
  themes: ["material-theme-darker", "github-light", "github-dark"],
  langs: ["markdown", "mdx"],
})
