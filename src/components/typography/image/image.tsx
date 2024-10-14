import { Polymorphic, type PolymorphicProps } from "@kobalte/core"
import {
  type Component,
  type ComponentProps,
  type JSX,
  splitProps,
  type ValidComponent,
} from "solid-js"

import { cn } from "@/lib/utils"

export type ImageProps = Omit<ComponentProps<"img">, "title"> & {
  title?: JSX.Element
}

export const Image: Component<ImageProps> = (props) => {
  const [local, rest] = splitProps(props, [
    "class",
    "title",
    "decoding",
    "loading",
    "src",
    "srcset",
    "children",
  ])
  return (
    <figure class="grid justify-center space-y-2">
      {(local.src || local.srcset) && (
        <img
          class={cn("mx-auto w-full max-w-screen-lg rounded-lg", local.class)}
          decoding={local.decoding ?? "async"}
          loading={local.loading ?? "lazy"}
          src={local.src}
          srcset={local.srcset}
          {...rest}
        />
      )}
      {local.children}
      {local.title && (
        <ImageCaption class="max-w-screen-md">{local.title}</ImageCaption>
      )}
    </figure>
  )
}

export type ImageCaptionProps<T extends ValidComponent = "figcaption"> =
  PolymorphicProps<T> & {
    class?: string
  }

export const ImageCaption = <T extends ValidComponent = "figcaption">(
  props: ImageCaptionProps<T>
) => {
  const [local, rest] = splitProps(props, ["class", "as"])
  return (
    <Polymorphic
      as={local.as ?? "figcaption"}
      class={cn("mx-auto w-fit italic text-muted-foreground", local.class)}
      {...rest}
    />
  )
}

export type ImagePictureProps<T extends ValidComponent = "picture"> =
  PolymorphicProps<T>

export const ImagePicture = <T extends ValidComponent = "picture">(
  props: ImagePictureProps<T>
) => {
  const [local, rest] = splitProps(props, ["as"])
  return <Polymorphic as={local.as ?? "picture"} {...rest} />
}

export type ImageSourceProps<T extends ValidComponent = "source"> =
  PolymorphicProps<T>

export const ImageSource = <T extends ValidComponent = "source">(
  props: ImageSourceProps<T>
) => {
  const [local, rest] = splitProps(props, ["as"])
  return <Polymorphic as={local.as ?? "source"} {...rest} />
}
