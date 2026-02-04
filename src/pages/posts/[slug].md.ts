import { getCollection } from 'astro:content'
import type { APIRoute } from 'astro'
import { defaultLang } from '../../i18n/ui'
import { getPostSlug } from '../../utils/content'

export const prerender = true

export async function getStaticPaths() {
  const posts = await getCollection('posts')
  return posts
    .filter((post) => post.id.startsWith(`${defaultLang}/`))
    .map((post) => ({
      params: { slug: getPostSlug(post.id) },
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
