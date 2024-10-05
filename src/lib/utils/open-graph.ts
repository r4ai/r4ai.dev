import satori, { type SatoriOptions } from "satori"
import sharp from "sharp"

export type ReactLikeObject = {
  type: string
  props: Record<string, unknown> & {
    tw?: string
    style?: Record<string, string>
    children?: (ReactLikeObject | string)[]
  }
}

export const render = async <Props extends object>(
  component: (props: Props) => ReactLikeObject,
  props: Props,
  options: SatoriOptions
) => {
  // @ts-expect-error satori types are wrong
  const svg = await satori(component(props), options)
  const png = await sharp(Buffer.from(svg), { unlimited: true })
    .png()
    .toBuffer()
  return png
}

export const buffer2url = (buffer: Buffer) =>
  `data:image/png;base64,${buffer.toString("base64")}`
