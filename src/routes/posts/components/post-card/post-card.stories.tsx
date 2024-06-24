import type { Meta, StoryObj } from "storybook-solidjs"

import { PostCard, type PostCardProps } from "./post-card"

const meta = {
  title: "routes/posts/PostCard",
  component: PostCard,
  tags: ["autodocs"],
  args: {
    a: (props) => <a {...props} />,
  },
} satisfies Meta<typeof PostCard>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    post: {
      route: "/posts/example",
      frontmatter: {
        title: "Example",
        icon: "📝",
        draft: false,
        genre: "article",
        publishedAt: new Date().toISOString(),
        tags: ["tag1", "tag2"],
        updatedAt: new Date().toISOString(),
      },
    } satisfies PostCardProps["post"],
  },
}
