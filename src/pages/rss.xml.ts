import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async (context) => {
  const posts = (await getCollection('blog', ({ data }) => !data.draft))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: 'X-ATCN',
    description: '在 0 与 1 之间，记录基础设施、终端、工作流与底层思考。',
    site: context.site || 'https://kleinblue.top',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.excerpt || '',
      pubDate: post.data.date,
      link: `/blog/${post.id}`,
      categories: [post.data.category, ...post.data.tags],
    })),
    customData: '<language>zh-CN</language>',
  });
};
