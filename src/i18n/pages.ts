import { siteCopy, siteMeta } from '../data/site'
import { defaultLang } from './ui'
import { getUrlPrefix, type Lang } from './utils'
import type { RSSOptions } from '@astrojs/rss'

interface HomeCopy {
  title: string
  description: string
  name: string
  avatar: {
    avif: string
    fallback: string
  }
  tagline: string
  nameSerif: boolean
  schema: {
    name: string
    url: string
  }
}

interface AboutCopy {
  title: string
  description: string
  heading: string
}

interface LinksCopy {
  title: string
  description: string
  heading: string
  subheading: string
}

interface PostsCopy {
  title: string
  description: string
  heading: string
}

interface PostCopy {
  backLabel: string
  titleSuffix: string
}

interface MusingsCopy {
  title: string
  description: string
  heading: string
  backLabel: string
  titleSuffix: string
}

interface PageCopy {
  home: Record<Lang, HomeCopy>
  about: Record<Lang, AboutCopy>
  links: Record<Lang, LinksCopy>
  posts: Record<Lang, PostsCopy>
  post: Record<Lang, PostCopy>
  musings: Record<Lang, MusingsCopy>
}

const authorName = siteCopy.author.displayName
const authorTagline = siteCopy.author.tagline

export const pageCopy: PageCopy = {
  home: {
    en: {
      title: `${authorName.en} - ${authorTagline.en}`,
      description:
        `${authorName.en}. ${authorTagline.en} Creator of tsdown, Vue Macros, and Elk. Core team member of Vue, Vite, and more.`,
      name: authorName.en,
      avatar: {
        avif: '/avatar.avif',
        fallback: '/avatar.jpg',
      },
      tagline: authorTagline.en,
      nameSerif: true,
      schema: {
        name: authorName.en,
        url: `${siteMeta.url}${getUrlPrefix('en')}`,
      },
    },
    zh: {
      title: `${authorName.zh} - ${authorTagline.zh}`,
      description:
        `${authorName.zh}，${authorTagline.zh}tsdown、Vue Macros 与 Elk 的作者，Vue、Vite 等项目核心成员。`,
      name: authorName.zh,
      avatar: {
        avif: '/avatar-zh.avif',
        fallback: '/avatar-zh.jpg',
      },
      tagline: authorTagline.zh,
      nameSerif: false,
      schema: {
        name: authorName.zh,
        url: `${siteMeta.url}${getUrlPrefix('zh')}`,
      },
    },
  },
  about: {
    en: {
      title: `About - ${authorName.en}`,
      description: `About ${authorName.en}. ${authorTagline.en}`,
      heading: 'About',
    },
    zh: {
      title: `关于 - ${authorName.zh}`,
      description: `关于${authorName.zh}。${authorTagline.zh}`,
      heading: '关于',
    },
  },
  links: {
    en: {
      title: `Links - ${authorName.en}`,
      description: `Friends and links from ${authorName.en}.`,
      heading: 'Links',
      subheading: 'Friends across the internet.',
    },
    zh: {
      title: `友链 - ${authorName.zh}`,
      description: `${authorName.zh}的朋友与链接。`,
      heading: '友链',
      subheading: '互联网的朋友们。',
    },
  },
  posts: {
    en: {
      title: `Posts - ${authorName.en}`,
      description: `Blog posts by ${authorName.en}.`,
      heading: 'Posts',
    },
    zh: {
      title: `文章 - ${authorName.zh}`,
      description: `${authorName.zh}的博客文章。`,
      heading: '文章',
    },
  },
  post: {
    en: {
      backLabel: 'Back to posts',
      titleSuffix: authorName.en,
    },
    zh: {
      backLabel: '返回文章列表',
      titleSuffix: authorName.zh,
    },
  },
  musings: {
    en: {
      title: `Musings - ${authorName.en}`,
      description: `Short musings by ${authorName.en}.`,
      heading: 'Musings',
      backLabel: 'Back to musings',
      titleSuffix: authorName.en,
    },
    zh: {
      title: `碎碎念 - ${authorName.zh}`,
      description: `${authorName.zh}的碎碎念。`,
      heading: '碎碎念',
      backLabel: '返回碎碎念',
      titleSuffix: authorName.zh,
    },
  },
}

export function getPageCopy<K extends keyof typeof pageCopy>(
  key: K,
  lang: Lang,
): (typeof pageCopy)[K][typeof defaultLang] {
  return (pageCopy[key][lang]
    ?? pageCopy[key][defaultLang]) as (typeof pageCopy)[K][typeof defaultLang]
}

export function getRssOptions(
  lang: Lang,
  site: URL,
): Pick<RSSOptions, 'title' | 'description' | 'site' | 'xmlns' | 'customData'> {
  const rssCopy = siteCopy.rss[lang]
  const prefix = getUrlPrefix(lang)
  const { avatar } = getPageCopy('home', lang)
  return {
    title: rssCopy.title,
    description: rssCopy.description,
    site,
    xmlns: { atom: 'http://www.w3.org/2005/Atom' },
    customData: [
      `<language>${lang}</language>`,
      `<atom:link href="${siteMeta.url}${prefix}/rss.xml" rel="self" type="application/rss+xml"/>`,
      `<image>`,
      `  <url>${siteMeta.url}${avatar.fallback}</url>`,
      `  <title>${rssCopy.title}</title>`,
      `  <link>${siteMeta.url}${prefix}</link>`,
      `</image>`,
    ].join('\n'),
  }
}
