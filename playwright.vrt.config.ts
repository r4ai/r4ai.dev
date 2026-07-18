import { defineConfig, devices } from "@playwright/test"

const port = 6006
const staticDirectory = process.env.STORYBOOK_STATIC_DIR ?? "storybook-static"

export default defineConfig({
  testDir: "./tests/storybook",
  testMatch: "**/*.vrt.ts",
  outputDir: "test-results/storybook-vrt",
  snapshotPathTemplate: ".vrt/snapshots/{arg}{ext}",
  timeout: 180_000,
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI
    ? [
        ["github"],
        ["html", { open: "never", outputFolder: "playwright-report" }],
      ]
    : [["list"], ["html", { open: "never" }]],
  use: {
    ...devices["Desktop Chrome"],
    baseURL: `http://127.0.0.1:${port}`,
    colorScheme: "light",
    locale: "en-US",
    timezoneId: "UTC",
    trace: "retain-on-failure",
  },
  webServer: {
    command: `node_modules/.bin/vite preview --outDir ${JSON.stringify(staticDirectory)} --host 127.0.0.1 --port ${port} --strictPort`,
    url: `http://127.0.0.1:${port}/index.json`,
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
})
