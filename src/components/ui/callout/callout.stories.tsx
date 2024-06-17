import type { Meta, StoryObj } from "storybook-solidjs"

import { Callout } from "~/components/ui"

const meta = {
  title: "UI/Callout",
  component: Callout,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Callout>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Note content here.",
  },
}

export const WithTitle: Story = {
  args: {
    children: "Note content here.",
    title: "Note title",
  },
}

export const WithFoldable: Story = {
  args: {
    children: "Note content here.",
    title: "Note title",
    isFoldable: true,
  },
}

export const WithDefaultFolded: Story = {
  args: {
    children: "Note content here.",
    title: "Note title",
    isFoldable: true,
    defaultFolded: true,
  },
}
