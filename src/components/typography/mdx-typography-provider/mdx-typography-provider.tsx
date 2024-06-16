import type { Component, ComponentProps, JSX } from "solid-js"
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
        ...props.components,
      }}
    >
      {props.children}
    </MDXProvider>
  )
}
