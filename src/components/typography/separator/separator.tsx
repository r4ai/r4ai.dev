import { type Component, type ComponentProps, splitProps } from "solid-js"

import { cn } from "@/lib/utils"

export type SeparatorProps = ComponentProps<"hr">

export const Separator: Component<SeparatorProps> = (props) => {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <hr class={cn("mx-auto max-w-(--breakpoint-md)", local.class)} {...rest} />
  )
}
