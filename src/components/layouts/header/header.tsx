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
      <div class="flex flex-row items-center gap-5 rounded-full border bg-background/60 px-4 py-2 backdrop-blur-xl">
        <nav>
          <ul class="flex flex-row items-center gap-5 px-2">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/posts">Posts</a>
            </li>
            <li>
              <a href="/projects">Projects</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
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
