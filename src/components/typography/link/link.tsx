import { A } from "@solidjs/router"
import { type Component, type ComponentProps, splitProps } from "solid-js"

import { cn } from "~/libs/utils"

export type LinkProps = ComponentProps<"a">

export const Link: Component<LinkProps> = (props) => {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <A class={cn("underline transition hover:opacity-75", local)} {...rest} />
  )
}
