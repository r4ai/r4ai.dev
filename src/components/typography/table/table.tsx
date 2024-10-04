import { type Component, type ComponentProps, splitProps } from "solid-js"

import { cn } from "@/lib/utils"

export type TableProps = ComponentProps<"table">

export const Table: Component<TableProps> = (props) => {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <div class="mx-auto max-w-screen-md overflow-auto">
      <table
        class={cn("w-full caption-bottom text-sm", local.class)}
        {...rest}
      />
    </div>
  )
}

export type TableHeaderProps = ComponentProps<"thead">

export const TableHeader: Component<TableHeaderProps> = (props) => {
  const [local, rest] = splitProps(props, ["class"])
  return <thead class={cn("[&_tr]:border-b", local.class)} {...rest} />
}

export type TableBodyProps = ComponentProps<"tbody">

export const TableBody: Component<TableBodyProps> = (props) => {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <tbody class={cn("[&_tr:last-child]:border-0", local.class)} {...rest} />
  )
}

export type TableFooterProps = ComponentProps<"tfoot">

export const TableFooter: Component<TableFooterProps> = (props) => {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <tfoot
      class={cn("bg-primary font-medium text-primary-foreground", local.class)}
      {...rest}
    />
  )
}

export type TableRowProps = ComponentProps<"tr">

export const TableRow: Component<TableRowProps> = (props) => {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <tr
      class={cn(
        "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        local.class
      )}
      {...rest}
    />
  )
}

export type TableHeadProps = ComponentProps<"th">

export const TableHead: Component<TableHeadProps> = (props) => {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <th
      class={cn(
        "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        local.class
      )}
      {...rest}
    />
  )
}

export type TableCellProps = ComponentProps<"td">

export const TableCell: Component<TableCellProps> = (props) => {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <td
      class={cn(
        "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        local.class
      )}
      {...rest}
    />
  )
}

export type TableCaptionProps = ComponentProps<"caption">

export const TableCaption: Component<TableCaptionProps> = (props) => {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <caption
      class={cn("mt-4 text-sm text-muted-foreground", local.class)}
      {...rest}
    />
  )
}
