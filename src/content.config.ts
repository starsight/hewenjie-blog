import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    description: z.string().optional(),
    permalink: z.string(),
    categories: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([])
  })
});

export const collections = { blog };
