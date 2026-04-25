#!/usr/bin/env node
/**
 * Local admin UI for thedatagovernor.com
 * Run: node scripts/admin.mjs
 * Open: http://localhost:4320
 */

import http from 'http';
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const POSTS_DIR = path.join(ROOT, 'src', 'content', 'blog');
const PORT = 4320;

// ─── API helpers ────────────────────────────────────────────────────────────

function listPosts() {
  return fs.readdirSync(POSTS_DIR)
    .filter(f => f.endsWith('.md'))
    .map(f => {
      const raw = fs.readFileSync(path.join(POSTS_DIR, f), 'utf8');
      const fm = parseFrontmatter(raw);
      return {
        file: f,
        slug: f.replace(/\.md$/, ''),
        title: fm.title || f,
        pubDate: fm.pubDate || '',
        draft: fm.draft === true || fm.draft === 'true',
        categories: fm.categories || [],
      };
    })
    .sort((a, b) => (b.pubDate > a.pubDate ? 1 : -1));
}

function parseFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return {};
  const fm = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^(\w[\w-]*):\s*(.*)$/);
    if (!kv) continue;
    const [, key, val] = kv;
    const trimmed = val.trim().replace(/^["']|["']$/g, '');
    if (trimmed.startsWith('[')) {
      try { fm[key] = JSON.parse(trimmed.replace(/'/g, '"')); } catch { fm[key] = trimmed; }
    } else if (trimmed === 'true') fm[key] = true;
    else if (trimmed === 'false') fm[key] = false;
    else fm[key] = trimmed;
  }
  return fm;
}

function readPost(slug) {
  const file = path.join(POSTS_DIR, slug + '.md');
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, 'utf8');
  const fmMatch = raw.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/);
  const body = fmMatch ? raw.slice(fmMatch[0].length) : raw;
  const fm = parseFrontmatter(raw);
  return { fm, body };
}

function writePost({ slug, title, description, pubDate, updatedDate, categories, tags,
                     image, imageAlt, ogImage, draft, body }) {
  const cats = Array.isArray(categories) ? categories : [categories].filter(Boolean);
  const tagArr = Array.isArray(tags) ? tags : (tags || '').split(',').map(t => t.trim()).filter(Boolean);
  const lines = [
    '---',
    `title: "${title.replace(/"/g, '\\"')}"`,
    `description: "${description.replace(/"/g, '\\"')}"`,
    `pubDate: ${pubDate}`,
  ];
  if (updatedDate) lines.push(`updatedDate: ${updatedDate}`);
  lines.push(`categories: ${JSON.stringify(cats)}`);
  lines.push(`tags: ${JSON.stringify(tagArr)}`);
  lines.push(`draft: ${draft ? 'true' : 'false'}`);
  if (image) lines.push(`image: ${image}`);
  if (imageAlt) lines.push(`imageAlt: "${imageAlt.replace(/"/g, '\\"')}"`);
  if (ogImage) lines.push(`ogImage: ${ogImage}`);
  lines.push('---', '');
  const content = lines.join('\n') + body;
  const file = path.join(POSTS_DIR, slug + '.md');
  fs.writeFileSync(file, content, 'utf8');
  return file;
}

// ─── SSE deploy stream ───────────────────────────────────────────────────────

let deployClients = [];

function broadcast(msg) {
  const payload = `data: ${JSON.stringify(msg)}\n\n`;
  deployClients.forEach(res => res.write(payload));
}

function runDeploy(res) {
  broadcast({ type: 'start', msg: '▶ Building site...' });
  const build = spawn('npm', ['run', 'build'], { cwd: ROOT, shell: true });
  build.stdout.on('data', d => broadcast({ type: 'log', msg: d.toString() }));
  build.stderr.on('data', d => broadcast({ type: 'log', msg: d.toString() }));
  build.on('close', code => {
    if (code !== 0) {
      broadcast({ type: 'error', msg: `Build failed (exit ${code})` });
      res.writeHead(500).end(JSON.stringify({ ok: false }));
      return;
    }
    broadcast({ type: 'log', msg: '✓ Build complete. Deploying...' });
    const deploy = spawn('npx', [
      'wrangler', 'pages', 'deploy', 'dist',
      '--project-name', 'thedatagovernor',
      '--branch', 'main',
      '--commit-dirty=true',
    ], { cwd: ROOT, shell: true });
    deploy.stdout.on('data', d => broadcast({ type: 'log', msg: d.toString() }));
    deploy.stderr.on('data', d => broadcast({ type: 'log', msg: d.toString() }));
    deploy.on('close', c => {
      if (c === 0) broadcast({ type: 'done', msg: '🚀 Deployed successfully!' });
      else broadcast({ type: 'error', msg: `Deploy failed (exit ${c})` });
      res.writeHead(c === 0 ? 200 : 500).end(JSON.stringify({ ok: c === 0 }));
    });
  });
}

// ─── Router ─────────────────────────────────────────────────────────────────

function router(req, res) {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const { pathname } = url;

  // SSE stream
  if (pathname === '/api/deploy/stream') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
    });
    res.write('data: {"type":"connected"}\n\n');
    deployClients.push(res);
    req.on('close', () => { deployClients = deployClients.filter(r => r !== res); });
    return;
  }

  // JSON API
  if (pathname === '/api/posts' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(listPosts()));
    return;
  }

  if (pathname.startsWith('/api/posts/') && req.method === 'GET') {
    const slug = decodeURIComponent(pathname.slice('/api/posts/'.length));
    const post = readPost(slug);
    if (!post) { res.writeHead(404).end('{}'); return; }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(post));
    return;
  }

  if (pathname === '/api/posts' && req.method === 'POST') {
    let body = '';
    req.on('data', d => body += d);
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const file = writePost(data);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true, file }));
      } catch (e) {
        res.writeHead(400).end(JSON.stringify({ ok: false, error: e.message }));
      }
    });
    return;
  }

  if (pathname === '/api/deploy' && req.method === 'POST') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    runDeploy(res);
    return;
  }

  // Serve the SPA
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(HTML);
}

