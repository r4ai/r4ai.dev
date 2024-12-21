import * as DrawerPrimitive from "@corvu/drawer"
import type { ComponentProps, ParentProps, ValidComponent } from "solid-js"
import { splitProps } from "solid-js"

import { cn } from "@/lib/utils"

export type DrawerProps = DrawerPrimitive.RootProps
export const Drawer = DrawerPrimitive.Root

export type DrawerTriggerProps = DrawerPrimitive.TriggerProps
export const DrawerTrigger = DrawerPrimitive.Trigger

export type DrawerCloseProps = DrawerPrimitive.CloseProps
export const DrawerClose = DrawerPrimitive.Close

export type DrawerContentProps<T extends ValidComponent = "div"> = ParentProps<
  DrawerPrimitive.ContentProps<T> & {
    class?: string
  }
>

export const DrawerContent = <T extends ValidComponent = "div">(
  props: DrawerPrimitive.DynamicProps<T, DrawerContentProps<T>>
) => {
  const [local, rest] = splitProps(props as DrawerContentProps, [
    "class",
    "children",
  ])
  const ctx = DrawerPrimitive.useContext()

  return (
    <DrawerPrimitive.Portal>
      <DrawerPrimitive.Overlay
        class="fixed inset-0 z-50 data-[transitioning]:transition-colors data-[transitioning]:duration-200"
        style={{
          "background-color": `hsl(var(--background) / ${0.8 * ctx.openPercentage()})`,
        }}
      />
      <DrawerPrimitive.Content
        class={cn(
          "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-xl border bg-background after:absolute after:inset-x-0 after:top-full after:h-[50%] after:bg-inherit data-[transitioning]:transition-transform data-[transitioning]:duration-200 md:select-none",
          local.class
        )}
        {...rest}
      >
        <div class="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
        {local.children}
      </DrawerPrimitive.Content>
    </DrawerPrimitive.Portal>
  )
}

export type DrawerHeaderProps = ComponentProps<"div">

export const DrawerHeader = (props: DrawerHeaderProps) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <div
      class={cn("grid gap-1.5 p-4 text-center sm:text-left", local.class)}
      {...rest}
    />
  )
}

export type DrawerFooterProps = ComponentProps<"div">

export const DrawerFooter = (props: DrawerFooterProps) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <div class={cn("mt-auto flex flex-col gap-2 p-4", local.class)} {...rest} />
  )
}

export type DrawerLabelProps = DrawerPrimitive.LabelProps & {
  class?: string
}

export const DrawerLabel = <T extends ValidComponent = "h2">(
  props: DrawerPrimitive.DynamicProps<T, DrawerLabelProps>
) => {
  const [local, rest] = splitProps(props as DrawerLabelProps, ["class"])

  return (
    <DrawerPrimitive.Label
      class={cn(
        "text-lg font-semibold leading-none tracking-tight",
        local.class
      )}
      {...rest}
    />
  )
}

export type DrawerDescriptionProps = DrawerPrimitive.DescriptionProps & {
  class?: string
}

export const DrawerDescription = <T extends ValidComponent = "p">(
  props: DrawerPrimitive.DynamicProps<T, DrawerDescriptionProps>
) => {
  const [local, rest] = splitProps(props as DrawerDescriptionProps, ["class"])

  return (
    <DrawerPrimitive.Description
      class={cn("text-sm text-muted-foreground", local.class)}
      {...rest}
    />
  )
}
