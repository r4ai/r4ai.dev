declare let resolvedTheme: "light" | "dark"

// @pagefind/default-ui is not typed
// @see https://github.com/CloudCannon/pagefind/issues/334
declare module "@pagefind/default-ui" {
  declare class PagefindUI {
    constructor(arg: unknown)
  }
}

declare namespace astroHTML.JSX {
  interface HTMLAttributes {
    "data-pagefind-main"?: boolean
    "data-pagefind-ignore"?: boolean
    "data-pagefind-meta"?: string
  }
}
