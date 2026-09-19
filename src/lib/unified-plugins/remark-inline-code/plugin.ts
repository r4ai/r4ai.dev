import type { Root } from "mdast"
// Register remark-rehype's hName and other mdast data extensions.
import type {} from "remark-rehype"
import { type Plugin } from "unified"
import { visit } from "unist-util-visit"

export const remarkInlineCode: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, "inlineCode", (node) => {
      if (!node.data) node.data = {}
      node.data.hName = "inline-code"
    })
  }
}
