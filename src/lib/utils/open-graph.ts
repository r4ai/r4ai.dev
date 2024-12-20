import satori, { type SatoriOptions } from "satori"
import type { Sharp, SharpOptions } from "sharp"

export type ReactLikeObject = {
  type: string
  props: Record<string, unknown> & {
    tw?: string
    style?: Record<string, string>
    children?: (ReactLikeObject | string)[]
  }
}

export type SharpFn = (
  input?:
    | Buffer
    | ArrayBuffer
    | Uint8Array
    | Uint8ClampedArray
    | Int8Array
    | Uint16Array
    | Int16Array
    | Uint32Array
    | Int32Array
    | Float32Array
    | Float64Array
    | string,
  options?: SharpOptions
) => Sharp

export const render = async <Props extends object>(
  sharp: SharpFn,
  component: (props: Props) => ReactLikeObject,
  props: Props,
  options: SatoriOptions
): Promise<Buffer> => {
  // @ts-expect-error satori types are wrong
  const svg = await satori(component(props), options)
  const png = await sharp(Buffer.from(svg), { unlimited: true })
    .png()
    .toBuffer()
  return png
}

export const buffer2url = (buffer: Buffer) =>
  `data:image/png;base64,${buffer.toString("base64")}`
