import {
  applyResolvedColorScheme,
  getSystemColorScheme,
  loadColorScheme,
} from "~/features/color-scheme/utils/color-scheme"

const storedColorScheme = loadColorScheme()
switch (storedColorScheme) {
  case "light":
  case "dark":
    applyResolvedColorScheme(storedColorScheme)
    break
  default:
    applyResolvedColorScheme(getSystemColorScheme() ?? "light")
    break
}
