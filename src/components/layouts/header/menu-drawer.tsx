import type { Component } from "solid-js"

import { Button } from "@/components/ui"
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { ColorSchemeSelect } from "@/features/color-scheme"
import IconMenu from "~icons/lucide/menu"

export const MenuDrawer: Component = () => {
  return (
    <Drawer>
      <DrawerTrigger
        as={Button}
        variant="ghost"
        size="icon"
        class="rounded-full"
      >
        <IconMenu class="size-5" />
      </DrawerTrigger>
      <DrawerContent>
        <div class="mx-auto flex w-full flex-col gap-4">
          <DrawerHeader>
            <p class="text-xl font-bold">r4ai.dev</p>
          </DrawerHeader>
          <nav>
            <ul class="mx-auto flex flex-col gap-1 px-8 text-lg">
              <li>
                <Button
                  as="a"
                  href="/"
                  variant="ghost"
                  class="w-full rounded-full text-base"
                >
                  Home
                </Button>
              </li>
              <li>
                <Button
                  as="a"
                  href="/posts"
                  variant="ghost"
                  class="w-full rounded-full text-base"
                >
                  Posts
                </Button>
              </li>
              <li>
                <Button
                  as="a"
                  href="/projects"
                  variant="ghost"
                  class="w-full rounded-full text-base"
                >
                  Projects
                </Button>
              </li>
              <li>
                <Button
                  as="a"
                  href="/contact"
                  variant="ghost"
                  class="w-full rounded-full text-base"
                >
                  Contact
                </Button>
              </li>
            </ul>
          </nav>
          <DrawerFooter class="self-end">
            <ColorSchemeSelect showLabel />
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
