# sxzz.dev

Personal portfolio and blog for [Kevin Deng (sxzz)](https://sxzz.dev).

## Tech Stack

- [Astro 7](https://astro.build/) - Static site generator
- [UnoCSS](https://unocss.dev/) - Atomic CSS engine (Wind3 preset)
- [TypeScript](https://www.typescriptlang.org/) - Strict mode
- [Satori](https://github.com/vercel/satori) + [Resvg](https://github.com/thx/resvg-js) - OG image generation
- [GoatCounter](https://www.goatcounter.com/) - Privacy-friendly analytics

## Features

- Bilingual support (English / Chinese) with URL-based routing (`/` for EN, `/zh/` for ZH)
- Blog posts and musings (Chinese-only informal posts)
- Dark mode with system preference detection
- OG image generation via Satori
- SEO optimized with structured data (JSON-LD), sitemap, and Open Graph
- View Transitions for smooth page navigation
- Simplified/Traditional Chinese toggle (OpenCC)
- RSS feeds (per language)
- Raw markdown endpoints for LLM access (`/posts/[slug].md`, `/zh/musings/[slug].md`)

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

Requires Node.js 24 and pnpm 12.

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
