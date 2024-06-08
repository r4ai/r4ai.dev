import "./preview.css"

import { withThemeByDataAttribute } from "@storybook/addon-themes"
import { themes } from "@storybook/theming"
import type { Preview } from "storybook-solidjs"

import { Toaster } from "~/components/ui"
import { ColorSchemeProvider } from "~/features/color-scheme"

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
    (Story) => (
      <ColorSchemeProvider>
        <Story />
        <Toaster />
      </ColorSchemeProvider>
    ),
  ],
}

export default preview
