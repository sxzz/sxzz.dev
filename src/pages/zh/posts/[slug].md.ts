import { getCollection } from 'astro:content'
import { getPostSlug } from '../../../utils/content'
import type { APIRoute } from 'astro'

export const prerender = true

export async function getStaticPaths() {
  const posts = await getCollection('posts')
  return posts
    .filter((post) => post.id.startsWith('zh/'))
    .map((post) => ({
      params: { slug: getPostSlug(post.id) },
      props: { post },
    }))
}

export const GET: APIRoute = ({ props }) => {
  if (!props?.post) {
    return new Response('Not found', { status: 404 })
  }
  const { post } = props
  return new Response(post.body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
