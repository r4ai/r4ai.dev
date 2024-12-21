import type * as hast from "hast"
import type { ShikiTransformer } from "shiki"

import { parseMeta } from "../utils"

export const transformerLineNumbers = (): ShikiTransformer => {
  let startLine: undefined | number = undefined
  let currentLine: undefined | number = undefined

  return {
    code(hast) {
      const meta = parseMeta(this.options.meta?.__raw)
      if (!meta.showLineNumbers) return

      startLine = Number(meta.startLine ?? 1)
      currentLine = startLine

      this.addClassToHast(this.pre, "has-line-numbers")

      for (const line of hast.children) {
        if (
          line.type !== "element" ||
          (hasClass(line, "diff") && hasClass(line, "remove"))
        )
          continue

        line.properties["data-line"] = Math.max(startLine - 1, 0) + currentLine
        currentLine += 1
      }

      startLine = undefined
      currentLine = undefined
    },
  }
}

const hasClass = (hast: hast.Element, className: string) => {
  const classNames = hast.properties?.class
  if (!classNames) return false
  if (Array.isArray(classNames)) return classNames.includes(className)
  return classNames.toString() === className
}
