import type { StorybookConfig } from "storybook-solidjs-vite"

const config: StorybookConfig = {
  stories: [
    "../src/@(assets|components|features|lib|stories|styles)/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "storybook-solidjs-vite",
    options: {},
  },
}
export default config
