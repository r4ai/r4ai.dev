import "~/styles/katex.css"

import type { JSX } from "solid-js"

import { MDXTypographyProvider } from "~/components/typography"

export default (props: { children?: JSX.Element }) => {
  return (
    <article class="container">
      <MDXTypographyProvider>{props.children}</MDXTypographyProvider>
    </article>
  )
}
