#!/usr/bin/env node
// Usage: node scripts/import-wp.mjs ./wordpress-export.xml
// Converts WordPress WXR export into Astro markdown files in src/content/blog/
// Requires: npm install -D fast-xml-parser node-html-markdown

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { XMLParser } from 'fast-xml-parser';
import { NodeHtmlMarkdown } from 'node-html-markdown';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = join(__dirname, '..', 'src', 'content', 'blog');

const xmlPath = process.argv[2];
if (!xmlPath) {
  console.error('Usage: node scripts/import-wp.mjs <path-to-wordpress-export.xml>');
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });

const xml = readFileSync(xmlPath, 'utf-8');
const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  isArray: (name) => name === 'item' || name === 'category',
});
const parsed = parser.parse(xml);

const items = parsed?.rss?.channel?.item ?? [];
const posts = items.filter(item =>
  item['wp:post_type'] === 'post' &&
  item['wp:status'] === 'publish'
);

const nhm = new NodeHtmlMarkdown();
let count = 0;

function toYamlList(arr) {
  if (!arr.length) return '[]';
  return '[' + arr.map(s => `"${s.replace(/"/g, '\\"')}"`).join(', ') + ']';
}

for (const post of posts) {
  const rawTitle = String(post.title ?? '');
  const title = rawTitle.replace(/"/g, '\\"');
  const rawSlug = String(post['wp:post_name'] ?? '').trim();
  const pubDate = post['wp:post_date'] ? new Date(post['wp:post_date']).toISOString() : new Date().toISOString();
  const content = String(post['content:encoded'] ?? '');
  const rawExcerpt = String(post['excerpt:encoded'] ?? '').replace(/<[^>]+>/g, '').trim().slice(0, 200);
  const description = (rawExcerpt || rawTitle).replace(/"/g, '\\"');

  // Separate WP categories from tags
  const allTerms = [post.category].flat().filter(Boolean);
  const categories = [...new Set(
    allTerms.filter(c => c['@_domain'] === 'category').map(c => String(c['#text'] ?? c))
  )];
  const tags = [...new Set(
    allTerms.filter(c => c['@_domain'] === 'post_tag').map(c => String(c['#text'] ?? c))
  )];

  if (!rawSlug) continue;

  const filename = rawSlug.replace(/[^a-z0-9-]/gi, '-').toLowerCase();
  const markdown = `---
title: "${title}"
description: "${description}"
pubDate: ${pubDate}
wpSlug: "${rawSlug}"
categories: ${toYamlList(categories)}
tags: ${toYamlList(tags)}
draft: false
---

${nhm.translate(content)}
`;

  const outPath = join(OUTPUT_DIR, `${filename}.md`);
  writeFileSync(outPath, markdown, 'utf-8');
  count++;
  console.log(`  ✓ ${rawSlug}`);
}

console.log(`\nImported ${count} posts to src/content/blog/`);
console.log('Run: npm run dev  to verify');
