export const languages = {
  en: 'English',
  zh: '中文',
} as const

export const defaultLang = 'en'
export const showDefaultLang = false

export const ui = {
  en: {
    'nav.posts': 'Posts',
    'nav.musings': 'Musings',
    'nav.links': 'Links',
    'nav.about': 'About',
    'lang.en': 'EN',
    'lang.zh': '中文',
    'lang.switch': 'Switch language',
    'toggle.theme': 'Toggle dark mode',
    'toc.title': 'On this page',
    'notFound.title': 'Page Not Found',
    'notFound.description': 'The page you are looking for does not exist.',
    'notFound.backHome': 'Back to Home',
  },
  zh: {
    'nav.posts': '文章',
    'nav.musings': '碎碎念',
    'nav.links': '友链',
    'nav.about': '关于',
    'lang.en': 'EN',
    'lang.zh': '中文',
    'lang.switch': '切换语言',
    'toggle.theme': '切换深色模式',
    'toc.title': '目录',
    'notFound.title': '页面未找到',
    'notFound.description': '您访问的页面不存在。',
    'notFound.backHome': '返回首页',
  },
} as const

export const localeByLang = {
  en: 'en-US',
  zh: 'zh-CN',
} as const

export const nav: ReadonlyArray<{
  key: keyof typeof ui[keyof typeof ui]
  href: string
  langs?: readonly string[]
}> = [
  { key: 'nav.posts', href: '/posts/' },
  { key: 'nav.musings', href: '/musings/', langs: ['zh'] },
  { key: 'nav.links', href: '/links/' },
  { key: 'nav.about', href: '/about/' },
]

/* @unocss-include */
export const social: ReadonlyArray<{
  icon: string
  href: string
  label: string
  localeHref?: Partial<Record<string, string>>
}> = [
  {
    icon: 'i-simple-icons-github',
    href: 'https://github.com/sxzz',
    label: 'GitHub',
  },
  {
    icon: 'i-simple-icons-bluesky',
    href: 'https://bsky.app/profile/sxzz.dev',
    label: 'Bluesky',
  },
  {
    icon: 'i-simple-icons-x',
    href: 'https://x.com/sanxiaozhizi',
    label: 'X',
    localeHref: { zh: 'https://x.com/zhizijun' },
  },
]
