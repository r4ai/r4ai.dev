import type {
  PagefindSearchFragment,
  PagefindSearchResult,
  search,
} from "pagefind-js"
import {
  type Component,
  type ComponentProps,
  createResource,
  For,
  type JSX,
  type ParentComponent,
  splitProps,
  Suspense,
} from "solid-js"

import { Kbd } from "~/components/typography"
import { Skeleton } from "~/components/ui"
import {
  PagefindProvider,
  SearchProvider,
  usePagefind,
  useSearch,
} from "~/features/search"
import { cn } from "~/libs/utils"

export type SearchProps = ComponentProps<"div"> & {
  resultTransformer?: SearchResultProps["resultTransformer"]
  resultsTransformer?: SearchResultsProps["resultsTransformer"]
}

export const Search: Component<SearchProps> = (props) => {
  let rootRef: HTMLDivElement | undefined
  const [local, rest] = splitProps(props, [
    "class",
    "resultTransformer",
    "resultsTransformer",
  ])

  return (
    <Suspense>
      <PagefindProvider>
        <SearchProvider>
          <div
            class={cn("gap0 flex flex-col", local.class)}
            {...rest}
            ref={rootRef}
          >
            <SearchInput />
            <Suspense fallback={<LoadingSearchResults />}>
              <SearchResults
                resultTransformer={local.resultTransformer}
                resultsTransformer={local.resultsTransformer}
              />
            </Suspense>
            <SearchFooter />
          </div>
        </SearchProvider>
      </PagefindProvider>
    </Suspense>
  )
}

const SearchInput: Component = () => {
  const {
    query,
    setQuery,
    activeIndex,
    incrementActiveIndex,
    decrementActiveIndex,
    resultRefs,
  } = useSearch()
  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        incrementActiveIndex()
        resultRefs().at(activeIndex())?.scrollIntoView({ block: "nearest" })
        break
      case "ArrowUp":
        e.preventDefault()
        decrementActiveIndex()
        resultRefs().at(activeIndex())?.scrollIntoView({ block: "nearest" })
        console.log("ArrowUp")
        break
    }
  }

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault()
    resultRefs().at(activeIndex())?.click()
  }

  return (
    <form
      class="flex flex-row items-center gap-3 border-b p-4"
      onSubmit={handleSubmit}
    >
      <span class="i-lucide-search h-5 w-5" />
      <input
        tabIndex={0}
        type="text"
        class="w-full bg-transparent outline-none"
        placeholder="Search..."
        value={query()}
        onInput={(e) => setQuery(e.currentTarget.value)}
        onKeyDown={handleKeyDown}
      />
    </form>
  )
}

const LoadingSearchResults: Component = () => (
  <ol class="p-2">
    {Array.from({ length: 5 }, () => (
      <LoadingSearchResult />
    ))}
  </ol>
)

type SearchResultsProps = {
  resultTransformer?: SearchResultProps["resultTransformer"]
  resultsTransformer?: (
    results: Awaited<ReturnType<typeof search>> | undefined,
  ) =>
    | Promise<PagefindSearchResult[] | undefined>
    | (PagefindSearchResult[] | undefined)
}

const SearchResults: Component<SearchResultsProps> = (props) => {
  const { pagefind } = usePagefind()
  const { query, setActiveIndex, setResultRefs } = useSearch()

  const [searchResults] = createResource(query, async (query) => {
    const searchResults = await pagefind()?.search(query, {})
    const results = props.resultsTransformer
      ? await props.resultsTransformer(searchResults)
      : searchResults?.results
    setResultRefs(
      Array.from<HTMLAnchorElement | undefined>({
        length: results?.length || 0,
      }).fill(undefined),
    )
    setActiveIndex(0)
    return results
  })

  const setResultRef = (index: number) => (el: HTMLAnchorElement) => {
    setResultRefs((refs) => {
      refs[index] = el
      return refs
    })
  }

  return (
    <ol class="p-2">
      {query().length === 0 ? (
        <FallbackNoQuery />
      ) : (
        <For each={searchResults()} fallback={<FallbackNoResults />}>
          {(result, index) => (
            <Suspense fallback={<LoadingSearchResult />}>
              <SearchResult
                index={index()}
                result={result}
                ref={setResultRef(index())}
                resultTransformer={props.resultTransformer}
              />
            </Suspense>
          )}
        </For>
      )}
    </ol>
  )
}

