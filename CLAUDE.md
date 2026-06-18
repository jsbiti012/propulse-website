# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> **Note:** Also read `AGENTS.md` — it flags a critical warning about this version of Next.js having breaking changes from training data. Check `node_modules/next/dist/docs/` before writing any Next.js-specific code.

---

## Commands

```bash
npm run dev       # Next.js dev server (localhost:3000)
npm run build     # next build
npm run lint      # ESLint
```

---

## Architecture

### Stack
- **Next.js 16** (App Router), **React 19**, **TypeScript**, **Tailwind CSS v4**
- **Resend** for contact form emails (`app/api/contact/route.ts`)
- **next-mdx-remote** + **gray-matter** for blog post rendering

### Content system — two layers

Content is edited directly in the source files (no CMS). To change site copy, edit the files below and push; Vercel redeploys.

**Layer 1: page JSON** (`content/pages/*.json`)
- Holds text-only fields: headlines, descriptions, CTA labels, pack names/prices, form options.
- Pages import these directly: `import homeData from "@/content/pages/home.json"`.

**Layer 2: `content.config.ts`** (repo root)
- Holds everything that can't go in JSON: Lucide icon references, typed interfaces, social links.
- Imported by `components/Navbar.tsx`, `components/Footer.tsx`, and blog pages.
- Icons are **not** in the JSON — pages zip icon arrays with JSON data at render time (see `app/page.tsx` pattern with `STAT_ICONS`, `STEP_ICONS`, etc.).

**Blog posts** live in `content/blog/*.mdx`. The `lib/mdx.ts` utility reads them with `gray-matter`. Required frontmatter: `title`, `description`, `date`, `category`.

### Pages
| Route | File | Content source |
|---|---|---|
| `/` | `app/page.tsx` | `content/pages/home.json` + `content.config.ts` (icons) |
| `/services` | `app/services/page.tsx` | `content/pages/services.json` + `content.config.ts` (icons) |
| `/blog` | `app/blog/page.tsx` | `content.config.ts` (blogPage) + `lib/mdx.ts` |
| `/blog/[slug]` | `app/blog/[slug]/page.tsx` | MDX from `content/blog/`, `content.config.ts` (blogPostCta) |
| `/contact` | `app/contact/page.tsx` | `content/pages/contact.json` + `content.config.ts` |

### CSS design tokens
All colors are CSS custom properties defined in `app/globals.css`:
`--bg`, `--surface`, `--surface-2`, `--border`, `--text`, `--muted`, `--accent` (`#4361EE`), `--accent-light`, `--accent-2` (`#7B5CF5`), `--dark` (`#0C0E1A`).

Use these via `style={{ color: "var(--accent)" }}` — do not hardcode hex values except where referencing `pack.accent` from data.

### Animation components
`components/Animate.tsx` exports: `FadeUp`, `StaggerGrid`, `StaggerItem`, `ScaleOnHover`, `CounterUp`. These wrap Framer Motion. Use them for any new animated sections — do not add raw Framer Motion calls in pages.

### Environment variables
```
RESEND_API_KEY         # contact form email delivery
```

### Key rules
- All user-facing copy is French. No English on any rendered surface.
- Pricing lives **only** in `content/pages/home.json` (`packs` array). The home and services pages both render that single source. When prices change, also update the contact form dropdown in `content/pages/contact.json` (`formPackOptions`) so the lead form offers the current lineup.
- No lorem ipsum, no placeholder copy on any deployed page.
