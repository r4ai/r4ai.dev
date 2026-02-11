import { type Component, For, Show } from "solid-js"

import {
  Tabs,
  TabsContent,
  TabsIndicator,
  TabsList,
  TabsTrigger,
} from "@/components/ui"

import { PostCard } from "../post-card"

type PostCategory = "tech" | "hobby"
type PostFilter = "all" | PostCategory

export type PostListFilterItem = {
  title: string
  tags: string[]
  href: string
  icon: string
  alt: string
  publishedAt: string
  category: PostCategory
}

type PostGridProps = {
  posts: PostListFilterItem[]
}

const PostGrid: Component<PostGridProps> = (props) => {
  return (
    <>
      <div class="mx-auto grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        <For each={props.posts}>
          {(post) => (
            <PostCard
              title={post.title}
              tags={post.tags}
              icon={post.icon}
              href={post.href}
              alt={post.alt}
              publishedAt={new Date(post.publishedAt)}
            />
          )}
        </For>
      </div>
      <Show when={props.posts.length === 0}>
        <p class="text-center text-muted-foreground">
          No posts found in this category.
        </p>
      </Show>
    </>
  )
}

export type PostListFilterProps = {
  posts: PostListFilterItem[]
}

export const PostListFilter: Component<PostListFilterProps> = (props) => {
  const getFilteredPosts = (filter: PostFilter) =>
    filter === "all"
      ? props.posts
      : props.posts.filter((post) => post.category === filter)

  return (
    <Tabs defaultValue="all" class="space-y-6">
      <TabsList class="mx-auto max-w-sm">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="tech">Tech</TabsTrigger>
        <TabsTrigger value="hobby">Hobby</TabsTrigger>
        <TabsIndicator />
      </TabsList>
      <TabsContent value="all">
        <PostGrid posts={getFilteredPosts("all")} />
      </TabsContent>
      <TabsContent value="tech">
        <PostGrid posts={getFilteredPosts("tech")} />
      </TabsContent>
      <TabsContent value="hobby">
        <PostGrid posts={getFilteredPosts("hobby")} />
      </TabsContent>
    </Tabs>
  )
}
