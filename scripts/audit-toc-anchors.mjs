/**
 * Audit TOC anchor links: report any link href that doesn't match a heading slug.
 */
import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import GithubSlugger from 'github-slugger';

const __dirname = dirname(fileURLToPath(import.meta.url));
const POSTS_DIR = join(__dirname, '..', 'src', 'content', 'blog');

const files = readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));
let postsWithIssues = 0;
const issuesByPost = {};

for (const file of files) {
  const filePath = join(POSTS_DIR, file);
  const content = readFileSync(filePath, 'utf8');
  if (!content.includes('](#')) continue;

  const slugger = new GithubSlugger();
  const astroSlugs = [];
  const body = content.replace(/^---[\s\S]*?---\n?/, '');

  const headingRegex = /^#{1,6}\s+(.+)$/gm;
  let m;
  while ((m = headingRegex.exec(body)) !== null) {
    let t = m[1].trim().replace(/\\(.)/g, '$1');
    t = t.replace(/\*\*(.+?)\*\*/g, '$1').replace(/\*(.+?)\*/g, '$1').replace(/`(.+?)`/g, '$1').replace(/\[(.+?)\]\(.+?\)/g, '$1');
    astroSlugs.push(slugger.slug(t));
  }

  const issues = [];
  const linkRegex = /\]\(#([a-z0-9-]+)\)/g;
  let lm;
  while ((lm = linkRegex.exec(body)) !== null) {
    const anchor = lm[1];
    if (!astroSlugs.includes(anchor)) issues.push(anchor);
  }

  if (issues.length) {
    postsWithIssues++;
    issuesByPost[file] = { issues: [...new Set(issues)], slugs: astroSlugs };
  }
}

console.log(`\n${postsWithIssues} posts with broken TOC links of ${files.length} total\n`);
const entries = Object.entries(issuesByPost).slice(0, 8);
for (const [file, { issues, slugs }] of entries) {
  console.log(`--- ${file}`);
  console.log(`  broken anchors: ${issues.slice(0, 5).join(', ')}${issues.length > 5 ? ` ... (+${issues.length - 5} more)` : ''}`);
  console.log(`  available slugs sample: ${slugs.slice(0, 5).join(', ')}`);
}
