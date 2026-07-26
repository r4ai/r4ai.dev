import { describe, expect, test } from "vitest"

import { type Interpolatable, interpolate } from "./interpolate"

const invalidPairs: {
  name: string
  from: Interpolatable
  to: Interpolatable
}[] = [
  {
    name: "different array lengths",
    from: [0, 0],
    to: [100],
  },
  {
    name: "different object keys",
    from: { x: 0 },
    to: { y: 100 },
  },
  {
    name: "an array and an object",
    from: [0],
    to: { 0: 100 },
  },
]

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

  test("interpolates symbol keys", () => {
    const coordinate = Symbol("coordinate")

    expect(
      interpolate({ [coordinate]: 0 }, { [coordinate]: 100 }, (t) => t, 0.5)
    ).toEqual({ [coordinate]: 50 })
  })

  test.each(invalidPairs)("rejects $name", ({ from, to }) => {
    expect(() => interpolate<Interpolatable>(from, to, (t) => t, 0.5)).toThrow(
      "Given values are not interpolatable"
    )
  })

  test.each([-0.1, 1.1])("rejects elapsed value %s", (elapsed) => {
    expect(() => interpolate(0, 100, (t) => t, elapsed)).toThrow(
      "Duration must be between 0 and 1"
    )
  })
})
