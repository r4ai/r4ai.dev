import type { Meta, StoryObj } from "storybook-solidjs"

import { Link } from "./link"

const meta = {
  title: "typography/Link",
  component: Link,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Link>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    href: "https://example.com",
    children: "example.com",
  },
}
