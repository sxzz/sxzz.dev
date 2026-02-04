import { siteCopy, siteMeta } from '../data/site'
import { defaultLang } from './ui'
import { getUrlPrefix, type Lang } from './utils'

interface HomeCopy {
  title: string
  description: string
  name: string
  avatar: string
  tagline: string
  taglineCharDelay?: number
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
  paragraphs: string[]
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

interface IssueAwardsCopy {
  title: string
  description: string
  heading: string
  intro: string
  timelineTitle: string
  footer: string
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
  issueAwards: Record<Lang, IssueAwardsCopy>
  post: Record<Lang, PostCopy>
  musings: Record<Lang, MusingsCopy>
}

const authorName = siteCopy.author.displayName
const authorTagline = siteCopy.author.tagline
const authorTitleRole = siteCopy.author.titleRole

export const pageCopy: PageCopy = {
  home: {
    en: {
      title: `${authorName.en} - ${authorTitleRole.en}`,
      description: `${authorName.en} is an open-source enthusiast exploring front-end development. Creator of tsdown, Vue Macros, and Elk. Core team member of Vue, Vite, and more.`,
      name: authorName.en,
      avatar: '/avatar.jpg',
      tagline: authorTagline.en,
      nameSerif: true,
      schema: {
        name: authorName.en,
        url: `${siteMeta.url}${getUrlPrefix('en')}`,
      },
    },
    zh: {
      title: `${authorName.zh} - ${authorTitleRole.zh}`,
      description: `${authorName.zh}是一名探索前端开发的开源爱好者。tsdown、Vue Macros 与 Elk 的作者，Vue、Vite 等项目核心成员。`,
      name: authorName.zh,
      avatar: '/avatar-zh.jpg',
      tagline: authorTagline.zh,
      taglineCharDelay: 160,
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
      description: `About ${authorName.en}, an open-source enthusiast exploring front-end development.`,
      heading: 'About',
      paragraphs: [
        `Hi, I'm ${authorName.en}. An open-source enthusiast exploring front-end development.`,
        'Creator of tsdown, Vue Macros, and Elk. Core team member of Vue, Vite, VueUse, unjs, unplugin, and Oxc.',
      ],
    },
    zh: {
      title: `关于 - ${authorName.zh}`,
      description: `关于${authorName.zh}，一名探索前端开发的开源爱好者。`,
      heading: '关于',
      paragraphs: [
        `你好，我是${authorName.zh}，一名探索前端开发的开源爱好者。`,
        'tsdown、Vue Macros 和 Elk 的作者，Vue、Vite、VueUse、unjs、unplugin、Oxc 的核心团队成员。',
      ],
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
  issueAwards: {
    en: {
      title: `Issue Awards - ${authorName.en}`,
      description: `A curated wall of the #迷惑issue大赏 tweets shared by ${authorName.en}.`,
      heading: 'Issue Awards',
      intro:
        'Collected highlights from the #迷惑issue大赏 hashtag. These are snapshots of the funniest and most confusing issues encountered in open source.',
      timelineTitle: 'Hashtag timeline',
      footer: 'Follow the hashtag for more: #迷惑issue大赏',
    },
    zh: {
      title: `迷惑 issue 大赏 - ${authorName.zh}`,
      description: `来自 #迷惑issue大赏 的迷惑 issue 记录墙。`,
      heading: '迷惑 issue 大赏',
      intro:
        '这里整理了 #迷惑issue大赏 下的推文，记录那些令人哭笑不得的 issue 现场。',
      timelineTitle: '话题时间线',
      footer: '更多内容见话题：#迷惑issue大赏',
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
  return (pageCopy[key][lang] ??
    pageCopy[key][defaultLang]) as (typeof pageCopy)[K][typeof defaultLang]
}
