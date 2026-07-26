export type InterpolatableRecord = {
  [key: string | number | symbol]: Interpolatable
}

export type Interpolatable = number | InterpolatableRecord | Interpolatable[]

export type InterpolatableKind = "number" | "array" | "record"

export const getInterpolatableKind = (
  value: Interpolatable
): InterpolatableKind => {
  if (typeof value === "number") return "number"
  return Array.isArray(value) ? "array" : "record"
}

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
