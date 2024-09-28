import * as fs from "node:fs/promises"
import { exec as execCallback } from "node:child_process"
import { promisify } from "node:util"

const exec = promisify(execCallback)

await fs.rmdir("udev-gothic", { recursive: true })
await fs.rmdir("fonts", { recursive: true })

// rm "UDEVGothic_v*.zip"
const dirs = await fs.readdir(".", { withFileTypes: true })
for (const dir of dirs) {
  if (dir.name.startsWith("UDEVGothic_v")) {
    if (dir.isDirectory()) await fs.rmdir(dir.name, { recursive: true })
    else if (dir.isFile() && dir.name.endsWith(".zip")) await fs.rm(dir.name)
  }
}

try {
  await exec("docker image rm udevgothic-woff2-converter")
} catch (e) {
  console.warn("[Error] Failed to remove docker image:", e)
}
