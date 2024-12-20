import { renderHook, waitFor } from "@solidjs/testing-library"
import * as fc from "fast-check"
import { afterEach, describe, expect, test, vi } from "vitest"
import MatchMediaMock from "vitest-matchmedia-mock"

import { ColorSchemeProvider } from "../contexts/color-scheme-context"
import {
  LOCAL_STORAGE_KEY_COLOR_SCHEME,
  MEDIA_QUERY_PREFERS_DARK,
  MEDIA_QUERY_PREFERS_LIGHT,
  resolveColorScheme,
} from "../utils/color-scheme"
import { useColorScheme } from "./use-color-scheme"

describe(useColorScheme.name, () => {
  afterEach(() => {
    vi.resetAllMocks()
    localStorage.clear()
  })

  test("ColorSchemeProviderの外でuseColorSchemeを呼び出すとエラーが発生すること", () => {
    console.error = vi.fn()
    expect(() => {
      renderHook(() => useColorScheme())
    }).toThrow()
  })

  test("setColorSchemeでcolorSchemeとresolvedColorSkchemeが更新されること", () => {
    const matchMediaMock = new MatchMediaMock()

    for (const systemColorScheme of ["light", "dark"] as const) {
      matchMediaMock.useMediaQuery(
        systemColorScheme === "dark"
          ? MEDIA_QUERY_PREFERS_DARK
          : MEDIA_QUERY_PREFERS_LIGHT
      )
      const { result } = renderHook(() => useColorScheme(), {
        wrapper: ColorSchemeProvider,
      })
      expect(result.colorScheme()).toBe("system")
      expect(result.resolvedColorScheme()).toBe(systemColorScheme)
      expect(localStorage.getItem(LOCAL_STORAGE_KEY_COLOR_SCHEME)).toBe(
        "system"
      )
      expect(document.documentElement.dataset.colorScheme).toBe(
        systemColorScheme
      )

      result.setColorScheme("dark")
      expect(result.colorScheme()).toBe("dark")
      expect(result.resolvedColorScheme()).toBe("dark")
      expect(localStorage.getItem(LOCAL_STORAGE_KEY_COLOR_SCHEME)).toBe("dark")
      expect(document.documentElement.dataset.colorScheme).toBe("dark")

      result.setColorScheme("light")
      expect(result.colorScheme()).toBe("light")
      expect(result.resolvedColorScheme()).toBe("light")
      expect(localStorage.getItem(LOCAL_STORAGE_KEY_COLOR_SCHEME)).toBe("light")
      expect(document.documentElement.dataset.colorScheme).toBe("light")

      result.setColorScheme("system")
      expect(result.colorScheme()).toBe("system")
      expect(result.resolvedColorScheme()).toBe(systemColorScheme)
      expect(localStorage.getItem(LOCAL_STORAGE_KEY_COLOR_SCHEME)).toBe(
        "system"
      )
      expect(document.documentElement.dataset.colorScheme).toBe(
        systemColorScheme
      )

      localStorage.clear()
    }
    matchMediaMock.destroy()
  })

  test("localStorageにcolor-schemeが保存されている時に、colorSchemeとresolvedColorSchemeがそれに基づいた値になること", () => {
    const matchMediaMock = new MatchMediaMock()
    for (const colorScheme of ["light", "dark", "system"] as const) {
      for (const systemColorScheme of ["light", "dark"] as const) {
        matchMediaMock.useMediaQuery(
          systemColorScheme === "dark"
            ? MEDIA_QUERY_PREFERS_DARK
            : MEDIA_QUERY_PREFERS_LIGHT
        )
        localStorage.setItem(LOCAL_STORAGE_KEY_COLOR_SCHEME, colorScheme)
        const { result } = renderHook(() => useColorScheme(), {
          wrapper: ColorSchemeProvider,
        })
        expect(result.colorScheme()).toBe(colorScheme)
        expect(result.resolvedColorScheme()).toBe(
          resolveColorScheme(colorScheme)
        )
        expect(localStorage.getItem(LOCAL_STORAGE_KEY_COLOR_SCHEME)).toBe(
          colorScheme
        )
        expect(document.documentElement.dataset.colorScheme).toBe(
          resolveColorScheme(colorScheme)
        )
      }
    }
    matchMediaMock.destroy()
  })

  test("system-color-schemeが変更された時に、resolvedColorSchemeを更新すること", async () => {
    const matchMediaMock = new MatchMediaMock()
    for (const systemColorScheme of ["light", "dark"] as const) {
      matchMediaMock.useMediaQuery(
        systemColorScheme === "dark"
          ? MEDIA_QUERY_PREFERS_DARK
          : MEDIA_QUERY_PREFERS_LIGHT
      )
      const { result } = renderHook(() => useColorScheme(), {
        wrapper: ColorSchemeProvider,
      })
      await waitFor(() => {
        expect(result.colorScheme()).toBe("system")
        expect(result.resolvedColorScheme()).toBe(systemColorScheme)
        expect(localStorage.getItem(LOCAL_STORAGE_KEY_COLOR_SCHEME)).toBe(
          "system"
        )
        expect(document.documentElement.dataset.colorScheme).toBe(
          systemColorScheme
        )
      })

      matchMediaMock.useMediaQuery(MEDIA_QUERY_PREFERS_LIGHT)
      expect(result.colorScheme()).toBe("system")
      expect(result.resolvedColorScheme()).toBe("light")
      expect(localStorage.getItem(LOCAL_STORAGE_KEY_COLOR_SCHEME)).toBe(
        "system"
      )
      expect(document.documentElement.dataset.colorScheme).toBe("light")

      matchMediaMock.useMediaQuery(MEDIA_QUERY_PREFERS_DARK)
      expect(result.colorScheme()).toBe("system")
      expect(result.resolvedColorScheme()).toBe("dark")
      expect(localStorage.getItem(LOCAL_STORAGE_KEY_COLOR_SCHEME)).toBe(
        "system"
      )
      expect(document.documentElement.dataset.colorScheme).toBe("dark")

      // colorSchemeがdarkの時にsystem-color-schemeが変更されてもresolvedColorSchemeは更新されないこと
      result.setColorScheme("dark")
      expect(result.colorScheme()).toBe("dark")
      expect(result.resolvedColorScheme()).toBe("dark")
      expect(localStorage.getItem(LOCAL_STORAGE_KEY_COLOR_SCHEME)).toBe("dark")
      expect(document.documentElement.dataset.colorScheme).toBe("dark")
      matchMediaMock.useMediaQuery(MEDIA_QUERY_PREFERS_LIGHT)
      expect(result.colorScheme()).toBe("dark")
      expect(result.resolvedColorScheme()).toBe("dark")
      expect(localStorage.getItem(LOCAL_STORAGE_KEY_COLOR_SCHEME)).toBe("dark")
      expect(document.documentElement.dataset.colorScheme).toBe("dark")

      // colorSchemeがlightの時にsystem-color-schemeが変更されてもresolvedColorSchemeは更新されないこと
      result.setColorScheme("light")
      expect(result.colorScheme()).toBe("light")
      expect(result.resolvedColorScheme()).toBe("light")
      expect(localStorage.getItem(LOCAL_STORAGE_KEY_COLOR_SCHEME)).toBe("light")
      expect(document.documentElement.dataset.colorScheme).toBe("light")
      matchMediaMock.useMediaQuery(MEDIA_QUERY_PREFERS_DARK)
      expect(result.colorScheme()).toBe("light")
      expect(result.resolvedColorScheme()).toBe("light")
      expect(localStorage.getItem(LOCAL_STORAGE_KEY_COLOR_SCHEME)).toBe("light")
      expect(document.documentElement.dataset.colorScheme).toBe("light")

      localStorage.clear()
    }
    matchMediaMock.destroy()
  })

  test("system-color-schemeを'light'もしくは'dark'以外の値へ変更した際に何もしないこと", () => {
    const arbitraries = [
      fc.string().filter((str) => !["light", "dark"].includes(str)),
    ] as const
    const predicate = (systemColorScheme: string) => {
      const matchMediaMock = new MatchMediaMock()
      matchMediaMock.useMediaQuery(MEDIA_QUERY_PREFERS_LIGHT)
      const { result } = renderHook(() => useColorScheme(), {
        wrapper: ColorSchemeProvider,
      })
      expect(result.colorScheme()).toBe("system")
      expect(result.resolvedColorScheme()).toBe("light")
      expect(localStorage.getItem(LOCAL_STORAGE_KEY_COLOR_SCHEME)).toBe(
        "system"
      )
      expect(document.documentElement.dataset.colorScheme).toBe("light")

      matchMediaMock.useMediaQuery(
        `(prefers-color-scheme: ${systemColorScheme})`
      )
      expect(result.colorScheme()).toBe("system")
      expect(result.resolvedColorScheme()).toBe("light")
      expect(localStorage.getItem(LOCAL_STORAGE_KEY_COLOR_SCHEME)).toBe(
        "system"
      )
      expect(document.documentElement.dataset.colorScheme).toBe("light")
      matchMediaMock.destroy()
    }
    fc.assert(
      fc.property(...arbitraries, predicate).afterEach(() => {
        vi.resetAllMocks()
        localStorage.clear()
      })
    )
  })
})
