import { type Component, type ComponentProps, splitProps } from "solid-js"

import { cn } from "@/lib/utils"

export type ParagraphProps = ComponentProps<"p">

export const Paragraph: Component<ParagraphProps> = (props) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <p
      class={cn("max-w-(--breakpoint-md) mx-auto leading-7", local.class)}
      {...rest}
    />
  )
}
