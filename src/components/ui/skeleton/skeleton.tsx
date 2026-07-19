import { type Component, type ComponentProps, splitProps } from "solid-js"

import { cn } from "@/lib/utils"

export type SkeletonProps = ComponentProps<"div">

export const Skeleton: Component<SkeletonProps> = (props) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <div
      class={cn("bg-primary/10 animate-pulse rounded-md", local.class)}
      {...rest}
    />
  )
}
