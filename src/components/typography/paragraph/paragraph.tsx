import { type Component, type ComponentProps, splitProps } from "solid-js"

import { cn } from "~/libs/utils"

export type ParagraphProps = ComponentProps<"p">

export const Paragraph: Component<ParagraphProps> = (props) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <p class={cn("mx-auto max-w-screen-md leading-7", local.class)} {...rest} />
  )
}
