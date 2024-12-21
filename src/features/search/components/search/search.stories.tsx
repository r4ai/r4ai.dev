import type { Meta, StoryObj } from "storybook-solidjs"

import { Search, type SearchProps } from "./search"

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const meta = {
  title: "features/search/Search",
  component: Search,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    class: "w-[620px] border rounded-xl",
  },
} satisfies Meta<typeof Search>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const SlowSearch: Story = {
  args: {
    resultTransformer: async (result) => {
      await sleep(Math.random() * 3000)
      return result.data()
    },
    resultsTransformer: async (results) => {
      await sleep(Math.random() * 2000)
      return results?.results
    },
  } satisfies SearchProps,
}
