export type Interpolatable =
  | number
  | { [key: string | number | symbol]: Interpolatable }
  | Interpolatable[]

/**
 * Interpolates between two numeric values.
 * @param from The start value
 * @param to The end value
 * @param ease The easing function. `ease: p => t`.
 *             The given argument is `0 <= p <= 1`,
 *             and the return value must be `0 <= t <= 1`
 * @param elapsed The elapsed percentage. `0 <= elapsed <= 1`
 * @returns The interpolated value. the value range is: `from <= value <= to`
 */
export const interpolate = <T extends Interpolatable>(
  from: Interpolatable,
  to: Interpolatable,
  ease: (t: number) => number,
  elapsed: number
): Interpolatable => {
  if (elapsed < 0 || 1 < elapsed) {
    throw new Error("Duration must be between 0 and 1")
  }

  if (typeof from === "number" && typeof to === "number") {
    const eased = ease(elapsed)
    const diff = to - from
    return diff * eased + from
  }

  if (Array.isArray(from) && Array.isArray(to)) {
    const result = from.map((fromItem, index) => {
      if (to[index] == null)
        throw new Error("Given values are not interpolatable")
      return interpolate(fromItem, to[index], ease, elapsed)
    })
    return result
  }

  if (typeof from === "object" && typeof to === "object") {
    const result: { [key: string]: Interpolatable } = {}
    for (const key in from) {
      if (
        Object.prototype.hasOwnProperty.call(from, key) &&
        Object.prototype.hasOwnProperty.call(to, key)
      ) {
        result[key] = interpolate(from[key] as T, to[key] as T, ease, elapsed)
      }
    }
    return result
  }

  throw new Error("Given values are not interpolatable")
}
