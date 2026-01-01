import { isServer } from "@/lib/utils/runtime"

export const MEDIA_QUERY_PREFERS_DARK = "(prefers-color-scheme: dark)"
export const MEDIA_QUERY_PREFERS_LIGHT = "(prefers-color-scheme: light)"
export const LOCAL_STORAGE_KEY_COLOR_SCHEME = "color-scheme"
export const CHANGE_RESOLVED_COLOR_SCHEME_EVENT = "changeResolvedColorScheme"

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

type ChangeResolvedColorSchemeEventDetail = {
  resolvedColorScheme: ResolvedColorScheme
}

const changeResolvedColorSchemeToLightEvent = new CustomEvent(
  CHANGE_RESOLVED_COLOR_SCHEME_EVENT,
  {
    detail: {
      resolvedColorScheme: "light",
    } satisfies ChangeResolvedColorSchemeEventDetail,
  }
)
const changeResolvedColorSchemeToDarkEvent = new CustomEvent(
  CHANGE_RESOLVED_COLOR_SCHEME_EVENT,
  {
    detail: {
      resolvedColorScheme: "dark",
    } satisfies ChangeResolvedColorSchemeEventDetail,
  }
)

export const applyResolvedColorScheme = (
  resolvedColorScheme: ResolvedColorScheme
) => {
  if (isServer()) return
  document.documentElement.dataset.colorScheme = resolvedColorScheme
  switch (resolvedColorScheme) {
    case "light":
      document.documentElement.dispatchEvent(
        changeResolvedColorSchemeToLightEvent
      )
      break
    case "dark":
      document.documentElement.dispatchEvent(
        changeResolvedColorSchemeToDarkEvent
      )
      break
  }
}

export const subscribeResolvedColorSchemeChange = (
  onChange: (scheme: ResolvedColorScheme) => void
) => {
  if (isServer()) return () => {}
  const handleResolvedColorSchemeChange = (
    event: CustomEvent<ChangeResolvedColorSchemeEventDetail>
  ) => {
    onChange(event.detail.resolvedColorScheme)
  }

  document.documentElement.addEventListener(
    CHANGE_RESOLVED_COLOR_SCHEME_EVENT,
    handleResolvedColorSchemeChange as unknown as EventListener
  )

  return () => {
    document.documentElement.removeEventListener(
      CHANGE_RESOLVED_COLOR_SCHEME_EVENT,
      handleResolvedColorSchemeChange as unknown as EventListener
    )
  }
}

export const getResolvedColorScheme = (
  defaultColorScheme: ResolvedColorScheme = "light"
): ResolvedColorScheme => {
  if (isServer()) return defaultColorScheme
  switch (document.documentElement.dataset.colorScheme) {
    case "light":
    case "dark":
      return document.documentElement.dataset.colorScheme
    default:
      return getSystemColorScheme() ?? defaultColorScheme
  }
}
