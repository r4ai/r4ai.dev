import { A } from "@solidjs/router"
import { type Component, type ComponentProps, splitProps } from "solid-js"

import { Button } from "~/components/ui/button"
import { ColorSchemeSelect } from "~/features/color-scheme"
import { SearchModal } from "~/features/search"
import { cn } from "~/libs/utils"

export type HeaderProps = Omit<ComponentProps<"header">, "children">

export const Header: Component<HeaderProps> = (props) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <header
      class={cn(
        "sticky top-4 z-30 mx-auto my-4 max-w-fit text-foreground",
        local.class,
      )}
      {...rest}
    >
      <div class="flex flex-row items-center gap-5 border rounded-full bg-background/60 px-4 py-2 backdrop-blur-xl">
        <nav>
          <ul class="flex flex-row items-center gap-5 px-2">
            <li>
              <A href="/">Home</A>
            </li>
            <li>
              <A href="/posts">Posts</A>
            </li>
            <li>
              <A href="/projects">Projects</A>
            </li>
            <li>
              <A href="/contact">Contact</A>
            </li>
          </ul>
        </nav>
        <div>
          <ul class="flex flex-row gap-1">
            <li>
              <ColorSchemeSelect />
            </li>
            <li>
              <SearchModal
                trigger={(props) => (
                  <Button variant="ghost" size="icon" {...props}>
                    <span class="i-lucide-search size-5" />
                  </Button>
                )}
              />
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}
