import type { DropdownMenuSubTriggerProps } from "@kobalte/core/dropdown-menu"
import { LaptopMinimalIcon, MoonStarIcon, SunIcon } from "lucide-solid"
import type { Component } from "solid-js"

import { Button } from "~/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { useColorScheme } from "~/features/color-scheme"

export type ColorSchemeSelectProps = {
  children?: never
}

export const ColorSchemeSelect: Component<ColorSchemeSelectProps> = () => {
  const { resolvedColorScheme, setColorScheme } = useColorScheme()
  return (
    <DropdownMenu placement="bottom">
      <DropdownMenuTrigger
        as={(props: DropdownMenuSubTriggerProps) => (
          <Button variant="ghost" size="icon" {...props}>
            {resolvedColorScheme() === "dark" ? (
              <MoonStarIcon class="size-5" />
            ) : (
              <SunIcon class="size-5" />
            )}
          </Button>
        )}
      />
      <DropdownMenuContent class="w-32">
        <DropdownMenuItem
          class="space-x-2"
          onClick={() => setColorScheme("light")}
        >
          <SunIcon class="size-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          class="space-x-2"
          onClick={() => setColorScheme("dark")}
        >
          <MoonStarIcon class="size-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          class="space-x-2"
          onClick={() => setColorScheme("system")}
        >
          <LaptopMinimalIcon class="size-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
