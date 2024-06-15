import type { Root } from "hast"
import { type Plugin } from "unified"
import { visit } from "unist-util-visit"

export const rehypeFootnote: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, "element", (node, i, parent) => {
      const isFootnoteSection =
        i != null &&
        node.tagName === "section" &&
        typeof node.properties?.className !== "number" &&
        typeof node.properties?.className !== "boolean" &&
        node.properties?.className?.includes("footnotes")
      if (!isFootnoteSection) return

      parent?.children.splice(i, node.children.length, ...node.children)
    })
  }
}
