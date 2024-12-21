import { render as renderToPng } from "@/lib/utils"
import type { SharpFn } from "@/lib/utils/open-graph"

type ReactLikeObject = {
  type: string
  props: Record<string, unknown> & {
    tw?: string
    style?: Record<string, string>
    children?: (ReactLikeObject | string)[]
  }
}

const buffer2url = (buffer: Buffer) =>
  `data:image/png;base64,${buffer.toString("base64")}`

export type OpenGraphImageProps = {
  title: string
  bgAccentImage: Buffer<ArrayBufferLike>
  bgImage: Buffer<ArrayBufferLike>
}

export const OpenGraphImage = ({
  title,
  bgAccentImage,
  bgImage,
}: OpenGraphImageProps): ReactLikeObject => {
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
          type: "h1",
          props: {
            tw: "text-7xl mx-8 text-gray-50 leading-snug max-w-[70%]",
            style: {
              "text-shadow": "0 0 10px #000",
            },
            children: [title],
          },
        },
        {
          type: "div",
          props: {
            tw: "text-6xl text-gray-200 absolute bottom-12 right-12 flex",
            style: {
              "text-shadow": "0 0 10px #000",
            },
            children: ["r4ai.dev"],
          },
        },
      ],
    },
  }
}

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
  fonts: { NotoSansJP: Buffer<ArrayBufferLike> }
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
