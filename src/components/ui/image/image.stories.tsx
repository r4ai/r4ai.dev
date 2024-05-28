import type { Meta, StoryObj } from "storybook-solidjs"

import iconBlobs from "~/assets/images/r4ai/icon-blobs.png?image"

import { Image } from "./image"

const meta = {
  title: "UI/Image",
  component: Image,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Image>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    src: iconBlobs,
  },
}
