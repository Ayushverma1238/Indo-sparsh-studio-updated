/**
 * A small single-line syntax highlighter for the code panels. It avoids
 * pulling in a full highlighter library just to colour a few snippets.
 * Each language gets its own pattern set, so `#` means a comment in Python
 * but a colour in CSS.
 */

const PATTERNS = {
  js: /(?<com>\/\/.*$)|(?<str>"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)|(?<num>\b\d+(?:\.\d+)?\b)|(?<tag><\/?[A-Za-z][\w.:-]*)|(?<id>[A-Za-z_$][\w$]*)/g,
  py: /(?<com>#.*$)|(?<str>"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(?<num>\b\d+(?:\.\d+)?\b)|(?<id>[A-Za-z_][\w]*)/g,
  css: /(?<com>\/\*.*?\*\/)|(?<str>"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(?<hex>#[0-9a-fA-F]{3,8}\b)|(?<num>-?\b\d+(?:\.\d+)?(?:px|rem|em|%|vh|vw|s|ms)?)|(?<var>--[A-Za-z][\w-]*)|(?<id>[A-Za-z_-][\w-]*)/g,
  markup: /(?<com><!--.*?-->)|(?<str>"[^"]*"|'[^']*')|(?<tag><\/?[A-Za-z][\w.:-]*|\/?>)|(?<num>\b\d+(?:\.\d+)?\b)/g,
  json: /(?<str>"(?:\\.|[^"\\])*")|(?<num>-?\b\d+(?:\.\d+)?\b)|(?<kw>\b(?:true|false|null)\b)/g,
};

const KEYWORDS = {
  js: new Set(
    "import export from default const let var function return if else for of in await async new class extends try catch throw typeof as true false null undefined".split(" "),
  ),
  py: new Set(
    "import from as def return if else elif for in while class True False None with lambda pass and or not is".split(" "),
  ),
  css: new Set(),
  markup: new Set(),
  json: new Set(),
};

const ALIASES = { jsx: "js", js: "js", py: "py", css: "css", svg: "markup", html: "markup", markup: "markup", json: "json" };

/**
 * Split one line of code into `{ text, cls }` tokens. `cls` is null for plain
 * text. Classes map to the `.tk-*` rules in Background3D.css.
 */
export function highlightLine(line, lang = "js") {
  const key = ALIASES[lang] || "js";
  const pattern = PATTERNS[key];
  const keywords = KEYWORDS[key];
  const tokens = [];
  let last = 0;

  pattern.lastIndex = 0;
  let match;
  while ((match = pattern.exec(line)) !== null) {
    if (match[0] === "") {
      pattern.lastIndex += 1;
      continue;
    }
    if (match.index > last) tokens.push({ text: line.slice(last, match.index), cls: null });

    const g = match.groups;
    const text = match[0];
    let cls = null;

    if (g.com !== undefined) cls = "tk-com";
    else if (g.str !== undefined) {
      // In JSON a string followed by a colon is an object key
      const after = line.slice(match.index + text.length).trimStart();
      cls = key === "json" && after.startsWith(":") ? "tk-prop" : "tk-str";
    } else if (g.hex !== undefined || g.num !== undefined) cls = "tk-num";
    else if (g.tag !== undefined) cls = "tk-tag";
    else if (g.kw !== undefined) cls = "tk-kw";
    else if (g.var !== undefined) cls = "tk-var";
    else if (g.id !== undefined) {
      if (keywords.has(text)) cls = "tk-kw";
      else if (line[match.index + text.length] === "(") cls = "tk-fn";
      else if (/^[A-Z]/.test(text) && key === "js") cls = "tk-cls";
    }

    tokens.push({ text, cls });
    last = match.index + text.length;
  }

  if (last < line.length) tokens.push({ text: line.slice(last), cls: null });
  return tokens;
}
