import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.date(),
    excerpt: z.string().optional(),
    category: z.enum(['技术', '工具', 'VPS', 'AI', '3C数码']).optional().default('技术'),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = { blog };
