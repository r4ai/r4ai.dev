import { type Component, createResource } from "solid-js"
import { transformWithEsbuild } from "vite"

import rawInitColorSchemeScript from "./scripts/init-color-scheme?raw"

/**
 * カラースキームの初期化スクリプト生成コンポーネント
 */
export const InitColorSchemeScript: Component = () => {
  const [initScript] = createResource(() =>
    transformWithEsbuild(rawInitColorSchemeScript, "init-color-scheme.ts", {}),
  )
  return <script>{initScript()?.code}</script>
}
