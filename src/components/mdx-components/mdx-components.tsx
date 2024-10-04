import { type ComponentProps, splitProps } from "solid-js"
import { NoHydration } from "solid-js/web"

import { CodeBlock, Image } from "@/components/mdx-components/astro-components"
import {
  Blockquote,
  Heading,
  InlineCode,
  Link,
  List,
  ListItem,
  OrderedList,
  Paragraph,
  Section,
  Separator,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/typography"
import {
  CalloutBody,
  type CalloutBodyProps,
  CalloutRoot,
  type CalloutRootProps,
  CalloutTitle,
  type CalloutTitleProps,
  LinkCard,
  OEmbed,
  OEmbedRich,
  type OEmbedRichProps,
  OEmbedVideo,
  type OEmbedVideoProps,
} from "@/components/ui"

const H1 = (props: ComponentProps<"h1">) => <Heading level="h1" {...props} />
const H2 = (props: ComponentProps<"h2">) => <Heading level="h2" {...props} />
const H3 = (props: ComponentProps<"h3">) => <Heading level="h3" {...props} />
const H4 = (props: ComponentProps<"h4">) => <Heading level="h4" {...props} />

export const components = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  p: Paragraph,
  section: Section,
  blockquote: Blockquote,
  ul: List,
  ol: OrderedList,
  li: ListItem,
  "inline-code": InlineCode,
  a: Link,
  img: Image,
  hr: Separator,
  table: Table,
  thead: TableHeader,
  tbody: TableBody,
  tfoot: TableFooter,
  tr: TableRow,
  th: TableHead,
  td: TableCell,
  caption: TableCaption,
  pre: CodeBlock,
  "callout-root": (
    props: Omit<CalloutRootProps, "isFoldable" | "defaultFolded"> & {
      isFoldable: "true" | "false"
      defaultFolded: "true" | "false"
    }
  ) => {
    const [local, rest] = splitProps(props, ["isFoldable", "defaultFolded"])
    return (
      <CalloutRoot
        isFoldable={local.isFoldable === "true"}
        defaultFolded={local.defaultFolded === "true"}
        {...rest}
      />
    )
  },
  "callout-title": (
    props: Omit<CalloutTitleProps, "isFoldable"> & {
      isFoldable: "true" | "false"
    }
  ) => {
    const [local, rest] = splitProps(props, ["isFoldable"])
    return <CalloutTitle isFoldable={local.isFoldable === "true"} {...rest} />
  },
  "callout-body": (
    props: Omit<CalloutBodyProps, "isFoldable"> & {
      isFoldable: "true" | "false"
    }
  ) => {
    const [local, rest] = splitProps(props, ["isFoldable"])
    return <CalloutBody isFoldable={local.isFoldable === "true"} {...rest} />
  },
  "oembed-video": (props: OEmbedVideoProps) => (
    <NoHydration>
      <OEmbedVideo {...props} />
    </NoHydration>
  ),
  "oembed-rich": (props: OEmbedRichProps) => (
    <NoHydration>
      <OEmbedRich {...props} />
    </NoHydration>
  ),
  "link-card": LinkCard,
  oembed: OEmbed,
}

export {
  Blockquote,
  CodeBlock,
  H1,
  H2,
  H3,
  H4,
  Image,
  InlineCode,
  Link,
  LinkCard,
  List,
  ListItem,
  OEmbed,
  OrderedList,
  Paragraph,
  Section,
  Separator,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
}
