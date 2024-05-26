// @refresh reload

import { createHandler, StartServer } from "@solidjs/start/server"

import initColorSchemeScript from "~/features/color-scheme/scripts/init-color-scheme?transform"

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
