import { type FC, type ReactNode } from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

type ImageProps = {
  className?: string
  children: ReactNode
}

export const ImageDialog: FC<ImageProps> = ({ children }) => {
  return (
    <Dialog>
      <DialogTrigger className="w-full outline-none">{children}</DialogTrigger>
      <DialogContent className="flex max-h-[90%] w-fit max-w-full flex-col items-center md:max-w-[90%]">
        {children}
      </DialogContent>
    </Dialog>
  )
}
