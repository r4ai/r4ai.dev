import fs from "node:fs/promises"

import {
  buffer2url,
  render as renderSatori,
  type SharpFn,
} from "@/lib/utils/open-graph"

type ReactLikeObject = {
  type: string
  props: Record<string, unknown> & {
    tw?: string
    style?: Record<string, string>
    children?: (ReactLikeObject | string)[]
  }
}

const titleFont = await fs.readFile(
  "src/assets/fonts/noto-sans-jp/static/NotoSansJP-Bold.ttf"
)
const bgAccentImage = await fs.readFile("src/assets/imgs/og/stripe.png")
const bgImage = await fs.readFile("src/assets/imgs/og/bg.png")

// todo: improve design
export const OpenGraphImage = (): ReactLikeObject => {
  return {
    type: "div",
    props: {
      tw: "flex flex-row bg-black items-center",
      style: {
        width: "1200px",
        height: "630px",
      },
      children: [
        {
          type: "img",
          props: {
            src: buffer2url(bgImage),
            width: 1200,
            height: 630,
            tw: "absolute object-cover opacity-80",
          },
        },
        {
          type: "img",
          props: {
            src: buffer2url(bgAccentImage),
            width: 1200,
            height: 900,
            tw: "absolute object-cover -top-36",
          },
        },
        {
          type: "div",
          props: {
            tw: "flex flex-row items-center mx-32",
            children: [
              {
                type: "h1",
                props: {
                  tw: "text-8xl text-gray-50",
                  style: {
                    "text-shadow": "0 0 10px #000",
                  },
                  children: ["r4ai.dev"],
                },
              },
            ],
          },
        },
      ],
    },
  }
}

export const render = async <Props extends object>(
  sharp: SharpFn,
  component: (props: Props) => ReactLikeObject,
  props: Props
) =>
  renderSatori(sharp, component, props, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: "Noto Sans JP",
        data: titleFont,
        weight: 800,
        style: "normal",
      },
    ],
  })
