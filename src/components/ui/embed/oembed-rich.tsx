import type { Component } from "solid-js"

import { Link, Paragraph } from "@/components/typography"

export type OEmbedRichProps = {
  url: string
  oEmbed: string
}

// todo: add storybook
export const OEmbedRich: Component<OEmbedRichProps> = (props) => {
  return (
    <Paragraph>
      <Link href={props.url}>{props.url}</Link>
    </Paragraph>
  )
}
