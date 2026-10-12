import { glob } from 'astro/loaders'
import { z } from 'astro/zod'
import { defineCollection } from 'astro:content'

const schema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  description: z.string(),
  image: z.string().optional(),
  updatedAt: z.coerce.date().optional(),
  tags: z.array(z.string()).optional(),
})

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema,
})

const musings = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/musings' }),
  schema,
})

// Long-form copy for standalone pages, keyed as `<page>/<lang>`.
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
})

export const collections = { posts, musings, pages }
