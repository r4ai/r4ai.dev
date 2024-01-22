import * as Dialog from "@radix-ui/react-dialog"
import { useEffect, type FC } from "react"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import { PagefindUI } from "@pagefind/default-ui"
import "@/styles/pagefind.css"
import { twMerge } from "tailwind-merge"

export const SearchButton: FC = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <MagnifyingGlassIcon className="h-5 w-5" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0" />
        <Dialog.Content
          className={twMerge(
            "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
            "max-h-[85vh] w-[90vw] max-w-[600px]",
            "z-30 rounded-xl border bg-background/80 backdrop-blur-xl"
          )}
        >
          <Search />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

const Search: FC = () => {
  useEffect(() => {
    new PagefindUI({
      element: "#search",
    })
  }, [])

  return (
    <>
      <div id="search"></div>
    </>
  )
}
