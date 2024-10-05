import type { MarkdownHeading } from "astro"
import {
  type Component,
  type ComponentProps,
  createMemo,
  For,
  onMount,
  splitProps,
} from "solid-js"
import { tv } from "tailwind-variants"

const tableOfContents = tv({
  slots: {
    root: "border p-4 rounded-lg space-y-2",
    heading: "font-bold",
    list: "list-none",
    listItem:
      "text-muted-foreground hover:text-accent-foreground transition data-[active=true]:text-accent-foreground data-[active=true]:font-bold",
  },
  variants: {
    depth: {
      1: {
        listItem: "pl-0",
      },
      2: {
        listItem: "pl-4",
      },
      3: {
        listItem: "pl-8",
      },
      4: {
        listItem: "pl-12",
      },
      5: {
        listItem: "pl-12",
      },
      6: {
        listItem: "pl-12",
      },
    },
  },
})

export type TableOfContentsProps = ComponentProps<"div"> & {
  headings: MarkdownHeading[]
  class?: string
}

export const TableOfContents: Component<TableOfContentsProps> = (props) => {
  const [local, rest] = splitProps(props, ["headings", "class"])
  const { root, heading, list, listItem } = tableOfContents()

  const minDepth = createMemo(() =>
    Math.min(...local.headings.map((heading) => heading.depth))
  )

  onMount(() => initIntersectionObserver())

  return (
    <div class={root({ class: local.class })} {...rest}>
      <div class={heading()}>目次</div>
      <ul class={list()}>
        <For each={local.headings}>
          {(heading) => (
            <li>
              <a
                id={`toc-${heading.slug}`}
                href={`#${heading.slug}`}
                class={listItem({
                  depth: validateDepth(minDepth(), heading.depth),
                })}
                data-active="false"
              >
                {heading.text}
              </a>
            </li>
          )}
        </For>
      </ul>
    </div>
  )
}

const validateDepth = (minDepth: number, depth: number) =>
  Math.max(1, Math.min(6, depth - minDepth + 1)) as 1 | 2 | 3 | 4 | 5 | 6

const initIntersectionObserver = () => {
  let previousActiveElement: Element | null = null
  const observer = new IntersectionObserver((entries) => {
    const entry = entries.reduce((acc, cur) =>
      cur.intersectionRatio > acc.intersectionRatio ? cur : acc
    )
    if (entry.intersectionRatio <= 0) return

    const id = entry.target.getAttribute("id")
    const currentActiveElement = document.getElementById(`toc-${id}`)
    console.log(currentActiveElement)
    previousActiveElement?.setAttribute("data-active", "false")
    currentActiveElement?.setAttribute("data-active", "true")
    previousActiveElement = currentActiveElement
  })

  document
    .querySelectorAll("h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]")
    .forEach((element) => {
      observer.observe(element)
    })

  return () => observer.disconnect()
}
