import type { Element, ElementContent, Text } from "hast"
import type { ShikiTransformer } from "shiki"

import { parseMeta } from "../utils"

const isElement = (node: ElementContent): node is Element =>
  node.type === "element" && node.children.length > 0

const isText = (node: ElementContent): node is Text => node.type === "text"

type Line = Omit<Element, "children"> & { children: Element[] }

type DiffMarker = "+" | "-"

const getFirstText = (element: Element | undefined): Text | undefined => {
  const firstChild = element?.children[0]
  return firstChild && isText(firstChild) ? firstChild : undefined
}

const isLine = (node: ElementContent): node is Line => {
  if (!isElement(node)) return false
  return (
    node.children.every(isElement) && getFirstText(node.children[0]) != null
  )
}

const getLineText = (line: Line) =>
  line.children
    .flatMap(({ children }) => children)
    .filter(isText)
    .map(({ value }) => value)
    .join("")

const getDiffMarker = (value: string): DiffMarker | undefined => {
  const firstChar = value.trim()[0]
  return firstChar === "+" || firstChar === "-" ? firstChar : undefined
}

const getDiffIndentSize = (hast: Element) => {
  const firstLine = hast.children.find(isLine)
  if (!firstLine) return 0

  const text = getLineText(firstLine)
  const hasMarker = text.startsWith("+") || text.startsWith("-")
  const content = hasMarker ? text.slice(1) : text
  return content.length - content.trimStart().length + Number(hasMarker)
}

const removeMarker = (line: Line, marker: DiffMarker | undefined) => {
  if (!marker) return 0

  const firstText = getFirstText(line.children[0])
  if (!firstText) return 0

  // Remove the diff marker: "+  fn main() {" -> "  fn main() {".
  const value = firstText.value.trimStart().slice(1)
  if (value) {
    firstText.value = value
  } else {
    line.children.splice(0, 1)
  }
  return 1
}

const removeIndent = (line: Line, indentSize: number) => {
  let remaining = indentSize

  // "  fn main() {" -> "fn main() {" when indentSize is 2.
  // Shiki may split the leading spaces across spans, so consume them left to right.
  for (const span of line.children) {
    if (remaining === 0) return

    const text = getFirstText(span)
    if (!text) continue

    const leadingSpaces = text.value.length - text.value.trimStart().length
    const removed = Math.min(remaining, leadingSpaces)
    text.value = text.value.slice(removed)
    remaining -= removed

    if (remaining > 0 && text.value) {
      throw new Error("Diff indentation must contain only spaces")
    }
  }
}

const normalizeLine = (line: Line, indentSize: number) => {
  const firstText = getFirstText(line.children[0])
  if (!firstText || !firstText.value.trim()) return

  const marker = getDiffMarker(firstText.value)
  removeIndent(line, indentSize - removeMarker(line, marker))
  return marker
}

/**
 * @example
 * ````md
 * ```rust diff
 *   fn main() {
 * -     println!("Hello, World!")
 * +     println!("Hello, Shikiji!")
 *   }
 * ```
 * ````
 */
export const transformerMetaDiff = (): ShikiTransformer => ({
  code(hast) {
    const meta = parseMeta(this.options.meta?.__raw)
    if (!meta.diff) return

    this.addClassToHast(this.pre, "has-diff")

    // calculate diff indent size
    // e.g. "+ fn main() {"
    //       ^^
    //       diffIndentSize = 2
    const diffIndentSize = getDiffIndentSize(hast)

    for (const line of hast.children.filter(isLine)) {
      const marker = normalizeLine(line, diffIndentSize)
      if (marker) {
        // Mark "+" as an added line and "-" as a removed line.
        this.addClassToHast(
          line,
          marker === "+" ? ["diff", "add"] : ["diff", "remove"]
        )
      }
    }
  },
})
