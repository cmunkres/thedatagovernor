/**
 * For TOC anchors that point to no real heading, strip the markdown link
 * wrapper so the entry becomes plain text rather than a clickable dead link.
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
  const astroSlugs = new Set();
  const body = content.replace(/^---[\s\S]*?---\n?/, '');
  const headingRegex = /^#{1,6}\s+(.+)$/gm;
  let m;
  while ((m = headingRegex.exec(body)) !== null) {
    let t = m[1].trim().replace(/\\(.)/g, '$1');
    t = t.replace(/\*\*(.+?)\*\*/g, '$1').replace(/\*(.+?)\*/g, '$1').replace(/`(.+?)`/g, '$1').replace(/\[(.+?)\]\(.+?\)/g, '$1');
    astroSlugs.add(slugger.slug(t));
  }

  let changed = false;
  const updated = content.replace(/\[([^\]]+)\]\(#([a-z0-9-]+)\)/g, (full, text, anchor) => {
    if (astroSlugs.has(anchor)) return full;
    changed = true;
    console.log(`  ${file}: stripping dead link "${text}" (#${anchor})`);
    return text;
  });

  if (changed) {
    writeFileSync(filePath, updated, 'utf8');
    totalFixed++;
  }
}

console.log(`\nStripped orphan links in ${totalFixed} posts.`);
