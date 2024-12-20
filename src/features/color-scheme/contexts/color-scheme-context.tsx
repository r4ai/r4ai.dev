import {
  type Accessor,
  type Component,
  createContext,
  createEffect,
  createSignal,
  type JSX,
  mergeProps,
  onMount,
  type Setter,
} from "solid-js"

import {
  type ColorScheme,
  loadColorScheme,
  resolveColorScheme,
  type ResolvedColorScheme,
  saveColorScheme,
  subscribeSystemColorSchemeChange,
} from "../utils/color-scheme"

export type ColorSchemeContext = {
  colorScheme: Accessor<ColorScheme>
  resolvedColorScheme: Accessor<ResolvedColorScheme>
  setColorScheme: Setter<ColorScheme>
  setResolvedColorScheme: Setter<ResolvedColorScheme>
}

export const ColorSchemeContext = createContext<ColorSchemeContext | undefined>(
  undefined
)

export type ColorSchemeProviderProps = {
  /**
   * 初めてアクセスしたユーザーに対して適用されるcolor-schemeの値
   */
  initialColorScheme?: ColorScheme
  children: JSX.Element
}

export const ColorSchemeProvider: Component<ColorSchemeProviderProps> = (
  _props
) => {
  const props: Required<ColorSchemeProviderProps> = mergeProps(
    {
      initialColorScheme: "system",
    } as const,
    _props
  )
  const [colorScheme, setColorScheme] = createSignal<ColorScheme>(
    props.initialColorScheme
  )
  const [resolvedColorScheme, setResolvedColorScheme] =
    createSignal<ResolvedColorScheme>("light")

  onMount(() => {
    // localStorageにcolor-schemeが保存されている場合はその値を読み込む
    const storedColorScheme = loadColorScheme()
    if (storedColorScheme != null) {
      setColorScheme(storedColorScheme)
    }

    // 初期値のcolor-schemeを解決してresolvedColorSchemeに保存する
    setResolvedColorScheme(
      resolveColorScheme(storedColorScheme ?? colorScheme()) ?? "light"
    )

    // color-schemeがsystemでsystem-color-schemeが変更されたときに、resolvedColorSchemeを更新する
    const unsubscribe = subscribeSystemColorSchemeChange(
      (systemColorScheme) => {
        const colorScheme = loadColorScheme()
        if (colorScheme !== "system") return
        setResolvedColorScheme(systemColorScheme)
      }
    )
    return () => unsubscribe?.()
  })

  // color-schemeが変更されたときに、localStorageに保存し、resolvedColorSchemeを更新する
  createEffect(() => {
    saveColorScheme(colorScheme())
    setResolvedColorScheme((prev) => resolveColorScheme(colorScheme()) ?? prev)
  })

  // resolvedColorSchemeが変更されたときに、root要素に対してdata-color-scheme属性を設定する
  createEffect(() => {
    document.documentElement.dataset.colorScheme = resolvedColorScheme()
  })

  return (
    <ColorSchemeContext.Provider
      value={{
        colorScheme,
        resolvedColorScheme,
        setColorScheme,
        setResolvedColorScheme,
      }}
    >
      {props.children}
    </ColorSchemeContext.Provider>
  )
}
