import type { Meta, StoryObj } from "storybook-solidjs"

import { Footer } from "./footer"

const meta = {
  title: "layout/Footer",
  component: Footer,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Footer>
export default meta

type Story = StoryObj<typeof Footer>

export const Default: Story = {}
