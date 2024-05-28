export const joinUrlSegments = (a: string, b: string) => {
  if (!a || !b) return a || b || ""
  if (a.endsWith("/")) a = a.substring(0, a.length - 1)
  if (!b.startsWith("/")) b = "/" + b
  return a + b
}

export const removeLeadingSlash = (str: string) => {
  return str.startsWith("/") ? str.slice(1) : str
}
