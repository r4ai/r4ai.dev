import { isServer } from "@/lib/utils"
export const MEDIA_QUERY_PREFERS_DARK = "(prefers-color-scheme: dark)"
export const MEDIA_QUERY_PREFERS_LIGHT = "(prefers-color-scheme: light)"
export const LOCAL_STORAGE_KEY_COLOR_SCHEME = "color-scheme"

export type ResolvedColorScheme = "light" | "dark"
export type ColorScheme = ResolvedColorScheme | "system"

export const getSystemColorScheme = (): ResolvedColorScheme | undefined => {
  if (isServer()) return undefined
  if (window.matchMedia(MEDIA_QUERY_PREFERS_DARK).matches) return "dark"
  if (window.matchMedia(MEDIA_QUERY_PREFERS_LIGHT).matches) return "light"
  return undefined
}

export const subscribeSystemColorSchemeChange = (
  onChange: (scheme: ResolvedColorScheme) => void
) => {
  if (isServer()) return undefined
  const darkMediaQuery = window.matchMedia(MEDIA_QUERY_PREFERS_DARK)
  const lightMediaQuery = window.matchMedia(MEDIA_QUERY_PREFERS_LIGHT)

  const handleColorSchemeChange = () => {
    const systemColorScheme = getSystemColorScheme()
    if (systemColorScheme == null) return

    onChange(systemColorScheme)
  }

  darkMediaQuery.addEventListener("change", handleColorSchemeChange)
  lightMediaQuery.addEventListener("change", handleColorSchemeChange)

  return () => {
    darkMediaQuery.removeEventListener("change", handleColorSchemeChange)
    lightMediaQuery.removeEventListener("change", handleColorSchemeChange)
  }
}

export const loadColorScheme = (): ColorScheme | undefined => {
  if (isServer()) return undefined
  const colorScheme = window.localStorage.getItem(
    LOCAL_STORAGE_KEY_COLOR_SCHEME
  )
  switch (colorScheme) {
    case "light":
    case "dark":
    case "system":
      return colorScheme
    default:
      return undefined
  }
}

export const saveColorScheme = (colorScheme: ColorScheme) => {
  if (isServer()) return undefined
  window.localStorage.setItem(LOCAL_STORAGE_KEY_COLOR_SCHEME, colorScheme)
  return colorScheme
}

export const resolveColorScheme = (colorScheme: ColorScheme) => {
  if (colorScheme === "system") return getSystemColorScheme()
  return colorScheme
}

export const applyResolvedColorScheme = (
  resolvedColorScheme: ResolvedColorScheme
) => {
  document.documentElement.dataset.colorScheme = resolvedColorScheme
}
