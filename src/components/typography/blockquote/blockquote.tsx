import { type Component, type ComponentProps, splitProps } from "solid-js"

import { cn } from "@/lib/utils"

export type BlockquoteProps = ComponentProps<"blockquote">

export const Blockquote: Component<BlockquoteProps> = (props) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <blockquote
      class={cn(
        "text-muted-foreground mx-auto flex max-w-(--breakpoint-md) flex-col gap-y-4 border-l-[3px] border-zinc-300 pl-4 dark:border-zinc-700",
        local.class
      )}
      {...rest}
    />
  )
}
