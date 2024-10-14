import { type Component, type ComponentProps, splitProps } from "solid-js"

import { cn } from "@/lib/utils"

export type InlineCodeProps = ComponentProps<"code">

export const InlineCode: Component<InlineCodeProps> = (props) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <code
      class={cn(
        "mx-1 rounded-md bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",
        local.class
      )}
      {...rest}
    />
  )
}
