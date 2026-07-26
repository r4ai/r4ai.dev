import {
  getInterpolatableKind,
  haveSameKeys,
  type Interpolatable,
  type InterpolatableRecord,
  ownEnumerableKeys,
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

export const calculateSpring = <T extends Interpolatable>(
  options: SpringOptions,
  currentVelocity: T,
  currentValue: T,
  targetValue: T,
  deltaTime: number
): SpringedValue<T> => {
  const kind = getInterpolatableKind(currentVelocity)
  if (
    kind !== getInterpolatableKind(currentValue) ||
    kind !== getInterpolatableKind(targetValue)
  ) {
    throw new Error("Given values are not interpolatable")
  }

  switch (kind) {
    case "number":
      return calculateNumber(
        options,
        currentVelocity as number,
        currentValue as number,
        targetValue as number,
        deltaTime
      ) as SpringedValue<T>
    case "array":
      return calculateArray(
        options,
        currentVelocity as Interpolatable[],
        currentValue as Interpolatable[],
        targetValue as Interpolatable[],
        deltaTime
      ) as SpringedValue<T>
    case "record":
      return calculateRecord(
        options,
        currentVelocity as InterpolatableRecord,
        currentValue as InterpolatableRecord,
        targetValue as InterpolatableRecord,
        deltaTime
      ) as SpringedValue<T>
  }
}

const calculateArray = (
  options: SpringOptions,
  currentVelocity: Interpolatable[],
  currentValue: Interpolatable[],
  targetValue: Interpolatable[],
  deltaTime: number
): SpringedValue<Interpolatable[]> => {
  const lengths = new Set([
    currentVelocity.length,
    currentValue.length,
    targetValue.length,
  ])
  if (lengths.size !== 1) {
    throw new Error("Given values are not interpolatable")
  }

  const springedValues = currentVelocity.map((velocity, index) =>
    calculateSpring(
      options,
      velocity,
      currentValue[index]!,
      targetValue[index]!,
      deltaTime
    )
  )

  return {
    velocity: springedValues.map(({ velocity }) => velocity),
    value: springedValues.map(({ value }) => value),
    settled: springedValues.every(({ settled }) => settled),
  }
}

const calculateRecord = (
  options: SpringOptions,
  currentVelocity: InterpolatableRecord,
  currentValue: InterpolatableRecord,
  targetValue: InterpolatableRecord,
  deltaTime: number
): SpringedValue<InterpolatableRecord> => {
  if (
    !haveSameKeys(currentVelocity, currentValue) ||
    !haveSameKeys(currentVelocity, targetValue)
  ) {
    throw new Error("Given values are not interpolatable")
  }

  const springedEntries = ownEnumerableKeys(currentVelocity).map(
    (key) =>
      [
        key,
        calculateSpring(
          options,
          currentVelocity[key]!,
          currentValue[key]!,
          targetValue[key]!,
          deltaTime
        ),
      ] as const
  )

  return {
    velocity: Object.fromEntries(
      springedEntries.map(([key, { velocity }]) => [key, velocity])
    ),
    value: Object.fromEntries(
      springedEntries.map(([key, { value }]) => [key, value])
    ),
    settled: springedEntries.every(([, { settled }]) => settled),
  }
}

export const createZeroValue = <T extends Interpolatable>(value: T): T => {
  switch (getInterpolatableKind(value)) {
    case "number":
      return 0 as T
    case "array":
      return (value as Interpolatable[]).map(createZeroValue) as T
    case "record":
      return Object.fromEntries(
        ownEnumerableKeys(value as InterpolatableRecord).map((key) => [
          key,
          createZeroValue((value as InterpolatableRecord)[key]!),
        ])
      ) as T
  }
}
