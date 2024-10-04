import {
  type Component,
  type ComponentProps,
  type JSXElement,
  splitProps,
} from "solid-js"
import { NoHydration } from "solid-js/web"

export type ImageProps = Omit<ComponentProps<"img">, "src"> & {
  src?: string
  children?: JSXElement
}

const ImageComponent: Component<ImageProps> = (props) => {
  const [local, rest] = splitProps(props, [
    "children",
    "src",
    "class",
    "width",
    "height",
    "decoding",
    "loading",
  ])

  return (
    <picture>
      {local.src && (
        <img
          src={local.src}
          class={local.class}
          decoding={local.decoding ?? "async"}
          loading={local.loading ?? "lazy"}
          {...rest}
        />
      )}
      {local.children}
    </picture>
  )
}

export const Image: Component<ImageProps> = (props) => (
  <NoHydration>
    <ImageComponent {...props} />
  </NoHydration>
)
