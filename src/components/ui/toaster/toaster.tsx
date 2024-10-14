import { createSignal, onMount } from "solid-js"
import { Toaster as Sonner } from "solid-sonner"

import {
  getResolvedColorScheme,
  type ResolvedColorScheme,
  subscribeResolvedColorSchemeChange,
} from "@/features/color-scheme"

export type ToasterProps = Parameters<typeof Sonner>[0]

export const Toaster = (props: ToasterProps) => {
  const [resolvedColorScheme, setResolvedColorScheme] =
    createSignal<ResolvedColorScheme>("light")

  onMount(() => {
    setResolvedColorScheme(getResolvedColorScheme())
    return subscribeResolvedColorSchemeChange(setResolvedColorScheme)
  })

  return (
    <Sonner
      theme={resolvedColorScheme()}
      class="toaster group"
      toastOptions={{
        classes: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg group-[.toaster]:data-[type=error]:[&_.data-icon]:text-destructive group-[.toaster]:data-[type=info]:[&_.data-icon]:text-info group-[.toaster]:data-[type=success]:[&_.data-icon]:text-success",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          closeButton:
            "transition !border-border bg-background text-foreground hover:!bg-muted",
        },
      }}
      closeButton
      {...props}
    />
  )
}
