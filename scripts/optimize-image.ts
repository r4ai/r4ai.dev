#!/usr/bin/env bun

import { parseArgs, styleText } from "node:util"

import sharp from "sharp"

const { positionals } = parseArgs({
  args: Bun.argv,
  strict: true,
  allowPositionals: true,
})

const files = positionals.slice(2)
for (const file of files) {
  console.log(styleText("dim", `Optimizing \`${file}\``))
  const image = sharp(file)
  await image
    .toFormat("avif", { quality: 60 })
    .toFile(file.replace(/\.[^.]+$/, ".avif"))
  console.log(
    styleText("dim", `Generated \`${file.replace(/\.[^.]+$/, ".avif")}\``),
  )
  await image
    .toFormat("webp", { quality: 80 })
    .toFile(file.replace(/\.[^.]+$/, ".webp"))
  console.log(
    styleText("dim", `Generated \`${file.replace(/\.[^.]+$/, ".webp")}\``),
  )
}

console.log()
console.log(styleText("green", " Optimization complete!"))
