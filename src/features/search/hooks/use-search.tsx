import { useContext } from "solid-js"

import { SearchContext, SearchProvider } from "../contexts/search-context"

export const useSearch = () => {
  const searchContext = useContext(SearchContext)
  if (searchContext === undefined) {
    throw new Error(
      `${useSearch.name} must be used within a ${SearchProvider.name}`
    )
  }
  return searchContext
}
