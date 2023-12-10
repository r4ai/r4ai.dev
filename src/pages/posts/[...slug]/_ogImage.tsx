import { fetchFont } from "@/lib/font"
import { readFile } from "fs/promises"
import satori from "satori"
import sharp from "sharp"
import { loadDefaultJapaneseParser } from "budoux"
import { isDev } from "@/lib/dev"

declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    tw?: string
  }
}

const console = {
  log: (...args: unknown[]): unknown => isDev() && console.log(...args),
  warn: (...args: unknown[]): unknown => isDev() && console.warn(...args),
  error: (...args: unknown[]): unknown => isDev() && console.error(...args),
  info: (...args: unknown[]): unknown => isDev() && console.info(...args),
}

type OgImageProps = {
  title: string
}

const parser = loadDefaultJapaneseParser()

const buffer2url = (buffer: Buffer) =>
  `data:image/png;base64,${buffer.toString("base64")}`

const isHalfWidth = (char: string) => {
  const charCode = char.charCodeAt(0)
  return (
    (charCode >= 0x0020 && charCode <= 0x007e) || // ASCII
    (charCode >= 0xff61 && charCode <= 0xff9f) // Halfwidth Katakana
  )
}

const buildText = (text: string) => {
  const texts = parser
    .parse(text.replaceAll("<br>", "").replaceAll("<br />", ""))
    .map((text) => text.split("\n"))
    .flat()
    .map((text) => ({
      text,
      width: Array.from(text).reduce((acc, char) => {
        if (isHalfWidth(char)) {
          return acc + 1
        } else {
          return acc + 2
        }
      }, 0),
      shouldWrap: false,
    }))

  // 改行が必要な場所を探す
  const maxWidth = [
    19, // 1行目: 半角20文字
    19, // 2行目: 半角19文字
    19, // 3行目: 半角19文字
    16, // 4行目: 半角16文字
  ]
  let currentWidth = texts[0].width
  let currentLine = 0
  for (let i = 1; i < texts.length; i++) {
    if (currentWidth > maxWidth[Math.min(currentLine, 3)]) {
      currentLine += 1
      currentWidth -= maxWidth[Math.min(currentLine, 3)]
      continue
    }

    currentWidth += texts[i].width
    if (currentWidth > maxWidth[Math.min(currentLine, 3)]) {
      currentLine += 1
      texts[i].shouldWrap = true
      currentWidth = texts[i].width
    }
  }
  console.log(texts)

  // 改行ごとに分割
  // e.g. formattedTexts = ["あいうえお", "かきくけこ", "さしすせそ", "たちつてと..."]
  const formattedTexts = [""]
  let i = 0
  for (const text of texts) {
    if (i > 3) {
      formattedTexts[i - 1] += "..."
      break
    }
    if (text.shouldWrap) {
      i += 1
      formattedTexts[i] = text.text
    } else {
      formattedTexts[i] += text.text
    }
  }
  console.log(formattedTexts)

  return (
    <div tw="flex flex-col">
      {formattedTexts.map((text) => (
        <div>{text}</div>
      ))}
    </div>
  )
}

export const OgImage = async ({ title }: OgImageProps) => {
  const text = {
    title,
  }
  const bgAccentImage = await readFile("src/assets/imgs/og/stripe.png")
  const bgImage = await readFile("src/assets/imgs/og/bg.png")

  const svg = await satori(
    <>
      <div
        lang="ja-JP"
        tw="flex flex-row bg-black items-center"
        style={{
          width: "1200px",
          height: "630px",
        }}
      >
        <img
          src={buffer2url(bgImage)}
          width={1200}
          height={630}
          tw="absolute object-cover opacity-80"
        ></img>
        <img
          src={buffer2url(bgAccentImage)}
          width={1200}
          height={900}
          tw="absolute object-cover -top-36"
        ></img>
        <h1
          tw="text-8xl mx-8 text-gray-50"
          style={{
            textShadow: "0 0 10px #000",
          }}
        >
          {buildText(text.title)}
        </h1>
        <div
          tw="text-6xl text-gray-200 absolute bottom-12 right-12 flex"
          style={{
            textShadow: "0 0 10px #000",
          }}
        >
          r4ai.dev
        </div>
      </div>
    </>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Noto Sans JP",
          data: await fetchFont("Noto Sans JP", 800),
          weight: 800,
          style: "normal",
        },
      ],
    }
  )

  const png = await sharp(Buffer.from(svg)).png().toBuffer()

  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
    },
  })
}
