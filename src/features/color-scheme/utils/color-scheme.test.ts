import * as fc from "fast-check"
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  test,
  vi,
} from "vitest"
import MatchMediaMock from "vitest-matchmedia-mock"

import {
  getSystemColorScheme,
  loadColorScheme,
  LOCAL_STORAGE_KEY_COLOR_SCHEME,
  MEDIA_QUERY_PREFERS_DARK,
  MEDIA_QUERY_PREFERS_LIGHT,
  resolveColorScheme,
  saveColorScheme,
  subscribeSystemColorSchemeChange,
} from "./color-scheme"

describe(subscribeSystemColorSchemeChange.name, () => {
  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  test("サーバー上で実行された時にundefinedを返すこと", () => {
    vi.stubGlobal("window", undefined)
    expect(subscribeSystemColorSchemeChange(vi.fn())).toBe(undefined)
  })

  test("prefer-color-schemeの変更時にonChangeが呼ばれること", () => {
    const matchMediaMock = new MatchMediaMock()
    matchMediaMock.useMediaQuery(MEDIA_QUERY_PREFERS_LIGHT)

    const onChange = vi.fn()
    const unsubscribe = subscribeSystemColorSchemeChange(onChange)

    matchMediaMock.useMediaQuery(MEDIA_QUERY_PREFERS_LIGHT)
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith("light")

    matchMediaMock.useMediaQuery(MEDIA_QUERY_PREFERS_DARK)
    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onChange).toHaveBeenCalledWith("dark")

    matchMediaMock.destroy()
    unsubscribe?.()
  })
})

describe(getSystemColorScheme.name, () => {
  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  test("サーバー上で実行された時にundefinedを返すこと", () => {
    vi.stubGlobal("window", undefined)
    expect(getSystemColorScheme()).toBe(undefined)
  })

  test("'prefers-color-scheme: light'な時に'light'を返すこと", () => {
    const matchMediaMock = new MatchMediaMock()

    matchMediaMock.useMediaQuery(MEDIA_QUERY_PREFERS_LIGHT)
    expect(getSystemColorScheme()).toBe("light")

    matchMediaMock.destroy()
  })

  test("'prefers-color-scheme: dark'な時に'dark'を返すこと", () => {
    const matchMediaMock = new MatchMediaMock()

    matchMediaMock.useMediaQuery(MEDIA_QUERY_PREFERS_DARK)
    expect(getSystemColorScheme()).toBe("dark")

    matchMediaMock.destroy()
  })

  test("'prefers-color-scheme'の値が'light'と'dark'以外の時にundefinedを返すこと", () => {
    const matchMediaMock = new MatchMediaMock()

    const arbitraries = [
      fc.string().filter((str) => !["light", "dark"].includes(str)),
    ] as const
    const predicate = (systemColorScheme: string) => {
      // 現時点では'prefers-color-scheme'の値は'light'と'dark'のみであるが、将来的にこれら以外の値も追加される可能性がある
      // @see https://drafts.csswg.org/mediaqueries-5/#prefers-color-scheme
      matchMediaMock.useMediaQuery(
        `(prefers-color-scheme: ${systemColorScheme})`
      )
      expect(getSystemColorScheme()).toBe(undefined)
    }
    fc.assert(fc.property(...arbitraries, predicate))

    matchMediaMock.destroy()
  })
})

describe(loadColorScheme.name, () => {
  const matchMediaMock = new MatchMediaMock()

  beforeAll(() => {
    matchMediaMock.useMediaQuery(MEDIA_QUERY_PREFERS_LIGHT)
  })

  afterEach(() => {
    matchMediaMock.clear()
    localStorage.clear()
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  afterAll(() => {
    matchMediaMock.destroy()
  })

  test("サーバー上で実行された時にundefinedを返すこと", () => {
    vi.stubGlobal("window", undefined)
    expect(loadColorScheme()).toBe(undefined)
  })

  test("localStorageに'light'が保存されている時に'light'を返すこと", () => {
    localStorage.setItem(LOCAL_STORAGE_KEY_COLOR_SCHEME, "light")
    expect(loadColorScheme()).toBe("light")
  })

  test("localStorageに'dark'が保存されている時に'dark'を返すこと", () => {
    localStorage.setItem(LOCAL_STORAGE_KEY_COLOR_SCHEME, "dark")
    expect(loadColorScheme()).toBe("dark")
  })

  test("localStorageに'system'が保存されている時に'system'を返すこと", () => {
    localStorage.setItem(LOCAL_STORAGE_KEY_COLOR_SCHEME, "system")
    expect(loadColorScheme()).toBe("system")
  })

  test("localStorageに何も保存されていない時にundefinedを返すこと", () => {
    expect(loadColorScheme()).toBe(undefined)
  })

  test("localStorageに不正な値が保存されている時にundefinedを返すこと", () => {
    const arbitraries = [
      fc.string().filter((str) => !["light", "dark", "system"].includes(str)),
    ] as const
    const predicate = (colorScheme: string) => {
      localStorage.setItem(LOCAL_STORAGE_KEY_COLOR_SCHEME, colorScheme)
      expect(loadColorScheme()).toBe(undefined)
    }
    fc.assert(
      fc
        .property(...arbitraries, predicate)
        .afterEach(() => localStorage.clear())
    )
  })
})

describe(saveColorScheme.name, () => {
  afterEach(() => {
    localStorage.clear()
    vi.unstubAllGlobals()
  })

  test("サーバー上で実行された時にundefinedを返すこ", () => {
    vi.stubGlobal("window", undefined)
    expect(saveColorScheme("light")).toBe(undefined)
  })

  test("localStorageに'light'を保存すること", () => {
    saveColorScheme("light")
    expect(localStorage.getItem(LOCAL_STORAGE_KEY_COLOR_SCHEME)).toBe("light")
  })

  test("localStorageに'dark'を保存すること", () => {
    saveColorScheme("dark")
    expect(localStorage.getItem(LOCAL_STORAGE_KEY_COLOR_SCHEME)).toBe("dark")
  })

  test("localStorageに'system'を保存すること", () => {
    saveColorScheme("system")
    expect(localStorage.getItem(LOCAL_STORAGE_KEY_COLOR_SCHEME)).toBe("system")
  })
})

describe(resolveColorScheme.name, () => {
  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  test("サーバー上で実行された時にundefinedを返すこと", () => {
    vi.stubGlobal("window", undefined)
    expect(resolveColorScheme("system")).toBe(undefined)
  })

  test("colorSchemeが'system'の時にgetSystemColorScheme()を返すこと", () => {
    const matchMediaMock = new MatchMediaMock()

    matchMediaMock.useMediaQuery(MEDIA_QUERY_PREFERS_LIGHT)
    expect(resolveColorScheme("system")).toBe("light")

    matchMediaMock.useMediaQuery(MEDIA_QUERY_PREFERS_DARK)
    expect(resolveColorScheme("system")).toBe("dark")

    matchMediaMock.destroy()
  })

  test("colorSchemeが'light'の時にその値を返すこと", () => {
    expect(resolveColorScheme("light")).toBe("light")
  })

  test("colorSchemeが'dark'の時にその値を返すこと", () => {
    expect(resolveColorScheme("dark")).toBe("dark")
  })
})
