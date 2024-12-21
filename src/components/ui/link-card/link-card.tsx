import type { LinkInfo } from "@r4ai/remark-embed/transformers/link-card"
import { type Component, createMemo, splitProps } from "solid-js"

import { cn } from "@/lib/utils"

type Undefined<T> = { [K in keyof T]: T[K] | undefined }

export type LinkCardProps = {
  shouldInvertIcon?: boolean
} & ((LinkInfo & { og: undefined }) | (Undefined<LinkInfo> & { og: string }))

export const LinkCard: Component<LinkCardProps> = (props) => {
  const og = createMemo(() => {
    if (props.og) return JSON.parse(props.og) as LinkInfo
    const [, og] = splitProps(props, ["og", "shouldInvertIcon"])
    return og as LinkInfo
  })

  const url = createMemo(() => props.url ?? og()?.url)
  const title = createMemo(() => props.title ?? og()?.title)
  const description = createMemo(() => props.description ?? og()?.description)
  const favicon = createMemo(() => props.favicon ?? og()?.favicon)
  const image = createMemo(() => props.image ?? og()?.image)
  const shouldInvertIcon = createMemo(
    () =>
      props.shouldInvertIcon ?? new URL(og().url)?.hostname?.includes("github")
  )

  return (
    <div class="mx-auto h-36 w-full max-w-screen-md">
      <a
        class="flex min-h-full flex-row items-center rounded-lg border bg-muted/25 not-italic transition hover:bg-muted dark:hover:bg-muted/50"
        href={url()}
        {...props}
      >
        <div class="flex min-w-0 flex-1 flex-col justify-between gap-2 overflow-auto break-all px-3 md:px-5">
          <p class="line-clamp-2 text-base font-bold">{title()}</p>
          {description() && (
            <p class="line-clamp-3 text-sm text-muted-foreground">
              {description()}
            </p>
          )}
          <div class="flex flex-row items-center gap-2 text-sm">
            {favicon() ? (
              <img
                src={favicon()}
                class={cn(
                  "inline-block h-4 w-4",
                  shouldInvertIcon() && "dark:invert"
                )}
                loading="lazy"
                decoding="async"
              />
            ) : (
              <span class="i-lucide-globe size-4" />
            )}
            <p class="truncate text-foreground/75">{new URL(url()).hostname}</p>
          </div>
        </div>
        {image()?.src && (
          <div class="shrink-0">
            <img
              src={image()?.src}
              class="size-24 object-cover md:h-36 md:w-auto md:rounded-r-lg"
              alt={image()?.alt}
              loading="lazy"
              decoding="async"
            />
          </div>
        )}
      </a>
    </div>
  )
}
