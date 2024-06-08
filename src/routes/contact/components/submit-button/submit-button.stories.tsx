import { toast } from "solid-sonner"
import type { Meta, StoryObj } from "storybook-solidjs"

import { SubmitButton } from "./submit-button"

const meta = {
  title: "routes/contact/SubmitButton",
  component: SubmitButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof SubmitButton>
export default meta

type Story = StoryObj<typeof meta>

export const Success: Story = {
  args: {
    onClick: () => {
      toast.success("メッセージを送信しました！", {
        description: new Date().toLocaleString(),
        action: {
          label: "OK",
          onClick: () => {},
        },
        duration: Infinity,
      })
    },
  },
}

export const Error: Story = {
  args: {
    onClick: () => {
      toast.error("メッセージの送信に失敗しました", {
        description: "418 I'm a teapot",
        closeButton: true,
        action: {
          label: "Emailでお問い合わせ",
          onClick: () => {
            const title = "Hello, world!"
            const body = "This is a test message."
            const url = `mailto:r4ai.dev@gmail.com?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`
            location.href = url
          },
        },
        duration: Infinity,
      })
    },
  },
}

export const Submitting: Story = {
  args: {
    submitting: true,
  },
}
