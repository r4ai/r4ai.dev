import { format } from "@formkit/tempo"
import { type Component, type ComponentProps, splitProps } from "solid-js"

import { cn } from "@/lib/utils"
import IconCalendarDays from "~icons/lucide/calendar-days"

export type PublishedAtProps = ComponentProps<"div"> & {
  publishedAt: Date
}

export const PublishedAt: Component<PublishedAtProps> = (props) => {
  const [local, rest] = splitProps(props, ["publishedAt", "class"])

  return (
    <div {...rest} class={cn("flex flex-row items-center gap-1", local.class)}>
      <IconCalendarDays class="inline-block" />
      <span>{`${format(local.publishedAt, "medium", "ja")} に公開`}</span>
    </div>
  )
}
