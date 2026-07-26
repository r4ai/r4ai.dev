import { describe, expect, test } from "vitest"

import type { Interpolatable } from "./interpolatable"
import { calculateSpring, type SpringOptions } from "./spring-value"

const options: SpringOptions = {
  mass: 1,
  stiffness: 0.15,
  damping: 0.8,
  precision: 0.01,
}

describe("calculateSpring", () => {
  test.each([
    {
      name: "all properties are settled",
      current: { x: 0, y: 0 },
      target: { x: 0, y: 0 },
      settled: true,
    },
    {
      name: "one property is moving",
      current: { x: 0, y: 0 },
      target: { x: 0, y: 1 },
      settled: false,
    },
    {
      name: "all properties are moving",
      current: { x: 0, y: 0 },
      target: { x: 1, y: 1 },
      settled: false,
    },
  ])("reports settled when $name", ({ current, target, settled }) => {
    const result = calculateSpring(options, { x: 0, y: 0 }, current, target, 0)

    expect(result.settled).toBe(settled)
  })

  test("rejects mismatched record shapes", () => {
    expect(() =>
      calculateSpring<Interpolatable>(options, { x: 0 }, { x: 0 }, { y: 1 }, 0)
    ).toThrow("Given values are not interpolatable")
  })
})
