/**
 * Fix TOC anchor links in all blog posts.
 *
 * WordPress/AIOSEO generates IDs like: aioseo-4-1-accountability
 * Astro (github-slugger) generates IDs like: 41-accountability
 *
 * This script reads each post's headings, generates the correct Astro slug
 * for each, builds a AIOSEO→Astro map, then rewrites all #aioseo-* links.
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

  if (!content.includes('#aioseo-') && !content.includes('](#')) continue;

  const slugger = new GithubSlugger();
  const headingMap = {}; // "aioseo-4-1-accountability" → "41-accountability"

  // Extract headings from the body (skip frontmatter)
  const body = content.replace(/^---[\s\S]*?---\n?/, '');
  const headingRegex = /^#{1,6}\s+(.+)$/gm;
  let match;

  while ((match = headingRegex.exec(body)) !== null) {
    let headingText = match[1].trim();
    // Resolve markdown escapes: \. → .
    headingText = headingText.replace(/\\(.)/g, '$1');
    // Strip inline markdown (bold, links, code)
    headingText = headingText.replace(/\*\*(.+?)\*\*/g, '$1')
                             .replace(/\*(.+?)\*/g, '$1')
                             .replace(/`(.+?)`/g, '$1')
                             .replace(/\[(.+?)\]\(.+?\)/g, '$1');

    const astroSlug = slugger.slug(headingText);

    // Reproduce what AIOSEO would generate for this heading text
    const aioseoSlug = 'aioseo-' + headingText
      .toLowerCase()
      .replace(/[.]/g, '-')          // . → -
      .replace(/[^a-z0-9-]+/g, '-') // everything else non-alphanum → -
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    if (aioseoSlug !== `aioseo-${astroSlug}`) {
      // Only store when they differ (mismatches need explicit mapping)
      headingMap[aioseoSlug] = astroSlug;
    }
  }

  let updated = content;

  // 1. Apply explicit mappings for mismatched slugs (e.g. 4-1 → 41)
  for (const [aioseoId, astroSlug] of Object.entries(headingMap)) {
    updated = updated.split(`#${aioseoId}`).join(`#${astroSlug}`);
  }

  // 2. Strip remaining #aioseo- prefix (these are the simple cases that match)
  updated = updated.replace(/#aioseo-/g, '#');

  if (updated !== content) {
    writeFileSync(filePath, updated, 'utf8');
    totalFixed++;
    console.log(`✓ ${file}`);
  }
}

console.log(`\nDone. Updated ${totalFixed} of ${files.length} posts.`);
