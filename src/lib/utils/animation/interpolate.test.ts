import { describe, expect, test } from "vitest"

import { interpolate } from "./interpolate"

describe("interpolate", () => {
  test("0 ~ 100, linear, 1", () => {
    const from = 0
    const to = 100
    const ease = (t: number) => t
    const elapsed = 1
    const result = interpolate(from, to, ease, elapsed)
    expect(result).toBe(100)
  })

  test("0 ~ 100, linear, 0.5", () => {
    const from = 0
    const to = 100
    const ease = (t: number) => t
    const elapsed = 0.5
    const result = interpolate(from, to, ease, elapsed)
    expect(result).toBe(50)
  })

  test("0 ~ 100, linear, 0.25", () => {
    const from = 0
    const to = 100
    const ease = (t: number) => t
    const elapsed = 0.25
    const result = interpolate(from, to, ease, elapsed)
    expect(result).toBe(25)
  })

  test("0 ~ 100, linear, 0", () => {
    const from = 0
    const to = 100
    const ease = (t: number) => t
    const elapsed = 0
    const result = interpolate(from, to, ease, elapsed)
    expect(result).toBe(0)
  })

  test("[0, 0] ~ [100, 100], linear, 1", () => {
    const from = [0, 0]
    const to = [100, 100]
    const ease = (t: number) => t
    const elapsed = 1
    const result = interpolate(from, to, ease, elapsed)
    expect(result).toEqual([100, 100])
  })

  test("[[10, 0, -10], [1, 2, 3]] ~ [[-10, 10, 10], [-1, 8, -3]], linear, 0.5", () => {
    const from = [
      [10, 0, -10],
      [1, 2, 3],
    ]
    const to = [
      [-10, 10, 10],
      [-1, 8, -3],
    ]
    const ease = (t: number) => t
    const elapsed = 0.5
    const result = interpolate(from, to, ease, elapsed)
    expect(result).toEqual([
      [0, 5, 0],
      [0, 5, 0],
    ])
  })

  test("{ x: 0, y: 0 } ~ { x: 100, y: 100 }, linear, 1", () => {
    const from = { x: 0, y: 0 }
    const to = { x: 100, y: 100 }
    const ease = (t: number) => t
    const elapsed = 1
    const result = interpolate(from, to, ease, elapsed)
    expect(result).toEqual({ x: 100, y: 100 })
  })

  test("{ x: 0, y: 0 } ~ { x: 100, y: 100 }, linear, 0.5", () => {
    const from = { x: 0, y: 0 }
    const to = { x: 100, y: 100 }
    const ease = (t: number) => t
    const elapsed = 0.5
    const result = interpolate(from, to, ease, elapsed)
    expect(result).toEqual({ x: 50, y: 50 })
  })

  test("{ x: 0, y: 0 } ~ { x: 100, y: 100 }, linear, 0", () => {
    const from = { x: 0, y: 0 }
    const to = { x: 100, y: 100 }
    const ease = (t: number) => t
    const elapsed = 0
    const result = interpolate(from, to, ease, elapsed)
    expect(result).toEqual({ x: 0, y: 0 })
  })

  test("{ a: [0, 0, 0], b: { x: [100, 200], y: [100, 200] } } ~ { a: [100, 100, 100], b: { x: [0, 0], y: [0, 0] } }, linear, 0.5", () => {
    const from = { a: [0, 0, 0], b: { x: [100, 200], y: [100, 200] } }
    const to = { a: [100, 100, 100], b: { x: [0, 0], y: [0, 0] } }
    const ease = (t: number) => t
    const elapsed = 0.5
    const result = interpolate(from, to, ease, elapsed)
    expect(result).toEqual({
      a: [50, 50, 50],
      b: { x: [50, 100], y: [50, 100] },
    })
  })
})
