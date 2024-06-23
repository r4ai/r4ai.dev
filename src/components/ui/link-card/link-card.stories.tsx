import type { Meta, StoryObj } from "storybook-solidjs"

import { LinkCard } from "./link-card"

const meta = {
  title: "UI/LinkCard",
  component: LinkCard,
  tags: ["autodocs"],
} satisfies Meta<typeof LinkCard>
export default meta

type Story = StoryObj<typeof meta>

export const Ricora: Story = {
  args: {
    title: "2024年度の春の成果報告会を行いました",
    url: "https://alg.tus-ricora.com/posts/lt-20240412/",
    favicon: "https://alg.tus-ricora.com/favicon.svg",
    image: {
      src: "https://alg.tus-ricora.com/posts/lt-20240412.png",
    },
  },
}

export const Vite: Story = {
  args: {
    title: "はじめに",
    description: "次世代フロントエンドツール",
    url: "https://vitejs.dev/",
    favicon: "https://ja.vitejs.dev/logo.svg",
    image: {
      src: "https://vitejs.dev/og-image.png",
    },
  },
}

export const Mdx: Story = {
  args: {
    url: "https://mdxjs.com/",
    title: "Markdown for the\n component era | MDX",
    description:
      "MDX lets you use JSX in your markdown content. You can import components, such as interactive charts or alerts, and embed them within your content. This makes writing long-form content with components a blast.",
    image: {
      src: "https://mdxjs.com/og.png",
    },
    favicon: "https://mdxjs.com/icon.svg",
  },
}
