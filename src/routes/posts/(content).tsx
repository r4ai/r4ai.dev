import "~/styles/katex.css"

import type { JSX } from "solid-js"

import { MDXTypographyProvider } from "~/components/typography"

import { PostHeader } from "./components"

export default (props: { children?: JSX.Element }) => {
  return (
    <article class="container">
      <MDXTypographyProvider
        components={{
          header: PostHeader,
        }}
      >
        {props.children}
      </MDXTypographyProvider>
    </article>
  )
}
