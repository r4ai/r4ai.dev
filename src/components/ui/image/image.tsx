import {
  type Component,
  type ComponentProps,
  createMemo,
  splitProps,
} from "solid-js"

import type { Image as ImageType } from "~/libs/vite-plugins/vite-plugin-image/plugin"

export type ImageProps = Omit<ComponentProps<"img">, "src"> & {
  image: ImageType
}

export const Image: Component<ImageProps> = (props) => {
  const [local, rest] = splitProps(props, [
    "image",
    "class",
    "width",
    "height",
    "decoding",
    "loading",
  ])

  const avif = createMemo(() => local.image.url.avif)
  const webp = createMemo(() => local.image.url.webp)
  const original = createMemo(
    () =>
      Object.entries(local.image.url).find(
        ([ext]) => !["avif", "webp"].includes(ext),
      )?.[1],
  )

  return (
    <picture>
      {import.meta.env.PROD && (
        <>
          <source srcset={avif()} type="image/avif" />
          <source srcset={webp()} type="image/webp" />
        </>
      )}
      <img
        src={original()}
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
