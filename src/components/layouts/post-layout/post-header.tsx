import { RefreshCcwIcon } from "lucide-solid"
import type { Component } from "solid-js"
import * as v from "valibot"

import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui"
import { posts } from "~/routes/posts/(content)/config"

type PostSchema = v.InferOutput<typeof posts.schema>

export type PostHeaderProps = PostSchema

export const PostHeader: Component<PostHeaderProps> = (props) => {
  return (
    <header class="flex flex-col items-center justify-center">
      <span class="text-6xl lg:text-7xl">{props.icon}</span>
      <h1
        class="mb-6 mt-4 text-center text-3xl font-black lg:text-4xl"
        // eslint-disable-next-line solid/no-innerhtml
        innerHTML={props.title}
      />
      <div class="flex flex-col items-center justify-center gap-4">
        <div class="flex flex-row gap-1 text-gray-500">
          <p class="flex flex-row items-center gap-1">
            <span class="icon-[lucide--calendar-days] text-xl" />
            <span>{formatDate(props.publishedAt)} に公開</span>
          </p>
          {props.updatedAt && (
            <>
              ・
              <div>
                <Tooltip>
                  <TooltipTrigger class="flex flex-row items-center gap-1">
                    <RefreshCcwIcon class="size-4" />
                    <span>{formatDate(props.updatedAt)}</span>
                  </TooltipTrigger>
                  <TooltipContent class="font-semibold">
                    最終更新日
                  </TooltipContent>
                </Tooltip>
              </div>
            </>
          )}
        </div>
        {/* <div class="flex flex-row gap-1 text-gray-500 transition hover:text-gray-700 dark:hover:text-gray-400">
          <a
            class="underline hover:cursor-pointer"
            href={`/posts/${entry.slug}/raw`}
          >
            Markdownファイル
            <span class="icon-[lucide--external-link]" />
          </a>
        </div> */}
      </div>
    </header>
  )
}

const formatDate = (date: Date) =>
  new Date(date).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
