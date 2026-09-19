# r4ai.dev

## Dependency updates

Use the Node.js version in `.tool-versions` and the pnpm version in
`package.json`. Dependency resolution waits three days after publication and
rejects trust downgrades. The exact legacy versions listed in
`pnpm-workspace.yaml` were already present in the main branch's lockfile; their
npm SHA-512 integrity values were verified before allowing them to be resolved
again. Remove an exception when no dependency needs that version, and do not
replace these entries with package-wide or age-based exemptions.

After updating dependencies, verify a frozen-lockfile install, lint, formatting,
type checking, unit tests, coverage, the production build, and Storybook visual
comparisons. Review major updates and potentially breaking 0.x updates
separately.

Keep ESLint on 9 while `eslint-plugin-jsx-a11y` 6.10.2 supports only ESLint 3–9;
`eslint-plugin-astro` 2 and 3 require ESLint 10, so update them together once
the accessibility plugin supports it. TypeScript stays on 6 while
`@astrojs/check` 0.9.10 requires TypeScript 5 or 6 and `typescript-eslint`
8.70.0 requires TypeScript below 6.1. Recheck these peer ranges before the
corresponding major upgrades.

The Vitest coverage command explicitly includes `src/lib/**/*.ts`, including
untested library files, and excludes type declarations, so generated reports
cannot change the measured scope.
The version-specific override for `vitest-matchmedia-mock` removes its unused
Vitest 3 runtime dependency; its published JavaScript and declarations do not
import Vitest. Recheck this override when updating that package.

KaTeX 0.18 prefixes its internal CSS classes. The version-specific
`rehype-katex` override uses the direct `katex` dependency so the Markdown
renderer and imported stylesheet stay aligned. Recheck `renderToString`
compatibility and inline/block math rendering when updating either package.

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
| `pnpm run test:ci:unit`    | Run source, integration, and CI safeguard tests  |
| `pnpm run test:coverage`   | Measure source-library unit-test coverage        |
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
