import { defineConfig } from 'astro/config'
import UnoCSS from '@unocss/astro'
import cloudflare from '@astrojs/cloudflare'
import sitemap from '@astrojs/sitemap'
import remarkGithubBlockquoteAlert from 'remark-github-blockquote-alert'

// https://astro.build/config
export default defineConfig({
  site: 'https://sxzz.dev',
  prefetch: true,
  integrations: [UnoCSS(), sitemap()],
  adapter: cloudflare({ imageService: 'compile' }),
  markdown: {
    remarkPlugins: [remarkGithubBlockquoteAlert],
  },
})
