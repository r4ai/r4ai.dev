import type { Meta, StoryObj } from "storybook-solidjs"

import IconGithub from "~icons/simple-icons/github"

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
    icon: IconGithub,
    title: "@r4ai",
    site: "GitHub",
  },
}
