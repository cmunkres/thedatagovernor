/**
 * Third-pass TOC fix using Levenshtein distance.
 *
 * For each TOC anchor that doesn't match any heading slug, find the
 * closest heading slug. If it's "close enough" (similarity >= 0.75),
 * rewrite. Otherwise, the TOC entry is a true orphan (heading was
 * deleted) and we leave it for manual cleanup.
 */
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import GithubSlugger from 'github-slugger';

const __dirname = dirname(fileURLToPath(import.meta.url));
const POSTS_DIR = join(__dirname, '..', 'src', 'content', 'blog');

function levenshtein(a, b) {
  if (a === b) return 0;
  const al = a.length, bl = b.length;
  if (!al) return bl;
  if (!bl) return al;
  const dp = Array.from({ length: al + 1 }, () => new Array(bl + 1).fill(0));
  for (let i = 0; i <= al; i++) dp[i][0] = i;
  for (let j = 0; j <= bl; j++) dp[0][j] = j;
  for (let i = 1; i <= al; i++) {
    for (let j = 1; j <= bl; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[al][bl];
}

function similarity(a, b) {
  const dist = levenshtein(a, b);
  const maxLen = Math.max(a.length, b.length);
  return maxLen ? 1 - dist / maxLen : 1;
}

const files = readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));
let totalFixed = 0;
const orphansByFile = {};

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

  const orphans = [];
  let updated = content.replace(/\]\(#([a-z0-9-]+)\)/g, (full, anchor) => {
    if (astroSlugs.includes(anchor)) return full;
    // Find closest by similarity
    let best = null;
    let bestSim = 0;
    for (const slug of astroSlugs) {
      const sim = similarity(anchor, slug);
      if (sim > bestSim) { bestSim = sim; best = slug; }
    }
    if (bestSim >= 0.75 && best) {
      console.log(`  ${anchor} → ${best} (sim ${bestSim.toFixed(2)})`);
      return `](#${best})`;
    }
    orphans.push(anchor);
    return full;
  });

  if (updated !== content) {
    writeFileSync(filePath, updated, 'utf8');
    totalFixed++;
    console.log(`✓ ${file}`);
  }
  if (orphans.length) orphansByFile[file] = [...new Set(orphans)];
}

console.log(`\nFixed ${totalFixed} posts. Remaining true orphans:\n`);
for (const [file, orphans] of Object.entries(orphansByFile)) {
  console.log(`  ${file}: ${orphans.join(', ')}`);
}
