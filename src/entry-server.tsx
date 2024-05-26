// @refresh reload
import path from "node:path"

import { createHandler, StartServer } from "@solidjs/start/server"
import { build } from "esbuild"

import rawInitColorSchemeScript from "~/features/color-scheme/scripts/init-color-scheme?raw"

const initColorSchemeScript = await build({
  stdin: {
    contents: rawInitColorSchemeScript,
    resolveDir: path.dirname(import.meta.dirname),
    loader: "ts",
  },
  minify: true,
  bundle: true,
  write: false,
}).then((result) => result.outputFiles[0].text)

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="ja" class="h-full">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
          {assets}
        </head>
        <body class="h-full">
          <script>{initColorSchemeScript}</script>
          <div id="app" class="h-full">
            {children}
          </div>
          {scripts}
        </body>
      </html>
    )}
  />
))
