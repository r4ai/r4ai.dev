import type { Meta, StoryObj } from "storybook-solidjs"

import { Paragraph } from "./paragraph"

const meta = {
  title: "typography/Paragraph",
  component: Paragraph,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Paragraph>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children:
      "吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれは書生という人間中で一番獰悪な種族であったそうだ。この書生というのは時々我々を捕えて煮て食うという話である。",
  },
}
