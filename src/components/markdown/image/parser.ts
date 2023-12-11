export const splitAlt = (input: string) => {
  const [alt, meta] = input.split("||")
  return {
    alt: alt.replaceAll("\\|", "|").trim(),
    meta: meta?.trim(),
  }
}

const parseMeta = (meta: string) => {
  const metaObj = new Map<string, string | boolean | number | null>()

  const parts = meta.split(/\s+/)
  for (const part of parts) {
    const [key, value] = part.split(/\s*=\s*/)
    if (value == null) {
      if (key.startsWith("!")) {
        metaObj.set(key.slice(1), false)
      } else {
        metaObj.set(key, true)
      }
    } else {
      switch (value.toLowerCase()) {
        case "true":
          metaObj.set(key, true)
          break
        case "false":
          metaObj.set(key, false)
          break
        case "null":
          metaObj.set(key, null)
          break
        case "undefined":
          metaObj.set(key, null)
          break
        default:
          if (!isNaN(Number(value))) {
            metaObj.set(key, Number(value))
          } else {
            metaObj.set(key, value)
          }
      }
    }
  }

  return metaObj
}

export const parseAlt = (altText: string) => {
  const { alt, meta } = splitAlt(altText)
  return {
    alt,
    meta: parseMeta(meta ?? ""),
  }
}
