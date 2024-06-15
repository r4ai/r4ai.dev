import type { Meta, StoryObj } from "storybook-solidjs"

import { Image } from "./image"

const meta = {
  title: "typography/Image",
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
    src: "https://avatars.githubusercontent.com/u/96561881?v=4",
  },
}

export const WithTitle: Story = {
  args: {
    src: "https://avatars.githubusercontent.com/u/96561881?v=4",
    title: "r4ai",
  },
}
