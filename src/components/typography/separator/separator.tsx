import { type Component, type ComponentProps, splitProps } from "solid-js"

import { cn } from "~/libs/utils"

export type SeparatorProps = ComponentProps<"hr">

export const Separator: Component<SeparatorProps> = (props) => {
  const [local, rest] = splitProps(props, ["class"])
  return <hr class={cn("mx-auto max-w-screen-md", local.class)} {...rest} />
}
