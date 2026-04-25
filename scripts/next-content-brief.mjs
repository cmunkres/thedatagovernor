/**
 * Reads scripts/content-pipeline.csv and prints a brief for the next "Queued"
 * item, ordered by Priority. The scheduled routine reads this brief and
 * produces a draft article based on it.
 *
 * Run: node scripts/next-content-brief.mjs
 */
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PIPELINE = join(__dirname, 'content-pipeline.csv');

const raw = readFileSync(PIPELINE, 'utf8').replace(/\r\n/g, '\n');
const lines = raw.split('\n').filter(l => l.trim());
const header = lines[0].split(',');
const rows = lines.slice(1).map(l => {
  // Naive CSV parser: handles unquoted commas only. Pipeline doesn't quote.
  const cols = l.split(',');
  const o = {};
  header.forEach((h, i) => o[h] = cols[i] ?? '');
  return o;
});

const next = rows
  .filter(r => r.Status === 'Queued')
  .sort((a, b) => Number(a.Priority) - Number(b.Priority))[0];

if (!next) {
  console.log(JSON.stringify({ done: true, message: 'No queued items remaining.' }));
  process.exit(0);
}

const remaining = rows.filter(r => r.Status === 'Queued').length;
const drafted = rows.filter(r => r.Status === 'Drafted' || r.Status === 'Published').length;

console.log(JSON.stringify({
  next: {
    priority: next.Priority,
    tier: next.Tier,
    cluster: next.Cluster,
    title: next.Title,
    slug: next.Slug,
    targetKeyword: next.TargetKeyword,
    intent: next.Intent,
    targetWords: Number(next.Words),
    notes: next.Notes,
  },
  pipeline: { drafted, remaining, total: rows.length },
}, null, 2));
