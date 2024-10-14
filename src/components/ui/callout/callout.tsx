import {
  type Component,
  type ComponentProps,
  createMemo,
  mergeProps,
  Show,
  splitProps,
} from "solid-js"
import { Dynamic } from "solid-js/web"
import { tv, type VariantProps } from "tailwind-variants"

import IconBug from "~icons/lucide/bug"
import IconCheck from "~icons/lucide/check"
import IconCheckCircle2 from "~icons/lucide/check-circle-2"
import IconChevronRight from "~icons/lucide/chevron-right"
import IconClipboard from "~icons/lucide/clipboard-list"
import IconFlame from "~icons/lucide/flame"
import IconHelpCircle from "~icons/lucide/help-circle"
import IconInfo from "~icons/lucide/info"
import IconList from "~icons/lucide/list"
import IconPencil from "~icons/lucide/pencil"
import IconQuote from "~icons/lucide/quote"
import IconTriangleAlert from "~icons/lucide/triangle-alert"
import IconX from "~icons/lucide/x"
import IconZap from "~icons/lucide/zap"

export const callout = tv({
  slots: {
    root: "bg-card group mx-auto max-w-screen-md space-y-2 rounded-xl border p-4",
    title: "flex flex-row items-center gap-2.5 font-bold",
    foldIcon: "shrink-0 transition-transform group-open:rotate-90",
    body: [
      "*:my-4 last:*:mb-0 first:*:mt-4 [&>:is(ul,ol)_:is(li,li>*)]:my-2",
      "[&>:is(h1,h2):not(:first-child)]:mt-12",
      "[&>:is(h3,h4):not(:first-child)]:mt-9",
    ],
  },
  variants: {
    type: {
      note: {},
      abstract: {
        root: "border-purple-600/20 bg-purple-500/10 dark:border-purple-800/20",
        title: "text-purple-600 dark:text-purple-400",
      },
      info: {
        root: "border-blue-600/20 bg-blue-500/10 dark:border-blue-800/20",
        title: "text-blue-600 dark:text-blue-400",
      },
      todo: {
        root: "border-blue-600/20 bg-blue-500/10 dark:border-blue-800/20",
        title: "text-blue-600 dark:text-blue-400",
      },
      tip: {
        root: "border-yellow-600/20 bg-yellow-500/10 dark:border-yellow-800/20",
        title: "text-yellow-600 dark:text-yellow-400",
      },
      success: {
        root: "border-green-600/20 bg-green-500/10 dark:border-green-800/20",
        title: "text-green-600 dark:text-green-400",
      },
      question: {
        root: "border-blue-600/20 bg-blue-500/10 dark:border-blue-800/20",
        title: "text-blue-600 dark:text-blue-400",
      },
      warning: {
        root: "border-orange-600/20 bg-orange-500/10 dark:border-orange-800/20",
        title: "text-orange-600 dark:text-orange-400",
      },
      failure: {
        root: "border-red-600/20 bg-red-500/10 dark:border-red-800/20",
        title: "text-red-600 dark:text-red-400",
      },
      danger: {
        root: "border-red-600/20 bg-red-500/10 dark:border-red-800/20",
        title: "text-red-600 dark:text-red-400",
      },
      bug: {
        root: "border-red-600/20 bg-red-500/10 dark:border-red-800/20",
        title: "text-red-600 dark:text-red-400",
      },
      example: {},
      quote: {
        root: "border-zinc-600/20 bg-zinc-500/10 dark:border-zinc-800/20",
        title: "text-zinc-600 dark:text-zinc-400",
      },
    },
    foldable: {
      true: {
        title: "hover:cursor-pointer",
      },
      false: {},
    },
  },
  defaultVariants: {
    type: "note",
    foldable: false,
  },
})

type CalloutType = NonNullable<VariantProps<typeof callout>["type"]>

type Callout<T extends CalloutType = CalloutType> = {
  type: T
  label: string
  icon: Component<ComponentProps<"svg">>
}

type Callouts = {
  [K in CalloutType]: Callout<K>
} & Record<string, Callout>

/**
 * @see https://help.obsidian.md/Editing+and+formatting/Callouts#Supported+types
 */
export const callouts = {
  note: {
    type: "note",
    label: "Note",
    icon: IconPencil,
  },
  abstract: {
    type: "abstract",
    label: "Abstract",
    icon: IconClipboard,
  },
  summary: {
    type: "abstract",
    label: "Summary",
    icon: IconClipboard,
  },
  tldr: {
    type: "abstract",
    label: "TL;DR",
    icon: IconClipboard,
  },
  info: {
    type: "info",
    label: "Info",
    icon: IconInfo,
  },
  todo: {
    type: "todo",
    label: "ToDo",
    icon: IconCheckCircle2,
  },
  tip: {
    type: "tip",
    label: "Tip",
    icon: IconFlame,
  },
  hint: {
    type: "tip",
    label: "Hint",
    icon: IconFlame,
  },
  important: {
    type: "tip",
    label: "Important",
    icon: IconFlame,
  },
  success: {
    type: "success",
    label: "Success",
    icon: IconCheck,
  },
  check: {
    type: "success",
    label: "Check",
    icon: IconCheck,
  },
  done: {
    type: "success",
    label: "Done",
    icon: IconCheck,
  },
  question: {
    type: "question",
    label: "Question",
    icon: IconHelpCircle,
  },
  help: {
    type: "question",
    label: "Help",
    icon: IconHelpCircle,
  },
  faq: {
    type: "question",
    label: "FAQ",
    icon: IconHelpCircle,
  },
  warning: {
    type: "warning",
    label: "Warning",
    icon: IconTriangleAlert,
  },
  caution: {
    type: "warning",
    label: "Caution",
    icon: IconTriangleAlert,
  },
  attention: {
    type: "warning",
    label: "Attention",
    icon: IconTriangleAlert,
  },
  failure: {
    type: "failure",
    label: "Failure",
    icon: IconX,
  },
  fail: {
    type: "failure",
    label: "Fail",
    icon: IconX,
  },
  missing: {
    type: "failure",
    label: "Missing",
    icon: IconX,
  },
  danger: {
    type: "danger",
    label: "Danger",
    icon: IconZap,
  },
  error: {
    type: "danger",
    label: "Error",
    icon: IconZap,
  },
  bug: {
    type: "bug",
    label: "Bug",
    icon: IconBug,
  },
  example: {
    type: "example",
    label: "Example",
    icon: IconList,
  },
  quote: {
    type: "quote",
    label: "Quote",
    icon: IconQuote,
  },
  site: {
    type: "quote",
    label: "Site",
    icon: IconQuote,
  },
} as const satisfies Callouts

