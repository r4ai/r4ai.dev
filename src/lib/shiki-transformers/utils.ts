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
    /|(?<key>[^\s]+?)\s*=\s*(?:"(?<doubleQuoteValue>.*?)(?<!\\)"|'(?<singleQuoteValue>.*?)(?<!\\)'|(?<value>[^\s"']+?)(?=\s|$))/
      .source,
    /|(?<=\s|^)(?<boolValue>[^\s=]+?)(?=\s|$)/.source,
  ].join(""),
  "g"
)

const toMetaEntry = (groups: Group): MetaEntry | undefined => {
  if (groups.range) {
    return { type: "range", value: rangeParser(groups.range) }
  }

  const value =
    groups.value ?? groups.doubleQuoteValue ?? groups.singleQuoteValue
  if (groups.key && value) {
    return {
      type: "property",
      key: groups.key,
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

  for (const match of meta.matchAll(PARSE_REGEX)) {
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

export const removeDuplicateAndSort = (arr: number[]) =>
  Array.from(new Set(arr)).sort((a, b) => a - b)
