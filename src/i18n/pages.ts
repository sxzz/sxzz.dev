import { defaultLang } from './ui'
import type { Lang } from './utils'

export const pageCopy = {
  home: {
    en: {
      title: 'Kevin Deng - Open Source Enthusiast',
      description:
        'Kevin Deng is an open-source enthusiast exploring front-end development. Creator of tsdown, Vue Macros, and Elk. Core team member of Vue, Vite, and more.',
      name: 'Kevin Deng',
      avatar: '/avatar.jpg',
      tagline: 'Open-source enthusiast',
      taglineCharDelay: undefined,
      nameSerif: true,
      schema: {
        name: 'Kevin Deng',
        url: 'https://sxzz.dev',
        sameAs: [
          'https://github.com/sxzz',
          'https://x.com/sanxiaozhizi',
          'https://x.com/zhizijun',
          'https://bsky.app/profile/sxzz.dev',
        ],
      },
    },
    zh: {
      title: '智子 - 开源爱好者',
      description:
        '智子是一名探索前端开发的开源爱好者。tsdown、Vue Macros 与 Elk 的作者，Vue、Vite 等项目核心成员。',
      name: '智子',
      avatar: '/avatar-zh.jpg',
      tagline: '开源爱好者',
      taglineCharDelay: 160,
      nameSerif: false,
      schema: {
        name: '智子',
        url: 'https://sxzz.dev/zh/',
        sameAs: [
          'https://github.com/sxzz',
          'https://x.com/zhizijun',
          'https://bsky.app/profile/sxzz.dev',
        ],
      },
    },
  },
  about: {
    en: {
      title: 'About - Kevin Deng',
      description:
        'About Kevin Deng, an open-source enthusiast exploring front-end development.',
      heading: 'About',
      paragraphs: [
        "Hi, I'm Kevin Deng. An open-source enthusiast exploring front-end development.",
        'Creator of tsdown, Vue Macros, and Elk. Core team member of Vue, Vite, VueUse, unjs, unplugin, and Oxc.',
      ],
    },
    zh: {
      title: '关于 - 智子',
      description: '关于智子，一名探索前端开发的开源爱好者。',
      heading: '关于',
      paragraphs: [
        '你好，我是智子，一名探索前端开发的开源爱好者。',
        'tsdown、Vue Macros 和 Elk 的作者，Vue、Vite、VueUse、unjs、unplugin、Oxc 的核心团队成员。',
      ],
    },
  },
  links: {
    en: {
      title: 'Links - Kevin Deng',
      description: 'Friends and links from Kevin Deng.',
      heading: 'Links',
      subheading: 'Friends across the internet.',
    },
    zh: {
      title: '友链 - 智子',
      description: '智子的朋友与链接。',
      heading: '友链',
      subheading: '互联网的朋友们。',
    },
  },
  posts: {
    en: {
      title: 'Posts - Kevin Deng',
      description: 'Blog posts by Kevin Deng.',
      heading: 'Posts',
    },
    zh: {
      title: '文章 - 智子',
      description: '智子的博客文章。',
      heading: '文章',
    },
  },
  post: {
    en: {
      backLabel: 'Back to posts',
      titleSuffix: 'Kevin Deng',
    },
    zh: {
      backLabel: '返回文章列表',
      titleSuffix: '智子',
    },
  },
  musings: {
    en: {
      title: 'Musings - Kevin Deng',
      description: 'Short musings by Kevin Deng.',
      heading: 'Musings',
      backLabel: 'Back to musings',
      titleSuffix: 'Kevin Deng',
    },
    zh: {
      title: '碎碎念 - 智子',
      description: '智子的碎碎念。',
      heading: '碎碎念',
      backLabel: '返回碎碎念',
      titleSuffix: '智子',
    },
  },
} as const

export function getPageCopy<K extends keyof typeof pageCopy>(key: K, lang: Lang) {
  return pageCopy[key][lang] ?? pageCopy[key][defaultLang]
}
