import { type Component, createResource, Match, Switch } from "solid-js"
import { NoHydration } from "solid-js/web"

import { Link, Paragraph } from "@/components/typography"

import { OEmbedRich } from "./oembed-rich"
import { OEmbedVideo } from "./oembed-video"

type OEmbedProperties = {
  url: string
  oEmbed: string
}

/* eslint-disable @typescript-eslint/no-explicit-any */
const call = async <T,>(
  fn: T,
  ...args: T extends (...args: any[]) => any ? Parameters<T> : any[]
): Promise<T extends (...args: any[]) => infer R ? R : T> => {
  // @ts-expect-error fn is not a function
  if (typeof fn !== "function") return fn
  const value = await fn(...args)
  return value
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export type OEmbedProps = {
  url: string
}

const OEmbedInternal: Component<OEmbedProps> = (props) => {
  const [oEmbed] = createResource(async () => {
    const { transformerOEmbed } = await import(
      "@r4ai/remark-embed/transformers/oembed"
    )
    const transformer = transformerOEmbed({
      video: (url, oEmbed) => ({
        tagName: "oembed-video",
        properties: {
          url: url.href,
          oEmbed: JSON.stringify(oEmbed),
        } satisfies OEmbedProperties,
        children: [],
      }),
      rich: (url, oEmbed) => ({
        tagName: "oembed-rich",
        properties: {
          url: url.href,
          oEmbed: JSON.stringify(oEmbed),
        } satisfies OEmbedProperties,
        children: [],
      }),
    })

    const url = new URL(props.url)

    try {
      const matched = await call(transformer.match, url)
      if (!matched) return undefined

      const tagName = await call(transformer.tagName, url)
      const properties = (await call(
        transformer.properties,
        url
      )) as OEmbedProperties
      return { tagName, properties }
    } catch (error) {
      console.error(error)
      return undefined
    }
  })

  return (
    <Switch
      fallback={
        <Paragraph>
          <Link href={props.url}>{props.url}</Link>
        </Paragraph>
      }
    >
      <Match when={oEmbed()?.tagName === "oembed-video"}>
        <OEmbedVideo {...oEmbed()!.properties} />
      </Match>
      <Match when={oEmbed()?.tagName === "oembed-rich"}>
        <OEmbedRich {...oEmbed()!.properties} />
      </Match>
    </Switch>
  )
}

export const OEmbed: Component<OEmbedProps> = (props) => {
  return (
    <NoHydration>
      <OEmbedInternal {...props} />
    </NoHydration>
  )
}
