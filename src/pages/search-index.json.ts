import { getCollection } from 'astro:content';

export async function GET() {
  const posts = await getCollection('blog');
  const index = posts.map((p) => ({
    title: p.data.title,
    slug: p.slug,
    excerpt: p.data.excerpt || '',
    category: p.data.category || '技术',
    tags: p.data.tags || [],
    date: p.data.date.toISOString(),
  }));
  return new Response(JSON.stringify(index), {
    headers: { 'Content-Type': 'application/json' },
  });
}
