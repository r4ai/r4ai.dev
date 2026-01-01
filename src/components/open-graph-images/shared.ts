import fs from "node:fs/promises"

import { render as renderToPng, type SharpFn } from "@/lib/utils/open-graph"

export type ReactLikeObject = {
  type: string
  props: Record<string, unknown> & {
    tw?: string
    style?: Record<string, string>
    children?: (ReactLikeObject | string)[]
  }
}

export const buffer2url = (buffer: Buffer) =>
  `data:image/png;base64,${buffer.toString("base64")}`

export const titleFont = await fs.readFile(
  "src/assets/fonts/noto-sans-jp/static/NotoSansJP-Bold.ttf"
)
export const bgAccentImage = await fs.readFile("src/assets/imgs/og/stripe.png")
export const bgImage = await fs.readFile("src/assets/imgs/og/bg.png")

/**
 * Render the OpenGraph image
 * @param sharp - Sharp instance
 * @param component - Component to render
 * @param props - Props to pass to the component
 * @param fonts - Fonts to use in the image
 */
export const render = async <Props extends object>(
  sharp: SharpFn,
  component: (props: Props) => ReactLikeObject,
  props: Props,
  fonts: { NotoSansJP: Buffer<ArrayBufferLike> } = {
    NotoSansJP: titleFont,
  }
) =>
  renderToPng(sharp, component, props, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: "Noto Sans JP",
        data: fonts.NotoSansJP,
        weight: 800,
        style: "normal",
      },
    ],
  })
