/**
 * @see https://qiita.com/tnakagawa/items/e467f50ec45bf5d51db9
 */

import type { SVGProps } from "react"

export const Waraiotoko = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="500"
      viewBox="0 0 500 500"
      style={{ userSelect: "none" }}
      {...props}
    >
      <path
        d="M 50 250
        A 200 200 0 1 1 450 250
        A 200 200 0 1 1 50 250
        "
        stroke="#0168B7"
        stroke-width="10"
        fill="#FFFFFF"
      />
      <path
        id="tlms"
        d="M 85 250
        A 160 160 0 1 1 415 250
        A 160 160 0 1 1 85 250
        "
        stroke="transparent"
        fill="#FFFFFF"
      />
      <text
        font-size="25"
        font-weight="bold"
        font-family="sans-serif"
        fill="#0168B7"
      >
        <textPath xlinkHref="#tlms">
          I thought what I'd do was, I'd pretend I was one of those deaf-mutes.
        </textPath>
      </text>
      <animateTransform
        xlinkHref="#tlms"
        attributeName="transform"
        type="rotate"
        from="0 250 250"
        to="-360
        250 250"
        dur="5s"
        repeatCount="indefinite"
      />
      <rect
        x="240"
        y="95"
        width="20"
        height="10"
        rx="3"
        stroke="transparent"
        fill="#0168B7"
      />
      <path
        d="M 110 250
        A 140 140 0 1 1 390 250
        A 140 140 0 1 1 110 250
        "
        stroke="#0168B7"
        stroke-width="20"
        fill="#FFFFFF"
      />
      <rect
        x="99"
        y="240"
        width="22"
        height="10"
        stroke="transparent"
        fill="#FFFFFF"
      />
      <path
        d="M 450 230
        A 30 30 0 0 1 480 260
        A 30 30 0 0 1 450 290
        "
        stroke="#0168B7"
        stroke-width="20"
        fill="#FFFFFF"
      />
      <path
        d="M 110 230
        L 451 230
        "
        stroke="#0168B7"
        stroke-width="20"
      />
      <path
        d="M 451 290
        L 376 290
        "
        stroke="#0168B7"
        stroke-width="20"
      />
      <path
        d="M 340 250
        A 90 90 0 1 1 160 250
        "
        stroke="#0168B7"
        stroke-width="20"
        fill="#FFFFFF"
      />
      <path
        d="M 150 260
        L 451 260
        "
        stroke="#FFFFFF"
        stroke-width="40"
      />
      <path
        d="M 165 290
        L 335 290
        "
        stroke="#0168B7"
        stroke-width="20"
      />
      <path
        d="M 175 273
        A 27 25 0 1 1 229 273
        "
        stroke="transparent"
        stroke-width="20"
        fill="#0168B7"
      />
      <path
        d="M 175 274
        A 27 12 0 1 1 229 274
        "
        stroke="transparent"
        stroke-width="20"
        fill="#FFFFFF"
      />
      <path
        d="M 275 273
        A 27 25 0 1 1 329 273
        "
        stroke="transparent"
        stroke-width="20"
        fill="#0168B7"
      />
      <path
        d="M 275 274
        A 27 12 0 1 1 329 274
        "
        stroke="transparent"
        stroke-width="20"
        fill="#FFFFFF"
      />
    </svg>
  )
}
