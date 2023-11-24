import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import { remarkMeta } from "./remarkMeta"

const md = `
\`\`\`js title=hello
console.log("hello world");
\`\`\`
`

const processor = unified().use(remarkParse).use(remarkMeta).use(remarkRehype)
const hast = processor.runSync(processor.parse(md))

console.log(JSON.stringify(hast, null, 2))
