import { spawn } from "node:child_process"
import * as fs from "node:fs/promises"

const exec = (
  cmd: string,
  cwd?: string,
  env?: NodeJS.ProcessEnv
): Promise<void> => {
  const command = cmd.split(" ")[0]
  if (!command) throw new Error("Command is empty")
  const args = cmd.split(" ").slice(1)
  const promise: Promise<void> = new Promise((resolve) => {
    console.log(`$ ${command} ${args.join(" ")}`)

    const childProcess = spawn(command, args, { cwd, env })

    childProcess.stdout.on("data", (data) => {
      ;(data.toString() as string).split("\n").forEach((line) => {
        console.log(`>>> ${line.trim()}`)
      })
    })

    childProcess.stdout.on("end", () => {
      resolve()
    })
  })
  return promise
}

type Asset = {
  browser_download_url: string
  content_type: string
  created_at: string
  download_count: number
  id: number
  label: string | null
  name: string
  node_id: string
  size: number
  state: "uploaded" | "deleted"
  updated_at: string
  uploader: {
    avatar_url: string
    events_url: string
    followers_url: string
    following_url: string
    gists_url: string
    gravatar_id: string
    html_url: string
    id: number
    login: string
    node_id: string
    organizations_url: string
    received_events_url: string
    repos_url: string
    site_admin: boolean
    starred_url: string
    subscriptions_url: string
    type: string
    url: string
  }
  url: string
}

type Author = {
  avatar_url: string
  events_url: string
  followers_url: string
  following_url: string
  gists_url: string
  gravatar_id: string
  html_url: string
  id: number
  login: string
  node_id: string
  organizations_url: string
  received_events_url: string
  repos_url: string
  site_admin: boolean
  starred_url: string
  subscriptions_url: string
  type: string
  url: string
}

type Releases = {
  assets: Asset[]
  assets_url: string
  author: Author
  body: string
  created_at: string
  draft: boolean
  html_url: string
  id: number
  name: string
  node_id: string
  prerelease: boolean
  published_at: string
  reactions: {
    [key: string]: number | string
  }
  tag_name: string
  tarball_url: string
  target_commitish: string
  upload_url: string
  url: string
  zipball_url: string
}

const downloadZipFile = async () => {
  const response = await fetch(
    "https://api.github.com/repos/yuru7/udev-gothic/releases/latest"
  )
  const json = (await response.json()) as Releases

  for (const asset of json.assets) {
    if (!asset.name.startsWith("UDEVGothic_v")) continue

    const response = await fetch(asset.browser_download_url)
    const blob = await response.blob()
    const buffer = Buffer.from(await blob.arrayBuffer())
    await fs.writeFile(asset.name, buffer)
    console.log(`[Log] Downloaded ${asset.name}`)
    return asset.name
  }
  throw new Error("Failed to download UDEVGothic_v*.zip")
}

const extructFontFiles = async (zipFileName: string, toCopyFonts: string[]) => {
  const udevGothicDir = zipFileName.replace(".zip", "")

  await exec(`unzip ${zipFileName}`)
  await fs.mkdir("./fonts")
  for (const font of toCopyFonts.map((font) => `${font}.ttf`)) {
    console.log(`[Log] Extracted ${font} from ${zipFileName}`)
    await fs.copyFile(`${udevGothicDir}/${font}`, `./fonts/${font}`)
  }
}

const convertFontFiles = async () => {
  console.log("[Log] Start converting font files...")
  await exec("docker compose up --build")
  await exec("docker compose down")
  console.log("[Log] Finished converting font files")
}

const copyWoff2FontsToPublic = async () => {
  const files = await fs.readdir("./fonts")
  for (const file of files) {
    await fs.copyFile(
      `./fonts/${file}`,
      `../../public/fonts/UDEVGothic/${file}`
    )
    console.log(`[Log] Copied ${file} to public/fonts/UDEVGothic/${file}`)
  }
}

const main = async () => {
  const toCopyFonts = ["UDEVGothicLG-Regular", "UDEVGothicLG-Italic"]

  const zipFileName = await downloadZipFile()
  await extructFontFiles(zipFileName, toCopyFonts)
  await convertFontFiles()
  await copyWoff2FontsToPublic()
  console.log("[Log] Success!")
}
await main()
