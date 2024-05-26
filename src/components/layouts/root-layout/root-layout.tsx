import {
  type Component,
  type ComponentProps,
  splitProps,
  Suspense,
} from "solid-js"

import { ColorSchemeProvider } from "~/features/color-scheme"
import { cn } from "~/libs/utils"

import { Footer } from "../footer"
import { Header } from "../header"

export type RootLayoutProps = ComponentProps<"div">

export const RootLayout: Component<RootLayoutProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"])
  return (
    <ColorSchemeProvider>
      <div class="flex min-h-full flex-col">
        <Header />
        <div class={cn("flex-1", local.class)} {...rest}>
          <Suspense>{local.children}</Suspense>
        </div>
        <Footer />
      </div>
    </ColorSchemeProvider>
  )
}
