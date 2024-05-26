import { Metadata } from "sharp"

declare module "*.png" {
  const url: {
    avif: string
    webp: string
  }
  export default url
  export const metadata: Metadata
}
