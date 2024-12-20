import type {
  ImageFallbackProps,
  ImageImgProps,
  ImageRootProps,
} from "@kobalte/core/image"
import { Image as ImagePrimitive } from "@kobalte/core/image"
import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import type { JSXElement, ValidComponent } from "solid-js"
import { splitProps } from "solid-js"

import { cn } from "@/lib/utils"

export type IconRootProps<T extends ValidComponent = "span"> =
  ImageRootProps<T> & {
    class?: string
  }

export const IconRoot = <T extends ValidComponent = "span">(
  props: PolymorphicProps<T, IconRootProps<T>>
) => {
  const [local, rest] = splitProps(props as IconRootProps, ["class"])

  return (
    <ImagePrimitive
      class={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
        local.class
      )}
      {...rest}
    />
  )
}

export type IconProps<T extends ValidComponent = "img"> = ImageImgProps<T> & {
  class?: string
  children?: JSXElement
}

export const Icon = <T extends ValidComponent = "img">(
  props: PolymorphicProps<T, IconProps<T>>
) => {
  const [local, rest] = splitProps(props as IconProps, ["class", "children"])

  return (
    <>
      {local.children ? (
        <div class={cn("aspect-square h-full w-full", local.class)}>
          {local.children}
        </div>
      ) : (
        <ImagePrimitive.Img
          class={cn("aspect-square h-full w-full", local.class)}
          {...rest}
        />
      )}
    </>
  )
}

export type IconFallbackProps<T extends ValidComponent = "span"> =
  ImageFallbackProps<T> & {
    class?: string
  }

export const IconFallback = <T extends ValidComponent = "span">(
  props: PolymorphicProps<T, IconFallbackProps<T>>
) => {
  const [local, rest] = splitProps(props as IconFallbackProps, ["class"])

  return (
    <ImagePrimitive.Fallback
      class={cn(
        "flex h-full w-full items-center justify-center rounded-full bg-muted",
        local.class
      )}
      {...rest}
    />
  )
}
