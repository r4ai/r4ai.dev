import { type Component, type ComponentProps, splitProps } from "solid-js"
import { NoHydration } from "solid-js/web"

export type ImageProps = Omit<ComponentProps<"img">, "src"> & {
  src:
    | {
        avif?: string
        webp?: string
        fallback: string
      }
    | string
}

const ImageComponent: Component<ImageProps> = (props) => {
  const [local, rest] = splitProps(props, [
    "src",
    "class",
    "width",
    "height",
    "decoding",
    "loading",
  ])

  return (
    <picture>
      {import.meta.env.PROD && typeof local.src === "object" && (
        <>
          {local.src.avif && (
            <source srcset={local.src.avif} type="image/avif" />
          )}
          {local.src.webp && (
            <source srcset={local.src.webp} type="image/webp" />
          )}
        </>
      )}
      <img
        src={typeof local.src === "object" ? local.src.fallback : local.src}
        class={local.class}
        decoding={local.decoding ?? "async"}
        loading={local.loading ?? "lazy"}
        {...rest}
      />
    </picture>
  )
}

export const Image: Component<ImageProps> = (props) => (
  <NoHydration>
    <ImageComponent {...props} />
  </NoHydration>
)
