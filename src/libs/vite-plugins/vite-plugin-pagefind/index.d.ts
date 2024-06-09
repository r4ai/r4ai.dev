import "./pagefind_web_js"

/**
 * Types of `@pagefind/js` module
 * @see https://github.com/CloudCannon/pagefind/blob/v1.1.0/pagefind_web_js/package.json
 */
declare module "pagefind-js" {
  /**
   * Automatically generated using `tsc --declaration --emitDeclarationOnly` from https://github.com/CloudCannon/pagefind/blob/v1.1.0/pagefind_web_js/lib/coupled_search.ts
   */
  export declare const options: (
    new_options: PagefindIndexOptions,
  ) => Promise<void>
  export declare const init: () => Promise<void>
  export declare const destroy: () => Promise<void>
  export declare const mergeIndex: (
    indexPath: string,
    options: PagefindIndexOptions,
  ) => Promise<void>
  export declare const search: (
    term: string,
    options: PagefindSearchOptions,
  ) => Promise<{
    results: PagefindSearchResult[]
    unfilteredResultCount: number
    filters: PagefindFilterCounts
    totalFilters: PagefindFilterCounts
    timings: {
      preload: number
      search: number
      total: number
    }[]
  }>
  export declare const debouncedSearch: (
    term: string,
    options: PagefindSearchOptions,
    debounceTimeoutMs?: number,
  ) => Promise<{
    results: PagefindSearchResult[]
    unfilteredResultCount: number
    filters: PagefindFilterCounts
    totalFilters: PagefindFilterCounts
    timings: {
      preload: number
      search: number
      total: number
    }[]
  } | null>
  export declare const preload: (
    term: string,
    options: PagefindSearchOptions,
  ) => Promise<void>
  export declare const filters: () => Promise<PagefindFilterCounts>
}
