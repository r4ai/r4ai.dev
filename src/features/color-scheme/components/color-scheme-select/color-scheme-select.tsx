import type { DropdownMenuSubTriggerProps } from "@kobalte/core/dropdown-menu"
import type { Component } from "solid-js"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useColorScheme } from "@/features/color-scheme"

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
              <span class="i-lucide-moon-star size-5" />
            ) : (
              <span class="i-lucide-sun size-5" />
            )}
          </Button>
        )}
      />
      <DropdownMenuContent class="w-32">
        <DropdownMenuItem
          class="space-x-2"
          onClick={() => setColorScheme("light")}
        >
          <span class="i-lucide-sun size-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          class="space-x-2"
          onClick={() => setColorScheme("dark")}
        >
          <span class="i-lucide-moon-star size-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          class="space-x-2"
          onClick={() => setColorScheme("system")}
        >
          <span class="i-lucide-laptop-minimal size-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
