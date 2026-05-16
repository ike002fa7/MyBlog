import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const posts = await getCollection('blog');

  // 静态页面
  const staticPages = [
    { loc: '/', priority: '1.0', changefreq: 'weekly' },
    { loc: '/blog/', priority: '0.9', changefreq: 'weekly' },
    { loc: '/about/', priority: '0.5', changefreq: 'monthly' },
  ];

  const baseUrl = 'https://www.x-atcn.top';

  const urlEntries = [
    ...staticPages.map(
      (p) => `  <url>
    <loc>${baseUrl}${p.loc}</loc>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
    ),
    ...posts.map(
      (post) => `  <url>
    <loc>${baseUrl}/blog/${post.slug}/</loc>
    <lastmod>${post.data.date.toISOString().split('T')[0]}</lastmod>
    <priority>0.8</priority>
  </url>`
    ),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries.join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
