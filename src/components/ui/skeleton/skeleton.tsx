import { type Component, type ComponentProps, splitProps } from "solid-js"

import { cn } from "~/libs/utils"

export type SkeletonProps = ComponentProps<"div">

export const Skeleton: Component<SkeletonProps> = (props) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <div
      class={cn("animate-pulse rounded-md bg-primary/10", local.class)}
      {...rest}
    />
  )
}
