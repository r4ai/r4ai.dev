import type { Meta, StoryObj } from "storybook-solidjs"

import { Heading, Paragraph, Section } from ".."

const meta = {
  title: "typography/Section",
  component: Section,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Section>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    class: "container",
    children: (
      <>
        <Heading level="h1">Lorem Ipsum</Heading>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porta
          ipsum at libero tincidunt consequat. Pellentesque mattis egestas
          malesuada. Praesent dignissim arcu lacinia libero eleifend, ac
          vulputate ex pharetra. Fusce ut finibus mauris. Vestibulum justo arcu,
          interdum sit amet vulputate id, efficitur eu quam. Sed finibus lorem
          nec eleifend vestibulum. Maecenas justo lectus, mattis a nisi vitae,
          posuere vulputate nibh. Pellentesque habitant morbi tristique senectus
          et netus et malesuada fames ac turpis egestas. Cras vel scelerisque
          odio, sit amet pretium libero. Nunc accumsan finibus ante, et
          consequat ex volutpat dictum.
        </Paragraph>
        <Paragraph>
          Aenean tempor, ante nec rhoncus fermentum, leo libero malesuada dui,
          et euismod felis nisi in enim. Curabitur at enim at leo rhoncus
          accumsan nec quis sapien. Donec ultrices lorem ac porttitor molestie.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eu dictum
          quam. Ut tristique nisl ut ultricies scelerisque. Nam ac consectetur
          dolor. Quisque faucibus augue at dolor posuere gravida. Sed purus
          nulla, condimentum id viverra id, suscipit eu lectus. Etiam eu
          consectetur orci. Mauris sit amet turpis est. Nunc lobortis libero
          volutpat feugiat finibus. Sed turpis felis, sollicitudin nec erat
          placerat, fringilla porttitor est. Aliquam lacus justo, vehicula id
          dapibus vel, lobortis quis turpis. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit.
        </Paragraph>
      </>
    ),
  },
}
