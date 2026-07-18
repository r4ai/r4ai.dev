# r4ai.dev

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                    | Action                                           |
| :------------------------- | :----------------------------------------------- |
| `pnpm install`             | Installs dependencies                            |
| `pnpm run dev`             | Starts local dev server at `localhost:3000`      |
| `pnpm run build`           | Build your production site to `./dist/`          |
| `pnpm run preview`         | Preview your build locally, before deploying     |
| `pnpm run storybook`       | Start Storybook at `localhost:6006`              |
| `pnpm run build-storybook` | Build Storybook to `./storybook-static/`         |
| `pnpm run test:vrt:unit`   | Test the Storybook VRT lifecycle and workflow    |
| `pnpm run test:vrt`        | Compare Storybook visual snapshots               |
| `pnpm run test:vrt:update` | Capture Storybook visual snapshots               |
| `pnpm run lint:fix`        | Run ESLint on the `./src/` directory             |
| `pnpm run format`          | Run Prettier on the `./src/` directory           |
| `pnpm run check`           | Run astro check and type-check this project      |
| `pnpm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm run astro -- --help` | Get help using the Astro CLI                     |

## Storybook visual regression testing

Pull requests compare every Storybook story at the base and head revisions on the
same GitHub Actions runner and with the same Storybook toolchain. The
`Storybook VRT` job fails when pixels change and uploads the expected, actual,
and diff images in the `storybook-vrt-report` artifact. No external visual
testing service or committed OS-specific baseline images are required.
When VRT is introduced for the first time, the job bootstraps by checking that
every story renders successfully; comparisons start with the next pull request.

After reviewing an intentional visual change in the failed run's artifact, add
the `vrt-approved` label to the pull request. The label event verifies that every
story can still be rendered and marks the current head revision as approved.
The workflow removes the label after consuming it, so a later push triggers a
fresh comparison and the label can be added again to approve that new revision.

To run the same capture and comparison flow locally:

```sh
pnpm exec playwright install chromium
pnpm run build-storybook
pnpm run test:vrt:unit
pnpm run test:vrt:update
pnpm run test:vrt
```

Add the `skip-vrt` tag to a story only when it cannot produce deterministic
pixels. Canvas elements are masked automatically because animated WebGL output
is not deterministic.
