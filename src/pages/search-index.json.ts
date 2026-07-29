import { getCollection } from 'astro:content';

const catLabel: Record<string, string> = {
  'nod': '节点',
  'ter': '终端',
  'wrk': '工作台',
  'ker': '内核',
  'ovf': '溢出',
};

export async function GET() {
  const posts = await getCollection('blog');
  const index = posts.map((p) => ({
    title: p.data.title,
    slug: p.id,
    excerpt: p.data.excerpt || '',
    body: p.body || '',
    category: p.data.category || 'ovf',
    categoryName: catLabel[p.data.category || 'ovf'],
    tags: p.data.tags || [],
    date: p.data.date.toISOString(),
  }));
  return new Response(JSON.stringify(index), {
    headers: { 'Content-Type': 'application/json' },
  });
}
