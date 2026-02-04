export const nav: ReadonlyArray<{
  key: string
  href: string
  langs?: readonly string[]
}> = [
  { key: 'nav.posts', href: '/posts/' },
  { key: 'nav.musings', href: '/musings/', langs: ['zh'] },
  { key: 'nav.issueAwards', href: '/issue-awards/' },
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
