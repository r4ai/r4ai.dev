import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import * as TabsPrimitive from "@kobalte/core/tabs"
import type { ValidComponent, VoidProps } from "solid-js"
import { splitProps } from "solid-js"
import { tv, type VariantProps } from "tailwind-variants"

import { cn } from "@/lib/utils"

export type TabsProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  TabsPrimitive.TabsRootProps & {
    class?: string
  }
>

export const Tabs = <T extends ValidComponent = "div">(props: TabsProps<T>) => {
  const [local, rest] = splitProps(props as TabsProps, ["class"])

  return (
    <TabsPrimitive.Tabs
      class={cn("z-0 w-full data-[orientation=vertical]:flex", local.class)}
      {...rest}
    />
  )
}

export type TabsListProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  TabsPrimitive.TabsListProps & {
    class?: string
  }
>

export const TabsList = <T extends ValidComponent = "div">(
  props: TabsListProps<T>
) => {
  const [local, rest] = splitProps(props as TabsListProps, ["class"])

  return (
    <TabsPrimitive.List
      class={cn(
        "data-[orientation=vertical]:(flex-col items-stretch) relative flex w-full rounded-lg bg-muted p-1 text-muted-foreground data-[orientation=horizontal]:items-center",
        local.class
      )}
      {...rest}
    />
  )
}

export type TabsContentProps<T extends ValidComponent = "div"> =
  PolymorphicProps<
    T,
    TabsPrimitive.TabsContentProps & {
      class?: string
    }
  >

export const TabsContent = <T extends ValidComponent = "div">(
  props: TabsContentProps<T>
) => {
  const [local, rest] = splitProps(props as TabsContentProps, ["class"])

  return (
    <TabsPrimitive.Content
      class={cn(
        "focus-visible:(ring-offset-background ring-1.5 ring-offset-2) outline-none ring-ring transition-shadow duration-200 data-[orientation=horizontal]:mt-2 data-[orientation=vertical]:ml-2",
        local.class
      )}
      {...rest}
    />
  )
}

export type TabsTriggerProps<T extends ValidComponent = "button"> =
  PolymorphicProps<
    T,
    TabsPrimitive.TabsTriggerProps & {
      class?: string
    }
  >

export const TabsTrigger = <T extends ValidComponent = "button">(
  props: TabsTriggerProps<T>
) => {
  const [local, rest] = splitProps(props as TabsTriggerProps, ["class"])

  return (
    <TabsPrimitive.Trigger
      class={cn(
        "disabled:(pointer-events-none opacity-50) peer z-20 inline-flex h-7 w-full items-center justify-center whitespace-nowrap rounded-md !bg-transparent px-3 py-1 text-sm font-medium outline-none transition-colors data-[selected]:text-foreground",
        local.class
      )}
      {...rest}
    />
  )
}

export const tabsIndicatorVariants = tv({
  base: "absolute transition-all transition-property-[box-shadow,transform] duration-200 outline-none z-10",
  variants: {
    variant: {
      block:
        "data-[orientation=horizontal]:(bottom-1 left-0 h-[calc(100%-0.5rem)]) data-[orientation=vertical]:(right-1 top-0 w-[calc(100%-0.5rem)]) bg-background shadow rounded-md peer-focus-visible:(ring-1.5 ring-ring ring-offset-2 ring-offset-background outline-none)",
      underline:
        "data-[orientation=horizontal]:(-bottom-[1px] left-0 h-2px) data-[orientation=vertical]:(-right-[1px] top-0 w-2px) bg-primary",
    },
  },
  defaultVariants: {
    variant: "block",
  },
})

export type TabsIndicatorProps<T extends ValidComponent = "div"> =
  PolymorphicProps<
    T,
    VoidProps<
      TabsPrimitive.TabsIndicatorProps &
        VariantProps<typeof tabsIndicatorVariants> & {
          class?: string
        }
    >
  >

export const TabsIndicator = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, TabsIndicatorProps<T>>
) => {
  const [local, rest] = splitProps(props as TabsIndicatorProps, [
    "class",
    "variant",
  ])

  return (
    <TabsPrimitive.Indicator
      class={cn(
        "transition-property-[box-shadow,transform] data-[orientation=horizontal]:(bottom-1 h-[calc(100%-0.5rem)]) data-[orientation=vertical]:(right-1 w-[calc(100%-0.5rem)]) peer-focus-visible:(ring-1.5 outline-none) absolute left-0 top-0 z-10 rounded-md bg-background shadow outline-none ring-ring ring-offset-2 ring-offset-background transition-all duration-200",
        local.class
      )}
      {...rest}
    />
  )
}
