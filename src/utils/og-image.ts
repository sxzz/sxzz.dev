import { Buffer } from 'node:buffer'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import process from 'node:process'
import { Resvg } from '@resvg/resvg-js'
import satori, { type Font } from 'satori'
import { siteCopy, siteMeta } from '../data/site'
import { ui } from '../i18n/ui'
import { getLocaleFromLang, type Lang } from '../i18n/utils'

interface OgOptions {
  title: string
  description: string
  lang: Lang
  kind: 'post' | 'musing'
  date?: Date
}

interface FontSource extends Pick<Font, 'name' | 'weight' | 'style' | 'lang'> {
  filename: string
  url: string
}

const root = process.cwd()
const cacheDir = join(root, 'node_modules/.cache/fonts')

const FONT_SOURCES: FontSource[] = [
  {
    name: 'Outfit',
    weight: 400,
    style: 'normal',
    filename: 'Outfit-Regular.ttf',
    url:
      'https://raw.githubusercontent.com/Outfitio/Outfit-Fonts/main/fonts/ttf/Outfit-Regular.ttf',
  },
  {
    name: 'Outfit',
    weight: 600,
    style: 'normal',
    filename: 'Outfit-SemiBold.ttf',
    url:
      'https://raw.githubusercontent.com/Outfitio/Outfit-Fonts/main/fonts/ttf/Outfit-SemiBold.ttf',
  },
  {
    name: 'Source Han Sans SC',
    weight: 700,
    style: 'normal',
    filename: 'SourceHanSansSC-Bold.otf',
    url:
      'https://raw.githubusercontent.com/adobe-fonts/source-han-sans/release/OTF/SimplifiedChinese/SourceHanSansSC-Bold.otf',
  },
  {
    name: 'Source Han Sans SC',
    weight: 400,
    style: 'normal',
    filename: 'SourceHanSansSC-Regular.otf',
    url:
      'https://raw.githubusercontent.com/adobe-fonts/source-han-sans/release/OTF/SimplifiedChinese/SourceHanSansSC-Regular.otf',
  },
]

let fontsPromise: Promise<Font[]> | undefined
let avatarDataUrl: string | undefined

async function ensureFonts() {
  mkdirSync(cacheDir, { recursive: true })
  const fonts: Font[] = []
  for (const source of FONT_SOURCES) {
    const path = join(cacheDir, source.filename)
    if (!existsSync(path)) {
      const res = await fetch(source.url)
      if (!res.ok) {
        throw new Error(`Failed to download font: ${source.url}`)
      }
      writeFileSync(path, Buffer.from(await res.arrayBuffer()))
    }
    fonts.push({
      name: source.name,
      data: readFileSync(path),
      weight: source.weight,
      style: source.style,
    })
  }
  return fonts
}

function getFonts() {
  if (!fontsPromise) {
    fontsPromise = ensureFonts()
  }
  return fontsPromise
}

function getAvatarDataUrl() {
  if (!avatarDataUrl) {
    const avatarPath = join(root, 'public/avatar.jpg')
    const avatarData = readFileSync(avatarPath)
    avatarDataUrl = `data:image/jpeg;base64,${avatarData.toString('base64')}`
  }
  return avatarDataUrl
}

export async function renderOgImage({
  title,
  description,
  lang,
  kind,
  date,
}: OgOptions): Promise<Buffer> {
  const fonts = await getFonts()
  const locale = getLocaleFromLang(lang)
  const isEn = lang === 'en'
  const label = (ui[lang] ?? ui.en)[`nav.${kind}s` as const]
  const dateText = date
    ? date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
    : ''
  const author = siteCopy.author.displayName[lang]

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box',
          padding: 64,
          gap: 24,
          background: 'linear-gradient(135deg, #fafaf9 0%, #e7e5e4 100%)',
          fontFamily: 'Source Han Sans SC',
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '6px 14px',
                      borderRadius: 999,
                      border: '1px solid rgba(120, 113, 108, 0.2)',
                      backgroundColor: 'rgba(120, 113, 108, 0.12)',
                      fontSize: 20,
                      fontWeight: 600,
                      textTransform: isEn ? 'uppercase' : 'none',
                      color: '#1c1917',
                    },
                    children: label,
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: 22,
                      fontWeight: 400,
                      color: '#78716c',
                    },
                    children: dateText,
                  },
                },
              ],
            },
          },
          {
            type: 'div',
            props: {
              style: {
                fontSize: 64,
                fontWeight: 700,
                color: '#1c1917',
                maxHeight: 220,
                overflow: 'hidden',
              },
              children: title,
            },
          },
          {
            type: 'div',
            props: {
              style: {
                fontSize: 30,
                fontWeight: 400,
                color: '#57534e',
                lineHeight: 1.45,
                maxHeight: 140,
                overflow: 'hidden',
              },
              children: description,
            },
          },
          {
            type: 'div',
            props: {
              style: {
                marginTop: 'auto',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
              },
              children: [
                {
                  type: 'img',
                  props: {
                    src: getAvatarDataUrl(),
                    width: 56,
                    height: 56,
                    style: {
                      borderRadius: '999px',
                      border: '2px solid rgba(120, 113, 108, 0.2)',
                    },
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 4,
                    },
                    children: [
                      {
                        type: 'div',
                        props: {
                          style: {
                            fontSize: 24,
                            fontWeight: 600,
                            color: '#1c1917',
                          },
                          children: author,
                        },
                      },
                      {
                        type: 'div',
                        props: {
                          style: {
                            fontSize: 18,
                            fontWeight: 400,
                            color: '#a8a29e',
                          },
                          children: siteMeta.domain,
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts,
    },
  )

  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: 1200 },
  })
  const png = resvg.render().asPng()
  return png
}

export async function renderDefaultOgImage(): Promise<Buffer> {
  const fonts = await getFonts()

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #fafaf9 0%, #e7e5e4 100%)',
          fontFamily: 'Outfit, Source Han Sans SC',
        },
        children: [
          {
            type: 'img',
            props: {
              src: getAvatarDataUrl(),
              width: 168,
              height: 168,
              style: {
                borderRadius: '84px',
                border: '3px solid rgba(168, 162, 158, 0.3)',
              },
            },
          },
          {
            type: 'div',
            props: {
              style: {
                marginTop: '16px',
                fontSize: '68px',
                lineHeight: 1.05,
                fontWeight: 600,
                color: '#1c1917',
                letterSpacing: '-0.02em',
              },
              children: siteCopy.author.canonicalName,
            },
          },
          {
            type: 'div',
            props: {
              style: {
                marginTop: '4px',
                fontSize: '32px',
                lineHeight: 1.2,
                fontWeight: 400,
                color: '#a8a29e',
              },
              children: siteCopy.author.tagline.en,
            },
          },
          {
            type: 'div',
            props: {
              style: {
                marginTop: '8px',
                fontSize: '26px',
                fontWeight: 400,
                color: '#78716c',
                letterSpacing: '0.05em',
              },
              children: siteMeta.domain,
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts,
    },
  )

  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: 1200 },
  })
  const png = resvg.render().asPng()
  return png
}
