import type { Meta, StoryObj } from "storybook-solidjs"

import { CodeBlock } from "./code-block"

const meta = {
  title: "typography/CodeBlock",
  component: (props) => (
    <div class="my-auto">
      <CodeBlock {...props} />
    </div>
  ),
  tags: ["autodocs"],
} satisfies Meta<typeof CodeBlock>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    class: "shiki shiki-themes one-light one-dark-pro",
    style: {
      "background-color": "#FAFAFA",
      "--shiki-dark-bg": "#282c34",
      color: "#383A42",
      "--shiki-dark": "#abb2bf",
    },
    tabindex: 0,
    children: (
      <code class="flex-col !flex">
        <span class="line">
          <span style={{ color: "#A626A4", "--shiki-dark": "#C678DD" }}>
            fn
          </span>
          <span style={{ color: "#4078F2", "--shiki-dark": "#61AFEF" }}>
            {" "}
            main
          </span>
          <span style={{ color: "#383A42", "--shiki-dark": "#ABB2BF" }}>
            () {"{"}
          </span>
        </span>
        <span class="line">
          <span style={{ color: "#4078F2", "--shiki-dark": "#61AFEF" }}>
            {" "}
            println!
          </span>
          <span style={{ color: "#383A42", "--shiki-dark": "#ABB2BF" }}>(</span>
          <span style={{ color: "#50A14F", "--shiki-dark": "#98C379" }}>
            "Hello, world!"
          </span>
          <span style={{ color: "#383A42", "--shiki-dark": "#ABB2BF" }}>
            );
          </span>
        </span>
        <span class="line">
          <span style={{ color: "#383A42", "--shiki-dark": "#ABB2BF" }}>
            {"}"}
          </span>
        </span>
        <span class="line" />
      </code>
    ),
  },
}
