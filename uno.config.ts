import {
  defineConfig,
  presetWind3,
  presetAttributify,
  presetIcons,
  presetWebFonts,
} from 'unocss'

export default defineConfig({
  presets: [
    presetWind3(),
    presetAttributify(),
    presetIcons(),
    presetWebFonts({
      fonts: {
        sans: 'Outfit:300,400,500,600',
        serif: 'Newsreader:400,500,600,700',
        mono: 'JetBrains Mono:400',
      },
    }),
  ],
})
