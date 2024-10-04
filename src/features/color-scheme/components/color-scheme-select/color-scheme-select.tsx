import type { DropdownMenuSubTriggerProps } from "@kobalte/core/dropdown-menu"
import { type Component, splitProps, Suspense } from "solid-js"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ColorSchemeProvider, useColorScheme } from "@/features/color-scheme"
import { cn } from "@/lib/utils"
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

export type ColorSchemeSelectInnerProps = DropdownMenuSubTriggerProps & {
  showLabel?: boolean
}

export const ColorSchemeSelectInner: Component<ColorSchemeSelectInnerProps> = (
  props
) => {
  const [local, rest] = splitProps(props, ["showLabel"])
  const { resolvedColorScheme, colorScheme, setColorScheme } = useColorScheme()
  return (
    <DropdownMenu placement="bottom">
      <DropdownMenuTrigger
        as={(props: DropdownMenuSubTriggerProps) => (
          <Button
            variant="ghost"
            size={local.showLabel ? "default" : "icon"}
            class={cn("rounded-full", local.showLabel && "space-x-2")}
            {...props}
          >
            {resolvedColorScheme() === "dark" ? (
              <IconMoonStar class="size-5" />
            ) : (
              <IconSun class="size-5" />
            )}
            {local.showLabel && (
              <span>
                {colorScheme().replace(/^\w/, (c) => c.toUpperCase())}
              </span>
            )}
          </Button>
        )}
        {...rest}
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
