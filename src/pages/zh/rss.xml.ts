import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { getRssOptions } from '../../i18n/pages'
import type { APIContext } from 'astro'

export async function GET(context: APIContext) {
  const posts = (await getCollection('posts'))
    .filter((post) => post.id.startsWith('zh/'))
    .map((post) => {
      const slug = post.id.split('/').slice(1).join('/')
      return {
        title: post.data.title,
        pubDate: post.data.date,
        description: post.data.description,
        link: `/zh/posts/${slug}/`,
      }
    })

  const musings = (await getCollection('musings')).map((musing) => ({
    title: musing.data.title,
    pubDate: musing.data.date,
    description: musing.data.description,
    link: `/zh/musings/${musing.id}/`,
  }))

  const items = [...posts, ...musings].toSorted(
    (a, b) => b.pubDate.getTime() - a.pubDate.getTime(),
  )

  return rss({
    ...getRssOptions('zh', context.site!),
    items,
  })
}
