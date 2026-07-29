export const categories = [
  { slug: 'nod', label: '节点', shortLabel: '节点 / nod', description: '构成数字世界的底层基础设施与计算力' },
  { slug: 'ter', label: '终端', shortLabel: '终端 / ter', description: '人与数字世界交互的物理边界' },
  { slug: 'wrk', label: '工作台', shortLabel: '工作台 / wrk', description: '个人数字环境的构建与秩序' },
  { slug: 'ker', label: '内核', shortLabel: '内核 / ker', description: '驱动一切运转的底层思维逻辑和个人沉淀' },
  { slug: 'ovf', label: '溢出', shortLabel: '溢出 / ovf', description: '不受既定分类约束的观察、实验与表达' },
] as const;

export type CategorySlug = typeof categories[number]['slug'];

export const categoryMap = Object.fromEntries(
  categories.map((category) => [category.slug, category])
) as Record<CategorySlug, typeof categories[number]>;

export function estimateReadingTime(body: string) {
  const hanCharacters = (body.match(/[\u3400-\u9fff]/g) || []).length;
  const latinWords = (body.replace(/[\u3400-\u9fff]/g, ' ').match(/\b[\w'-]+\b/g) || []).length;
  return Math.max(1, Math.ceil(hanCharacters / 350 + latinWords / 220));
}
