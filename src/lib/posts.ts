import { getCollection } from "astro:content";
import { isDev } from "./dev";

export const getPostEntries = async () => {
  const postEntries = await getCollection("posts");
  return postEntries
    .filter((entry) => (isDev() ? true : !entry.data.draft))
    .map((entry) => ({
      params: { slug: entry.slug },
      props: {
        entry: {
          ...entry,
          data: {
            ...entry.data,
            icon: entry.data.icon ?? "fluent-emoji-flat:memo",
          },
        },
      },
    }));
};

const posts = await getPostEntries();
export type Post = (typeof posts)[0];
