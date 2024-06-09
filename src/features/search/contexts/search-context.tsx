import {
  type Accessor,
  type Component,
  createContext,
  createSignal,
  type JSX,
  type Setter,
} from "solid-js"

export type SearchContext = {
  query: Accessor<string>
  setQuery: Setter<string>
  resultRefs: Accessor<(HTMLAnchorElement | undefined)[]>
  setResultRefs: Setter<(HTMLAnchorElement | undefined)[]>
  activeIndex: Accessor<number>
  setActiveIndex: Setter<number>
  incrementActiveIndex: () => void
  decrementActiveIndex: () => void
}

export const SearchContext = createContext<SearchContext | undefined>(undefined)

export type SearchProviderProps = {
  children: JSX.Element
}

export const SearchProvider: Component<SearchProviderProps> = (props) => {
  const [query, setQuery] = createSignal("")
  const [resultRefs, setResultRefs] = createSignal<
    (HTMLAnchorElement | undefined)[]
  >([])
  const [activeIndex, setActiveIndex] = createSignal(0)

  const incrementActiveIndex = () =>
    setActiveIndex((index) =>
      Math.max(Math.min(index + 1, resultRefs().length - 1), 0),
    )
  const decrementActiveIndex = () =>
    setActiveIndex((index) => Math.max(index - 1, 0))

  return (
    <SearchContext.Provider
      value={{
        query,
        setQuery,
        resultRefs,
        setResultRefs,
        activeIndex,
        setActiveIndex,
        incrementActiveIndex,
        decrementActiveIndex,
      }}
    >
      {props.children}
    </SearchContext.Provider>
  )
}
