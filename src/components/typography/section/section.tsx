import { type Component, type ComponentProps, splitProps } from "solid-js"

import { cn } from "@/lib/utils"

export type SectionProps = ComponentProps<"section"> & {
  level: "0" | "1" | "2" | "3" | "4" | "5" | "6"
}

export const Section: Component<SectionProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "level"])
  return (
    <section
      class={cn("group space-y-6", local.class)}
      data-heading-level={parseInt(local.level) > 0 ? local.level : undefined}
      {...rest}
    />
  )
}
