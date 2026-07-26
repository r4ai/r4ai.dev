import rangeParser from "parse-numeric-range"

type Range = number[]

type RequiredMeta = {
  range?: Range
}

type OptionalMeta = Record<string, string | boolean | Range | undefined>

export type Meta = Omit<OptionalMeta, keyof RequiredMeta> & RequiredMeta

export const defaultMeta: Required<Meta> = {
  range: [],
}

type Group = {
  range?: string
  kvKey?: string
  kvValue?: string
  kvDoubleQuoteKey?: string
  kvDoubleQuoteValue?: string
  kvSingleQuoteKey?: string
  kvSingleQuoteValue?: string
  boolValue?: string
}

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

const toMetaEntry = (groups: Group): MetaEntry | undefined => {
  if (groups.range) {
    return { type: "range", value: rangeParser(groups.range) }
  }

  const property = [
    [groups.kvKey, groups.kvValue],
    [groups.kvDoubleQuoteKey, groups.kvDoubleQuoteValue],
    [groups.kvSingleQuoteKey, groups.kvSingleQuoteValue],
  ].find(([key, value]) => key && value)

  if (property) {
    const [key, value] = property as [string, string]
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
export const parseMeta = <M extends Meta = Meta>(
  meta: string | undefined
): M => {
  const metaObj = { ...defaultMeta }
  if (!meta) return metaObj as M

  const matches = meta.matchAll(PARSE_REGEX)
  for (const match of matches) {
    const entry = toMetaEntry(match.groups as Group)
    if (!entry) continue

    if (entry.type === "range") {
      metaObj.range = [...metaObj.range, ...entry.value]
      continue
    }

    metaObj[entry.key] = entry.value
  }
  metaObj.range = removeDuplicateAndSort(metaObj.range)

  return metaObj as M
}

export const retrieveEscapedString = (str: string) =>
  str.replace(/\\(.)/g, "$1")

export const removeDuplicateAndSort = (arr: number[]) => {
  return Array.from(new Set(arr)).sort((a, b) => a - b)
}
