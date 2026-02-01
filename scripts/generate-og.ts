import { Buffer } from 'node:buffer'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { Resvg } from '@resvg/resvg-js'
import satori from 'satori'

const root = join(import.meta.dirname, '..')
const cacheDir = join(root, 'node_modules/.cache/fonts')

const FONTS: Record<string, string> = {
  'Outfit-SemiBold.ttf':
    'https://fonts.gstatic.com/s/outfit/v15/QGYyz_MVcBeNP4NjuGObqx1XmO1I4e6yC4E.ttf',
  'Outfit-Regular.ttf':
    'https://fonts.gstatic.com/s/outfit/v15/QGYyz_MVcBeNP4NjuGObqx1XmO1I4TC1C4E.ttf',
}

async function ensureFonts(): Promise<void> {
  mkdirSync(cacheDir, { recursive: true })
  for (const [name, url] of Object.entries(FONTS)) {
    const path = join(cacheDir, name)
    if (!existsSync(path)) {
      console.log(`Downloading ${name}...`)
      const res = await fetch(url)
      writeFileSync(path, Buffer.from(await res.arrayBuffer()))
    }
  }
}

await ensureFonts()

const avatarData = readFileSync(join(root, 'public/avatar.jpg'))
const avatarBase64 = `data:image/jpeg;base64,${avatarData.toString('base64')}`

const fontSemiBold = readFileSync(join(cacheDir, 'Outfit-SemiBold.ttf'))
const fontRegular = readFileSync(join(cacheDir, 'Outfit-Regular.ttf'))

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
        fontFamily: 'Outfit',
      },
      children: [
        {
          type: 'img',
          props: {
            src: avatarBase64,
            width: 120,
            height: 120,
            style: {
              borderRadius: '60px',
              border: '3px solid rgba(168, 162, 158, 0.3)',
            },
          },
        },
        {
          type: 'div',
          props: {
            style: {
              marginTop: '28px',
              fontSize: '52px',
              fontWeight: 600,
              color: '#1c1917',
              letterSpacing: '-0.02em',
            },
            children: 'Kevin Deng',
          },
        },
        {
          type: 'div',
          props: {
            style: {
              marginTop: '8px',
              fontSize: '24px',
              fontWeight: 400,
              color: '#a8a29e',
            },
            children: 'Open-source enthusiast',
          },
        },
        {
          type: 'div',
          props: {
            style: {
              marginTop: '20px',
              fontSize: '18px',
              fontWeight: 400,
              color: '#d6d3d1',
              letterSpacing: '0.05em',
            },
            children: 'sxzz.dev',
          },
        },
      ],
    },
  },
  {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'Outfit', data: fontSemiBold, weight: 600, style: 'normal' },
      { name: 'Outfit', data: fontRegular, weight: 400, style: 'normal' },
    ],
  },
)

const resvg = new Resvg(svg, {
  fitTo: { mode: 'width', value: 1200 },
})
const png = resvg.render().asPng()

writeFileSync(join(root, 'public/og-default.png'), png)
console.log('Generated public/og-default.png')
