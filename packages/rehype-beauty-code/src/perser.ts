import rangeParser from "parse-numeric-range";

type RequiredMeta = {
  range: number[];
  showLineNumbers: boolean;
};

type OptionalMeta = {
  [key: string]: string | boolean | number[];
};

export type Meta = Omit<OptionalMeta, keyof RequiredMeta> & RequiredMeta;

export const defaultMeta = {
  range: [],
  showLineNumbers: false,
} satisfies Meta;

type Group = {
  range?: string;
  kv?: string;
  kvKey?: string;
  kvValue?: string;
  kvDoubleQuote?: string;
  kvDoubleQuoteKey?: string;
  kvDoubleQuoteValue?: string;
  kvSingleQuote?: string;
  kvSingleQuoteKey?: string;
  kvSingleQuoteValue?: string;
  boolValue?: string;
};

const parseRegex =
  /\{(?<range>.*?)\}|(?<kv>(?<kvKey>[^\s]+?)\s*=\s*(?<kvValue>[^\s"']+?))(?=\s|$)|(?<kvDoubleQuote>(?<kvDoubleQuoteKey>[^\s]+?)\s*=\s*"(?<kvDoubleQuoteValue>.*?)(?<!\\)")|(?<kvSingleQuote>(?<kvSingleQuoteKey>[^\s]+?)\s*=\s*'(?<kvSingleQuoteValue>.*?)(?<!\\)')|(?<=\s|^)(?<boolValue>[^\s=]+?)(?=\s|$)/g;

export const parseMeta = (meta: string) => {
  const matches = meta.matchAll(parseRegex);

  const metaObj: Meta = { ...defaultMeta };
  for (const match of matches) {
    const groups = match.groups as Group;
    if (groups.range) {
      const range = rangeParser(groups.range);
      metaObj.range = [...metaObj.range, ...range];
    }
    if (groups.kvKey && groups.kvValue) {
      metaObj[groups.kvKey] = retrieveEscapedString(groups.kvValue);
    }
    if (groups.kvDoubleQuoteKey && groups.kvDoubleQuoteValue) {
      metaObj[groups.kvDoubleQuoteKey] = retrieveEscapedString(
        groups.kvDoubleQuoteValue,
      );
    }
    if (groups.kvSingleQuoteKey && groups.kvSingleQuoteValue) {
      metaObj[groups.kvSingleQuoteKey] = retrieveEscapedString(
        groups.kvSingleQuoteValue,
      );
    }
    if (groups.boolValue) {
      metaObj[groups.boolValue] = true;
    }
  }
  metaObj.range = removeDuplicateAndSort(metaObj.range);

  return metaObj;
};

export const retrieveEscapedString = (str: string) =>
  str.replace(/\\(.)/g, "$1");

export const removeDuplicateAndSort = (arr: number[]) => {
  return Array.from(new Set(arr)).sort((a, b) => a - b);
};
