import type * as mdast from "mdast"
import { type Plugin } from "unified"
import { visit } from "unist-util-visit"
import YAML from "yaml"

export const remarkHeader: Plugin<[], mdast.Root> = () => {
  return (tree) => {
    visit(tree, "yaml", (node, i, parent) => {
      if (i == null) return

      const yaml = node.value
      const frontmatter = YAML.parse(yaml)

      console.log(frontmatter)

      parent?.children.splice(i, 1, {
        type: "paragraph",
        children: [],
        data: {
          hName: "header",
          hProperties: frontmatter,
        },
      })
      i++ // Skip the generated paragraph
    })
  }
}
