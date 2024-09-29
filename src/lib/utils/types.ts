export type PartiallyPartial<T, K extends keyof T> = Partial<Pick<T, K>> &
  Omit<T, K>

export type Split<
  Text extends string,
  Sep extends string,
> = Text extends `${infer First}${Sep}${infer Rest}`
  ? [First, ...Split<Rest, Sep>]
  : [Text]
