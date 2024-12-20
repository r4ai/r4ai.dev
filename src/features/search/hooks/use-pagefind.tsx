import { useContext } from "solid-js"

import { PagefindContext, PagefindProvider } from "../contexts/pagefind-context"

export const usePagefind = () => {
  const pagefindContext = useContext(PagefindContext)
  if (pagefindContext == null) {
    throw new Error(
      `${usePagefind.name} must be used within a ${PagefindProvider.name}`
    )
  }
  return pagefindContext
}
