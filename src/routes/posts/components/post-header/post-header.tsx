import type { Component } from "solid-js"

export type PostHeaderProps = {
  class?: string
}

export const PostHeader: Component<PostHeaderProps> = (props) => {
  return <div class={props.class} />
}
