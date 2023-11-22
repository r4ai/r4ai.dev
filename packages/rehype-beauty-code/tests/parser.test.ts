import { describe, expect, test } from "vitest";
import { Meta, defaultMeta, parseMeta } from "../src/perser";

describe("parse meta data", () => {
  test("parse meta string", () => {
    const metaString =
      '{1,4-6,11} showLineNumbers {1, 92-95} title="Some Code Data"';
    const meta = parseMeta(metaString);
    expect(meta).toEqual({
      ...defaultMeta,
      title: "Some Code Data",
      highlightLines: [1, 4, 5, 6, 11, 92, 93, 94, 95],
      showLineNumbers: true,
    } satisfies Meta);
  });
});
