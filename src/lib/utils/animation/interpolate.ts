import {
  getArrayValue,
  getRecordValue,
  haveSameKeys,
  type Interpolatable,
  type InterpolatableRecord,
  isInterpolatableRecord,
  ownEnumerableKeys,
} from "./interpolatable"

export type { Interpolatable } from "./interpolatable"

const interpolateNumber = (
  from: number,
  to: number,
  ease: (t: number) => number,
  elapsed: number
) => (to - from) * ease(elapsed) + from

const interpolateArray = (
  from: Interpolatable[],
  to: Interpolatable[],
  ease: (t: number) => number,
  elapsed: number
): Interpolatable[] => {
  if (from.length !== to.length) {
    throw new Error("Given values are not interpolatable")
  }

  return from.map((value, index) =>
    interpolate(value, getArrayValue(to, index), ease, elapsed)
  )
}

const interpolateRecord = (
  from: InterpolatableRecord,
  to: InterpolatableRecord,
  ease: (t: number) => number,
  elapsed: number
): InterpolatableRecord => {
  if (!haveSameKeys(from, to)) {
    throw new Error("Given values are not interpolatable")
  }

  const result: InterpolatableRecord = {}
  for (const key of ownEnumerableKeys(from)) {
    result[key] = interpolate(
      getRecordValue(from, key),
      getRecordValue(to, key),
      ease,
      elapsed
    )
  }
  return result
}

const interpolateValue = (
  from: Interpolatable,
  to: Interpolatable,
  ease: (t: number) => number,
  elapsed: number
): Interpolatable => {
  if (typeof from === "number") {
    if (typeof to !== "number") {
      throw new Error("Given values are not interpolatable")
    }
    return interpolateNumber(from, to, ease, elapsed)
  }

  if (Array.isArray(from)) {
    if (!Array.isArray(to)) {
      throw new Error("Given values are not interpolatable")
    }
    return interpolateArray(from, to, ease, elapsed)
  }

  if (!isInterpolatableRecord(from) || !isInterpolatableRecord(to)) {
    throw new Error("Given values are not interpolatable")
  }
  return interpolateRecord(from, to, ease, elapsed)
}

/**
 * Interpolates the numeric leaves of two values with the same recursive shape.
 *
 * @remarks
 * Arrays must have equal lengths, and records must have the same own enumerable
 * keys. A shape mismatch throws an error instead of dropping unmatched values.
 *
 * @param from The value returned when `elapsed` is `0`.
 * @param to The value returned when `elapsed` is `1`.
 * @param ease The easing function. `ease: p => t`.
 *             The given argument is `0 <= p <= 1`,
 *             and the return value must be `0 <= t <= 1`
 * @param elapsed The elapsed percentage. `0 <= elapsed <= 1`
 * @returns An interpolated value with the same shape as `from` and `to`.
 *
 * @example
 * ```ts
 * interpolate(
 *   { x: 0, opacity: [0, 1] },
 *   { x: 10, opacity: [1, 0] },
 *   (t) => t,
 *   0.5
 * )
 * // => { x: 5, opacity: [0.5, 0.5] }
 * ```
 */
export function interpolate<T extends Interpolatable>(
  from: T,
  to: T,
  ease: (t: number) => number,
  elapsed: number
): T
export function interpolate(
  from: Interpolatable,
  to: Interpolatable,
  ease: (t: number) => number,
  elapsed: number
): Interpolatable {
  if (elapsed < 0 || 1 < elapsed) {
    throw new Error("Duration must be between 0 and 1")
  }

  return interpolateValue(from, to, ease, elapsed)
}
