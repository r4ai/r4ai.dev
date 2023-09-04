import { getHighlighter } from "shiki";

export const highlighter = await getHighlighter({
  themes: ["github-light", "material-theme-darker"],
});
