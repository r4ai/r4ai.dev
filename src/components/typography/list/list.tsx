import { type Component, type ComponentProps, splitProps } from "solid-js"

import { cn } from "@/lib/utils"

export type ListProps = ComponentProps<"ul">

export const List: Component<ListProps> = (props) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <ul
      class={cn(
        "max-w-(--breakpoint-md) group mx-auto list-disc pl-6 [&>li]:mt-2",
        local.class
      )}
      {...rest}
    />
  )
}

export type ListItemProps = ComponentProps<"li">

export const ListItem: Component<ListItemProps> = (props) => {
  const [local, rest] = splitProps(props, ["class"])

  return <li class={cn(local.class)} {...rest} />
}

export type OrderedListPRops = ComponentProps<"ol">

export const OrderedList: Component<OrderedListPRops> = (props) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <ol
      class={cn(
        "max-w-(--breakpoint-md) mx-auto list-decimal pl-6 [&>li]:mt-2",
        local.class
      )}
      {...rest}
    />
  )
}
