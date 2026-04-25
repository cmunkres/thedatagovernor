/**
 * Second-pass TOC fix.
 *
 * AIOSEO/WordPress TOC links sometimes drop the leading number prefix
 *   (#identify-your-data-quality-goals)
 * but Astro's github-slugger keeps it
 *   (#1-identify-your-data-quality-goals)
 *
 * For each post, this builds a map of {astroSlug-without-leading-number → astroSlug}
 * and rewrites bare TOC links to the full Astro slug.
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import GithubSlugger from 'github-slugger';

const __dirname = dirname(fileURLToPath(import.meta.url));
const POSTS_DIR = join(__dirname, '..', 'src', 'content', 'blog');

const files = readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));
let totalFixed = 0;

for (const file of files) {
  const filePath = join(POSTS_DIR, file);
  const content = readFileSync(filePath, 'utf8');
  if (!content.includes('](#')) continue;

  const slugger = new GithubSlugger();
  const astroSlugs = []; // ordered list of all heading slugs in this post

  const body = content.replace(/^---[\s\S]*?---\n?/, '');
  const headingRegex = /^#{1,6}\s+(.+)$/gm;
  let match;
  while ((match = headingRegex.exec(body)) !== null) {
    let headingText = match[1].trim();
    headingText = headingText.replace(/\\(.)/g, '$1');
    headingText = headingText.replace(/\*\*(.+?)\*\*/g, '$1')
                             .replace(/\*(.+?)\*/g, '$1')
                             .replace(/`(.+?)`/g, '$1')
                             .replace(/\[(.+?)\]\(.+?\)/g, '$1');
    astroSlugs.push(slugger.slug(headingText));
  }

  // Build a map: stripped-leading-number-prefix → fullAstroSlug
  // e.g. "identify-your-data-quality-goals" → "1-identify-your-data-quality-goals"
  const stripMap = {};
  for (const s of astroSlugs) {
    const stripped = s.replace(/^\d+-/, '');
    if (stripped !== s && !stripMap[stripped]) {
      stripMap[stripped] = s;
    }
  }

  let updated = content;
  updated = updated.replace(/\]\(#([a-z0-9-]+)\)/g, (full, anchor) => {
    // 1. Exact match — already correct
    if (astroSlugs.includes(anchor)) return full;
    // 2. Missing leading number prefix (e.g. "intro" → "1-intro")
    if (stripMap[anchor]) return `](#${stripMap[anchor]})`;
    // 3. AIOSEO trailing -N counter (e.g. "foo-bar-26" → "foo-bar")
    const noSuffix = anchor.replace(/-\d+$/, '');
    if (noSuffix !== anchor && astroSlugs.includes(noSuffix)) {
      return `](#${noSuffix})`;
    }
    // 4. AIOSEO trailing -N counter + missing leading number prefix
    if (noSuffix !== anchor && stripMap[noSuffix]) {
      return `](#${stripMap[noSuffix]})`;
    }
    // 5. Fuzzy: anchor is a substring of exactly one heading slug
    const candidates = astroSlugs.filter(s => s.includes(anchor) || s.includes(noSuffix));
    if (candidates.length === 1) {
      return `](#${candidates[0]})`;
    }
    return full;
  });

  if (updated !== content) {
    writeFileSync(filePath, updated, 'utf8');
    totalFixed++;
    console.log(`✓ ${file}`);
  }
}

console.log(`\nDone. Updated ${totalFixed} of ${files.length} posts.`);
