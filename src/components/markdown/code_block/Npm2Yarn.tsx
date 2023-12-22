import type { FC } from "react"
import type { CodeBlockProps } from "./CodeBlock.astro"
import convert from "npm-to-yarn"
import { CodeBlock } from "./CodeBlock"
import { highlighter } from "@/lib/shiki"
import * as Tabs from "@radix-ui/react-tabs"

type Npm2YarnProps = CodeBlockProps

export const Npm2Yarn: FC<Npm2YarnProps> = (props) => {
  const code = {
    npm: convert(props.code, "npm"),
    yarn: convert(props.code, "yarn"),
    pnpm: convert(props.code, "pnpm"),
    bun: convert(props.code, "bun"),
  }
  return (
    <Tabs.Root defaultValue="npm" className="not-prose">
      <Tabs.List className="flex flex-row">
        {Object.entries(code).map((c) => (
          <Tabs.Trigger
            className="border-b-2 px-2 pb-1 transition data-[state=active]:border-gray-900 data-[state=active]:font-bold dark:data-[state=active]:border-gray-200"
            value={c[0]}
          >
            {c[0]}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {Object.entries(code).map((c) => (
        <Tabs.Content value={c[0]}>
          <CodeBlock {...props}>
            <code
              className="px-4"
              dangerouslySetInnerHTML={{
                __html: highlighter.codeToHtml(c[1], {
                  lang: props.lang,
                  themes: {
                    light: "github-light",
                    dark: "one-dark-pro",
                  },
                }),
              }}
            />
          </CodeBlock>
        </Tabs.Content>
      ))}
    </Tabs.Root>
  )
}
