import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    excerpt: z.string().optional(),
    category: z.enum(['nod', 'ter', 'wrk', 'ker', 'ovf']).default('ovf'),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    cover: z.string().optional(),
    series: z.string().optional(),
    references: z.array(z.object({
      title: z.string(),
      url: z.url(),
    })).default([]),
  }),
});

export const collections = { blog };
