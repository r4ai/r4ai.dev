import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import type {
  TabsContentProps as TabsPrimitiveContentProps,
  TabsIndicatorProps as TabsPrimitiveIndicatorProps,
  TabsListProps as TabsPrimitiveListProps,
  TabsRootProps as TabsPrimitiveRootProps,
  TabsTriggerProps as TabsPrimitiveTriggerProps,
} from "@kobalte/core/tabs"
import { Tabs as TabsPrimitive } from "@kobalte/core/tabs"
import type { ValidComponent, VoidProps } from "solid-js"
import { splitProps } from "solid-js"
import { tv, type VariantProps } from "tailwind-variants"

import { cn } from "@/lib/utils"

export type TabsProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  TabsPrimitiveRootProps & {
    class?: string
  }
>

export const Tabs = <T extends ValidComponent = "div">(props: TabsProps<T>) => {
  const [local, rest] = splitProps(props as TabsProps, ["class"])

  return (
    <TabsPrimitive
      class={cn("w-full data-[orientation=vertical]:flex", local.class)}
      {...rest}
    />
  )
}

export type TabsListProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  TabsPrimitiveListProps & {
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
        "relative flex w-full rounded-lg bg-muted p-1 text-muted-foreground data-[orientation=vertical]:flex-col data-[orientation=horizontal]:items-center data-[orientation=vertical]:items-stretch",
        local.class
      )}
      {...rest}
    />
  )
}

export type TabsContentProps<T extends ValidComponent = "div"> =
  PolymorphicProps<
    T,
    TabsPrimitiveContentProps & {
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
        "transition-shadow duration-200 focus-visible:outline-none focus-visible:ring-[1.5px] focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background data-[orientation=horizontal]:mt-2 data-[orientation=vertical]:ml-2",
        local.class
      )}
      {...rest}
    />
  )
}

export type TabsTriggerProps<T extends ValidComponent = "button"> =
  PolymorphicProps<
    T,
    TabsPrimitiveTriggerProps & {
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
        "peer relative z-10 inline-flex h-7 w-full items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium outline-none transition-colors disabled:pointer-events-none disabled:opacity-50 data-[selected]:text-foreground",
        local.class
      )}
      {...rest}
    />
  )
}

const tabsIndicatorVariants = tv({
  base: "absolute transition-all duration-200 outline-none",
  variants: {
    variant: {
      block:
        "data-[orientation=horizontal]:bottom-1 data-[orientation=horizontal]:left-0 data-[orientation=vertical]:right-1 data-[orientation=vertical]:top-0 data-[orientation=horizontal]:h-[calc(100%-0.5rem)] data-[orientation=vertical]:w-[calc(100%-0.5rem)] bg-background shadow rounded-md peer-focus-visible:ring-[1.5px] peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background peer-focus-visible:outline-none",
      underline:
        "data-[orientation=horizontal]:-bottom-[1px] data-[orientation=horizontal]:left-0 data-[orientation=vertical]:-right-[1px] data-[orientation=vertical]:top-0 data-[orientation=horizontal]:h-[2px] data-[orientation=vertical]:w-[2px] bg-primary",
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
      TabsPrimitiveIndicatorProps &
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
      class={cn(tabsIndicatorVariants({ variant: local.variant }), local.class)}
      {...rest}
    />
  )
}
