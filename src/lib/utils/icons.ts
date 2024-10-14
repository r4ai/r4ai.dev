import type { IconifyJSON } from "@iconify/types"
import { getIconData, iconToHTML, iconToSVG, replaceIDs } from "@iconify/utils"

export type Collection = "fluent-emoji" | "lucide" | "simple-icons"

export const getIconHtml = async (icons: IconifyJSON, iconName: string) => {
  const iconData = getIconData(icons, iconName)
  if (!iconData)
    throw new Error(
      `Icon ${iconName} not found in collection ${icons.info?.name}`
    )

  const renderData = iconToSVG(iconData)
  const svg = iconToHTML(replaceIDs(renderData.body), renderData.attributes)
  return svg
}
