import { getCollection } from 'astro:content'
import type { APIRoute } from 'astro'

export const prerender = true

export async function getStaticPaths() {
  const musings = await getCollection('musings')
  return musings.map((post) => ({
    params: { slug: post.id },
    props: { post },
  }))
}

export const GET: APIRoute = async ({ props }) => {
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
