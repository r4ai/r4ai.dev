import type { DropdownMenuSubTriggerProps } from "@kobalte/core/dropdown-menu"
import { type Component, Suspense } from "solid-js"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ColorSchemeProvider, useColorScheme } from "@/features/color-scheme"
import IconLaptopMinimal from "~icons/lucide/laptop-minimal"
import IconMoonStar from "~icons/lucide/moon-star"
import IconSun from "~icons/lucide/sun"

export type ColorSchemeSelectProps = ColorSchemeSelectInnerProps

export const ColorSchemeSelect: Component<ColorSchemeSelectProps> = (props) => {
  return (
    <Suspense>
      <ColorSchemeProvider>
        <ColorSchemeSelectInner {...props} />
      </ColorSchemeProvider>
    </Suspense>
  )
}

export type ColorSchemeSelectInnerProps = DropdownMenuSubTriggerProps

export const ColorSchemeSelectInner: Component<ColorSchemeSelectInnerProps> = (
  props
) => {
  const { resolvedColorScheme, setColorScheme } = useColorScheme()
  return (
    <DropdownMenu placement="bottom">
      <DropdownMenuTrigger
        as={(props: DropdownMenuSubTriggerProps) => (
          <Button variant="ghost" size="icon" {...props}>
            {resolvedColorScheme() === "dark" ? (
              <IconMoonStar class="size-5" />
            ) : (
              <IconSun class="size-5" />
            )}
          </Button>
        )}
        {...props}
      />
      <DropdownMenuContent class="w-32">
        <DropdownMenuItem
          class="space-x-2"
          onClick={() => setColorScheme("light")}
        >
          <IconSun class="size-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          class="space-x-2"
          onClick={() => setColorScheme("dark")}
        >
          <IconMoonStar class="size-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          class="space-x-2"
          onClick={() => setColorScheme("system")}
        >
          <IconLaptopMinimal class="size-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
