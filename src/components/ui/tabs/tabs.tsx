import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import * as TabsPrimitive from "@kobalte/core/tabs"
import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"
import type { ValidComponent, VoidProps } from "solid-js"
import { splitProps } from "solid-js"

import { cn } from "~/libs/utils"

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
      class={cn("w-full data-[orientation=vertical]:flex z-0", local.class)}
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
  props: TabsListProps<T>,
) => {
  const [local, rest] = splitProps(props as TabsListProps, ["class"])

  return (
    <TabsPrimitive.List
      class={cn(
        "relative flex rounded-lg bg-muted p-1 text-muted-foreground data-[orientation=vertical]:(flex-col items-stretch) data-[orientation=horizontal]:items-center w-full",
        local.class,
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
  props: TabsContentProps<T>,
) => {
  const [local, rest] = splitProps(props as TabsContentProps, ["class"])

  return (
    <TabsPrimitive.Content
      class={cn(
        "data-[orientation=vertical]:ml-2 data-[orientation=horizontal]:mt-2 transition-shadow duration-200 focus-visible:(ring-offset-background outline-none ring-1.5 ring-ring ring-offset-2)",
        local.class,
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
  props: TabsTriggerProps<T>,
) => {
  const [local, rest] = splitProps(props as TabsTriggerProps, ["class"])

  return (
    <TabsPrimitive.Trigger
      class={cn(
        "w-full inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium transition-colors disabled:(pointer-events-none opacity-50) data-[selected]:text-foreground peer h-7 outline-none !bg-transparent z-20",
        local.class,
      )}
      {...rest}
    />
  )
}

const tabsIndicatorVariants = cva(
  "absolute transition-all transition-property-[box-shadow,transform] duration-200 outline-none z-10",
  {
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
  },
)

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
  props: PolymorphicProps<T, TabsIndicatorProps<T>>,
) => {
  const [local, rest] = splitProps(props as TabsIndicatorProps, [
    "class",
    "variant",
  ])

  return (
    <TabsPrimitive.Indicator
      class={cn(
        "absolute transition-all transition-property-[box-shadow,transform] duration-200 outline-none z-10 data-[orientation=horizontal]:(bottom-1 left-0 h-[calc(100%-0.5rem)]) data-[orientation=vertical]:(right-1 top-0 w-[calc(100%-0.5rem)]) bg-background shadow rounded-md peer-focus-visible:(ring-1.5 ring-ring ring-offset-2 ring-offset-background outline-none)",
        local.class,
      )}
      {...rest}
    />
  )
}
