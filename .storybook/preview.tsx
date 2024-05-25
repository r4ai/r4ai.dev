import "./preview.css"

import { withThemeByDataAttribute } from "@storybook/addon-themes"
import { themes } from "@storybook/theming"
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
    (Story) => <Story />,
  ],
}

export default preview
