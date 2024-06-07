import { siBluesky, siGithub, siZenn } from "simple-icons"
import type { Meta, StoryObj } from "storybook-solidjs"

import { SimpleIcon } from "./simple-icon"

const meta = {
  title: "UI/SimpleIcon",
  component: SimpleIcon,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof SimpleIcon>
export default meta

type Story = StoryObj<typeof meta>

export const GitHub: Story = {
  args: {
    class: "size-12",
    icon: siGithub,
  },
}

export const BlueSky: Story = {
  args: {
    class: "size-12",
    icon: siBluesky,
  },
}

export const Zenn: Story = {
  args: {
    class: "size-12",
    icon: siZenn,
  },
}
