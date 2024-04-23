import { useEffect, useRef, type FC } from "react"
import mermaid from "mermaid"

type MermaidProps = {
  className?: string
  code: string
}

export const Mermaid: FC<MermaidProps> = ({ className, code }) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current || !code) return
    const theme =
      localStorage.getItem("theme") === "dark"
        ? "dark"
        : localStorage.getItem("theme") === "light"
          ? "default"
          : window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "default"
    mermaid.init(
      {
        theme,
      },
      ref.current
    )
  }, [ref, code])

  return (
    <div className={className} key={code} ref={ref}>
      {code}
    </div>
  )
}
