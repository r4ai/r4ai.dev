import type { Meta, StoryObj } from "storybook-solidjs"

import { Header } from "./header"

const meta = {
  title: "layout/Header",
  component: Header,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Header>
export default meta

type Story = StoryObj<typeof Header>

export const Default: Story = {}
