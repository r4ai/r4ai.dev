import type { ComponentProps } from "solid-js"
import { splitProps } from "solid-js"

import { cn } from "~/libs/utils"

export type CardProps = ComponentProps<"div">

export const Card = (props: CardProps) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <div
      class={cn(
        "rounded-xl border bg-card text-card-foreground shadow",
        local.class,
      )}
      {...rest}
    />
  )
}

export type CardHeaderProps = ComponentProps<"div">

export const CardHeader = (props: CardHeaderProps) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <div class={cn("flex flex-col space-y-1.5 p-6", local.class)} {...rest} />
  )
}

export type CardTitleProps = ComponentProps<"h1">

export const CardTitle = (props: CardTitleProps) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <h1
      class={cn("font-semibold leading-none tracking-tight", local.class)}
      {...rest}
    />
  )
}

export type CardDescriptionProps = ComponentProps<"h3">

export const CardDescription = (props: CardDescriptionProps) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <h3 class={cn("text-sm text-muted-foreground", local.class)} {...rest} />
  )
}

export type CardContentProps = ComponentProps<"div">

export const CardContent = (props: CardContentProps) => {
  const [local, rest] = splitProps(props, ["class"])

  return <div class={cn("p-6 pt-0", local.class)} {...rest} />
}

export type CardFooterProps = ComponentProps<"div">

export const CardFooter = (props: CardFooterProps) => {
  const [local, rest] = splitProps(props, ["class"])

  return <div class={cn("flex items-center p-6 pt-0", local.class)} {...rest} />
}
