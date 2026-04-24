import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const sorted = posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: 'The Data Governor',
    description: 'Practical data governance, data management, and data strategy insights.',
    site: context.site!,
    items: sorted.map(post => {
      const slug = post.data.wpSlug ?? post.slug;
      return {
        title: post.data.title,
        pubDate: post.data.pubDate,
        description: post.data.description,
        link: `/${slug}/`,
      };
    }),
  });
}
