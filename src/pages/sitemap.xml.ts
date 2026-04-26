import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

const SITE = 'https://thedatagovernor.com';

function entry(url: string, lastmod?: Date, priority = '0.7') {
  const loc = `${SITE}${url}`;
  const mod = lastmod ? `\n    <lastmod>${lastmod.toISOString().slice(0, 10)}</lastmod>` : '';
  return `  <url>\n    <loc>${loc}</loc>${mod}\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}

function catSlug(name: string) {
  return name.toLowerCase().replace(/\s+/g, '-');
}

export async function GET(_ctx: APIContext) {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const sorted = posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  // Static pages
  const staticUrls = [
    entry('/', undefined, '1.0'),
    entry('/blog/', undefined, '0.8'),
    entry('/about/', undefined, '0.5'),
    entry('/contact/', undefined, '0.5'),
    entry('/data-governance-videos/', undefined, '0.6'),
    entry('/templates/', undefined, '0.7'),
    entry('/templates/data-governance-raci-matrix/', undefined, '0.7'),
    entry('/privacy-policy/', undefined, '0.3'),
    entry('/affiliate-disclosure/', undefined, '0.3'),
  ];

  // Blog posts
  const postUrls = sorted.map(post => {
    const slug = post.data.wpSlug ?? post.slug;
    return entry(`/${slug}/`, post.data.updatedDate ?? post.data.pubDate);
  });

  // Category pages — unique categories sorted by name
  const catCounts = new Map<string, Date>();
  for (const post of sorted) {
    for (const cat of post.data.categories ?? []) {
      if (!catCounts.has(cat)) catCounts.set(cat, post.data.pubDate);
    }
  }
  const categoryUrls = [...catCounts.entries()].map(([name, latestDate]) =>
    entry(`/category/${catSlug(name)}/`, latestDate, '0.6')
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticUrls, ...postUrls, ...categoryUrls].join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
