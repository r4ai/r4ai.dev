import type { FontWeight } from "satori"

const fontCache = new Map<string, ArrayBuffer>()

/**
 * Download a font from Google Fonts.
 * @see https://github.com/vercel/satori/blob/main/playground/pages/api/font.ts
 */
export const fetchFont = async (
  font: string,
  weight: FontWeight,
  depth = 0,
  maxDepth = 5
): Promise<ArrayBuffer> => {
  const key = `${encodeURIComponent(font)}-${weight}`
  if (fontCache.has(key)) return fontCache.get(key)!

  const API = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
    font
  )}:wght@${weight}`

  let css = undefined
  try {
    css = await (
      await fetch(API, {
        headers: {
          // Make sure it returns TTF.
          "User-Agent":
            "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1",
        },
      })
    ).text()
  } catch (e) {
    // Retry up to 5 times.
    if (depth >= maxDepth) throw e
    return fetchFont(font, weight, depth + 1, maxDepth)
  }

  if (!css) throw new Error("Failed to fetch font: " + API)
  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/)

  if (!resource) throw new Error("Failed to fetch font: " + API)

  const res = await fetch(resource[1])
  const buffer = await res.arrayBuffer()

  fontCache.set(key, buffer)

  return buffer
}
