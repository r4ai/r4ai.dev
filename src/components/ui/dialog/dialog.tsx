import * as DialogPrimitive from "@kobalte/core/dialog"
import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import type { ComponentProps, ParentProps, ValidComponent } from "solid-js"
import { mergeProps, splitProps } from "solid-js"

import { cn } from "~/libs/utils"

export const Dialog = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger

export type DialogProps = Parameters<typeof Dialog>[0]
export type DialogTriggerProps = Parameters<typeof DialogTrigger>[0]

export type DialogOverlayProps = DialogPrimitive.DialogOverlayProps & {
  class?: string
}

export const DialogOverlay = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, DialogOverlayProps>,
) => {
  const [local, rest] = splitProps(props as DialogOverlayProps, ["class"])

  return (
    <DialogPrimitive.Overlay
      class={cn(
        "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0",
        local.class,
      )}
      {...rest}
    />
  )
}

export type DialogContentProps = ParentProps<
  DialogPrimitive.DialogContentProps & {
    class?: string
    closeButton?: boolean
  }
>

export const DialogContent = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, DialogContentProps>,
) => {
  const mergedProps = mergeProps<DialogContentProps[]>(
    { closeButton: true },
    props,
  )
  const [local, rest] = splitProps(mergedProps, [
    "class",
    "children",
    "closeButton",
  ])

  return (
    <DialogPrimitive.Portal>
      <DialogOverlay />
      <div class="fixed inset-0 z-50 flex items-center justify-center">
        <DialogPrimitive.Content
          class={cn(
            "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95 data-[closed]:slide-out-to-left-1/2 data-[closed]:slide-out-to-top-[48%] data-[expanded]:slide-in-from-left-1/2 data-[expanded]:slide-in-from-top-[48%] sm:rounded-lg md:w-full",
            local.class,
          )}
          {...rest}
        >
          {local.children}
          {local.closeButton && (
            <DialogPrimitive.CloseButton class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-[opacity,box-shadow] hover:opacity-100 focus:outline-none focus:ring-[1.5px] focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="h-4 w-4"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M18 6L6 18M6 6l12 12"
                />
              </svg>
              <span class="sr-only">Close</span>
            </DialogPrimitive.CloseButton>
          )}
        </DialogPrimitive.Content>
      </div>
    </DialogPrimitive.Portal>
  )
}

export type DialogTitleProps = DialogPrimitive.DialogTitleProps & {
  class?: string
}

export const DialogTitle = <T extends ValidComponent = "h2">(
  props: PolymorphicProps<T, DialogTitleProps>,
) => {
  const [local, rest] = splitProps(props as DialogTitleProps, ["class"])

  return (
    <DialogPrimitive.Title
      class={cn("text-lg font-semibold text-foreground", local.class)}
      {...rest}
    />
  )
}

export type DialogDescriptionProps = DialogPrimitive.DialogDescriptionProps & {
  class?: string
}

export const DialogDescription = <T extends ValidComponent = "p">(
  props: PolymorphicProps<T, DialogDescriptionProps>,
) => {
  const [local, rest] = splitProps(props as DialogDescriptionProps, ["class"])

  return (
    <DialogPrimitive.Description
      class={cn("text-sm text-muted-foreground", local.class)}
      {...rest}
    />
  )
}

export type DialogHeaderProps = ComponentProps<"div">

export const DialogHeader = (props: DialogHeaderProps) => {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <div
      class={cn(
        "flex flex-col space-y-2 text-center sm:text-left",
        local.class,
      )}
      {...rest}
    />
  )
}

export type DialogFooterProps = ComponentProps<"div">

export const DialogFooter = (props: DialogFooterProps) => {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <div
      class={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
        local.class,
      )}
      {...rest}
    />
  )
}
