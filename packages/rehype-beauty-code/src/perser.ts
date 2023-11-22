import rangeParser from "parse-numeric-range";

export type Meta = {
  title: string;
  highlightLines: number[];
  showLineNumbers: boolean;
  live: boolean;
};

type Group = {
  titleStr: string;
  title: string;
  lines: string;
  showLineNumbers: string;
  live: string;
};

export const defaultMeta: Meta = {
  title: "",
  highlightLines: [],
  showLineNumbers: false,
  live: false,
};

const parseRegex =
  /\{(?<lines>.*?)\}|(?<showLineNumbers>showLineNumbers)|(?<live>live)|(?:title=(?:"(?<titleStr>.*?)"))|(?:title=(?<title>.*?)(?:$|\s))/g;

export const parseMeta = (meta: string) => {
  const matches = meta.matchAll(parseRegex);

  const metaObj = { ...defaultMeta } as Meta;
  for (const match of matches) {
    const groups = match.groups as Group;
    if (groups.lines) {
      const range = rangeParser(groups.lines);
      metaObj.highlightLines = [...metaObj.highlightLines, ...range];
      continue;
    }
    if (groups.live) {
      metaObj.live = true;
      continue;
    }
    if (groups.showLineNumbers) {
      metaObj.showLineNumbers = true;
      continue;
    }
    if (groups.title) {
      metaObj.title = groups.title;
      continue;
    }
    if (groups.titleStr) {
      metaObj.title = groups.titleStr;
      continue;
    }
  }
  metaObj.highlightLines = Array.from(new Set(metaObj.highlightLines)); // 重複削除

  return metaObj;
};
