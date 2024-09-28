import "./preview.css"
import "../src/styles/global.css"

import { withThemeByDataAttribute } from "@storybook/addon-themes"
import { themes } from "@storybook/theming"
import type { Component } from "solid-js"
import type { Preview } from "storybook-solidjs"

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      theme: themes.dark,
    },
  },
  decorators: [
    withThemeByDataAttribute({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "light",
      attributeName: "data-color-scheme",
    }),
    (Story: Component) => <Story />,
  ],
}

export default preview
