import assert from "node:assert/strict"
import { test } from "node:test"

import {
  COMPACT_PROJECT_CARD_IMAGE_SIZES,
  LARGE_PROJECT_CARD_IMAGE_SIZES,
  PROJECT_CARD_IMAGE_WIDTHS,
} from "../src/pages/projects/_components/project-card/project-card-image.ts"

const selectImageWidth = (renderedWidth: number, devicePixelRatio: number) => {
  const requiredWidth = renderedWidth * devicePixelRatio
  return (
    PROJECT_CARD_IMAGE_WIDTHS.find((width) => width >= requiredWidth) ??
    PROJECT_CARD_IMAGE_WIDTHS.at(-1)
  )
}

test("project card image candidates cover supported high-density layouts", () => {
  const states = [
    {
      layout: "large desktop card",
      renderedWidth: 720,
      devicePixelRatio: 2,
      expectedWidth: 1600,
    },
    {
      layout: "compact desktop card",
      renderedWidth: 469,
      devicePixelRatio: 2,
      expectedWidth: 1200,
    },
    {
      layout: "mobile card",
      renderedWidth: 326,
      devicePixelRatio: 3,
      expectedWidth: 1200,
    },
  ] as const

  for (const state of states) {
    assert.equal(
      selectImageWidth(state.renderedWidth, state.devicePixelRatio),
      state.expectedWidth,
      state.layout
    )
  }
})

test("project card size hints match the large and compact grid contracts", () => {
  assert.equal(
    LARGE_PROJECT_CARD_IMAGE_SIZES,
    "(min-width: 1536px) 720px, (min-width: 1024px) calc(50vw - 48px), calc(100vw - 64px)"
  )
  assert.equal(
    COMPACT_PROJECT_CARD_IMAGE_SIZES,
    "(min-width: 1536px) 469px, (min-width: 1280px) calc(33.333vw - 45px), (min-width: 768px) calc(50vw - 48px), calc(100vw - 64px)"
  )
})
