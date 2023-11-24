import { type Plugin } from "unified"
import type { Root } from "mdast"
import { visit } from "unist-util-visit"

// eslint-disable-next-line @typescript-eslint/ban-types
export const remarkMeta: Plugin<[{}?], Root> = () => {
  return (tree) => {
    visit(tree, "code", (node) => {
      node.data = {
        ...node.data,
        hProperties: {
          ...node.data?.hProperties,
          meta: node.meta,
        },
      }
    })
  }
}
