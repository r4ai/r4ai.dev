export type InterpolatableRecord = {
  [key: string | number | symbol]: Interpolatable
}

export type InterpolatableCollection = InterpolatableRecord | Interpolatable[]

export type Interpolatable = number | InterpolatableCollection

export const INTERPOLATABLE_ERROR = "Given values are not interpolatable"

export const ownEnumerableKeys = (
  value: InterpolatableCollection
): PropertyKey[] =>
  Reflect.ownKeys(value).filter((key) =>
    Object.prototype.propertyIsEnumerable.call(value, key)
  )

export const requireValue = (value: Interpolatable | undefined) => {
  if (value === undefined) throw new Error(INTERPOLATABLE_ERROR)
  return value
}
