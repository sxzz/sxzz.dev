import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetWebFonts,
  presetWind3,
} from 'unocss'

export default defineConfig({
  presets: [
    presetWind3(),
    presetAttributify(),
    presetIcons(),
    presetWebFonts({
      provider: 'none',
      fonts: {
        sans: 'Outfit:300,400,500,600',
        serif: [
          { name: 'Newsreader', weights: [400, 500, 600, 700] },
          { name: 'Noto Serif SC', weights: [400, 500, 600, 700] },
        ],
        mono: 'JetBrains Mono:400',
      },
    }),
  ],
})
