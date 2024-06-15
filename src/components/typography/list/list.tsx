import { type Component, type ComponentProps, splitProps } from "solid-js"

import { cn } from "~/libs/utils"

export type ListProps = ComponentProps<"ul">

export const List: Component<ListProps> = (props) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <ul class={cn("group ml-6 list-disc [&>li]:mt-2", local.class)} {...rest} />
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
    <ol class={cn("ml-6 list-decimal [&>li]:mt-2", local.class)} {...rest} />
  )
}
