// Render STRK's legal documents to a small static site.
//
// The two markdown files in `legal/` are the source; `_site/` is what GitHub
// Pages serves. Run `node build.mjs` to rebuild locally.
//
// The developer-facing "Publishing note" blockquote at the top of each document
// is STRIPPED — it is instruction to whoever hosts the file, and on a page whose
// whole job is to be authoritative it would tell readers the document they are
// looking at is a copy. Removed by an explicit marker match, and the build FAILS
// if that note is ever reworded rather than silently publishing it.

import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";

const OUT = "_site";
const DOCS = [
  { src: "legal/privacy-policy.md", slug: "privacy-policy", title: "Privacy Policy" },
  { src: "legal/terms-of-service.md", slug: "terms-of-service", title: "Terms of Service" },
];

/** Remove the developer-facing publishing note. Fails loudly if absent. */
function stripPublishingNote(md, src) {
  const lines = md.split("\n");
  const start = lines.findIndex((l) => /^>\s*\*\*Publishing note\.\*\*/.test(l));
  if (start === -1) {
    // Not silently tolerated: if the note moved or was reworded, the safe
    // assumption is that it is still there in a form this did not match, and
    // publishing it is worse than failing the build.
    throw new Error(
      `${src}: expected a "> **Publishing note.**" blockquote to strip and found none. ` +
      `If it was removed on purpose, delete this check with it.`
    );
  }
  let end = start;
  while (end < lines.length && lines[end].startsWith(">")) end++;
  return [...lines.slice(0, start), ...lines.slice(end)].join("\n");
}

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Minimal markdown → HTML. Deliberately covers only what these two files
 *  actually use — headings, bold, italics, links, paragraphs — which is
 *  verified by `scripts/engine`-adjacent counting at build time below. */
function render(md) {
  const out = [];
  let para = [];
  const flush = () => {
    if (!para.length) return;
    out.push(`<p>${inline(para.join(" "))}</p>`);
    para = [];
  };
  const inline = (t) =>
    esc(t)
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" rel="noopener">$1</a>')
      .replace(/_([^_]+)_/g, "<em>$1</em>");

  for (const line of md.split("\n")) {
    const h = /^(#{1,4})\s+(.*)$/.exec(line);
    if (h) { flush(); out.push(`<h${h[1].length}>${inline(h[2])}</h${h[1].length}>`); continue; }
    if (!line.trim()) { flush(); continue; }
    para.push(line.trim());
  }
  flush();
  return out.join("\n");
}

const page = (title, body) => `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>STRK — ${esc(title)}</title>
<style>
  :root { color-scheme: light dark; }
  body { margin:0 auto; padding:2.5rem 1.25rem 5rem; max-width:44rem;
         font:16px/1.65 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;
         color:#111; background:#fff; }
  @media (prefers-color-scheme: dark) { body { color:#e8e8ea; background:#0b0b0c; } a { color:#4fb9d4; } }
  h1 { font-size:1.8rem; margin:0 0 .25rem; letter-spacing:-.01em; }
  h2 { font-size:1.15rem; margin:2.25rem 0 .5rem; }
  h3 { font-size:1rem; margin:1.5rem 0 .4rem; }
  a { color:#0b6e85; }
  nav { margin-bottom:2.5rem; font-size:.9rem; }
  footer { margin-top:4rem; font-size:.85rem; opacity:.7; }
</style>
</head><body>
<nav><a href="./">STRK</a> · <a href="./privacy-policy.html">Privacy</a> · <a href="./terms-of-service.html">Terms</a></nav>
${body}
<footer>STRK runs entirely on your device. Questions: feedback@strk.app</footer>
</body></html>
`;

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

for (const d of DOCS) {
  const raw = readFileSync(d.src, "utf8");
  const md = stripPublishingNote(raw, d.src);
  const html = page(d.title, render(md));
  writeFileSync(`${OUT}/${d.slug}.html`, html);
  // A page that lost its content would still be a valid HTML file, so assert
  // it carries something: the shortest of these documents is well over 1 KB.
  if (html.length < 1200) throw new Error(`${d.slug}: rendered page is suspiciously small (${html.length} bytes)`);
  console.log(`  ${d.slug}.html  ${html.length} bytes`);
}

writeFileSync(`${OUT}/index.html`, page("Legal", `
<h1>STRK</h1>
<p>STRK is a training and nutrition tracker that runs entirely on your device.
There is no STRK server and no account system.</p>
<h2>Documents</h2>
<p><a href="./privacy-policy.html">Privacy Policy</a><br>
<a href="./terms-of-service.html">Terms of Service</a></p>
`));
console.log(`  index.html`);
console.log(`\n  ${OUT}/ built — ${DOCS.length} documents and an index, nothing else.`);
