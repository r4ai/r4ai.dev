---
title: rehype-prety-code
tags: []
icon: fluent-emoji-flat:construction
genre: article
draft: true
publishedAt: 2023-11-04
---

[Rehype Pretty Code](https://github.com/atomiks/rehype-pretty-code) is a Rehype
plugin powered by the [Shiki](https://github.com/shikijs/shiki) syntax
highlighter that provides beautiful code blocks for Markdown or MDX. It's fast
since it avoids runtime syntax highlighting by executing at build-time, and
works with new features like React Server Components.

## Perfect syntax highlighting

Leverage the accuracy of VS Code's syntax highlighting engine and the popularity
of its themes ecosystem — use any VS Code theme you want!

```js
import Document, { Html, Head, Main, NextScript } from "next/document";

// 🔥 Super granular and accurate highlighting
export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />
        <body className="bg-zinc-800 text-zinc-200">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
```

> The theme is [Moonlight II](https://github.com/atomiks/moonlight-vscode-theme)
> with a custom background color.

## Line numbers and line highlighting are supported

```js {4} showLineNumbers
import { useFloating } from "@floating-ui/react";

function MyComponent() {
  const { refs, floatingStyles } = useFloating();

  return (
    <>
      <div ref={refs.setReference} />
      <div ref={refs.setFloating} style={floatingStyles} />
    </>
  );
}
```

## Word highlighting

```js /floatingStyles/
import { useFloating } from "@floating-ui/react";

function MyComponent() {
  const { refs, floatingStyles } = useFloating();

  return (
    <>
      <div ref={refs.setReference} />
      <div ref={refs.setFloating} style={floatingStyles} />
    </>
  );
}
```

## Inline code highlighting

The result of `[1, 2, 3].join('-'){:js}` is `'1-2-3'{:js}`.

### Context-aware inline code

For instance, if you had the following code block:

```js
function getStringLength(str) {
  return str.length;
}
```

When we refer to `getStringLength{:.entity.name.function}` as a plain variable,
we can color it as a function. Same with `function{:.keyword}`, or
`str{:.variable.parameter}` vs. `str{:.variable.other.object}`, etc. This allows
you to semantically tie inline code with the nearest code block it's referring
to.

## ANSI highlighting

```ansi
[0;36m  vite v2.8.6[0;32m dev server running at:[0m

  > Local: [0;36mhttp://localhost:[0;36;1m3000[0;36m/[0m
  > Network: [0;2muse `--host` to expose[0m

  [0;36mready in 125ms.[0m

[0;2m8:38:02 PM[0m [0;36;1m[vite][0m [0;32mhmr update [0;2m/src/App.jsx
```

Inline ANSI: `> Local: [0;36mhttp://localhost:[0;36;1m3000[0;36m/[0m{:ansi}`

## Installation

Install via your terminal:

```shell
npm install rehype-pretty-code shiki
```

> **Note:** _`v0.10.2`+ is `ESM`-only. If you need `CommonJS`
> support you should use `v0.10.1`. You can use the latest version (`ESM`) in
> `Next.js`, just make sure your next config file is `ESM`: `next.config.mjs`.
> Here's a full example:
> [rehype-pretty-code/website/next.config.mjs](https://github.com/atomiks/rehype-pretty-code/blob/master/website/next.config.mjs)_

## Usage

```js /rehypePrettyCode/
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypePrettyCode from "rehype-pretty-code";

async function main() {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      // See Options section below.
    })
    .use(rehypeStringify)
    .process("`const numbers = [1, 2, 3]{:js}`");

  console.log(String(file));
}

main();
```

### MDX

The following example shows how to use this package with Next.js.

```js
// next.config.mjs
import fs from "node:fs";
import nextMDX from "@next/mdx";
import rehypePrettyCode from "rehype-pretty-code";

/** @type {import('rehype-pretty-code').Options} */
const options = {
  // See Options section below.
};

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [[rehypePrettyCode, options]],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = { reactStrictMode: true };

export default withMDX(nextConfig);
```

> **Make sure you have disabled** the `mdxRs{:.meta.object-literal.key}` option
> for Next.js 13 / app dir, as it currently does not support Rehype plugins.

## Options

To customize the theme and highlighting, options can be specified.

### Code block styles

Code blocks are fully unstyled to give you full control. The features are
implemented as logical indicators in the form of attributes that allows you to
apply CSS yourself.

A grid style is present by default which allows line highlighting to span the
entire width of a horizontally-scrollable code block.

You can disable this setting if necessary:

```js
const options = {
  grid: false,
};
```

### Theme

The default theme is `github-dark-dimmed{:.string}`. Shiki has a bunch of
[pre-packaged themes](https://unpkg.com/browse/shiki@0.14.2/themes/), which can
be specified as a plain string:

```js
const options = {
  theme: "one-dark-pro",
};
```

You can use your own theme as well by passing the theme JSON:

```js
const options = {
  theme: JSON.parse(
    fs.readFileSync(
      new URL("./themes/moonlight-ii.json", import.meta.url),
      "utf-8",
    ),
  ),
};
```

#### Theme background

To apply a custom background instead of inheriting the background from the
theme:

```js
const options = {
  keepBackground: false,
};
```

#### Default code language

When no code language is specified, inline code or code blocks will not be
themed (nor will the background), which may appear incongruous with others.

In this case, you can specify a default language:

```js
const options = {
  defaultLang: "plaintext",
};
```

Or you can also specify default languages for inline code and code blocks
separately:

```js
const options = {
  defaultLang: {
    block: "plaintext",
    inline: "plaintext",
  },
};
```

### Meta strings

Code blocks are configured via the meta string on the top codeblock fence.

#### Highlight lines

Place a numeric range inside `{}`.

````md
```js {1-3,4}

```
````

The line `<span>{:html}` receives a `data-highlighted-line` attribute to style
via CSS.

#### Highlight chars

A series of characters, like a literal regex.

````md
```js /carrot/

```
````

````md
```js /carrot/ /apple/

```
````

The chars `<span>{:html}` receives a `data-highlighted-chars` attribute to style
via CSS.

To highlight only the third to fifth instances of `carrot`, a numeric range can
be placed after the last `/`.

````md
```js /carrot/3-5

```
````

Highlight only the third to fifth instances of `carrot` and any instances of
`apple`.

````md
```js /carrot/3-5 /apple/

```
````

#### Group highlighted chars by id

Place an id after `#` after the chars. This allows you to color chars
differently based on their id.

````md
```js /age/#v /name/#v /setAge/#s /setName/#s /50/#i /'Taylor'/#i
const [age, setAge] = useState(50);
const [name, setName] = useState("Taylor");
```
````

```js /age/#v /name/#v /setAge/#s /setName/#s /50/#i /'Taylor'/#i
const [age, setAge] = useState(50);
const [name, setName] = useState("Taylor");
```

The chars `<span>{:html}` receives a `data-chars-id="<id>"` attribute to style
via CSS.

#### Highlight inline code

Append `{:lang}‎` (e.g. `{:js}‎`) to the end of inline code to highlight it
like a regular code block.

```md
This is an array `[1, 2, 3]{:js}` of numbers 1 through 3.
```

#### Highlight plain text

Append `{:.token}‎` to the end of the inline code to highlight it based on a
token specified in your VS Code theme. Tokens start with a `.` to differentiate
them from a language.

```md
The name of the function is `getStringLength{:.entity.name.function}`.
```

You can create a map of tokens to shorten this usage throughout your docs:

```js
const options = {
  tokensMap: {
    fn: "entity.name.function",
  },
};
```

```md
The name of the function is `getStringLength{:.fn}`.
```

#### Titles

Add a file title to your code block, with text inside double quotes (`""`):

````md
```js title="..."

```
````

#### Captions

Add a caption underneath your code block, with text inside double quotes (`""`):

````md
```js caption="..."

```
````

### Line numbers

CSS counters can be used to add line numbers.

```css {2,6-7}
code {
  counter-reset: line;
}

code > [data-line]::before {
  counter-increment: line;
  content: counter(line);

  /* Other styling */
  display: inline-block;
  width: 1rem;
  margin-right: 2rem;
  text-align: right;
  color: gray;
}

code[data-line-numbers-max-digits="2"] > [data-line]::before {
  width: 2rem;
}

code[data-line-numbers-max-digits="3"] > [data-line]::before {
  width: 3rem;
}
```

If you want to conditionally show them, use `showLineNumbers`:

````md
```js showLineNumbers

```
````

`<code>{:html}` will have attributes `data-line-numbers` and
`data-line-numbers-max-digits="n"`.

If you want to start line numbers at a specific number, use
`showLineNumbers{number}`:

````md
```js showLineNumbers{number}

```
````

### Multiple themes (dark/light mode)

Because Shiki generates themes at build time, client-side theme switching
support is not built in. There are two popular options for supporting something
like Dark Mode with Shiki. See the
[Shiki docs](https://github.com/shikijs/shiki/blob/main/docs/themes.md#dark-mode-support)
for more info.

Pass your themes to `theme{:.meta.object-literal.key}`, where the keys represent
the color mode:

```js
const options = {
  theme: {
    dark: "github-dark-dimmed",
    light: "github-light",
  },
};
```

The `<code>{:html}` and `<pre>{:html}` elements will have the data attribute
`data-theme="<key>"`, e.g `data-theme="light"`.

Now, you can use CSS to display the desired theme:

```css
@media (prefers-color-scheme: dark) {
  pre[data-theme="light"],
  code[data-theme="light"] {
    display: none;
  }
}

@media (prefers-color-scheme: light), (prefers-color-scheme: no-preference) {
  pre[data-theme="dark"],
  code[data-theme="dark"] {
    display: none;
  }
}
```

### Visitor hooks

To customize the HTML output, you can use visitor callback hooks to manipulate
the [hAST elements](https://github.com/syntax-tree/hast#element) directly:

```js
const options = {
  onVisitLine(element) {
    console.log("Visited line");
  },
  onVisitHighlightedLine(element) {
    console.log("Visited highlighted line");
  },
  onVisitHighlightedChars(element) {
    console.log("Visited highlighted chars");
  },
  onVisitTitle(element) {
    console.log("Visited title");
  },
  onVisitCaption(element) {
    console.log("Visited caption");
  },
};
```

### Custom highlighter

To completely configure the highlighter, use the
`getHighlighter{:.entity.name.function}` option to provide a Shiki highlighter
instance.

In order to support light and dark modes, Rehype Pretty Code provides an
`options{:.constant.language}` object for you to extend. The
`theme{:.meta.object-literal.key}` property is preconfigured with the light or
dark theme based on your theme options.

This is helpful if you'd like to configure other Shiki options, such as
`langs{:.meta.object-literal.key}`.

```js
import { getHighlighter, BUNDLED_LANGUAGES } from "shiki";

const options = {
  getHighlighter: (options) =>
    getHighlighter({
      ...options,
      langs: [
        ...BUNDLED_LANGUAGES,
        {
          id: "groq",
          scopeName: "source.groq",
          path: "./langs/vscode-sanity/grammars/groq.json",
        },
      ],
    }),
};
```

### Filter meta string

If your library also parses code blocks' meta strings, it may
[cause conflicts](https://github.com/atomiks/rehype-pretty-code/issues/52) with
`rehype-pretty-code`. This option allows you to filter out some part of the meta
string before the library starts parsing it.

```js
const options = {
  filterMetaString: (string) => string.replace(/filename="[^"]*"/, ""),
};
```

## Deployment and client-side highlighting

Copy the following files to your public directory:

```txt
/node_modules/shiki/dist/onig.wasm  ->  public/dist/onig.wasm
/node_modules/shiki/languages/      ->  public/languages/
/node_modules/shiki/themes/         ->  public/themes/
```

Then set the CDN path:

```js
import { setCDN } from "shiki";

setCDN("/");
```

This will allow Shiki to load the WASM file and themes from your public
directory to perform client-side highlighting.
[More info here](https://github.com/atomiks/rehype-pretty-code/issues/95).

```js
import { unified } from "unified";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypePrettyCode from "rehype-pretty-code";

export default async function processMarkdown(text) {
  return await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePrettyCode)
    .use(rehypeStringify)
    .process(text);
}
```

## License

MIT • [View on GitHub](https://github.com/atomiks/rehype-pretty-code)

## ANSI

コマンドの出力結果をANSIのままコピーする方法：

1. unbuffer のインストール

   ```sh
   sudo apt install expect
   ```

2. unbuffer を使ってコマンドを実行

   ```sh
   unbuffer -p bun | copy
   ```

3. 出力結果をコマンドブロックにペースト

   ````md
   ```ansi
   [0m[2m[35m$[0m [2m[1mastro dev[0m
   [0m[0m  噫 [42m[30m astro [39m[49m [32mv3.4.3[39m [2mstarted in 1577ms[22m

     [2m笏・[22m Local    [1m[36mhttp://localhost:4322/[39m[22m
     [2m笏・[22m Network  [2muse --host to expose[22m

   [0m[2m09:57:16 PM [22m[1m[36m[content][39m[22m [0mWatching [36msrc/content/[39m for changes
   [0m[2m09:57:16 PM [22m[1m[33m[content][39m[22m [0mUnsupported file types found. Prefix with an underscore (`_`) to ignore:
   - tags.ts
   [0m[2m09:57:16 PM [22m[1m[36m[content][39m[22m [0mTypes generated
   [0m[2m09:57:16 PM [22m[1m[36m[astro][39m[22m [0m[32mupdate[39m /.astro/types.d.ts
   ```
   ````

   Yield:

   ```ansi
   [0m[2m[35m$[0m [2m[1mastro dev[0m
   [0m[0m  噫 [42m[30m astro [39m[49m [32mv3.4.3[39m [2mstarted in 1577ms[22m

     [2m笏・[22m Local    [1m[36mhttp://localhost:4322/[39m[22m
     [2m笏・[22m Network  [2muse --host to expose[22m

   [0m[2m09:57:16 PM [22m[1m[36m[content][39m[22m [0mWatching [36msrc/content/[39m for changes
   [0m[2m09:57:16 PM [22m[1m[33m[content][39m[22m [0mUnsupported file types found. Prefix with an underscore (`_`) to ignore:
   - tags.ts
   [0m[2m09:57:16 PM [22m[1m[36m[content][39m[22m [0mTypes generated
   [0m[2m09:57:16 PM [22m[1m[36m[astro][39m[22m [0m[32mupdate[39m /.astro/types.d.ts
   ```
