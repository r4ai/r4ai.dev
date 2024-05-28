import {
  type Component,
  type ComponentProps,
  createMemo,
  splitProps,
} from "solid-js"
import { NoHydration } from "solid-js/web"

import type { Image as ImageType } from "~/libs/vite-plugins/vite-plugin-image/plugin"

export type ImageProps = Omit<ComponentProps<"img">, "src"> & {
  image: ImageType
}

const ImageInternal: Component<ImageProps> = (props) => {
  const [local, rest] = splitProps(props, [
    "image",
    "class",
    "width",
    "height",
    "decoding",
    "loading",
  ])

  return (
    <picture>
      {import.meta.env.PROD && (
        <>
          <source srcset={local.image.url.avif} type="image/avif" />
          <source srcset={local.image.url.webp} type="image/webp" />
        </>
      )}
      <img
        src={local.image.url[local.image.metadata.format ?? "webp"]}
        class={local.class}
        width={local.width ?? local.image.metadata.width}
        height={local.height ?? local.image.metadata.height}
        decoding={local.decoding ?? "async"}
        loading={local.loading ?? "lazy"}
        {...rest}
      />
    </picture>
  )
}

export const Image: Component<ImageProps> = (props) => (
  <NoHydration>
    <ImageInternal {...props} />
  </NoHydration>
)
