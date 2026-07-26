import {
  getArrayValue,
  getRecordValue,
  haveSameKeys,
  type Interpolatable,
  type InterpolatableRecord,
  isInterpolatableRecord,
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

type SpringInputs = readonly [
  currentVelocity: Interpolatable,
  currentValue: Interpolatable,
  targetValue: Interpolatable,
]

type NumberInputs = readonly [number, number, number]
type ArrayInputs = readonly [
  Interpolatable[],
  Interpolatable[],
  Interpolatable[],
]
type RecordInputs = readonly [
  InterpolatableRecord,
  InterpolatableRecord,
  InterpolatableRecord,
]

const areNumbers = (values: SpringInputs): values is NumberInputs =>
  values.every((value) => typeof value === "number")

const isInterpolatableArray = (
  value: Interpolatable
): value is Interpolatable[] => Array.isArray(value)

const areArrays = (values: SpringInputs): values is ArrayInputs =>
  values.every(isInterpolatableArray)

const areRecords = (values: SpringInputs): values is RecordInputs =>
  values.every(isInterpolatableRecord)

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
  const values: SpringInputs = [currentVelocity, currentValue, targetValue]

  // Apply scalar spring physics to numeric leaves while preserving the shape:
  // { x: 1, scale: [1, 2] } stays { x: number, scale: number[] }.
  if (areNumbers(values)) {
    return calculateNumber(options, ...values, deltaTime)
  }
  if (areArrays(values)) {
    return calculateArray(options, ...values, deltaTime)
  }
  if (areRecords(values)) {
    return calculateRecord(options, ...values, deltaTime)
  }
  throw new Error("Given values are not interpolatable")
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
      getArrayValue(currentValue, index),
      getArrayValue(targetValue, index),
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

  type SpringedEntry = readonly [
    key: PropertyKey,
    value: SpringedValue<Interpolatable>,
  ]
  const springedEntries: SpringedEntry[] = ownEnumerableKeys(
    currentVelocity
  ).map((key): SpringedEntry => [
    key,
    calculateSpring(
      options,
      getRecordValue(currentVelocity, key),
      getRecordValue(currentValue, key),
      getRecordValue(targetValue, key),
      deltaTime
    ),
  ])

  const velocity: InterpolatableRecord = {}
  const value: InterpolatableRecord = {}
  // Rebuild both outputs with the source keys:
  // { x: springX } -> velocity.x and value.x.
  for (const [key, springed] of springedEntries) {
    velocity[key] = springed.velocity
    value[key] = springed.value
  }

  return {
    velocity,
    value,
    settled: springedEntries.every(([, { settled }]) => settled),
  }
}

export function createZeroValue<T extends Interpolatable>(value: T): T
export function createZeroValue(value: Interpolatable): Interpolatable {
  // Mirror the input shape with zero-valued numeric leaves:
  // { x: 1, scale: [1, 2] } -> { x: 0, scale: [0, 0] }.
  if (typeof value === "number") return 0
  if (Array.isArray(value)) return value.map(createZeroValue)
  if (!isInterpolatableRecord(value)) {
    throw new Error("Given values are not interpolatable")
  }

  const zeroValue: InterpolatableRecord = {}
  for (const key of ownEnumerableKeys(value)) {
    zeroValue[key] = createZeroValue(getRecordValue(value, key))
  }
  return zeroValue
}
