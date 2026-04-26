// Generate per-post OG images (1200x630 PNG) using satori + @resvg/resvg-wasm.
// Pure-WASM stack — no native binaries, safe under Windows WDAC.
//
// Usage:
//   npm run og              # generate for posts missing ogImage
//   npm run og -- --force   # regenerate all
//
// Output: public/og/auto/<wpSlug-or-slug>.png
// Wire-up: BlogPost.astro falls back to /og/auto/<slug>.png if no
// ogImage is set in frontmatter.

import { readFile, readdir, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import satori from 'satori';
import { Resvg, initWasm } from '@resvg/resvg-wasm';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const BLOG_DIR = path.join(ROOT, 'src', 'content', 'blog');
const OUT_DIR = path.join(ROOT, 'public', 'og', 'auto');

const force = process.argv.includes('--force');

// Initialize resvg WASM
const resvgWasmPath = path.join(
  ROOT,
  'node_modules',
  '@resvg',
  'resvg-wasm',
  'index_bg.wasm',
);
await initWasm(await readFile(resvgWasmPath));

// Load fonts (Google Fonts woff2 → ttf is a hassle; satori needs ttf/otf).
// We bundle nothing, so fetch a couple of weights from Google's font CDN once.
async function loadFont(family, weight) {
  const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}&display=swap`;
  const css = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }).then((r) => r.text());
  const m = css.match(/src: url\((https:\/\/[^)]+\.ttf)\)/);
  if (!m) throw new Error(`Could not find TTF in Google Fonts CSS for ${family} ${weight}`);
  const ttf = await fetch(m[1]).then((r) => r.arrayBuffer());
  return new Uint8Array(ttf);
}

console.log('Loading fonts...');
const [robotoBold, robotoRegular, robotoCondensedBold] = await Promise.all([
  loadFont('Roboto', 700),
  loadFont('Roboto', 400),
  loadFont('Roboto Condensed', 700),
]);

function parseFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return {};
  const fm = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (!kv) continue;
    let [, k, v] = kv;
    v = v.trim();
    if (v.startsWith('"') && v.endsWith('"')) v = v.slice(1, -1);
    if (v.startsWith('[')) {
      try {
        v = JSON.parse(v.replace(/'/g, '"'));
      } catch {
        /* ignore */
      }
    }
    fm[k] = v;
  }
  return fm;
}

function template(title, category) {
  return {
    type: 'div',
    props: {
      style: {
        width: '1200px',
        height: '630px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '70px 80px',
        background: 'linear-gradient(135deg, #1a1f2e 0%, #2a1f1f 100%)',
        color: '#f8f5f0',
        fontFamily: 'Roboto',
      },
      children: [
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              fontSize: '20px',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#d4a017',
              fontFamily: 'Roboto Condensed',
            },
            children: [
              { type: 'div', props: { style: { width: '32px', height: '4px', background: '#c1121f' } } },
              { type: 'span', props: { children: 'The Data Governor' } },
            ],
          },
        },
        {
          type: 'div',
          props: {
            style: { display: 'flex', flexDirection: 'column', gap: '24px' },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: '64px',
                    lineHeight: 1.1,
                    fontWeight: 700,
                    letterSpacing: '-0.01em',
                    color: '#f8f5f0',
                  },
                  children: title,
                },
              },
              category
                ? {
                    type: 'div',
                    props: {
                      style: {
                        fontSize: '20px',
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: '#a09890',
                        fontFamily: 'Roboto Condensed',
                      },
                      children: category,
                    },
                  }
                : null,
            ].filter(Boolean),
          },
        },
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1px solid rgba(212, 160, 23, 0.4)',
              paddingTop: '24px',
              fontSize: '18px',
              color: '#a09890',
              fontFamily: 'Roboto',
            },
            children: [
              { type: 'span', props: { children: 'thedatagovernor.com' } },
              { type: 'span', props: { children: 'Practitioner data governance' } },
            ],
          },
        },
      ],
    },
  };
}

async function renderOne(title, category, outFile) {
  const svg = await satori(template(title, category), {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'Roboto', data: robotoRegular, weight: 400, style: 'normal' },
      { name: 'Roboto', data: robotoBold, weight: 700, style: 'normal' },
      { name: 'Roboto Condensed', data: robotoCondensedBold, weight: 700, style: 'normal' },
    ],
  });
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
  await writeFile(outFile, png);
}

async function main() {
  if (!existsSync(OUT_DIR)) await mkdir(OUT_DIR, { recursive: true });

  const files = (await readdir(BLOG_DIR)).filter((f) => f.endsWith('.md'));
  let generated = 0;
  let skipped = 0;

  for (const f of files) {
    const raw = await readFile(path.join(BLOG_DIR, f), 'utf-8');
    const fm = parseFrontmatter(raw);
    if (!fm.title) continue;
    if (fm.draft === 'true' || fm.draft === true) continue;

    const slug = fm.wpSlug || f.replace(/\.md$/, '');
    const outFile = path.join(OUT_DIR, `${slug}.png`);

    // Skip if user has set a frontmatter ogImage explicitly (unless --force)
    if (!force && fm.ogImage) {
      skipped++;
      continue;
    }
    if (!force && existsSync(outFile)) {
      skipped++;
      continue;
    }

    const category = Array.isArray(fm.categories) ? fm.categories[0] : undefined;
    await renderOne(fm.title, category, outFile);
    generated++;
    process.stdout.write(`  + ${slug}.png\n`);
  }

  console.log(`\nDone. Generated ${generated}, skipped ${skipped}.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
