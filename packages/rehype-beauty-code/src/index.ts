import merge from "deepmerge";
import type { Element, Root } from "hast";
import { toString } from "hast-util-to-string";
import type {
  BuiltinLanguage,
  BuiltinTheme,
  CodeOptionsThemes,
  LanguageInput,
} from "shikiji";
import { bundledLanguages, getHighlighter } from "shikiji";
import { type Plugin } from "unified";
import { visit } from "unist-util-visit";

type InternalRehypeBeautyCodeOptions = {
  /**
   * glob pattern to language name associations.
   * - key: glob pattern
   * - value: language name. if you want not to be highlighted with shiki, set `ignore`.
   * @default {}
   * @example
   * ```ts
   * const langAssociations = {
   *   "ad-.*": "ignore",       // don't highlight `ad-.*` with shiki. (`ad-note`, `ad-warn`, ...)
   *                            // you can also use `false` in replace of `"ignore"`. (`"ad-.*"": false`)
   *   "jsx-like-lang": "jsx",  // highlight `jsx-like-lang` as jsx
   * };
   * ```
   *
   * following code block will be highlighted as jsx:
   *
   * ````md
   * ```jsx-like-lang
   * <div>Hello, World!</div>
   * ```
   * ````
   */
  langAssociations?: Record<string, string | false>;

  /**
   * whether to highlight unknown language as plain text or not.
   * @default true
   */
  shouldHighlightUnknownLang?: boolean;

  /**
   * Language names to include.
   *
   * @default Object.keys(bundledLanguages)
   */
  langs?: Array<LanguageInput | BuiltinLanguage>;

  /**
   * Add `highlighted` class to lines defined in after codeblock
   *
   * @default true
   */
  highlightLines?: boolean | string;

  /**
   * Extra meta data to pass to the highlighter
   */
  meta?: Record<string, unknown>;
};

export type RehypeBeautyOptions = InternalRehypeBeautyCodeOptions &
  CodeOptionsThemes<BuiltinTheme>;

export const defaultRehypeBeautyOptions: Required<InternalRehypeBeautyCodeOptions> =
  {
    langAssociations: {},
    shouldHighlightUnknownLang: true,
    langs: Object.keys(bundledLanguages) as BuiltinLanguage[],
    highlightLines: false,
    meta: {},
  };

/**
 * Get language from class names
 * @param classNames class names e.g. `["language-javascript"]`
 * @returns language e.g. `javascript`
 *
 * @example
 * ```ts
 * const lang = getLangFromClassNames(["language-javascript"]);
 * console.log(lang);
 * // >>> javascript
 * ```
 *
 * @example
 * ```ts
 * const lang = getLangFromClassNames(["unknown-lang"]);
 * console.log(lang);
 * // >>> undefined
 * ```
 */
export const getLangFromClassNames = (
  classNames?: string[],
  associations: Required<RehypeBeautyOptions>["langAssociations"] = {},
) => {
  const prefix = "language-" as const;
  const lang = classNames
    ?.find((className) => className.startsWith(prefix))
    ?.slice(prefix.length);

  for (const [pattern, mappedLang] of Object.entries(associations)) {
    if (lang?.match(pattern)) return mappedLang;
  }
  return lang;
};

/**
 * convert pre element to highlighted pre element using shiki
 * @param options options
 * @param options.highlighter shiki highlighter
 * @returns unified plugin
 *
 * @example
 * const mdText = `
 * \`\`\`js
 * console.log("Hello, World!");
 * \`\`\`
 * `;
 *
 * const html = await unified()
 *   .use(remarkParse)
 *   .use(remarkRehype)
 *   .use(rehypeShiki, {
 *     highlighter: await getHighlighter({
 *       theme: "material-theme-darker",
 *     }),
 *   })
 *   .use(rehypeStringify)
 *   .process(mdText);
 *
 * console.log(html.toString());
 * // >>> <pre class="shiki material-theme-darker" style="background-color: #212121" tabindex="0"><code><span class="line"><span style="color: #EEFFFF">console</span><span style="color: #89DDFF">.</span><span style="color: #82AAFF">log</span><span style="color: #EEFFFF">(</span><span style="color: #89DDFF">"</span><span style="color: #C3E88D">Hello, World!</span><span style="color: #89DDFF">"</span><span style="color: #EEFFFF">)</span><span style="color: #89DDFF">;</span></span><span class="line"><span style="color: #82AAFF">main</span><span style="color: #EEFFFF">()</span><span style="color: #89DDFF">;</span></span><span class="line"></span></code></pre>
 */
export const rehypeBeautyCode: Plugin<[RehypeBeautyOptions], Root> = (
  _options,
) => {
  const options = {
    ...defaultRehypeBeautyOptions,
    ..._options,
  } as const satisfies RehypeBeautyOptions;

  const themes = (
    "themes" in options ? Object.values(options.themes) : [options.theme]
  ).filter(Boolean) as BuiltinTheme[];
  const gettingHighlighter = getHighlighter({
    themes,
    langs: options.langs,
  });

  return async (tree, file) => {
    const highlighter = await gettingHighlighter;

    visit(tree, "element", (preNode, index, parent) => {
      // check if the current node is a block code element
      // if not, return
      if (!parent || index == null || preNode.tagName !== "pre") return;

      // check if the current pre node has a code element as its child
      const codeNode = preNode.children[0];
      if (
        !codeNode ||
        codeNode.type !== "element" ||
        codeNode.tagName !== "code" ||
        !codeNode.properties
      )
        return;
      const codeText = toString(codeNode.children[0]);

      // detect language from class names
      const lang = getLangFromClassNames(
        codeNode.properties.className as string[],
        options.langAssociations,
      );
      if (lang === "ignore" || lang === false) return; // if this lang is ignored manually by settings, return
      if (
        !(options.shouldHighlightUnknownLang || (lang && lang in options.langs))
      )
        return; // if this code is unknown language, return

      // get highlighted pre html string
      const highlightedFragment = (() => {
        try {
          return highlighter.codeToHast(codeText, {
            ...options,
            lang:
              lang && highlighter.getLoadedLanguages().includes(lang)
                ? lang
                : "plaintext",
          });
        } catch {
          file.fail(`failed to highlight code block: ${codeText}`);
          return undefined;
        }
      })();
      if (!highlightedFragment) return;

      const highlightedPre = highlightedFragment.children[0] as
        | Element
        | undefined;
      if (
        !highlightedPre ||
        highlightedPre.type !== "element" ||
        highlightedPre.tagName !== "pre"
      )
        return;
      highlightedPre.data = merge(
        preNode.data ?? {},
        highlightedPre.data ?? {},
      );
      highlightedPre.position = preNode.position;
      highlightedPre.properties = merge(
        preNode.properties ?? {},
        highlightedPre.properties ?? {},
        {
          dataLang: lang,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any,
      );

      // replace the current pre node with the highlighted pre node which is generated by shiki
      parent.children.splice(index, 1, highlightedPre as Element);
    });
  };
};

export default rehypeBeautyCode;
