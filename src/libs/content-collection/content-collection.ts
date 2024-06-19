type CollectionOptions<Schema> = {
  basePath: string
  dirname: string
  schema: Schema
}

export const defineCollection = <Schema>({
  basePath,
  dirname,
  schema,
}: CollectionOptions<Schema>) => {
  return {
    basePath,
    schema,
    dirname,
  } as const
}
