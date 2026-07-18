import type { Component } from "solid-js"
import { NoHydration } from "solid-js/web"

import { Link, Paragraph } from "@/components/typography"

export type OEmbedProps = {
  url: string
}

export const OEmbed: Component<OEmbedProps> = (props) => {
  return (
    <NoHydration>
      <Paragraph>
        <Link href={props.url}>{props.url}</Link>
      </Paragraph>
    </NoHydration>
  )
}
