import { siGithub } from "simple-icons"
import type { Meta, StoryObj } from "storybook-solidjs"

import { LinkCard } from "./link-card"

const meta = {
  title: "routes/home/LinkCard",
  component: LinkCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof LinkCard>
export default meta

type Story = StoryObj<typeof meta>

export const GitHub: Story = {
  args: {
    href: "https://github.com/r4ai",
    icon: siGithub,
    title: "@r4ai",
    site: "GitHub",
  },
}
