import { For } from "solid-js"
import type { Meta, StoryObj } from "storybook-solidjs"

import { CodeBlock, InlineCode, Paragraph } from "~/components/typography"

import { Callout, callouts } from "./callout"

const meta = {
  title: "UI/Callout",
  component: Callout,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Callout>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Note content here.",
  },
}

export const WithTitle: Story = {
  args: {
    children: "Note content here.",
    title: "Note title",
  },
}

export const WithLongContent: Story = {
  args: {
    title: "夏目漱石 『こころ』",
    children: (
      <>
        <Paragraph>
          私はその人を常に先生と呼んでいた。だからここでもただ先生と書くだけで本名は打ち明けない。これは世間を憚かる遠慮というよりも、その方が私にとって自然だからである。私はその人の記憶を呼び起すごとに、すぐ「先生」といいたくなる。筆を執っても心持は同じ事である。よそよそしい頭文字などはとても使う気にならない。
        </Paragraph>
        <Paragraph>
          私が先生と知り合いになったのは鎌倉である。その時私はまだ若々しい書生であった。暑中休暇を利用して海水浴に行った友達からぜひ来いという端書を受け取ったので、私は多少の金を工面して、出掛ける事にした。私は金の工面に二、三日を費やした。ところが私が鎌倉に着いて三日と経たないうちに、私を呼び寄せた友達は、急に国元から帰れという電報を受け取った。電報には母が病気だからと断ってあったけれども友達はそれを信じなかった。友達はかねてから国元にいる親たちに勧まない結婚を強いられていた。彼は現代の習慣からいうと結婚するにはあまり年が若過ぎた。それに肝心の当人が気に入らなかった。それで夏休みに当然帰るべきところを、わざと避けて東京の近くで遊んでいたのである。彼は電報を私に見せてどうしようと相談をした。私にはどうしていいか分らなかった。けれども実際彼の母が病気であるとすれば彼は固より帰るべきはずであった。それで彼はとうとう帰る事になった。せっかく来た私は一人取り残された。
        </Paragraph>
        <Callout type="info" title="Nested callout">
          <Paragraph>
            学校の授業が始まるにはまだ大分日数があるので鎌倉におってもよし、帰ってもよいという境遇にいた私は、当分元の宿に留まる覚悟をした。友達は中国のある資産家の息子で金に不自由のない男であったけれども、学校が学校なのと年が年なので、生活の程度は私とそう変りもしなかった。したがって一人ぼっちになった私は別に恰好な宿を探す面倒ももたなかったのである。
          </Paragraph>
          <Callout type="tip" title="Further nested callout">
            宿は鎌倉でも辺鄙な方角にあった。玉突きだのアイスクリームだのというハイカラなものには長い畷を一つ越さなければ手が届かなかった。車で行っても二十銭は取られた。けれども個人の別荘はそこここにいくつでも建てられていた。それに海へはごく近いので海水浴をやるには至極便利な地位を占めていた。
          </Callout>
        </Callout>
      </>
    ),
  },
}

export const WithFoldable: Story = {
  args: {
    children: "Note content here.",
    title: "Note title",
    isFoldable: true,
  },
}

export const WithDefaultFolded: Story = {
  args: {
    children: "Note content here.",
    title: "Note title",
    isFoldable: true,
    defaultFolded: true,
  },
}

export const Types: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div class="grid grid-cols-1 w-full gap-6 p-6 md:grid-cols-2">
      <For
        each={
          Object.entries(callouts) as unknown as [
            keyof typeof callouts,
            (typeof callouts)[keyof typeof callouts],
          ][]
        }
      >
        {([type, callout]) => (
          <Callout class="max-w-md w-full" type={type}>
            <Paragraph>{callout.label} content here.</Paragraph>
            <Paragraph>
              <strong>Aliases</strong>:{" "}
              <For
                each={Object.entries(callouts)
                  .filter(([, value]) => value.type === callout.type)
                  .map(([key]) => key)}
              >
                {(alias) => (
                  <>
                    <InlineCode class="mr-1">{alias}</InlineCode>,{" "}
                  </>
                )}
              </For>
            </Paragraph>
            <CodeBlock lang="mdx">
              <pre class="px-4">
                {[`> [!${type}]`, `> ${callout.label} content here.`].join(
                  "\n",
                )}
              </pre>
            </CodeBlock>
          </Callout>
        )}
      </For>
    </div>
  ),
}
