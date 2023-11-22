import { dedent } from "@qnighy/dedent";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { describe, expect, test } from "vitest";
import rehypeShikiji from "../src";

const md2html = async (mdText: string) => {
  const html = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeShikiji, {
      themes: {
        light: "github-light",
        dark: "one-dark-pro",
      },
    })
    .use(rehypeStringify)
    .process(mdText);
  return html.toString();
};

describe("rehypeShikiji", () => {
  test("strict check", async () => {
    const md = dedent`
      \`\`\`javascript
      console.log("Hello, World!");
      \`\`\`
    `;
    const actualHtml = await md2html(md);
    const expectedHtml = dedent`
      <pre class="shiki shiki-themes github-light one-dark-pro" style="background-color:#fff;--shiki-dark-bg:#282c34;color:#24292e;--shiki-dark:#abb2bf" tabindex="0"><code><span class="line"><span style="color:#24292E;--shiki-dark:#E5C07B">console</span><span style="color:#24292E;--shiki-dark:#ABB2BF">.</span><span style="color:#6F42C1;--shiki-dark:#61AFEF">log</span><span style="color:#24292E;--shiki-dark:#ABB2BF">(</span><span style="color:#032F62;--shiki-dark:#98C379">"Hello, World!"</span><span style="color:#24292E;--shiki-dark:#ABB2BF">);</span></span>
      <span class="line"></span></code></pre>
    `
      .split("\n")
      .filter((line) => line.length > 0)
      .join("\n");
    expect(actualHtml).toBe(expectedHtml);
  });
});
