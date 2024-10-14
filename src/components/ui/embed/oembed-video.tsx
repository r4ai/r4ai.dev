import type { OEmbedVideo as OEmbedViodeType } from "@r4ai/remark-embed/transformers"
import { type Component, createMemo } from "solid-js"

export type OEmbedVideoProps = {
  url: string
  oEmbed: string
}

// todo: add storybook
export const OEmbedVideo: Component<OEmbedVideoProps> = (props) => {
  const oEmbed = createMemo(() => JSON.parse(props.oEmbed) as OEmbedViodeType)
  return (
    <div
      class="mx-auto w-full max-w-screen-md *:!h-full *:!w-full"
      style={{
        "aspect-ratio": `${oEmbed().width}/${oEmbed().height}`,
      }}
      // eslint-disable-next-line solid/no-innerhtml
      innerHTML={oEmbed().html}
    />
  )
}
