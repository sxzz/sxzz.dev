import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'

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

export const collections = { posts, musings }
