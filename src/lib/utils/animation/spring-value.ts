import {
  type Interpolatable,
  INTERPOLATABLE_ERROR,
  type InterpolatableCollection,
  ownEnumerableKeys,
  requireValue,
} from "./interpolatable"

export type SpringOptions = {
  /** a value between 0 and 1 where higher means a 'heavier' spring */
  mass: number

  /** a value between 0 and 1 where higher means a 'tighter' spring */
  stiffness: number

  /** a value between 0 and 1 where lower means a 'springier' spring */
  damping: number

  /** determines the threshold at which the spring is considered to have 'settled', where lower means more precise */
  precision: number
}

type SpringedValue<T> = {
  velocity: T
  value: T
  settled: boolean
}

const calculateNumber = (
  options: SpringOptions,
  currentVelocity: number,
  currentValue: number,
  targetValue: number,
  deltaTime: number
): SpringedValue<number> => {
  const { stiffness, damping, mass, precision } = options
  const displacement = currentValue - targetValue
  const springForce = -stiffness * displacement
  const dampingForce = -damping * currentVelocity
  const acceleration = (springForce + dampingForce) / mass
  const velocity = currentVelocity + acceleration * deltaTime

  return {
    velocity,
    value: currentValue + velocity * deltaTime,
    settled:
      Math.abs(displacement) < precision && Math.abs(velocity) < precision,
  }
}

export function calculateSpring<T extends Interpolatable>(
  options: SpringOptions,
  currentVelocity: T,
  currentValue: T,
  targetValue: T,
  deltaTime: number
): SpringedValue<T>
export function calculateSpring(
  options: SpringOptions,
  currentVelocity: Interpolatable,
  currentValue: Interpolatable,
  targetValue: Interpolatable,
  deltaTime: number
): SpringedValue<Interpolatable> {
  if (typeof currentVelocity === "number") {
    if (typeof currentValue !== "number" || typeof targetValue !== "number") {
      throw new Error(INTERPOLATABLE_ERROR)
    }
    return calculateNumber(
      options,
      currentVelocity,
      currentValue,
      targetValue,
      deltaTime
    )
  }

  if (
    typeof currentValue === "number" ||
    typeof targetValue === "number" ||
    Array.isArray(currentVelocity) !== Array.isArray(currentValue) ||
    Array.isArray(currentVelocity) !== Array.isArray(targetValue)
  ) {
    throw new Error(INTERPOLATABLE_ERROR)
  }
  return calculateCollection(
    options,
    currentVelocity,
    currentValue,
    targetValue,
    deltaTime
  )
}

const calculateCollection = (
  options: SpringOptions,
  currentVelocity: InterpolatableCollection,
  currentValue: InterpolatableCollection,
  targetValue: InterpolatableCollection,
  deltaTime: number
): SpringedValue<InterpolatableCollection> => {
  const isArray = Array.isArray(currentVelocity)
  const velocity: InterpolatableCollection = isArray ? [] : {}
  const value: InterpolatableCollection = isArray ? [] : {}
  let settled = true
  for (const key of ownEnumerableKeys(currentVelocity)) {
    const springed = calculateSpring(
      options,
      requireValue(Reflect.get(currentVelocity, key)),
      requireValue(Reflect.get(currentValue, key)),
      requireValue(Reflect.get(targetValue, key)),
      deltaTime
    )
    Reflect.set(velocity, key, springed.velocity)
    Reflect.set(value, key, springed.value)
    settled &&= springed.settled
  }

  return { velocity, value, settled }
}

export function createZeroValue<T extends Interpolatable>(value: T): T
export function createZeroValue(value: Interpolatable): Interpolatable {
  // e.g. { x: 1, scale: [1, 2] }
  //   -> { x: 0, scale: [0, 0] }
  if (typeof value === "number") return 0

  const zeroValue: InterpolatableCollection = Array.isArray(value) ? [] : {}
  for (const key of ownEnumerableKeys(value)) {
    Reflect.set(
      zeroValue,
      key,
      createZeroValue(requireValue(Reflect.get(value, key)))
    )
  }
  return zeroValue
}
