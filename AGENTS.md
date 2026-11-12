<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# SK Taxation — Landing Page

Single-page marketing site for **SK Taxation**, a Sri Lankan tax advisory firm. Animation-heavy landing page. **Light theme is the default** (client requirement, Oct 2026); dark theme via the header toggle.

## Stack

- **Next.js 16** (App Router, TypeScript, static export — all routes prerender)
- **Tailwind CSS v4** — no `tailwind.config`; design tokens live in `@theme inline` inside `app/globals.css`
- **Framer Motion 12** for all animations
- Fonts via `next/font`: Fraunces (serif, headings) + Space Grotesk (sans, body)

## Commands

- `npm run dev` — dev server
- `npm run build` — production build (run this to type-check)
- `npm run lint` — eslint

## Content source of truth

`lib/site.ts` holds the business facts (name, **real client phone numbers**, email, hours) and the five services with their sub-service lists (verbatim from the client's Oct 2026 Word doc). JSON-LD, Contact, Footer and Services all read from it — edit there, not in components.

**Copy rules from the client/owner:** no em or en dashes in any user-visible copy (use commas or "to"), no lorem ipsum, no purple/violet anywhere, single `h1` (the hero headline). The email (sk.taxservices19@gmail.com) and phone numbers are the client's confirmed details; the hero stats (15+/200+/98%) are still placeholders pending client confirmation.

## Theming

Semantic CSS variables on `:root` (light) and `.dark` in `app/globals.css`, mapped to Tailwind colors via `@theme inline`. Token names are legacy: **`cream` = page background, `ink` = foreground** — they flip in dark mode, so `bg-ink text-cream` bands (Marquee, Process, Footer) render light-on-dark in light mode and invert in dark mode.

| Token | Light | Dark | Use |
|---|---|---|---|
| `cream` / `cream-dark` | `#f2faf6` / `#e1f2e9` | `#071d1a` / `#0c2824` | page + alternate section backgrounds |
| `ink` / `ink-soft` | `#06332c` / `#14584a` | `#e9f5f0` / `#c9e2d8` | headings, inverted bands / body emphasis |
| `muted` | `#4b7a6d` | `#8fada4` | secondary text |
| `gold` / `gold-soft` | `#d3941f` / `#e9b95d` | `#f0b452` / `#c98b2d` | primary accent |
| `teal` | `#089a86` | `#35d0bc` | secondary accent, gradients |
| `line` | `#cfe8dc` | `#17352f` | borders/dividers |
| `surface` | `#ffffff` | `#0e2b26` | cards, form panels |
| `--hero-overlay/scrim/glass` | mint wash / frosted white | deep teal / faint film | hero photo treatment |

- Theme applied pre-paint by an inline script in `app/layout.tsx`: **light unless** `localStorage["sk-theme-v2"] === "dark"`. `ThemeToggle` flips `.dark` and persists.
- The **hero follows the theme** (light mint wash over the photo in light mode, deep teal in dark) via the `--hero-*` variables, so the header always uses normal tokens — no overlay mode.
- `.text-shine` = teal→gold gradient text on section-heading accent words.

## Structure

Nav (client-specified): **About | Services | Latest Updates | Contact**.

`app/page.tsx` composes: Header → Hero → Marquee → About → Services → Process → **Updates** → Contact → Footer, plus `ScrollCompanion`. Why-Us and Testimonials were **removed at the client's request (Oct 2026)**; don't reintroduce them.

- `Hero` — LIGHT mode: designed bright backdrop (white-to-mint gradient, dot grid, gold/teal glows, dial rings), no photo. DARK mode only: photo (`public/hero-bg.jpg`) under the deep-teal overlays (`hidden dark:block`). Glass dashboard cards (`HeroIllustration`) in an aligned 5-col grid, top offset `lg:pt-9` to sit on the headline's line. The image `src` must prefix `process.env.NEXT_PUBLIC_BASE_PATH` (see Deployment).
- `Services` — accordion of the 5 services from `lib/site.ts`; first item open by default; each expands to a two-column ✓ list of sub-services.
- `Updates` — auto-advancing carousel (native scroll-snap + timer, arrows, dots; pauses on hover/touch and for reduced motion) of the six entries in `lib/updates.ts`, newest first. Each card links to a full article at `/updates/<slug>/`: static pages from `app/updates/[slug]/page.tsx` via `generateStaticParams`, each with unique metadata, Article + BreadcrumbList JSON-LD, visible breadcrumbs, a "what to do now" box, sources, and sitemap entries. **Keep entries current and client-approved**; the "general information, not advice" disclaimer stays. Header/Footer/Logo links use `next/link` with `/#anchor` hrefs so navigation works from article pages under the basePath (plain `<a href="#...">` would break there).
- `ScrollCompanion` — sun (light) / moon (dark) character traveling the right edge with scroll; tracks `.dark` via MutationObserver; hidden for reduced motion.
- `Reveal` / `SplitText` in `components/Reveal.tsx` — **Gotcha:** `SplitText`'s words are clipped by `overflow-hidden`, so visibility is observed on the unclipped container via `useInView`. Don't "simplify" this back.

All animation components respect `prefers-reduced-motion`.

## SEO

- Metadata in `app/layout.tsx`: unique title/description, canonical, Open Graph + Twitter. **Gotcha:** `metadataBase` must be the bare origin (`SITE_ORIGIN`), not the full site URL — Next already prefixes `basePath` onto metadata routes, so a basePath-bearing `metadataBase` doubles the segment in og:image URLs. Canonical/OG urls use absolute `SITE_URL`.
- JSON-LD (`AccountingService` + `WebSite` + `BreadcrumbList`) rendered in `layout.tsx` from `lib/site.ts`.
- `app/robots.ts`, `app/sitemap.ts` (both `force-static`), `app/not-found.tsx` (exports as `404.html`, which GitHub Pages serves automatically).
- Icons: `app/icon.svg`, `app/apple-icon.png`, `app/favicon.ico`, `app/opengraph-image.png` (+ `.alt.txt`). Regenerate PNG/ICO with Pillow if the brand changes (SK monogram, ink/gold/teal).

## Deployment

Static export to **GitHub Pages** via `.github/workflows/deploy.yml` on push to `main`. The canonical deployment is the client's repo **sk-taxation/official-website** (https://sk-taxation.github.io/official-website/); the development copy at Dumanga/sk-taxation-landing (https://dumanga.github.io/sk-taxation-landing/) still deploys from the same code. basePath and all absolute URLs derive from `GITHUB_REPOSITORY` at build time, so each repo emits self-consistent links; the local fallback is the client repo.

- `next.config.ts`: `output: "export"`, `trailingSlash: true`, `images.unoptimized`; `basePath`/`assetPrefix` only when `GITHUB_PAGES=true` (set by the workflow), so local dev serves at root.
- **Gotcha:** `images.unoptimized` bypasses the loader, so `next/image` does NOT prefix `basePath` onto `src` — prefix manually with `process.env.NEXT_PUBLIC_BASE_PATH` (exported via `env` in `next.config.ts`), as `Hero.tsx` does.
- robots.txt/sitemap.xml live under the basePath; they become spec-correct (root-level) once the client moves to a custom domain — then update `SITE_ORIGIN`/`SITE_URL` in `lib/site.ts`.
- The repo must stay **public** for Pages on a free GitHub plan.

## Conventions

- Update `PROGRESS.md` with a dated entry (date **and** time) after any meaningful change — client requirement.
- The contact form has no backend: submit builds a `mailto:` URL (opens the visitor's mail app pre-filled), then shows a thank-you state.
