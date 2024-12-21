import { type Component, type ComponentProps, splitProps } from "solid-js"

import { cn } from "@/lib/utils"

export type KbdProps = ComponentProps<"kbd">

export const Kbd: Component<KbdProps> = (props) => {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <kbd
      class={cn(
        "rounded-md border px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
        local.class
      )}
      {...rest}
    />
  )
}
