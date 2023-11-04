---
title: rehype-prety-code
tags: []
icon: fluent-emoji-flat:construction
genre: article
draft: true
publishedAt: 2023-11-04
---

## rehype-prety-code

```tsx
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

```ts title="md2html.ts" showLineNumbers
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

ANSI support:

```ansi title="$ bun"
[0m[1m[35mBun[0m: a fast JavaScript runtime, package manager, bundler and test runner. [2m(1.0.7)[0m

  [1m[35mrun[0m       [2m./my-script.ts[0m       Run JavaScript with Bun, a package.json script, or a bin
  [1m[35mtest[0m                           Run unit tests with Bun
  [1m[35mx[0m         [2meslint          [0m     Install and execute a package bin [2m(bunx)[0m
  [1m[35mrepl[0m                           Start a REPL session with Bun

  [1m[36minit[0m                           Start an empty Bun project from a blank template
  [1m[36mcreate[0m    [2mvite            [0m     Create a new project from a template [2m(bun c)[0m

  [1m[34minstall[0m                        Install dependencies for a package.json [2m(bun i)[0m
  [1m[34madd[0m       [2mtailwindcss     [0m     Add a dependency to package.json [2m(bun a)[0m
  [1m[34mremove[0m    [2mmoment          [0m     Remove a dependency from package.json [2m(bun rm)[0m
  [1m[34mupdate[0m    [2melysia          [0m     Update outdated dependencies
  [1m[34mlink[0m                           Link an npm package globally
  [1m[34munlink[0m                         Globally unlink an npm package
  [1mpm[0m                             More commands for managing packages

  [1m[32mbuild[0m     [2m./a.ts ./b.jsx[0m       Bundle TypeScript & JavaScript into a single file

  [1m[33mupgrade[0m                        Get the latest version of Bun
  [1mbun --help[0m                     Show all supported flags and commands

  Learn more about Bun:          [35mhttps://bun.sh/docs[0m
  Join our Discord community:    [34mhttps://bun.sh/discord[0m
```

### ANSI

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
