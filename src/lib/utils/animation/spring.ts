import {
  createEffect,
  createSignal,
  mergeProps,
  on,
  onCleanup,
  type Signal,
} from "solid-js"

import type { Interpolatable } from "./interpolatable"
import {
  calculateSpring,
  createZeroValue,
  type SpringOptions,
} from "./spring-value"

export type { SpringOptions } from "./spring-value"

export const defaultSpringOptions = {
  mass: 1, // 質量
  stiffness: 0.15, // ばね定数
  damping: 0.8, // 減衰係数
  precision: 0.01, // しきい値
} satisfies Required<SpringOptions>

export type SpringedSignal<T extends Interpolatable> = Signal<T>

/**
 * Creates a spring signal.
 * @param value The initial value of the signal
 * @param options The options to control the spring behavior
 * @returns The spring signal. which is a tuple of `[value, setValue]`
 *
 * @example
 * ```ts
 * const [springValue, setSpringValue] = createSpring(0, { stiffness: 0.3 })
 * ```
 */
export function createSpring(
  value: number,
  options?: Partial<SpringOptions>
): Signal<number>
export function createSpring<T extends Interpolatable>(
  value: T,
  options?: Partial<SpringOptions>
): SpringedSignal<T>
export function createSpring<T extends Interpolatable>(
  value: T,
  options: Partial<SpringOptions> = defaultSpringOptions
): SpringedSignal<T> {
  const mergedOptions = mergeProps(defaultSpringOptions, options)
  const zeroVelocity = createZeroValue(value)

  let requestAnimationFrameId: number | undefined
  let previousTime: number | undefined
  let currentVelocity = zeroVelocity

  const [target, setTarget] = createSignal(value)
  const [current, setCurrent] = createSignal(value)

  const updateCurrent = (currentTime: number) => {
    // TODO: (BUG) 裏画面から復帰すると前フレームとの差分が大きくなり、速度が異常に大きくなる
    const deltaTime =
      previousTime === undefined
        ? 0
        : Math.max(0, (currentTime - previousTime) * 10) / 1000
    previousTime = currentTime

    const { velocity, value, settled } = calculateSpring(
      mergedOptions,
      currentVelocity,
      current(),
      target(),
      deltaTime
    )
    currentVelocity = velocity

    if (!settled) {
      setCurrent(() => value)
      requestAnimationFrameId = requestAnimationFrame(updateCurrent)
    } else {
      setCurrent(() => target())
      currentVelocity = zeroVelocity
      previousTime = undefined
    }
  }

  createEffect(
    on(
      target,
      () => {
        requestAnimationFrameId = requestAnimationFrame(updateCurrent)

        onCleanup(() => {
          if (requestAnimationFrameId) {
            cancelAnimationFrame(requestAnimationFrameId)
          }
        })
      },
      { defer: true }
    )
  )

  return [current, setTarget]
}