// ─── HTML SPA ────────────────────────────────────────────────────────────────

const HTML = /* html */`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>The Data Governor — Admin</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;600;700&family=Roboto:wght@400;500&family=Roboto+Mono:wght@400&display=swap" rel="stylesheet">
<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  --ink: #191616;
  --paper: #f5f3ef;
  --red: #c0392b;
  --rule: #d8d4ce;
  --mid: #6b6560;
  --green: #27ae60;
  --blue: #2980b9;
  --font-display: 'Roboto Condensed', sans-serif;
  --font-body: 'Roboto', sans-serif;
  --font-mono: 'Roboto Mono', monospace;
  --sidebar: 280px;
}
body { font-family: var(--font-body); background: var(--paper); color: var(--ink); height: 100vh; display: flex; flex-direction: column; overflow: hidden; }

/* ── Header ── */
header { display: flex; align-items: center; gap: 1rem; padding: 0 1.25rem; height: 52px; background: var(--ink); color: #fff; flex-shrink: 0; }
header h1 { font-family: var(--font-display); font-size: 1rem; letter-spacing: 0.08em; text-transform: uppercase; flex: 1; }
header .badge { font-size: 0.65rem; background: var(--red); color: #fff; padding: 2px 7px; letter-spacing: 0.06em; text-transform: uppercase; font-family: var(--font-display); }
.btn { font-family: var(--font-display); font-size: 0.75rem; letter-spacing: 0.06em; text-transform: uppercase; padding: 6px 14px; border: none; cursor: pointer; font-weight: 600; transition: opacity 0.15s; }
.btn:hover { opacity: 0.85; }
.btn-red { background: var(--red); color: #fff; }
.btn-outline { background: transparent; color: #fff; border: 1.5px solid rgba(255,255,255,0.4); }
.btn-green { background: var(--green); color: #fff; }
.btn-dark { background: #333; color: #fff; }
.btn:disabled { opacity: 0.4; cursor: not-allowed; }

/* ── Layout ── */
.workspace { display: flex; flex: 1; overflow: hidden; }

/* ── Sidebar ── */
aside { width: var(--sidebar); border-right: 1px solid var(--rule); display: flex; flex-direction: column; overflow: hidden; flex-shrink: 0; }
.sidebar-head { padding: 0.75rem 1rem; border-bottom: 1px solid var(--rule); display: flex; align-items: center; gap: 0.5rem; }
.sidebar-head span { font-family: var(--font-display); font-size: 0.7rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--mid); flex: 1; }
.post-list { flex: 1; overflow-y: auto; }
.post-item { padding: 0.65rem 1rem; border-bottom: 1px solid var(--rule); cursor: pointer; display: block; text-decoration: none; color: inherit; transition: background 0.1s; }
.post-item:hover { background: rgba(0,0,0,0.04); }
.post-item.active { background: var(--ink); color: #fff; }
.post-item .pi-cat { font-size: 0.6rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--red); font-family: var(--font-display); margin-bottom: 2px; }
.post-item.active .pi-cat { color: #f98c80; }
.post-item .pi-title { font-size: 0.8rem; font-weight: 500; line-height: 1.3; }
.post-item .pi-date { font-size: 0.65rem; color: var(--mid); margin-top: 2px; font-family: var(--font-mono); }
.post-item.active .pi-date { color: rgba(255,255,255,0.55); }
.post-item .pi-draft { font-size: 0.58rem; background: #e67e22; color: #fff; padding: 1px 5px; margin-left: 4px; font-family: var(--font-display); letter-spacing: 0.05em; }

/* ── Editor ── */
main { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
.editor-toolbar { padding: 0.6rem 1rem; border-bottom: 1px solid var(--rule); display: flex; align-items: center; gap: 0.75rem; flex-shrink: 0; }
.editor-toolbar .current-file { font-family: var(--font-mono); font-size: 0.72rem; color: var(--mid); flex: 1; }
.editor-body { flex: 1; display: flex; overflow: hidden; }

/* Metadata panel */
.meta-panel { width: 320px; border-right: 1px solid var(--rule); overflow-y: auto; padding: 1rem; display: flex; flex-direction: column; gap: 0.75rem; flex-shrink: 0; }
.field { display: flex; flex-direction: column; gap: 4px; }
.field label { font-size: 0.65rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--mid); font-family: var(--font-display); font-weight: 600; }
.field input, .field textarea, .field select {
  font-family: var(--font-body); font-size: 0.82rem; padding: 6px 8px;
  border: 1px solid var(--rule); background: #fff; color: var(--ink);
  outline: none; transition: border-color 0.15s; width: 100%;
}
.field input:focus, .field textarea:focus { border-color: var(--ink); }
.field .hint { font-size: 0.62rem; color: var(--mid); }
.char-count { font-size: 0.62rem; text-align: right; font-family: var(--font-mono); }
.char-count.warn { color: #e67e22; }
.char-count.over { color: var(--red); }
.field-row { display: flex; gap: 0.5rem; }
.field-row .field { flex: 1; }
.toggle-row { display: flex; align-items: center; gap: 0.5rem; }
.toggle-row label { font-size: 0.75rem; }
input[type=checkbox] { width: 16px; height: 16px; cursor: pointer; }
.section-title { font-family: var(--font-display); font-size: 0.65rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--mid); padding: 0.25rem 0; border-bottom: 1px solid var(--rule); margin-top: 0.25rem; }

/* Markdown editor */
.md-panel { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
.md-tabs { display: flex; border-bottom: 1px solid var(--rule); flex-shrink: 0; }
.md-tab { padding: 7px 16px; font-size: 0.72rem; letter-spacing: 0.06em; text-transform: uppercase; font-family: var(--font-display); cursor: pointer; border-bottom: 2px solid transparent; color: var(--mid); }
.md-tab.active { color: var(--ink); border-bottom-color: var(--ink); font-weight: 600; }
#md-editor { flex: 1; font-family: var(--font-mono); font-size: 0.82rem; line-height: 1.65; padding: 1rem; border: none; resize: none; outline: none; background: #fff; color: var(--ink); overflow-y: auto; }
#md-preview { flex: 1; padding: 1.5rem; overflow-y: auto; background: #fff; display: none; line-height: 1.75; font-size: 0.88rem; }
#md-preview h1,#md-preview h2,#md-preview h3 { font-family: var(--font-display); margin: 1rem 0 0.5rem; }
#md-preview p { margin-bottom: 0.75rem; }
#md-preview a { color: var(--red); }
#md-preview code { font-family: var(--font-mono); background: #f0ece8; padding: 1px 4px; font-size: 0.82em; }
#md-preview pre { background: #f0ece8; padding: 0.75rem; overflow-x: auto; margin-bottom: 0.75rem; }
#md-preview blockquote { border-left: 3px solid var(--rule); padding-left: 1rem; color: var(--mid); }
#md-preview ul, #md-preview ol { padding-left: 1.5rem; margin-bottom: 0.75rem; }

/* ── Deploy log ── */
.deploy-bar { border-top: 1px solid var(--rule); background: #1a1a1a; color: #ccc; font-family: var(--font-mono); font-size: 0.72rem; flex-shrink: 0; transition: height 0.25s; height: 0; overflow: hidden; }
.deploy-bar.open { height: 160px; }
.deploy-bar-head { display: flex; align-items: center; gap: 0.75rem; padding: 4px 1rem; background: #111; }
.deploy-bar-head span { flex: 1; letter-spacing: 0.06em; font-family: var(--font-display); font-size: 0.68rem; text-transform: uppercase; }
.deploy-log { height: 120px; overflow-y: auto; padding: 0.5rem 1rem; white-space: pre-wrap; word-break: break-word; }
.log-done { color: #2ecc71; }
.log-error { color: #e74c3c; }

/* ── Toast ── */
#toast { position: fixed; bottom: 1.5rem; right: 1.5rem; background: var(--ink); color: #fff; padding: 10px 18px; font-size: 0.8rem; font-family: var(--font-display); letter-spacing: 0.05em; opacity: 0; transition: opacity 0.3s; pointer-events: none; z-index: 100; }
#toast.show { opacity: 1; }
</style>
</head>
<body>

<header>
  <h1>The Data Governor <span class="badge">Admin</span></h1>
  <button class="btn btn-outline" onclick="newPost()">+ New Post</button>
  <button class="btn btn-red" onclick="savePost()">Save</button>
  <button class="btn btn-green" id="deploy-btn" onclick="deployNow()">Build &amp; Deploy</button>
</header>

<div class="workspace">
  <aside>
    <div class="sidebar-head">
      <span id="post-count">Posts</span>
      <input id="search" placeholder="Filter..." style="font-size:0.72rem;padding:3px 6px;border:1px solid var(--rule);flex:1;max-width:120px;outline:none;">
    </div>
    <div class="post-list" id="post-list"></div>
  </aside>

  <main>
    <div class="editor-toolbar">
      <span class="current-file" id="current-file">No post selected</span>
      <button class="btn btn-dark" style="font-size:0.68rem" onclick="deletePost()">Delete</button>
      <button class="btn btn-outline" style="color:var(--ink);border-color:var(--rule);font-size:0.68rem" onclick="openLive()">View Live ↗</button>
    </div>

    <div class="editor-body">
      <!-- Metadata -->
      <div class="meta-panel" id="meta-panel">
        <div class="section-title">Identity</div>

        <div class="field">
          <label>Slug (URL)</label>
          <input id="f-slug" placeholder="my-post-slug" oninput="onSlugChange()">
        </div>
        <div class="field">
          <label>Title</label>
          <input id="f-title" placeholder="Post title">
        </div>
        <div class="field">
          <label>Description <span id="desc-count" class="char-count"></span></label>
          <textarea id="f-description" rows="3" placeholder="140–160 char meta description" oninput="countDesc()"></textarea>
        </div>

        <div class="section-title">Publishing</div>

        <div class="field-row">
          <div class="field">
            <label>Pub Date</label>
            <input type="date" id="f-pubDate">
          </div>
          <div class="field">
            <label>Updated</label>
            <input type="date" id="f-updatedDate">
          </div>
        </div>

        <div class="toggle-row">
          <input type="checkbox" id="f-draft">
          <label for="f-draft">Draft (won't appear on live site)</label>
        </div>

        <div class="section-title">Taxonomy</div>

        <div class="field">
          <label>Category</label>
          <select id="f-category">
            <option value="Data Governance">Data Governance</option>
            <option value="Data Management">Data Management</option>
            <option value="Compliance">Compliance</option>
            <option value="Data Science">Data Science</option>
            <option value="Data Literacy">Data Literacy</option>
            <option value="Career in Data">Career in Data</option>
            <option value="Data Governance Tools">Data Governance Tools</option>
            <option value="Data Quality">Data Quality</option>
          </select>
        </div>
        <div class="field">
          <label>Tags (comma-separated)</label>
          <input id="f-tags" placeholder="data governance, metadata, ...">
        </div>

        <div class="section-title">Images</div>

        <div class="field">
          <label>Hero image path</label>
          <input id="f-image" placeholder="/2026/04/filename.webp">
          <span class="hint">Put files in public/2026/04/ before building</span>
        </div>
        <div class="field">
          <label>Image alt text</label>
          <input id="f-imageAlt" placeholder="Descriptive alt text">
        </div>
      </div>

      <!-- Markdown editor -->
      <div class="md-panel">
        <div class="md-tabs">
          <div class="md-tab active" id="tab-write" onclick="switchTab('write')">Write</div>
          <div class="md-tab" id="tab-preview" onclick="switchTab('preview')">Preview</div>
        </div>
        <textarea id="md-editor" placeholder="Write your post in Markdown..." oninput="onEditorInput()"></textarea>
        <div id="md-preview"></div>
      </div>
    </div>

    <!-- Deploy log -->
    <div class="deploy-bar" id="deploy-bar">
      <div class="deploy-bar-head">
        <span id="deploy-status">Build &amp; Deploy Log</span>
        <button class="btn btn-outline" style="font-size:0.65rem;color:#ccc;border-color:#555;padding:3px 10px" onclick="closeDeploy()">Close</button>
      </div>
      <div class="deploy-log" id="deploy-log"></div>
    </div>
  </main>
</div>

<div id="toast"></div>

<script>
let allPosts = [];
let currentSlug = null;
let isDirty = false;
let deployStream = null;

// ── Init ──────────────────────────────────────────────────────────────────

async function init() {
  await loadPostList();
  document.getElementById('search').addEventListener('input', filterPosts);
  // Today's date as default pubDate
  document.getElementById('f-pubDate').value = new Date().toISOString().slice(0, 10);
}

async function loadPostList() {
  const res = await fetch('/api/posts');
  allPosts = await res.json();
  document.getElementById('post-count').textContent = allPosts.length + ' posts';
  renderList(allPosts);
}

function renderList(posts) {
  const el = document.getElementById('post-list');
  el.innerHTML = posts.map(p => \`
    <div class="post-item \${p.slug === currentSlug ? 'active' : ''}" onclick="loadPost('\${p.slug}')">
      <div class="pi-cat">\${(p.categories[0] || '').toUpperCase()}</div>
      <div class="pi-title">\${p.title}\${p.draft ? '<span class="pi-draft">DRAFT</span>' : ''}</div>
      <div class="pi-date">\${p.pubDate ? p.pubDate.slice(0, 10) : 'no date'}</div>
    </div>
  \`).join('');
}

function filterPosts() {
  const q = document.getElementById('search').value.toLowerCase();
  renderList(allPosts.filter(p => p.title.toLowerCase().includes(q) || p.slug.includes(q)));
}

// ── Load / New ────────────────────────────────────────────────────────────

async function loadPost(slug) {
  if (isDirty && !confirm('You have unsaved changes. Discard?')) return;
  const res = await fetch('/api/posts/' + encodeURIComponent(slug));
  const { fm, body } = await res.json();
  currentSlug = slug;
  document.getElementById('f-slug').value = slug;
  document.getElementById('f-title').value = fm.title || '';
  document.getElementById('f-description').value = fm.description || '';
  document.getElementById('f-pubDate').value = fm.pubDate ? String(fm.pubDate).slice(0, 10) : '';
  document.getElementById('f-updatedDate').value = fm.updatedDate ? String(fm.updatedDate).slice(0, 10) : '';
  document.getElementById('f-draft').checked = !!fm.draft;
  document.getElementById('f-category').value = (fm.categories || [])[0] || 'Data Governance';
  document.getElementById('f-tags').value = Array.isArray(fm.tags) ? fm.tags.join(', ') : (fm.tags || '');
  document.getElementById('f-image').value = fm.image || '';
  document.getElementById('f-imageAlt').value = fm.imageAlt || '';
  document.getElementById('md-editor').value = body.trimStart();
  document.getElementById('current-file').textContent = slug + '.md';
  isDirty = false;
  countDesc();
  switchTab('write');
  renderList(allPosts);
}

function newPost() {
  if (isDirty && !confirm('Discard unsaved changes?')) return;
  currentSlug = null;
  document.getElementById('f-slug').value = '';
  document.getElementById('f-title').value = '';
  document.getElementById('f-description').value = '';
  document.getElementById('f-pubDate').value = new Date().toISOString().slice(0, 10);
  document.getElementById('f-updatedDate').value = '';
  document.getElementById('f-draft').checked = true;
  document.getElementById('f-category').value = 'Data Governance';
  document.getElementById('f-tags').value = '';
  document.getElementById('f-image').value = '';
  document.getElementById('f-imageAlt').value = '';
  document.getElementById('md-editor').value = '';
  document.getElementById('current-file').textContent = 'New post';
  countDesc();
  isDirty = false;
  switchTab('write');
  document.getElementById('f-slug').focus();
}

// ── Save ──────────────────────────────────────────────────────────────────

async function savePost() {
  const slug = document.getElementById('f-slug').value.trim()
    .toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  if (!slug) { toast('Slug is required'); return; }
  const data = {
    slug,
    title: document.getElementById('f-title').value,
    description: document.getElementById('f-description').value,
    pubDate: document.getElementById('f-pubDate').value,
    updatedDate: document.getElementById('f-updatedDate').value,
    categories: [document.getElementById('f-category').value],
    tags: document.getElementById('f-tags').value,
    image: document.getElementById('f-image').value,
    imageAlt: document.getElementById('f-imageAlt').value,
    draft: document.getElementById('f-draft').checked,
    body: document.getElementById('md-editor').value,
  };
  const res = await fetch('/api/posts', { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } });
  const json = await res.json();
  if (json.ok) {
    currentSlug = slug;
    isDirty = false;
    toast('Saved: ' + slug + '.md');
    await loadPostList();
    renderList(allPosts);
    document.getElementById('current-file').textContent = slug + '.md';
  } else {
    toast('Error: ' + (json.error || 'unknown'));
  }
}

async function deletePost() {
  if (!currentSlug) return;
  if (!confirm('Delete ' + currentSlug + '.md? This cannot be undone.')) return;
  // Just mark as draft for safety — no permanent delete from UI
  document.getElementById('f-draft').checked = true;
  await savePost();
  toast('Marked as draft (file preserved)');
}

// ── Slug auto-generate ────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('f-title').addEventListener('input', function() {
    if (!currentSlug) {
      document.getElementById('f-slug').value = this.value
        .toLowerCase().trim()
        .replace(/[^a-z0-9\\s-]/g, '')
        .replace(/\\s+/g, '-')
        .replace(/-+/g, '-');
    }
    isDirty = true;
  });
});

function onSlugChange() { isDirty = true; }
function onEditorInput() { isDirty = true; }

// ── Description counter ───────────────────────────────────────────────────

function countDesc() {
  const n = document.getElementById('f-description').value.length;
  const el = document.getElementById('desc-count');
  el.textContent = n + ' chars';
  el.className = 'char-count' + (n > 160 ? ' over' : n > 140 ? '' : n > 100 ? ' warn' : ' warn');
}

// ── Tab switch ────────────────────────────────────────────────────────────

function switchTab(tab) {
  document.getElementById('tab-write').className = 'md-tab' + (tab === 'write' ? ' active' : '');
  document.getElementById('tab-preview').className = 'md-tab' + (tab === 'preview' ? ' active' : '');
  document.getElementById('md-editor').style.display = tab === 'write' ? 'block' : 'none';
  const preview = document.getElementById('md-preview');
  preview.style.display = tab === 'preview' ? 'block' : 'none';
  if (tab === 'preview') preview.innerHTML = renderMarkdown(document.getElementById('md-editor').value);
}

// Minimal Markdown renderer
function renderMarkdown(md) {
  return md
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/^#{6}\\s(.+)/gm, '<h6>$1</h6>')
    .replace(/^#{5}\\s(.+)/gm, '<h5>$1</h5>')
    .replace(/^#{4}\\s(.+)/gm, '<h4>$1</h4>')
    .replace(/^#{3}\\s(.+)/gm, '<h3>$1</h3>')
    .replace(/^#{2}\\s(.+)/gm, '<h2>$1</h2>')
    .replace(/^#{1}\\s(.+)/gm, '<h1>$1</h1>')
    .replace(/\\*\\*(.+?)\\*\\*/g, '<strong>$1</strong>')
    .replace(/\\*(.+?)\\*/g, '<em>$1</em>')
    .replace(/\\[([^\\]]+)\\]\\(([^)]+)\\)/g, '<a href="$2">$1</a>')
    .replace(/^&gt;\\s(.+)/gm, '<blockquote>$1</blockquote>')
    .replace(/^---$/gm, '<hr>')
    .replace(/\\n\\n/g, '</p><p>')
    .replace(/^/, '<p>').replace(/$/, '</p>');
}

// ── Deploy ────────────────────────────────────────────────────────────────

function deployNow() {
  const bar = document.getElementById('deploy-bar');
  const log = document.getElementById('deploy-log');
  const status = document.getElementById('deploy-status');
  const btn = document.getElementById('deploy-btn');

  bar.classList.add('open');
  log.innerHTML = '';
  btn.disabled = true;
  status.textContent = 'Deploying...';

  if (deployStream) deployStream.close();
  deployStream = new EventSource('/api/deploy/stream');
  deployStream.onmessage = e => {
    const msg = JSON.parse(e.data);
    if (msg.type === 'connected') return;
    const line = document.createElement('div');
    line.textContent = msg.msg;
    if (msg.type === 'done') line.className = 'log-done';
    if (msg.type === 'error') line.className = 'log-error';
    log.appendChild(line);
    log.scrollTop = log.scrollHeight;
    if (msg.type === 'done') { status.textContent = '🚀 Deployed!'; btn.disabled = false; }
    if (msg.type === 'error') { status.textContent = '✗ Failed'; btn.disabled = false; }
  };

  fetch('/api/deploy', { method: 'POST' });
}

function closeDeploy() {
  document.getElementById('deploy-bar').classList.remove('open');
}

function openLive() {
  if (currentSlug) window.open('https://thedatagovernor.com/' + currentSlug + '/', '_blank');
}

// ── Toast ─────────────────────────────────────────────────────────────────

let toastTimer;
function toast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2800);
}

init();
</script>
</body>
</html>`;

// ─── Start server ─────────────────────────────────────────────────────────────

http.createServer(router).listen(PORT, () => {
  console.log(`\n  The Data Governor Admin`);
  console.log(`  ─────────────────────────────`);
  console.log(`  Local:  http://localhost:${PORT}`);
  console.log(`  Press Ctrl+C to stop\n`);
});
