#!/usr/bin/env node
// Generates 1200x630 OG images from each post's featured image.
// Maintains aspect ratio with dark letterbox. Saves to public/og/
// Adds ogImage: frontmatter field to each post.
// Usage: node scripts/generate-og-images.mjs

import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'fs';
import { join, dirname, extname, basename } from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = join(__dirname, '..', 'src', 'content', 'blog');
const PUBLIC_DIR = join(__dirname, '..', 'public');
const OG_DIR = join(PUBLIC_DIR, 'og');
const OG_W = 1200, OG_H = 630;
const BG = { r: 26, g: 31, b: 46 }; // matches --dark-bg #1a1f2e

mkdirSync(OG_DIR, { recursive: true });

const mdFiles = readdirSync(BLOG_DIR).filter(f => f.endsWith('.md')).map(f => join(BLOG_DIR, f));
let done = 0, skipped = 0, errors = 0;

for (const mdPath of mdFiles) {
  const lines = readFileSync(mdPath, 'utf-8').split('\n');

  // Already has ogImage — skip
  if (lines.some(l => l.startsWith('ogImage:'))) { skipped++; continue; }

  // Find image: field
  const imgLine = lines.find(l => l.startsWith('image:'));
  if (!imgLine) { skipped++; continue; }

  const localPath = imgLine.replace(/^image:\s*/, '').trim();
  const srcFile = join(PUBLIC_DIR, localPath.slice(1)); // strip leading /
  if (!existsSync(srcFile)) {
    console.log(`  ! source not found: ${localPath}`);
    errors++; continue;
  }

  // Build output path: /og/<original-filename>.jpg
  const ogFilename = basename(localPath, extname(localPath)) + '.jpg';
  const ogSubdir = dirname(localPath); // e.g. /2023/05
  const ogOutDir = join(OG_DIR, ogSubdir.slice(1));
  mkdirSync(ogOutDir, { recursive: true });
  const ogOutPath = join(ogOutDir, ogFilename);
  const ogWebPath = `/og${ogSubdir}/${ogFilename}`;

  try {
    await sharp(srcFile)
      .resize(OG_W, OG_H, { fit: 'contain', background: BG })
      .jpeg({ quality: 85, mozjpeg: true })
      .toFile(ogOutPath);

    // Inject ogImage before closing ---
    let closeIdx = -1, count = 0;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim() === '---') { count++; if (count === 2) { closeIdx = i; break; } }
    }

    if (closeIdx >= 0) {
      const newLines = [
        ...lines.slice(0, closeIdx),
        `ogImage: ${ogWebPath}`,
        '---',
        ...lines.slice(closeIdx + 1),
      ];
      writeFileSync(mdPath, newLines.join('\n'), 'utf-8');
    }

    console.log(`  ✓ ${basename(mdPath, '.md')}  →  ${ogWebPath}`);
    done++;
  } catch (e) {
    console.log(`  ! error on ${localPath}: ${e.message}`);
    errors++;
  }
}

console.log(`\nGenerated: ${done}  |  Skipped: ${skipped}  |  Errors: ${errors}`);