const FallbackNoQuery: Component = () => (
  <LoadingPresenter>Type to search...</LoadingPresenter>
)

const FallbackNoResults: Component = () => (
  <LoadingPresenter>No results found</LoadingPresenter>
)

const LoadingSearchResult: Component = () => (
  <SearchResultPresenter
    icon={<Skeleton class="m-0.5 h-5 w-5" />}
    title={<Skeleton class="h-4 w-2/3" />}
    excerpt={<Skeleton class="h-4 w-full" />}
  />
)

type SearchResultProps = Omit<ComponentProps<"a">, "href" | "title"> & {
  index: number
  result: PagefindSearchResult
  resultTransformer?: (
    data: PagefindSearchResult,
  ) => Promise<PagefindSearchFragment> | PagefindSearchFragment
}

const SearchResult: Component<SearchResultProps> = (props) => {
  const [local, rest] = splitProps(props, [
    "index",
    "result",
    "resultTransformer",
  ])

  const { activeIndex, setActiveIndex } = useSearch()

  const [result] = createResource(() =>
    local.resultTransformer
      ? local.resultTransformer(local.result)
      : local.result.data(),
  )

  return (
    <SearchResultPresenter
      class={cn(activeIndex() === local.index && "bg-muted")}
      href={result()?.raw_url}
      icon={<span class="i-lucide-file-text m-0.5 h-5 w-5" />}
      title={result()?.meta["title"]}
      excerpt={result()?.excerpt}
      onFocus={() => setActiveIndex(local.index)}
      onMouseEnter={() => setActiveIndex(local.index)}
      {...rest}
    />
  )
}

type SearchResultPresenterProps = Omit<
  ComponentProps<"a">,
  "href" | "title"
> & {
  href?: string
  icon?: JSX.Element
  title?: JSX.Element
  excerpt?: JSX.Element
}

const SearchResultPresenter: Component<SearchResultPresenterProps> = (
  props,
) => {
  const [local, rest] = splitProps(props, [
    "class",
    "href",
    "icon",
    "title",
    "excerpt",
  ])
  return (
    <li>
      <a
        class={cn(
          "flex flex-row gap-3 rounded-lg p-2 outline-none",
          local.class,
        )}
        href={local.href}
        {...rest}
      >
        <div>{local.icon}</div>
        <div class="grow space-y-1">
          <p class="font-bold">{local.title}</p>
          {typeof local.excerpt === "string" ? (
            <p
              class={cn(
                "text-sm text-muted-foreground",
                "[&_mark]:bg-transparent [&_mark]:font-bold [&_mark]:text-blue-500 [&_mark]:dark:text-lime-300",
              )}
              // eslint-disable-next-line solid/no-innerhtml
              innerHTML={local.excerpt}
            />
          ) : (
            local.excerpt
          )}
        </div>
      </a>
    </li>
  )
}

const SearchFooter: Component = () => {
  return (
    <div class="flex flex-row justify-between border-t px-4 py-3">
      <ul class="flex flex-row gap-4 text-sm text-muted-foreground">
        <li>
          <Kbd class="text-xs">Enter</Kbd> to select
        </li>
        <li>
          <Kbd class="mr-1 text-xs">↑</Kbd>
          <Kbd class="text-xs">↓</Kbd> to navigate
        </li>
        <li>
          <Kbd class="text-xs">Esc</Kbd> to close
        </li>
      </ul>
      <div class="text-sm text-muted-foreground">
        Search by{" "}
        <a href="https://pagefind.app/" class="hover:underline">
          Pagefind
        </a>
      </div>
    </div>
  )
}

const LoadingPresenter: ParentComponent = (props) => (
  <div class="flex flex-col items-center">
    <p class="my-8 text-muted-foreground">{props.children}</p>
  </div>
)
