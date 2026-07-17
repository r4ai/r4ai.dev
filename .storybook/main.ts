import type { StorybookConfig } from "storybook-solidjs-vite"

const config: StorybookConfig = {
  stories: [
    "../src/@(assets|components|features|lib|stories|styles)/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-docs",
    "@storybook/addon-themes",
    "@storybook/addon-a11y",
  ],
  framework: {
    name: "storybook-solidjs-vite",
    options: {
      builder: {
        viteConfigPath:
          process.env.STORYBOOK_VITE_CONFIG ?? ".storybook/vite.config.ts",
      },
    },
  },
}
export default config
