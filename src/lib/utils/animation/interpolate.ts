import {
  getInterpolatableKind,
  haveSameKeys,
  type Interpolatable,
  type InterpolatableRecord,
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
    interpolate(value, to[index]!, ease, elapsed)
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

  return Object.fromEntries(
    ownEnumerableKeys(from).map((key) => [
      key,
      interpolate(from[key]!, to[key]!, ease, elapsed),
    ])
  )
}

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
  from: T,
  to: T,
  ease: (t: number) => number,
  elapsed: number
): T => {
  if (elapsed < 0 || 1 < elapsed) {
    throw new Error("Duration must be between 0 and 1")
  }

  const kind = getInterpolatableKind(from)
  if (kind !== getInterpolatableKind(to)) {
    throw new Error("Given values are not interpolatable")
  }

  switch (kind) {
    case "number":
      return interpolateNumber(from as number, to as number, ease, elapsed) as T
    case "array":
      return interpolateArray(
        from as Interpolatable[],
        to as Interpolatable[],
        ease,
        elapsed
      ) as T
    case "record":
      return interpolateRecord(
        from as InterpolatableRecord,
        to as InterpolatableRecord,
        ease,
        elapsed
      ) as T
  }
}
