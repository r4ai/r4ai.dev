import rangeParser from "parse-numeric-range"

type Range = number[]

export type Meta = {
  range: Range
  [key: string]: string | boolean | Range | undefined
}

export const defaultMeta: Meta = {
  range: [],
}

type Group = NonNullable<RegExpMatchArray["groups"]>
type PropertyCapture = readonly [
  key: string | undefined,
  value: string | undefined,
]

type MetaEntry =
  | { type: "range"; value: Range }
  | { type: "property"; key: string; value: string | true }

// meta = "{" range ("," range)* "}"             // -> range
//      | string "=" string                      // -> kv
//      | "\"" string "\"" "=" "\"" string "\""  // -> kv
//      | "'" string "'" "=" "'" string "'       // -> kv
//      | string                                 // -> bool
//
// range = number "-" number
//       | number
const PARSE_REGEX = new RegExp(
  [
    /\{(?<range>.*?)\}/.source,
    /|(?<kv>(?<kvKey>[^\s]+?)\s*=\s*(?<kvValue>[^\s"']+?))(?=\s|$)/.source,
    /|(?<kvDoubleQuote>(?<kvDoubleQuoteKey>[^\s]+?)\s*=\s*"(?<kvDoubleQuoteValue>.*?)(?<!\\)")/
      .source,
    /|(?<kvSingleQuote>(?<kvSingleQuoteKey>[^\s]+?)\s*=\s*'(?<kvSingleQuoteValue>.*?)(?<!\\)')/
      .source,
    /|(?<=\s|^)(?<boolValue>[^\s=]+?)(?=\s|$)/.source,
  ].join(""),
  "g"
)

const isCompleteProperty = (
  capture: PropertyCapture
): capture is readonly [key: string, value: string] =>
  capture[0] != null &&
  capture[0] !== "" &&
  capture[1] != null &&
  capture[1] !== ""

const toMetaEntry = (groups: Group): MetaEntry | undefined => {
  if (groups.range) {
    return { type: "range", value: rangeParser(groups.range) }
  }

  const properties: PropertyCapture[] = [
    [groups.kvKey, groups.kvValue],
    [groups.kvDoubleQuoteKey, groups.kvDoubleQuoteValue],
    [groups.kvSingleQuoteKey, groups.kvSingleQuoteValue],
  ]
  const property = properties.find(isCompleteProperty)

  if (property) {
    const [key, value] = property
    return {
      type: "property",
      key,
      value: retrieveEscapedString(value),
    }
  }

  if (groups.boolValue) {
    return { type: "property", key: groups.boolValue, value: true }
  }

  return undefined
}

/**
 * Parse meta string to object.
 * @param meta meta string
 * @returns meta object
 */
export const parseMeta = (meta: string | undefined): Meta => {
  const metaObj: Meta = { ...defaultMeta }
  if (!meta) return metaObj

  const matches = meta.matchAll(PARSE_REGEX)
  for (const match of matches) {
    if (!match.groups) {
      throw new Error("Meta parser did not return named groups")
    }
    const entry = toMetaEntry(match.groups)
    if (!entry) continue

    if (entry.type === "range") {
      metaObj.range = [...metaObj.range, ...entry.value]
      continue
    }

    metaObj[entry.key] = entry.value
  }
  metaObj.range = removeDuplicateAndSort(metaObj.range)

  return metaObj
}

export const retrieveEscapedString = (str: string) =>
  str.replace(/\\(.)/g, "$1")

export const removeDuplicateAndSort = (arr: number[]) => {
  return Array.from(new Set(arr)).sort((a, b) => a - b)
}
