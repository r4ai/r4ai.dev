import {
  bgAccentImage as defaultBgAccentImage,
  bgImage as defaultBgImage,
  buffer2url,
  type ReactLikeObject,
} from "../shared"

export type OpenGraphImageProps = {
  title: string
  bgAccentImage?: Buffer<ArrayBufferLike>
  bgImage?: Buffer<ArrayBufferLike>
}

export const OpenGraphImage = ({
  title,
  bgAccentImage = defaultBgAccentImage,
  bgImage = defaultBgImage,
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
