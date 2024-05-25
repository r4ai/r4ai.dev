import { SearchIcon } from "lucide-solid"
import { type Component, type ComponentProps, splitProps } from "solid-js"

import { Button } from "~/components/ui/button"
import { ColorSchemeSelect } from "~/features/color-scheme"
import { cn } from "~/libs/utils"

export type HeaderProps = Omit<ComponentProps<"header">, "children">

export const Header: Component<HeaderProps> = (props) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <header
      class={cn(
        "sticky top-4 z-30 mx-auto flex max-w-fit flex-row items-center gap-5 rounded-full border px-4 py-2 text-foreground backdrop-blur-xl",
        local.class,
      )}
      {...rest}
    >
      <nav>
        <ul class="mb-0.5 flex flex-row items-center gap-5 px-2">
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
            <Button variant="ghost" size="icon" onClick={() => alert("WIP")}>
              <SearchIcon class="size-5" />
            </Button>
          </li>
        </ul>
      </div>
    </header>
  )
}
