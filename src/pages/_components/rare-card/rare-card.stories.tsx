import { Image } from "astro:assets"
import type { Meta, StoryObj } from "storybook-solidjs"

import IconBlobs from "@/assets/imgs/r4ai/icon-blobs.png"
import { IconBlobsClipPath } from "@/assets/imgs/r4ai/icon-blobs-clip-path"

import { RareCard } from "./rare-card"

const meta = {
  title: "routes/home/RareCard",
  component: RareCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof RareCard>
export default meta

type Story = StoryObj<typeof meta>

export const Square: Story = {
  args: {
    children: (
      <div class="size-96 bg-gradient-to-br from-rose-500 to-rose-400" />
    ),
  },
}

export const Icon: Story = {
  args: {
    clipPath: "url(#r4ai-icon-blobs-clip-path)",
    children: (
      <>
        <IconBlobsClipPath clipPathId="r4ai-icon-blobs-clip-path" />
        <Image
          src={IconBlobs}
          class="aspect-[1132/1140] size-96 drop-shadow-lg"
          alt="Me"
        />
      </>
    ),
  },
}
