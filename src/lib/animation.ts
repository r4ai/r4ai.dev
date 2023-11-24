import { type TransitionDirectionalAnimations } from "astro"

const EASE_IN_OUT_QUART = "cubic-bezier(0.76, 0, 0.24, 1)"

export const mainSlide = ({
  duration,
}: {
  duration?: string | number
} = {}): TransitionDirectionalAnimations => ({
  forwards: {
    old: [
      {
        name: "astroSlideToLeft",
        duration: duration ?? "220ms",
        easing: EASE_IN_OUT_QUART,
        fillMode: "both",
      },
    ],
    new: [
      {
        name: "astroSlideFromRight",
        duration: duration ?? "220ms",
        easing: EASE_IN_OUT_QUART,
        fillMode: "both",
      },
    ],
  },
  backwards: {
    old: [{ name: "astroSlideToRight" }],
    new: [{ name: "astroSlideFromLeft" }],
  },
})

export const mainSlideRev = ({
  duration,
}: {
  duration?: string | number
} = {}): TransitionDirectionalAnimations => ({
  forwards: {
    old: [
      {
        name: "astroSlideFromRight",
        duration: duration ?? "220ms",
        easing: EASE_IN_OUT_QUART,
        fillMode: "both",
      },
    ],
    new: [
      {
        name: "astroSlideToLeft",
        duration: duration ?? "220ms",
        easing: EASE_IN_OUT_QUART,
        fillMode: "both",
      },
    ],
  },
  backwards: {
    old: [{ name: "astroSlideToRight" }],
    new: [{ name: "astroSlideFromLeft" }],
  },
})
