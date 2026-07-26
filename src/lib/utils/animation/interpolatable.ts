export type InterpolatableRecord = {
  [key: string | number | symbol]: Interpolatable
}

export type Interpolatable = number | InterpolatableRecord | Interpolatable[]

export const isInterpolatableRecord = (
  value: Interpolatable
): value is InterpolatableRecord =>
  typeof value === "object" && !Array.isArray(value)

export const ownEnumerableKeys = (value: InterpolatableRecord): PropertyKey[] =>
  Reflect.ownKeys(value).filter((key) =>
    Object.prototype.propertyIsEnumerable.call(value, key)
  )

export const haveSameKeys = (
  left: InterpolatableRecord,
  right: InterpolatableRecord
) => {
  const leftKeys = ownEnumerableKeys(left)
  const rightKeys = ownEnumerableKeys(right)

  return (
    leftKeys.length === rightKeys.length &&
    leftKeys.every((key) => Object.hasOwn(right, key))
  )
}

export const getArrayValue = (
  values: Interpolatable[],
  index: number
): Interpolatable => {
  const value = values[index]
  if (value === undefined) {
    throw new Error("Given values are not interpolatable")
  }
  return value
}

export const getRecordValue = (
  record: InterpolatableRecord,
  key: PropertyKey
): Interpolatable => {
  const value = record[key]
  if (value === undefined) {
    throw new Error("Given values are not interpolatable")
  }
  return value
}
