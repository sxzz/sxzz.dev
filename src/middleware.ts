import { defineMiddleware } from 'astro:middleware'
import { defaultLang, languages } from './i18n/ui'

const supportedLangs = new Set(Object.keys(languages))

function getPreferredLang(header: string | null) {
  if (!header) return defaultLang

  const parsed = header
    .split(',')
    .map((part) => {
      const [rawLang, rawQ] = part.trim().split(';q=')
      const q = rawQ ? Number.parseFloat(rawQ) : 1
      return { lang: rawLang.toLowerCase(), q: Number.isNaN(q) ? 0 : q }
    })
    .toSorted((a, b) => b.q - a.q)

  for (const entry of parsed) {
    if (supportedLangs.has(entry.lang)) return entry.lang
    const base = entry.lang.split('-')[0]
    if (supportedLangs.has(base)) return base
  }

  return defaultLang
}

export const onRequest = defineMiddleware((context, next) => {
  const { pathname, search } = context.url

  const accept = context.request.headers.get('accept') || ''
  if (!accept.includes('text/html')) return next()

  if (
    pathname.startsWith('/_astro') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/robots') ||
    pathname.startsWith('/sitemap') ||
    pathname.startsWith('/assets')
  ) {
    return next()
  }

  const [, maybeLang] = pathname.split('/')
  if (supportedLangs.has(maybeLang)) return next()

  const preferred = getPreferredLang(
    context.request.headers.get('accept-language'),
  )

  if (preferred !== defaultLang) {
    const localizedPath = `/${preferred}${pathname}`
    return context.redirect(`${localizedPath}${search}`, 302)
  }

  return next()
})
