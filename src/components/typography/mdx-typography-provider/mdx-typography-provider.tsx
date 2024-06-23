import {
  type Component,
  type ComponentProps,
  type JSX,
  splitProps,
} from "solid-js"
import { NoHydration } from "solid-js/web"
import { MDXProvider } from "solid-jsx"

import {
  Blockquote,
  CodeBlock,
  Heading,
  Image,
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
  TableRow,
} from "~/components/typography"
import {
  CalloutBody,
  type CalloutBodyProps,
  CalloutRoot,
  type CalloutRootProps,
  CalloutTitle,
  type CalloutTitleProps,
  LinkCard,
  OEmbedRich,
  type OEmbedRichProps,
  OEmbedVideo,
  type OEmbedVideoProps,
} from "~/components/ui"

export type MDXTypographyProviderProps = {
  children?: JSX.Element
  components?: Parameters<typeof MDXProvider>[0]["components"]
}

export const MDXTypographyProvider: Component<MDXTypographyProviderProps> = (
  props,
) => {
  return (
    <MDXProvider
      components={{
        h1: (props: ComponentProps<"h1">) => <Heading level="h1" {...props} />,
        h2: (props: ComponentProps<"h2">) => <Heading level="h2" {...props} />,
        h3: (props: ComponentProps<"h3">) => <Heading level="h3" {...props} />,
        h4: (props: ComponentProps<"h4">) => <Heading level="h4" {...props} />,
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
        thead: TableHead,
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
          },
        ) => {
          const [local, rest] = splitProps(props, [
            "isFoldable",
            "defaultFolded",
          ])
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
          },
        ) => {
          const [local, rest] = splitProps(props, ["isFoldable"])
          return (
            <CalloutTitle isFoldable={local.isFoldable === "true"} {...rest} />
          )
        },
        "callout-body": (
          props: Omit<CalloutBodyProps, "isFoldable"> & {
            isFoldable: "true" | "false"
          },
        ) => {
          const [local, rest] = splitProps(props, ["isFoldable"])
          return (
            <CalloutBody isFoldable={local.isFoldable === "true"} {...rest} />
          )
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
        ...props.components,
      }}
    >
      {props.children}
    </MDXProvider>
  )
}
