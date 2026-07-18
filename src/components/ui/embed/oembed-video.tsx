import type { Component } from "solid-js"

import { Link, Paragraph } from "@/components/typography"

export type OEmbedVideoProps = {
  url: string
  oEmbed: string
}

// todo: add storybook
export const OEmbedVideo: Component<OEmbedVideoProps> = (props) => {
  return (
    <Paragraph>
      <Link href={props.url}>{props.url}</Link>
    </Paragraph>
  )
}
