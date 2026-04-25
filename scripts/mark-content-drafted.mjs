/**
 * Marks a content-pipeline.csv row as "Drafted" (or any state passed as
 * second arg) given a slug. Used by the scheduled drafting routine
 * after committing a draft article.
 *
 * Run: node scripts/mark-content-drafted.mjs <slug> [Status=Drafted]
 */
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PIPELINE = join(__dirname, 'content-pipeline.csv');

const slug = process.argv[2];
const status = process.argv[3] ?? 'Drafted';
if (!slug) {
  console.error('usage: node scripts/mark-content-drafted.mjs <slug> [Status]');
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const raw = readFileSync(PIPELINE, 'utf8');
const useCRLF = raw.includes('\r\n');
const lines = raw.replace(/\r\n/g, '\n').split('\n');
const header = lines[0].split(',');
const slugIdx = header.indexOf('Slug');
const statusIdx = header.indexOf('Status');
const dateIdx = header.indexOf('ScheduledDate');

let updated = 0;
const out = lines.map((l, i) => {
  if (i === 0 || !l.trim()) return l;
  const cols = l.split(',');
  if (cols[slugIdx] === slug) {
    cols[statusIdx] = status;
    if (status === 'Drafted' || status === 'Published') cols[dateIdx] = today;
    updated++;
  }
  return cols.join(',');
});

if (!updated) {
  console.error(`No row with slug=${slug}`);
  process.exit(2);
}

writeFileSync(PIPELINE, out.join(useCRLF ? '\r\n' : '\n'));
console.log(`Updated ${updated} row(s) — ${slug} → ${status}`);
