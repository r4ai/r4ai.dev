import {
  createEffect,
  createSignal,
  mergeProps,
  on,
  onCleanup,
  type Signal,
} from "solid-js"

import { type Interpolatable, interpolate } from "./interpolate"

export type TweenedOptions = {
  delay: number
  duration: number | ((from: Interpolatable, to: Interpolatable) => number)
  ease: (t: number) => number
  interpolate: typeof interpolate
}

export const defaultTweenedOptions = {
  delay: 0,
  duration: 100,
  ease: (t: number) => t,
  interpolate: interpolate,
} as const satisfies Required<TweenedOptions>

export type TweenedSignal<T extends Interpolatable> = T extends number
  ? Signal<number>
  : Signal<T>

/**
 * Creates a tweened signal.
 * @param value The initial value
 * @param options The options
 * @returns The tweened signal. `[value, setValue]`
 *
 * @example
 * ```ts
 * const [tweenedValue, setTweenedValue] = createTween(0, { duration: 500 });
 * ```
 */
export const createTween = <T extends Interpolatable>(
  value: T,
  options: Partial<TweenedOptions> = defaultTweenedOptions,
): TweenedSignal<T> => {
  const mergedOptions = mergeProps(defaultTweenedOptions, options)

  let requestAnimationFrameId: number | undefined = undefined
  let startTime = performance.now()

  const [target, setTarget] = createSignal(value)
  const [current, setCurrent] = createSignal(value)

  const updateCurrent = (currentTime: number) => {
    const elapsed = Math.max(0, currentTime - startTime - mergedOptions.delay)
    const duration =
      typeof mergedOptions.duration === "function"
        ? mergedOptions.duration(current(), target())
        : mergedOptions.duration
    if (elapsed < duration) {
      setCurrent(
        // @ts-expect-error safe to call with current and target
        mergedOptions.interpolate(
          current(),
          target(),
          mergedOptions.ease,
          elapsed / duration,
        ),
      )
      requestAnimationFrameId = requestAnimationFrame(updateCurrent)
    } else {
      setCurrent(() => target())
    }
  }

  // update current value
  createEffect(
    on(
      target,
      () => {
        startTime = performance.now()
        requestAnimationFrameId = requestAnimationFrame(updateCurrent)
        onCleanup(() => {
          requestAnimationFrameId &&
            cancelAnimationFrame(requestAnimationFrameId)
        })
      },
      { defer: true },
    ),
  )

  return [current, setTarget] as TweenedSignal<T>
}
