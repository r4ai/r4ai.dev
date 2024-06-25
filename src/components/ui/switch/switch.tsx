import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import * as SwitchPrimitive from "@kobalte/core/switch"
import type { ParentProps, ValidComponent, VoidProps } from "solid-js"
import { splitProps } from "solid-js"

import { cn } from "~/libs/utils"

export const SwitchLabel = SwitchPrimitive.Label
export const Switch = SwitchPrimitive.Switch
export const SwitchErrorMessage = SwitchPrimitive.ErrorMessage
export const SwitchDescription = SwitchPrimitive.Description

export type SwitchLabelProps = Parameters<typeof SwitchLabel>[0]
export type SwitchProps = Parameters<typeof Switch>[0]
export type SwitchErrorMessageProps = Parameters<typeof SwitchErrorMessage>[0]
export type SwitchDescriptionProps = Parameters<typeof SwitchDescription>[0]

export type SwitchControlProps<T extends ValidComponent = "input"> =
  ParentProps<
    PolymorphicProps<T, SwitchPrimitive.SwitchControlProps> & { class?: string }
  >

export const SwitchControl = <T extends ValidComponent = "input">(
  props: SwitchControlProps<T>,
) => {
  const [local, rest] = splitProps(props as SwitchControlProps, [
    "class",
    "children",
  ])

  return (
    <>
      <SwitchPrimitive.Input class="[&:focus-visible+div]:outline-none [&:focus-visible+div]:ring-2 [&:focus-visible+div]:ring-offset-2 [&:focus-visible+div]:ring-ring [&:focus-visible+div]:ring-offset-background" />
      <SwitchPrimitive.Control
        class={cn(
          "inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full p-[2px] bg-input shadow-sm transition-(color background-color box-shadow) data-[disabled]:cursor-not-allowed data-[checked]:bg-primary data-[disabled]:opacity-50",
          local.class,
        )}
        {...rest}
      >
        {local.children}
      </SwitchPrimitive.Control>
    </>
  )
}

export type SwitchThumbProps<T extends ValidComponent = "div"> =
  PolymorphicProps<
    T,
    VoidProps<SwitchPrimitive.SwitchThumbProps & { class?: string }>
  >

export const SwitchThumb = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, SwitchThumbProps<T>>,
) => {
  const [local, rest] = splitProps(props as SwitchThumbProps, ["class"])

  return (
    <SwitchPrimitive.Thumb
      class={cn(
        "pointer-events-none block h-5 w-5 translate-x-0 rounded-full bg-background shadow-lg ring-0 transition-transform data-[checked]:translate-x-5",
        local.class,
      )}
      {...rest}
    />
  )
}
