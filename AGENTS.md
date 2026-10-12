# AGENTS.md

## Project Overview

Personal portfolio and blog for Kevin Deng (sxzz) at https://sxzz.dev. Built with Astro and UnoCSS as a fully static site.

## Tech Stack

- **Framework**: Astro 7 (`output: 'static'`), `.astro` components only
- **Styling**: UnoCSS (Wind3 preset, Tailwind-compatible utilities)
- **Icons**: Iconify (Simple Icons) via UnoCSS `presetIcons`
- **Markdown**: Astro Content Collections with `remark-github-blockquote-alert` and `rehype-external-links`
- **OG images**: Satori + Resvg
- **Analytics**: GoatCounter (`goat-counter/astro`)
- **Package Manager**: pnpm 12 (pinned via `devEngines`), Node.js 24
- **Language**: TypeScript (strict mode)

## Commands

```bash
pnpm dev           # Start dev server
pnpm build         # Build for production
pnpm preview       # Preview production build
pnpm typecheck     # Run type checking (astro check)
pnpm lint          # Lint with ESLint
pnpm lint:fix      # Lint and auto-fix
pnpm format        # Format with dprint
pnpm generate:og   # Generate default OG image
```

No tests are configured. A pre-commit hook runs `eslint --fix` and `dprint fmt` on staged files.

## Project Structure

```
src/
├── components/        # Shared components
│   └── pages/         # Page-level components, shared by EN and ZH routes
├── content/           # Markdown content collections
│   ├── posts/en/      # English blog posts
│   ├── posts/zh/      # Chinese blog posts
│   ├── musings/       # Chinese-only informal posts
│   └── pages/         # Home intro and About body, as `<page>/<lang>.md`
├── data/
│   └── site.ts        # Site metadata, author info, friend links
├── i18n/              # Internationalization (EN/ZH)
│   ├── ui.ts          # Translation strings, nav, social links
│   ├── utils.ts       # i18n helpers
│   └── pages.ts       # Page titles, descriptions and headings
├── layouts/           # Layout components (Layout.astro)
├── pages/             # File-based routing
│   ├── zh/            # Chinese routes (mirror of English, plus musings)
│   ├── posts/         # Blog post routes and raw `.md` endpoints
│   └── og/            # OG image endpoints
├── scripts/           # Client-side scripts
├── utils/             # Build-time utilities (content helpers, OG rendering)
└── content.config.ts  # Content collection definitions
scripts/
└── generate-og.ts     # Generates public/og-default.png
```

## Conventions

- **Astro components**: PascalCase (e.g., `Layout.astro`)
- **TS/utility files**: camelCase or kebab-case (e.g., `opencc.ts`, `og-image.ts`)
- **Content/blog posts**: kebab-case (e.g., `my-post-title.md`)
- **Imports**: ES modules, relative paths for local files, package specifiers for deps
- **Styling**: Utility-first UnoCSS classes; avoid custom CSS unless necessary
- **i18n**: URL-based routing (`/` for English, `/zh/` for Chinese). Default language is English. Add translations to `src/i18n/ui.ts`, page titles and descriptions to `src/i18n/pages.ts`, and long-form page copy to `src/content/pages/`.
- **Fonts**: Serif (Newsreader / Noto Serif SC) for headings and article body, Sans (Outfit) for UI, Mono (JetBrains Mono) for code

## Content

Blog posts go in `src/content/posts/{en,zh}/` as `.md` files with required frontmatter:

```yaml
---
title: Post Title
date: 2025-01-01
description: Short description
---
```

Optional fields: `image`, `updatedAt`, `tags`.

Musings (Chinese-only informal posts) go in `src/content/musings/` with the same frontmatter.
