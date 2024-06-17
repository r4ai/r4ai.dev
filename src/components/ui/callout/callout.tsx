import {
  AlertTriangleIcon,
  BugIcon,
  CheckCircle2Icon,
  CheckIcon,
  ChevronRightIcon,
  ClipboardListIcon,
  FlameIcon,
  HelpCircleIcon,
  InfoIcon,
  ListIcon,
  type LucideProps,
  PencilIcon,
  QuoteIcon,
  XIcon,
  ZapIcon,
} from "lucide-solid"
import {
  type Component,
  type ComponentProps,
  createMemo,
  type JSX,
  Show,
  splitProps,
} from "solid-js"
import { Dynamic } from "solid-js/web"
import { tv, type VariantProps } from "tailwind-variants"

const callout = tv({
  slots: {
    root: "group mx-auto my-6 max-w-screen-md space-y-2 rounded-xl border bg-card p-4",
    title: "flex flex-row items-center gap-2.5 font-bold",
    icon: "size-5",
    foldIcon: "size-5 shrink-0 transition-transform group-open:rotate-90",
    body: "space-y-4",
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
  Icon: Component<LucideProps>
}

type Callouts = {
  [K in CalloutType]: Callout<K>
} & Record<string, Callout>

/**
 * @see https://help.obsidian.md/Editing+and+formatting/Callouts#Supported+types
 */
const callouts = {
  note: {
    type: "note",
    label: "Note",
    Icon: (props) => <PencilIcon {...props} />,
  },
  abstract: {
    type: "abstract",
    label: "Abstract",
    Icon: (props) => <ClipboardListIcon {...props} />,
  },
  summary: {
    type: "abstract",
    label: "Summary",
    Icon: (props) => <ClipboardListIcon {...props} />,
  },
  tldr: {
    type: "abstract",
    label: "TL;DR",
    Icon: (props) => <ClipboardListIcon {...props} />,
  },
  info: {
    type: "info",
    label: "Info",
    Icon: (props) => <InfoIcon {...props} />,
  },
  todo: {
    type: "todo",
    label: "ToDo",
    Icon: (props) => <CheckCircle2Icon {...props} />,
  },
  tip: {
    type: "tip",
    label: "Tip",
    Icon: (props) => <FlameIcon {...props} />,
  },
  hint: {
    type: "tip",
    label: "Hint",
    Icon: (props) => <FlameIcon {...props} />,
  },
  important: {
    type: "tip",
    label: "Important",
    Icon: (props) => <CheckCircle2Icon {...props} />,
  },
  success: {
    type: "success",
    label: "Success",
    Icon: (props) => <CheckIcon {...props} />,
  },
  check: {
    type: "success",
    label: "Check",
    Icon: (props) => <CheckIcon {...props} />,
  },
  done: {
    type: "success",
    label: "Done",
    Icon: (props) => <CheckCircle2Icon {...props} />,
  },
  question: {
    type: "question",
    label: "Question",
    Icon: (props) => <HelpCircleIcon {...props} />,
  },
  help: {
    type: "question",
    label: "Help",
    Icon: (props) => <HelpCircleIcon {...props} />,
  },
  faq: {
    type: "question",
    label: "FAQ",
    Icon: (props) => <HelpCircleIcon {...props} />,
  },
  warning: {
    type: "warning",
    label: "Warning",
    Icon: (props) => <AlertTriangleIcon {...props} />,
  },
  caution: {
    type: "warning",
    label: "Caution",
    Icon: (props) => <AlertTriangleIcon {...props} />,
  },
  attention: {
    type: "warning",
    label: "Attention",
    Icon: (props) => <AlertTriangleIcon {...props} />,
  },
  failure: {
    type: "failure",
    label: "Failure",
    Icon: (props) => <XIcon {...props} />,
  },
  fail: {
    type: "failure",
    label: "Fail",
    Icon: (props) => <XIcon {...props} />,
  },
  missing: {
    type: "failure",
    label: "Missing",
    Icon: (props) => <XIcon {...props} />,
  },
  danger: {
    type: "danger",
    label: "Danger",
    Icon: (props) => <ZapIcon {...props} />,
  },
  error: {
    type: "danger",
    label: "Error",
    Icon: (props) => <ZapIcon {...props} />,
  },
  bug: {
    type: "bug",
    label: "Bug",
    Icon: (props) => <BugIcon {...props} />,
  },
  example: {
    type: "example",
    label: "Example",
    Icon: (props) => <ListIcon {...props} />,
  },
  quote: {
    type: "quote",
    label: "Quote",
    Icon: (props) => <QuoteIcon {...props} />,
  },
  site: {
    type: "quote",
    label: "Site",
    Icon: (props) => <QuoteIcon {...props} />,
  },
} as const satisfies Callouts

const getCallout = <Key extends string>(
  type: Key,
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

export type CalloutProps = CalloutRootProps & {
  title: JSX.Element
}

export const Callout: Component<CalloutProps> = (props) => {
  const [local, rest] = splitProps(props, [
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
    }),
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
    }),
  )

  return (
    <Summary
      isFoldable={local.isFoldable}
      class={className().title({ class: local.class })}
      {...rest}
    >
      <Dynamic component={calloutData().Icon} class={className().icon()} />
      <div>{local.children ?? calloutData().label}</div>
      <Show when={local.isFoldable}>
        <ChevronRightIcon class={className().foldIcon()} />
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
    }),
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
  props: DetailsProps<IsFoldable>,
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
  props: SummaryProps<IsFoldable>,
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
