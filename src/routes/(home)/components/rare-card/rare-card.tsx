import { type Component, type JSX } from "solid-js"

import { createSpring } from "~/libs/animation"
import { cn } from "~/libs/utils"

import styles from "./rare-card.module.css"

export type RareCardProps = {
  class?: string
  clipPath?: string
  children?: JSX.Element
}

export const RareCard: Component<RareCardProps> = (props) => {
  let wrapper: HTMLDivElement | undefined
  const [posX, setPosX] = createSpring(0.5, {
    stiffness: 0.3,
  })
  const [posY, setPosY] = createSpring(0.5, {
    stiffness: 0.3,
  })

  return (
    <div class={cn(styles["root"], props.class)}>
      <div
        class={styles["wrapper"]}
        style={{
          "--ratio-x": posX(),
          "--ratio-y": posY(),
          "--angle": "50deg",
        }}
        ref={wrapper}
        onMouseMove={(e) => {
          if (!wrapper) return
          const rect = wrapper.getBoundingClientRect()
          const mousePos = {
            x: e.clientX,
            y: e.clientY,
          }
          setPosX((mousePos.x - rect.left) / rect.width)
          setPosY((mousePos.y - rect.top) / rect.height)
        }}
        onTouchMove={(e) => {
          if (!wrapper) return
          const rect = wrapper.getBoundingClientRect()
          const touchPos = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY,
          }
          setPosX((touchPos.x - rect.left) / rect.width)
          setPosY((touchPos.y - rect.top) / rect.height)
        }}
        onMouseLeave={() => {
          setPosX(0.5)
          setPosY(0.5)
        }}
        onTouchCancel={() => {
          setPosX(0.5)
          setPosY(0.5)
        }}
      >
        <div class={styles["card"]}>{props.children}</div>
        <div
          class={cn(styles["overlay"], styles["overlay-pattern"])}
          style={{
            "clip-path": props.clipPath,
          }}
        />
        <div
          class={cn(styles["overlay"], styles["overlay-color"])}
          style={{
            "clip-path": props.clipPath,
          }}
        />
        <div
          class={cn(styles["overlay"], styles["overlay-color"])}
          style={{
            "clip-path": props.clipPath,
          }}
        />
        <div
          class={cn(styles["overlay"], styles["overlay-highlight"])}
          style={{
            "clip-path": props.clipPath,
          }}
        />
      </div>
    </div>
  )
}