const getCallout = <Key extends string>(
  type: Key
): Key extends keyof typeof callouts
  ? (typeof callouts)[Key]
  : (typeof callouts)["note"] => {
  if (type in callouts) {
    // @ts-expect-error callouts[type] exists
    return callouts[type]
  }
  // @ts-expect-error callouts.note is valid return value
  return callouts.note
}

export type CalloutProps = Omit<
  CalloutRootProps,
  "isFoldable" | "defaultFolded"
> & {
  type: keyof typeof callouts
  isFoldable?: boolean
  defaultFolded?: boolean
}

export const Callout: Component<CalloutProps> = (props) => {
  const merged = mergeProps(props, {
    isFoldable: false,
    defaultFolded: false,
  })
  const [local, rest] = splitProps(merged, [
    "title",
    "type",
    "isFoldable",
    "defaultFolded",
  ])

  return (
    <CalloutRoot
      type={local.type}
      isFoldable={local.isFoldable}
      defaultFolded={local.defaultFolded}
      {...rest}
    >
      <CalloutTitle type={local.type} isFoldable={local.isFoldable}>
        {local.title}
      </CalloutTitle>
      <CalloutBody type={local.type} isFoldable={local.isFoldable}>
        {props.children}
      </CalloutBody>
    </CalloutRoot>
  )
}

export type CalloutRootProps = ComponentProps<"div"> & {
  type: keyof typeof callouts
  isFoldable: boolean
  defaultFolded: boolean
}

export const CalloutRoot: Component<CalloutRootProps> = (props) => {
  const [local, rest] = splitProps(props, [
    "type",
    "isFoldable",
    "defaultFolded",
    "class",
  ])

  const calloutData = createMemo(() => getCallout(local.type))
  const className = createMemo(() =>
    callout({
      type: calloutData().type,
      foldable: local.isFoldable,
    })
  )

  return (
    <Details
      isFoldable={local.isFoldable}
      defaultFolded={local.defaultFolded}
      class={className().root({ class: local.class })}
      {...rest}
    />
  )
}

export type CalloutTitleProps = ComponentProps<"div"> & {
  type: keyof typeof callouts
  isFoldable: boolean
}

export const CalloutTitle: Component<CalloutTitleProps> = (props) => {
  const [local, rest] = splitProps(props, [
    "type",
    "isFoldable",
    "class",
    "children",
  ])

  const calloutData = createMemo(() => getCallout(local.type))
  const className = createMemo(() =>
    callout({
      type: calloutData().type,
      foldable: local.isFoldable,
    })
  )

  return (
    <Summary
      isFoldable={local.isFoldable}
      class={className().title({ class: local.class })}
      {...rest}
    >
      <Dynamic component={calloutData().icon} />
      <div>{local.children ?? calloutData().label}</div>
      <Show when={local.isFoldable}>
        <Dynamic component={IconChevronRight} class={className().foldIcon()} />
      </Show>
    </Summary>
  )
}

export type CalloutBodyProps = ComponentProps<"div"> & {
  type: keyof typeof callouts
  isFoldable: boolean
}

export const CalloutBody: Component<CalloutBodyProps> = (props) => {
  const [local, rest] = splitProps(props, ["type", "class", "isFoldable"])

  const calloutData = createMemo(() => getCallout(local.type))
  const className = createMemo(() =>
    callout({
      type: calloutData().type,
      foldable: local.isFoldable,
    })
  )

  return <div class={className().body({ class: local.class })} {...rest} />
}

type DetailsProps<IsFoldable extends boolean> = ComponentProps<
  IsFoldable extends true ? "details" : "div"
> & {
  isFoldable: IsFoldable
  defaultFolded?: boolean
}

const Details = <IsFoldable extends boolean>(
  props: DetailsProps<IsFoldable>
) => {
  const [local, rest] = splitProps(props, ["isFoldable", "defaultFolded"])
  return (
    <>
      {local.isFoldable ? (
        <details
          open={!local.defaultFolded}
          {...(rest as ComponentProps<"details">)}
        />
      ) : (
        <div {...(rest as ComponentProps<"div">)} />
      )}
    </>
  )
}

type SummaryProps<IsFoldable extends boolean> = ComponentProps<
  IsFoldable extends true ? "summary" : "div"
> & {
  isFoldable: IsFoldable
}

const Summary = <IsFoldable extends boolean>(
  props: SummaryProps<IsFoldable>
) => {
  const [local, rest] = splitProps(props, ["isFoldable"])
  return (
    <>
      {local.isFoldable ? (
        <summary {...(rest as ComponentProps<"summary">)} />
      ) : (
        <div {...(rest as ComponentProps<"div">)} />
      )}
    </>
  )
}
