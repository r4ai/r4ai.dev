import type { OEmbedRich as OEmbedRichType } from "@r4ai/remark-embed/transformers"
import { type Component, createMemo } from "solid-js"

export type OEmbedRichProps = {
  url: string
  oEmbed: string
}

// todo: add storybook
export const OEmbedRich: Component<OEmbedRichProps> = (props) => {
  const oEmbed = createMemo(() => JSON.parse(props.oEmbed) as OEmbedRichType)
  return (
    <div
      class="mx-auto w-full max-w-screen-md *:!mx-auto *:!h-full *:!w-full"
      style={{
        "aspect-ratio": `${oEmbed().width}/${oEmbed().height}`,
      }}
      // eslint-disable-next-line solid/no-innerhtml
      innerHTML={oEmbed().html}
    />
  )
}
