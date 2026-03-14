# sxzz.dev

Personal portfolio and blog for [Kevin Deng (sxzz)](https://sxzz.dev).

## Tech Stack

- [Astro 5](https://astro.build/) - Static site generator
- [UnoCSS](https://unocss.dev/) - Atomic CSS engine (Wind3 preset)
- [TypeScript](https://www.typescriptlang.org/) - Strict mode
- [Satori](https://github.com/vercel/satori) + [Resvg](https://github.com/nicely/nicely-resvg-js) - OG image generation

## Features

- Bilingual support (English / Chinese) with URL-based routing (`/` for EN, `/zh/` for ZH)
- Blog posts and musings (Chinese-only informal posts)
- Dark mode with system preference detection
- OG image generation via Satori
- SEO optimized with structured data (JSON-LD), sitemap, and Open Graph
- Typewriter animation on homepage
- View Transitions for smooth page navigation
- Simplified/Traditional Chinese toggle (OpenCC)
- RSS feeds (per language)
- Raw markdown endpoints for LLM access (`/posts/[slug].md`)

## Development

```bash
pnpm install       # Install dependencies
pnpm dev           # Start dev server
pnpm build         # Build for production
pnpm preview       # Preview production build
pnpm typecheck     # Run type checking
pnpm lint          # Lint with ESLint
pnpm lint:fix      # Lint and auto-fix
pnpm format        # Format with dprint
pnpm generate:og   # Generate default OG image
```

Requires Node.js >= 24 and pnpm 10.

## Project Structure

```
src/
├── components/
│   ├── pages/             # Page-level components
│   │   ├── Home.astro
│   │   ├── About.astro
│   │   ├── Links.astro
│   │   ├── PostsIndex.astro
│   │   └── PostDetail.astro
│   ├── LanguageSwitcher.astro
│   ├── ThemeSwitcher.astro
│   ├── Prose.astro
│   └── TableOfContents.astro
├── content/               # Markdown content collections
│   ├── posts/en/          # English blog posts
│   ├── posts/zh/          # Chinese blog posts
│   └── musings/           # Chinese-only informal posts
├── data/
│   └── site.ts            # Site metadata, author info, home links, friend links
├── i18n/                  # Internationalization (EN/ZH)
│   ├── ui.ts              # Translation strings, nav, social links
│   ├── utils.ts           # i18n helpers
│   └── pages.ts           # Page-level copy
├── layouts/
│   └── Layout.astro       # Global layout
├── pages/                 # File-based routing
│   ├── zh/                # Chinese routes
│   ├── posts/             # Blog post routes
│   └── og/                # Dynamic OG image endpoints
├── scripts/               # Client-side scripts
│   ├── typewriter.ts
│   ├── toc.ts
│   ├── opencc.ts
│   └── animate.ts
├── utils/                 # Server-side utilities
│   ├── content.ts         # Content collection helpers
│   └── og-image.ts        # OG image rendering
└── content.config.ts      # Content collection definitions
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

Musings (Chinese-only) go in `src/content/musings/`.

## Friend Links

To add a friend link, edit [`src/data/site.ts`](https://github.com/sxzz/sxzz.dev/blob/main/src/data/site.ts) and append an entry to the `friends` array:

```ts
export const friends: Friend[] = [
  // ... existing friends
  {
    name: 'Name', // string, or { en: 'English', zh: '中文' } for multi-language
    bio: 'A short bio or tagline', // string or multi-language
    avatar: 'https://github.com/xxx.png', // avatar URL or multi-language
    href: 'https://example.com', // link URL or multi-language
  },
]
```

All fields support multi-language values via `LocalizedString`. Use a plain string for a single value across all languages, or an object keyed by language code for per-language values.

**Fields:**

| Field    | Type              | Description                  |
| -------- | ----------------- | ---------------------------- |
| `name`   | `LocalizedString` | Display name                 |
| `bio`    | `LocalizedString` | Short description or tagline |
| `avatar` | `LocalizedString` | URL to the avatar image      |
| `href`   | `LocalizedString` | URL to the friend's website  |

> `LocalizedString` = `string | Record<Lang, string>`

Friend links are displayed on the [/links](https://sxzz.dev/links/) page and are randomly shuffled on each page load.

## License

MIT
