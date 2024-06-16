import { type Component, type ComponentProps, splitProps } from "solid-js"

import { cn } from "~/libs/utils"

export type BlockquoteProps = ComponentProps<"blockquote">

export const Blockquote: Component<BlockquoteProps> = (props) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <blockquote
      class={cn(
        "mx-auto max-w-screen-md space-y-4 border-l-[3px] border-zinc-300 pl-4 text-muted-foreground dark:border-zinc-700",
        local.class,
      )}
      {...rest}
    />
  )
}
