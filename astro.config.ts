import { unified } from '@astrojs/markdown-remark'
import sitemap from '@astrojs/sitemap'
import UnoCSS from '@unocss/astro'
import { defineConfig } from 'astro/config'
import { goatCounter } from 'goat-counter/astro'
import rehypeExternalLinks from 'rehype-external-links'
import remarkGithubBlockquoteAlert from 'remark-github-blockquote-alert'

// https://astro.build/config
export default defineConfig({
  site: 'https://sxzz.dev',
  output: 'static',
  prefetch: true,
  integrations: [
    UnoCSS(),
    sitemap(),
    goatCounter({
      endpoint: 'https://stats.sxzz.dev/count',
    }),
  ],
  markdown: {
    processor: unified({
      remarkPlugins: [remarkGithubBlockquoteAlert],
      rehypePlugins: [
        [
          rehypeExternalLinks,
          {
            target: '_blank',
            rel: ['noopener', 'noreferrer'],
          },
        ],
      ],
    }),
  },
})
