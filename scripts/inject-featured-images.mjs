#!/usr/bin/env node
// Reads WP XML, maps _thumbnail_id → attachment URL, injects image: into post frontmatter
// Usage: node scripts/inject-featured-images.mjs <path-to-wordpress-export.xml>

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { XMLParser } from 'fast-xml-parser';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = join(__dirname, '..', 'src', 'content', 'blog');
const PUBLIC_DIR = join(__dirname, '..', 'public');
const WP_UPLOADS = 'https://thedatagovernor.info/wp-content/uploads/';

const xmlPath = process.argv[2];
if (!xmlPath) { console.error('Usage: node scripts/inject-featured-images.mjs <xml>'); process.exit(1); }

const xml = readFileSync(xmlPath, 'utf-8');
const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  isArray: (n) => ['item', 'category', 'wp:postmeta'].includes(n),
});
const parsed = parser.parse(xml);
const items = parsed?.rss?.channel?.item ?? [];

// Build attachment map: id → { url, title }
const attachments = new Map();
for (const item of items) {
  if (item['wp:post_type'] !== 'attachment') continue;
  const id = String(item['wp:post_id']);
  const url = String(item['wp:attachment_url'] ?? '');
  const title = String(item.title ?? '');
  if (url) attachments.set(id, { url, title });
}
console.log(`Found ${attachments.size} attachments`);

// Process each published post
const posts = items.filter(i => i['wp:post_type'] === 'post' && i['wp:status'] === 'publish');
let injected = 0, skipped = 0, missing = 0;

for (const post of posts) {
  const slug = String(post['wp:post_name'] ?? '').trim();
  if (!slug) continue;

  const filename = slug.replace(/[^a-z0-9-]/gi, '-').toLowerCase() + '.md';
  const mdPath = join(BLOG_DIR, filename);
  if (!existsSync(mdPath)) { console.log(`  ! no file: ${filename}`); continue; }

  // Find _thumbnail_id in postmeta
  const meta = [post['wp:postmeta']].flat().filter(Boolean);
  const thumbMeta = meta.find(m => m['wp:meta_key'] === '_thumbnail_id');
  if (!thumbMeta) { skipped++; continue; }

  const thumbId = String(thumbMeta['wp:meta_value'] ?? '').trim();
  const att = attachments.get(thumbId);
  if (!att) { console.log(`  ! attachment ${thumbId} not found for ${slug}`); missing++; continue; }

  // Convert URL to local path
  const localPath = att.url.startsWith(WP_UPLOADS)
    ? '/' + att.url.slice(WP_UPLOADS.length)
    : null;
  if (!localPath) { console.log(`  ! unexpected URL format: ${att.url}`); continue; }

  // Check file exists locally
  const physicalPath = join(PUBLIC_DIR, localPath.slice(1));
  if (!existsSync(physicalPath)) {
    console.log(`  ! image not in public/: ${localPath}`);
    missing++;
    continue;
  }

  // Read markdown and check if image already set
  const lines = readFileSync(mdPath, 'utf-8').split('\n');
  if (lines.some(l => l.startsWith('image:'))) {
    console.log(`  ~ already has image: ${filename}`);
    injected++;
    continue;
  }

  // Find closing --- of frontmatter
  let closeIdx = -1, count = 0;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === '---') { count++; if (count === 2) { closeIdx = i; break; } }
  }
  if (closeIdx < 0) { console.log(`  ! no frontmatter: ${filename}`); continue; }

  const altText = att.title || String(post.title ?? slug);
  const newLines = [
    ...lines.slice(0, closeIdx),
    `image: ${localPath}`,
    `imageAlt: "${altText.replace(/"/g, '\\"')}"`,
    '---',
    ...lines.slice(closeIdx + 1),
  ];

  writeFileSync(mdPath, newLines.join('\n'), 'utf-8');
  console.log(`  ✓ ${slug}  →  ${localPath}`);
  injected++;
}

console.log(`\nInjected: ${injected}  |  No thumbnail: ${skipped}  |  Missing file: ${missing}`);
