import { useContext } from "solid-js"

import {
  ColorSchemeContext,
  ColorSchemeProvider,
} from "../contexts/color-scheme-context"

export const useColorScheme = () => {
  const colorSchemeContext = useContext(ColorSchemeContext)
  if (colorSchemeContext == null) {
    throw new Error(
      `${useColorScheme.name} must be used within a ${ColorSchemeProvider.name}`,
    )
  }
  return colorSchemeContext
}
