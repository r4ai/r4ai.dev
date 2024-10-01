import { getIconData, iconToHTML, iconToSVG, replaceIDs } from "@iconify/utils"

export type Collection = "fluent-emoji" | "lucide" | "simple-icons"

export const getIcons = async (collection: Collection) => {
  switch (collection) {
    case "fluent-emoji":
      return import("@iconify-json/fluent-emoji").then((mod) => mod.icons)
    case "lucide":
      return import("@iconify-json/lucide").then((mod) => mod.icons)
    case "simple-icons":
      return import("@iconify-json/simple-icons").then((mod) => mod.icons)
  }
}

export const getIconHtml = async (collection: Collection, iconName: string) => {
  const icons = await getIcons(collection)
  const iconData = getIconData(icons, iconName)
  if (!iconData)
    throw new Error(`Icon ${iconName} not found in collection ${collection}`)

  const renderData = iconToSVG(iconData)
  const svg = iconToHTML(replaceIDs(renderData.body), renderData.attributes)
  return svg
}
