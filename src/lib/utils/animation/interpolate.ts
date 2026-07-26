import {
  type Interpolatable,
  INTERPOLATABLE_ERROR,
  type InterpolatableCollection,
  ownEnumerableKeys,
  requireValue,
} from "./interpolatable"

export type { Interpolatable } from "./interpolatable"

const interpolateValue = (
  from: Interpolatable,
  to: Interpolatable,
  ease: (t: number) => number,
  elapsed: number
): Interpolatable => {
  if (typeof from === "number") {
    if (typeof to !== "number") {
      throw new Error(INTERPOLATABLE_ERROR)
    }
    return (to - from) * ease(elapsed) + from
  }

  if (typeof to === "number" || Array.isArray(from) !== Array.isArray(to)) {
    throw new Error(INTERPOLATABLE_ERROR)
  }

  const result: InterpolatableCollection = Array.isArray(from) ? [] : {}
  for (const key of ownEnumerableKeys(from)) {
    Reflect.set(
      result,
      key,
      interpolateValue(
        requireValue(Reflect.get(from, key)),
        requireValue(Reflect.get(to, key)),
        ease,
        elapsed
      )
    )
  }
  return result
}

/**
 * Interpolates the numeric leaves of two values with the same recursive shape.
 *
 * @remarks
 * Every array item and record key in `from` must have a corresponding value in
 * `to`. A missing value or a different value kind throws an error.
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
