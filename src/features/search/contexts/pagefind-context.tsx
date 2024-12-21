import type * as pagefindJs from "pagefind-js"
import {
  type Component,
  createContext,
  createResource,
  type JSX,
  type Resource,
} from "solid-js"

export type PagefindContext = {
  pagefind: Resource<typeof pagefindJs>
}

export const PagefindContext = createContext<PagefindContext | undefined>(
  undefined
)

export type PagefindProviderProps = {
  children: JSX.Element
}

export const PagefindProvider: Component<PagefindProviderProps> = (props) => {
  const [pagefind] = createResource(() => import("pagefind-js"))

  return (
    <PagefindContext.Provider value={{ pagefind }}>
      {props.children}
    </PagefindContext.Provider>
  )
}
