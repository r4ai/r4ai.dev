import "~/styles/katex.css"

import { type Component, type ComponentProps, splitProps } from "solid-js"

import { MDXTypographyProvider } from "~/components/typography"
import { cn } from "~/libs/utils"

import { PostHeader } from "./post-header"

export type PostLayoutProps = ComponentProps<"article">

export const PostLayout: Component<PostLayoutProps> = (props) => {
  const [local, rest] = splitProps(props, ["children", "class"])

  return (
    <article class={cn("container", local.class)} {...rest}>
      <MDXTypographyProvider
        components={{
          header: PostHeader,
        }}
      >
        {local.children}
      </MDXTypographyProvider>
    </article>
  )
}
