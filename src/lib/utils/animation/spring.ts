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

  let requestAnimationFrameId: number | undefined = undefined
  let lastTime = performance.now()
  let currentVelocity = zeroVelocity
  let isMoving = false // TODO: Refactor not to use mutable variables

  const [target, setTarget] = createSignal(value)
  const [current, setCurrent] = createSignal(value)

  const updateCurrent = (currentTime: number) => {
    // TODO: (BUG) アニメーションの途中で裏画面へ移行した場合、isMovingがtrueの状態で時間だけ経過して速度が異常に大きくなる
    const elapsed = Math.max(0, isMoving ? (currentTime - lastTime) * 10 : 0)
    const deltaTime = elapsed / 1000
    lastTime = currentTime

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
      isMoving = true
      requestAnimationFrameId = requestAnimationFrame(updateCurrent)
    } else {
      setCurrent(() => target())
      currentVelocity = zeroVelocity
      isMoving = false
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
