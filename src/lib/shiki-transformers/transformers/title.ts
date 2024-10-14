import type { ShikiTransformer } from "shiki"

import { parseMeta } from "../utils"

export const transformerTitle = (): ShikiTransformer => ({
  code() {
    const meta = parseMeta(this.options.meta?.__raw)

    const title = meta.title
    if (!title || typeof title !== "string") return

    const lang = this.options.lang

    this.addClassToHast(this.pre, "has-title")
    this.pre.properties["title"] = title
    this.pre.properties["lang"] = lang
  },
})
