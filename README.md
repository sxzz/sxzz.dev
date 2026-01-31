# sxzz.dev

Personal portfolio and blog for [Kevin Deng (sxzz)](https://sxzz.dev).

## Tech Stack

- [Astro 5](https://astro.build/) - Static site generator with SSR
- [Vue 3](https://vuejs.org/) - Interactive components
- [UnoCSS](https://unocss.dev/) - Atomic CSS engine (Wind3 preset)
- [TypeScript](https://www.typescriptlang.org/) - Strict mode
- [Cloudflare Workers](https://workers.cloudflare.com/) - Deployment

## Features

- Bilingual support (English / Chinese) with URL-based routing
- Blog posts and musings (Chinese-only informal posts)
- Dark mode with system preference detection
- OG image generation via Satori
- SEO optimized with structured data (JSON-LD), sitemap, and Open Graph
- Typewriter animation on homepage
- Prefetch for faster navigation

## Development

```bash
pnpm install   # Install dependencies
pnpm dev       # Start dev server
pnpm build     # Build for production
pnpm preview   # Preview production build
```

Requires Node.js >= 24 and pnpm 10.

## Project Structure

```
src/
├── content/           # Markdown content collections
│   ├── posts/en/      # English blog posts
│   ├── posts/zh/      # Chinese blog posts
│   └── musings/       # Chinese-only informal posts
├── i18n/              # Internationalization (EN/ZH)
├── layouts/           # Layout components
├── pages/             # File-based routing
│   ├── zh/            # Chinese routes
│   └── posts/         # Blog post routes
├── scripts/           # Client-side scripts
└── consts.ts          # Navigation and social links
```

## Content

Blog posts go in `src/content/posts/{en,zh}/` as `.md` files with frontmatter:

```yaml
---
title: Post Title
date: 2025-01-01
description: Short description
---
```

## License

MIT
