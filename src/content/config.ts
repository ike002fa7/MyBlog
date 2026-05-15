import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.date(),
    excerpt: z.string().optional(),
    category: z.enum(['nod', 'ter', 'wrk', 'ker', 'ovf']).optional().default('ovf'),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = { blog };
