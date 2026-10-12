import { defineConfig, presetIcons, presetWebFonts, presetWind3 } from 'unocss'

export default defineConfig({
  presets: [
    presetWind3(),
    presetIcons(),
    presetWebFonts({
      fonts: {
        sans: 'Outfit:300,400,500,600',
        serif: [
          { name: 'Newsreader', weights: [400, 500, 600, 700], italic: true },
          { name: 'Noto Serif SC', weights: [400, 500, 600, 700] },
        ],
        mono: 'JetBrains Mono:400',
      },
    }),
  ],
  theme: {
    colors: {
      // Replaces the built-in `stone` scale with rose-tinted neutrals sampled
      // from the avatar, so every existing `stone-*` utility picks them up.
      // Hard-coded copies live in Prose.astro, Layout.astro and og-image.ts.
      stone: {
        50: '#fbf8f6',
        100: '#f5f0ed',
        200: '#e9e1dd',
        300: '#d8cdc8',
        400: '#ab9d98',
        500: '#7a6c68',
        600: '#5c504d',
        700: '#483e3c',
        800: '#2d2625',
        900: '#1f1a19',
        950: '#151110',
      },
      accent: {
        DEFAULT: '#2f6f5e',
        dark: '#8cc7b1',
      },
    },
  },
})
