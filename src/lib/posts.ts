import { getCollection } from "astro:content";

const formatIconName = (icon: string) => `icon-[${icon.replace(":", "--")}]`;

export const getPostEntries = async () => {
  const postEntries = await getCollection("posts");
  return postEntries
    .filter((entry) => !entry.data.draft)
    .map((entry) => ({
      params: { slug: entry.slug },
      props: {
        entry: {
          ...entry,
          data: {
            ...entry.data,
            icon: formatIconName(entry.data.icon ?? "fluent-emoji-flat:memo"),
          },
        },
      },
    }));
};
