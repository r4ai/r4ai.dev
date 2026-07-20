import type { Meta, StoryObj } from "storybook-solidjs-vite"

import graphvizImage from "@/assets/imgs/graphviz_in_vscode_dev.png?url"
import ricoraImage from "@/assets/imgs/projects/alg.tus-ricora.com.png?url"
import iconBlobsImage from "@/assets/imgs/r4ai/icon-blobs.png?url"

import { LinkCard } from "./link-card"

const meta = {
  title: "UI/LinkCard",
  component: LinkCard,
  tags: ["autodocs"],
  args: {
    og: undefined,
    url: "https://example.com/",
    image: {},
  },
} satisfies Meta<typeof LinkCard>
export default meta

type Story = StoryObj<typeof meta>

export const Ricora: Story = {
  args: {
    title: "2024年度の春の成果報告会を行いました",
    url: "https://alg.tus-ricora.com/posts/lt-20240412/",
    favicon: "/favicon.svg",
    image: {
      src: ricoraImage,
    },
  },
}

export const Vite: Story = {
  args: {
    title: "はじめに",
    description: "次世代フロントエンドツール",
    url: "https://vitejs.dev/",
    favicon: "/favicon.svg",
    image: {
      src: iconBlobsImage,
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
      src: graphvizImage,
    },
    favicon: "/favicon.svg",
  },
}
