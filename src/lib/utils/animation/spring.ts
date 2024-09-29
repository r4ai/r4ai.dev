import {
  createEffect,
  createSignal,
  mergeProps,
  on,
  onCleanup,
  type Signal,
} from "solid-js"

import type { Interpolatable } from "./interpolate"

type SpringedValue<T> = {
  velocity: T
  value: T
  settled: boolean
}

const calcSpringNum = (
  options: SpringOptions,
  currentVelocity: number,
  currentValue: number,
  targetValue: number,
  deltaTime: number
): SpringedValue<number> => {
  const { stiffness: k, damping: c, mass: m, precision } = options

  const d = currentValue - targetValue
  const f_spring = -k * d
  const f_damping = -c * currentVelocity

  const a = (f_spring + f_damping) / m
  const v = currentVelocity + a * deltaTime
  const x = currentValue + v * deltaTime

  return {
    velocity: v,
    value: x,
    settled: Math.abs(d) < precision && Math.abs(v) < precision,
  }
}

const calcSpring = <T extends Interpolatable>(
  options: SpringOptions,
  currentVelocity: T,
  currentValue: T,
  targetValue: T,
  deltaTime: number
): SpringedValue<T> => {
  // if `T` is number, use `calcSpringNum`
  if (
    typeof currentVelocity === "number" &&
    typeof currentValue === "number" &&
    typeof targetValue === "number"
  ) {
    return calcSpringNum(
      options,
      currentVelocity,
      currentValue,
      targetValue,
      deltaTime
    ) as SpringedValue<T>
  }

  // if `T` is array, use `calcSpring` recursively
  if (
    Array.isArray(currentValue) &&
    Array.isArray(targetValue) &&
    Array.isArray(currentVelocity)
  ) {
    const result = currentVelocity.map((cv, index) =>
      calcSpring(
        options,
        cv,
        currentValue[index]!,
        targetValue[index]!,
        deltaTime
      )
    )
    return result.reduce(
      (acc, cur) => ({
        velocity: [...(acc.velocity as T[]), cur.velocity],
        value: [...(acc.value as T[]), cur.value],
        settled: acc.settled && cur.settled,
      }),
      {
        velocity: [],
        value: [],
        settled: true,
      }
    ) as SpringedValue<T>
  }

  // if `T` is object, use `calcSpring` recursively
  if (
    typeof currentVelocity === "object" &&
    typeof currentValue === "object" &&
    typeof targetValue === "object"
  ) {
    return Object.keys(currentVelocity).reduce(
      (acc, cur) => {
        const springed = calcSpring(
          options,
          currentVelocity[cur as never] as T,
          currentValue[cur as never] as T,
          targetValue[cur as never] as T,
          deltaTime
        )
        return {
          velocity: {
            ...acc.velocity,
            [cur]: springed.velocity,
          },
          value: {
            ...acc.value,
            [cur]: springed.value,
          },
          settled: true,
        }
      },
      {
        velocity: {},
        value: {},
        settled: true,
      }
    ) as SpringedValue<T>
  }

  // if `T` is not interpolatable, throw an error
  throw new Error("Given values are not interpolatable")
}

const initCurrentVelocity = <T extends Interpolatable>(value: T): T => {
  if (typeof value === "number") {
    return 0 as T
  }

  if (Array.isArray(value)) {
    return value.map(initCurrentVelocity) as T
  }

  if (typeof value === "object") {
    return Object.keys(value).reduce(
      (acc, cur) => ({
        ...acc,
        [cur]: initCurrentVelocity(value[cur] as T),
      }),
      {} as Exclude<T, number>
    )
  }

  throw new Error("Given values are not interpolatable")
}

export type SpringOptions = {
  /** a value between 0 and 1 where higher means a 'heavier' spring */
  mass: number

  /** a value between 0 and 1 where higher means a 'tighter' spring */
  stiffness: number

  /** a value between 0 and 1 where lower means a 'springier' spring */
  damping: number

  /** determines the threshold at which the spring is considered to have 'settled', where lower means more precise */
  precision: number
}

export const defaultSpringOptions = {
  mass: 1, // 質量
  stiffness: 0.15, // ばね定数
  damping: 0.8, // 減衰係数
  precision: 0.01, // しきい値
} as const satisfies Required<SpringOptions>

export type SpringedSignal<T extends Interpolatable> = T extends number
  ? Signal<number>
  : Signal<T>

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
export const createSpring = <T extends Interpolatable>(
  value: T,
  options: Partial<SpringOptions> = defaultSpringOptions
): SpringedSignal<T> => {
  const mergedOptions = mergeProps(defaultSpringOptions, options)
  const zeroVelocity = initCurrentVelocity(value)

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

    const { velocity, value, settled } = calcSpring(
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

  return [current, setTarget] as SpringedSignal<T>
}
