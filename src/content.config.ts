import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';
import { PostSize, PostType } from './consts';

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    heroVideo: z.string().optional(),
    heroAudio: z.string().optional(),
    tags: z.array(z.string()).default([]),
    type: z.enum(['text', 'video', 'audio', 'infographic']).default('text'),
    size: z.enum(['small', 'medium', 'large']).default('medium'),
    featured: z.boolean().default(false),
  }),
});

const tags = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    description: z.string().optional(),
    image: z.string().optional(),
  }),
});

export const collections = { blog, tags };
