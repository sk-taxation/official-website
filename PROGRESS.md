# Progress Log — SK Taxation Landing Page

## 2026-11-12 09:28

**Light hero redesigned: fully light first screen (client request).**

- The light theme no longer dims the accounting photo behind a mint wash; the photo now
  appears only in dark mode (`hidden dark:block`). Light mode gets a designed bright
  backdrop: white-to-mint gradient, masked fine dot grid, warm gold + teal glows with
  parallax, and concentric brand "dial" rings (one slowly rotating) behind the dashboard
  cards.
- Glass cards brightened for light mode (`--hero-glass` 0.88 white) with a soft teal-tinted
  shadow, so they read as crisp white cards on the bright scene.
- Added a subtle scroll cue (animated pill, links to #about) at the hero's bottom edge on
  large screens; respects reduced motion.
- Verified on the built export: light hero is fully bright with no photo, dark mode keeps
  the photo treatment (visibility + token checks), lint and build clean.

## 2026-10-21 15:37

**Real contact email wired in.**

- Client confirmed the firm's email as sk.taxservices19@gmail.com (via WhatsApp screenshot);
  replaced the hello@sktaxation.com placeholder in lib/site.ts. Contact section display,
  the form's mailto destination and the footer all pick it up; AGENTS.md and README notes
  updated. Remaining placeholder: hero stats (15+/200+/98%).

## 2026-10-21 12:13

**Client site is LIVE: https://sk-taxation.github.io/official-website/**

- Client enabled Pages (Source: GitHub Actions) on sk-taxation/official-website; re-ran the
  deploy workflow via workflow_dispatch; conclusion: success.
- Verified live: home, article pages, designed 404, robots.txt, sitemap (7 URLs, correct
  host), OG image all serving; canonical and hero image paths correctly use
  /official-website; real phone numbers present; carousel renders all 6 cards.
- The client's repo is now the canonical deployment. The development copy at
  https://dumanga.github.io/sk-taxation-landing/ deploys from the same code (URLs derive
  from GITHUB_REPOSITORY), handy as a staging preview before pushing to the client remote.

## 2026-10-21 12:08

**Contact form mail handoff hardened; project handed over to the client's repo.**

- Contact form: visitor fills name, email, phone (now required), company (optional) and
  message; submitting fires the mailto via a synthetic anchor click (more reliable across
  browsers than a location change) so the visitor's default mail app opens with the draft
  addressed to the firm. The thank-you panel now includes fallbacks: "open the draft again"
  and a direct mailto link, for devices with no mail app configured. Fixed the body spacer
  line that filter(Boolean) was eating. Destination address is still the placeholder
  hello@sktaxation.com; swap in `lib/site.ts` when the client provides the real one.
- Deployment made repo-aware: basePath, canonical/OG URLs, JSON-LD and sitemap all derive
  from GITHUB_REPOSITORY at build time. Pushed to the client's repo
  **sk-taxation/official-website** (collaborator access confirmed: public repo, empty,
  push rights). The first workflow run failed at "Configure Pages": enabling Pages requires
  repo ADMIN, and our access is write-level, so the client must flip Settings > Pages >
  Source: GitHub Actions once; then a re-run deploys. Canonical site (once enabled):
  https://sk-taxation.github.io/official-website/
  Development copy deployed fine at https://dumanga.github.io/sk-taxation-landing/.

## 2026-10-21 11:57

**Latest Updates expanded to six researched items with a carousel and full article pages.**

- Researched current Sri Lankan tax developments via web search (KPMG alerts, IRD notices,
  gazetted Acts, press) and built `lib/updates.ts` with six entries, newest first:
  1. 18% VAT on cross-border digital services (effective 1 July 2026 after two deferrals)
  2. Inland Revenue (Amendment) Act No. 11 of 2026 (CGT 15%, Rs. 500k banking-channel rule,
     arrears interest waiver)
  3. Budget 2026 (VAT/SSCL registration threshold Rs. 60M to Rs. 36M from 1 April 2026)
  4. SVAT abolition and risk-based VAT refunds (from 1 October 2025)
  5. Personal relief to Rs. 1.8M (1 April 2025)
  6. AIT on interest doubled to 10% (1 April 2025)
  Each entry carries a full article: intro, sections, "what you should do now", named sources.
- Home section is now a carousel: native scroll-snap with auto-advance every 4.5s, arrows,
  dots, pause on hover/touch, swipeable on mobile, disabled auto-play for reduced motion.
- Clicking a card opens its own page at /updates/<slug>/ (6 static pages via
  generateStaticParams): breadcrumbs (visible + JSON-LD), Article schema, unique titles,
  canonical URLs, sources with external links, contact CTA, "More updates" cross-links;
  all added to sitemap.xml (7 URLs total).
- Header, Footer and Logo links converted to next/link with /#anchor hrefs so navigation
  works from article pages under the GitHub Pages basePath.
- Verified on the built export: carousel auto-advances, all six links resolve, article pages
  render with clean console, one h1 per page, no em dashes. Lint and build clean.
- **Client to review:** the six articles are fact-checked against the cited sources, but a
  professional read before promotion is recommended; future updates should come from the client.

## 2026-10-21 11:47

**Light-default fix for returning visitors, brighter light palette, verified + refreshed updates.**

- **Why dark still loaded for the client/owner:** their browsers stored `sk-theme: "dark"` from
  the era when dark was the default, and the init script honours stored choices. Fixed by
  versioning the storage key to `sk-theme-v2`, so the new light default applies to everyone;
  choices made from now on persist under the new key.
- Light palette brightened for a lighter vibe: page `#f2faf6`, alt sections `#e1f2e9`, pure
  white cards, brighter hero wash and glass (text colours untouched, contrast preserved).
- **Latest Updates fact-checked via web search** against IRD notices, the gazetted Acts, KPMG
  tax alerts and news coverage: Rs. 1.8M personal relief (IR Amendment Act No. 2 of 2025) and
  AIT on interest 5%→10% from 1 Apr 2025 both confirmed; VAT 18%/Rs. 60M threshold from
  Jan 2024 confirmed but replaced as stale. New lead card: Inland Revenue (Amendment) Act
  No. 11 of 2026 (CGT to 15% for individuals/partnerships, Rs. 500,000+ payments through
  banking channels, arrears interest waiver). WHT card wording tightened to "advance income
  tax withheld on interest".
- Verified on the built export: light loads by default even with the old dark preference
  stored; lint and static export clean.

## 2026-10-21 11:45

**Client revision round (from "Web Site.docx") + SEO/quality hardening.**

Content and structure, per the client's Word doc:
- New `lib/site.ts` as single source of truth for business facts and services.
- Services rebuilt with the client's five practice areas and full sub-service lists
  (Tax Consultancy, Audit & Assurance, Accounting, CFO, Company Secretarial); accordion now
  expands to a two-column checklist, first item open by default.
- Removed Why-Us and Testimonials sections (client request). Added "Latest Updates" section
  (`components/Updates.tsx`) in Testimonials' place: three dated Sri Lankan tax-update cards
  (Apr 2025 personal relief Rs 1.8M, Apr 2025 WHT on interest 10%, Jan 2024 VAT 18%) with a
  not-advice disclaimer. **Client should confirm these and send future updates.**
- Nav is now About | Services | Latest Updates | Contact (header, mobile menu, footer).
- Real client phone numbers wired in (0777 14 16 48 / 076 919 4508) as tel: links in Contact
  and Footer. Email/hours/stats remain placeholders pending the content form.
- **Light theme is now the default** ("Light Color Website"); dark stays via toggle. The hero
  now follows the theme: light mint wash over the photo in light mode, deep teal in dark
  (new --hero-overlay/scrim/glass variables); header overlay mode removed; glass cards and
  all hero text use theme tokens.

SEO and quality (owner's checklist):
- Full metadata: unique titles, meta description, canonical, Open Graph + Twitter cards,
  generated OG image (1200x630), branded favicon set (icon.svg, apple-icon.png, favicon.ico).
  Fixed a metadataBase gotcha that doubled the basePath in og:image URLs.
- JSON-LD structured data: AccountingService (with offer catalogue + contact points),
  WebSite, BreadcrumbList.
- app/robots.ts and app/sitemap.ts (static) and a designed 404 page (app/not-found.tsx,
  exported as 404.html which GitHub Pages serves automatically).
- Exactly one h1; descriptive alt text on the hero photo; no em/en dashes anywhere in copy;
  no lorem ipsum; no purple; console verified clean; largest JS chunk ~71 KB gzipped.
- ThemeToggle refactored to useSyncExternalStore (fixes react-hooks lint, stays in sync with
  external theme changes). Lint and static export both clean.

## 2026-08-09 16:22

**Client approved the design. Created the content-collection workbook.**

- Built `SK-Taxation-Website-Content-Form.xlsx` (7 sheets) for the client to fill in and return:
  Start Here (instructions + legend), 1. Business Details, 2. Testimonials, 3. Key Numbers,
  4. Services, 5. About & Team, 6. Logo & Images.
- Yellow cells = client input; grey italic rows = worked examples. Testimonials and Team sheets
  include a realistic sample row; Testimonials also explains what a testimonial is, how to ask
  clients for one, and what makes a strong one. Yes/No and Keep/Change/Remove cells use dropdowns.
- **Flagged the fabricated content prominently.** The hero stats (15+ years, 200+ clients,
  98% retention) and all three testimonials currently on the live site were written by us as
  placeholders. The "Key Numbers" sheet carries a red warning that these are invented, must be
  replaced, and could be treated as misleading advertising if published unverified; the
  "Start Here" sheet repeats the warning and offers to take the preview offline until the real
  content lands.
- Validated the file: zip integrity OK, all OOXML parts present, read back cleanly via openpyxl.
- File lives in the repo root, untracked (not committed — it is a client document, and the repo
  is public).

**Next once the form comes back:** swap the real details into `Contact.tsx`, `Footer.tsx`,
`Testimonials.tsx`, `Hero.tsx` (stats), `Services.tsx` and `About.tsx`, then redeploy.

## 2026-08-09 01:40

**Deployed to GitHub Pages for client review.**

- Live URL: **https://dumanga.github.io/sk-taxation-landing/**
- Configured static export in `next.config.ts`: `output: "export"`, `trailingSlash: true`,
  `images.unoptimized`, and `basePath`/`assetPrefix` gated behind `GITHUB_PAGES=true` so local
  dev still runs at the root.
- **Bug caught pre-deploy:** `images.unoptimized` bypasses the image loader, so `next/image`
  emitted `src="/hero-bg.jpg"` without the base path — the hero photo would have 404'd on Pages
  while working fine locally. Fixed by exporting `NEXT_PUBLIC_BASE_PATH` from the config and
  prefixing the src in `Hero.tsx`.
- Added `.github/workflows/deploy.yml` (build + `actions/deploy-pages`, `enablement: true`).
- Verified the built export locally by serving `out/` under a `/sk-taxation-landing/` path:
  index, hero image, JS and CSS all 200; page rendered correctly and the theme toggle worked.
- Pruned unused create-next-app SVGs from `public/`; gitignored `.claude/settings.local.json`;
  replaced the scaffold README with a project one.
- Repo was private (Pages needs public on the free plan) — **made public with the client's
  approval** after scanning for secrets (none: no `.env`, contact details are placeholders).

**Note for client review:** contact details are still placeholders, and the contact form opens
the visitor's mail app rather than posting to a backend.

## 2026-08-09 01:17

**Two hero tweaks from client review.**

- Removed the bottom fade overlay (`from-transparent to-cream`) between the hero and the services marquee — in light mode it read as an unwanted white shadow. The hero photo now runs straight into the marquee band in both themes.
- Glass cards drop to the headline's line on laptops: illustration column padding `lg:pt-1` → `lg:pt-9` (36px). Cards now start at 176px vs the headline box at 148px, instead of sitting up at the kicker. Mobile/tablet layout untouched (the offset is `lg:` only).
- Re-verified at an 800px-tall viewport: stats row still ends at 732px and the marquee still enters at 756px, so the first screen is unchanged; no gradient-to-cream elements remain in either theme. Production build passes.

## 2026-08-09 01:11

**Hero polish round: first-screen fit, aligned glass cards, theme-reactive hero.**

- **First-screen fit (laptop)**: compressed the hero's vertical rhythm (top/bottom padding, headline scale capped at 3.6rem, tighter paragraph/CTA/stats spacing). Verified at a 800px-tall viewport: stats row bottom lands at 732px and the services marquee peeks in at 777px — both visible without scrolling (client's 14" MacBook has more room than that).
- **Glass cards realigned**: replaced the absolute-positioned, overlapping layout with a deliberate 5-column grid — main analytics card (3 cols) + right column stack (ring card, compliance card) with even 16px gutters. Removed the decorative rings that read as stray overlapping shapes. Verified zero bounding-box overlaps.
- **Theme-reactive hero**: hero stays premium-dark in both themes, but now visibly responds to the toggle via new `--hero-overlay` / `--hero-glass` variables — light mode gets a brighter green-teal overlay (more photo showing through), 2× brighter glass cards, and the bottom fade into the page colour turns mint. Dark mode keeps the deep near-black treatment.
- Production build passes; measurements verified via DOM (preview pane hidden).

## 2026-08-09 01:00

**Hero redesign: premium dark photo hero (both themes), professional glass dashboard element, raised alignment; light theme color-blocking.**

- **Hero**: full-bleed accounting photo (`public/hero-bg.jpg`, tax forms + calculator) under a deep-teal overlay — the hero is now a fixed dark "premium" treatment in BOTH themes, so the first impression is identical and striking. Parallax retained; gold/teal glows on top.
- **New hero element** replacing the cartoon-style SVG: a glassmorphism dashboard composition (frosted `backdrop-blur` cards with fixed light-on-dark styling) — main analytics card ("98.2% returns filed on time" + gold sparkline + effective-rate delta), a 24% savings progress ring, and a compliance calendar checklist with Filed/Due status pills. Staggered entrances + independent floating loops.
- **Alignment fix**: the element column is `items-start` and top-aligned with the kicker/headline (was vertically centred, sitting too low).
- **Header** is now overlay-aware: fixed light text/logo/toggle while floating over the dark hero, switching to theme tokens once scrolled or when the mobile menu opens (`Logo` gained a `tone` prop: default/footer/overlay).
- **Light theme punch-up**: WhyUs cards now carry teal/gold gradient tints, Services fades cream-dark→cream, Testimonials gets a teal-tinted gradient band.
- Verified via DOM (preview pane hidden): photo loads, 3 glass cards render, element top (176px) level with kicker (160px), overlay nav colour correct, dark default intact; production build passes.

## 2026-08-09 00:50

**Light theme recolour — off the white/cream base onto a mint-teal palette.**

- Client feedback: light mode still too dull; no cream *or* plain white. Light theme now sits on a visibly coloured mint base: page `#e7f5ef`, alternate sections `#d4ecdf`, borders `#bcdfd0`, cards `#fbfffd`.
- Accents saturated for pop: gold `#d3941f`, teal `#089a86`; deep teal ink `#06332c` kept for contrast (WCAG-safe on the mint backgrounds).
- Dark theme untouched apart from slightly minted inverted-band tones (`--ink: #e9f5f0`). Dark remains the default theme.
- Hero glow washes strengthened (gold/teal at 20% opacity).
- Verified via DOM (preview pane was hidden): light tokens resolve to the new mint palette, dark default restored; production build passes.

## 2026-08-09 00:46

**Modern revamp: dark-first theming, new fonts, vector hero, themed scroll character, mailto contact form.**

- **Theme system**: semantic CSS variables on `:root`/`.dark` mapped through Tailwind v4 `@theme inline`. **Dark is now the default** (applied pre-paint via inline script; choice persisted in `localStorage`). New `ThemeToggle` (sun/moon) in the header.
- **New light palette** replacing the dull cream: crisp white/mint backgrounds (`#f7faf9`/`#e9f2ef`), deep teal ink (`#08322c`), vivid amber gold (`#c98b2d`) + new teal accent (`#0e9384`); dark theme uses deep teal-black with brighter gold/teal. Dark sections (Marquee/Process/Footer) intentionally invert to light bands in dark mode.
- **Fonts**: Playfair Display/Jost → **Fraunces** (headings) + **Space Grotesk** (body).
- **Hero**: replaced the stock photo with `HeroIllustration` — a hand-built animated SVG scene (dashboard with rising chart, receipt marked PAID, coin stack, shield badge, sparkles) that floats gently and recolours itself per theme; dot-grid + gold/teal glow background; removed `public/hero-accounting.jpg`.
- **`.text-shine`** teal→gold gradient applied to the accent word of section headings (About, Services, Process, Contact).
- **ScrollCompanion**: the character that travels down the right edge with scroll is now theme-aware — **sun with spinning rays in light mode, cratered moon with twinkling stars in dark mode** (blinking face on both); tracks the `.dark` class via MutationObserver.
- **Contact form**: submit now composes a `mailto:hello@sktaxation.com` URL with subject + all field values and opens the visitor's default mail app; thank-you copy updated accordingly.
- Verified: production build passes; both themes checked in browser (toggle persists, tokens flip, sun/moon swap confirmed); form fields all named and included in the draft.

## 2026-08-03 21:51

**Hero background image added.**

- Added a real accounting photo to the hero (tax forms, calculator, pen — Unsplash, free licence) at `public/hero-accounting.jpg` (290 KB, 2200×1262).
- Rendered full-bleed behind the hero via `next/image` (`fill` + `priority`), desaturated and blended with two cream gradient washes (left-to-right and bottom-to-top) so the light theme and headline legibility are preserved; image pans with the existing parallax.
- Tuned `object-position` (35% 60%) so the calculator/forms — not the photographer's arm — sit under the right side of the hero.
- Replaced the old flat cream circle with a gold-tinted ring + kept the spinning dashed dial on top of the photo.
- Verified in browser at desktop and mobile widths; production build passes.

## 2026-08-03 20:34

**Initial build — complete landing page shipped.**

- Studied reference site (dasanayakaassociates.com) via browser: captured full-page screenshot and extracted content structure (hero → about → services → why-us → team → testimonials → contact → footer).
- Scaffolded Next.js 16 (App Router, TypeScript) + Tailwind CSS v4 + Framer Motion 12 in the repo root.
- Defined light theme design system in `app/globals.css` (cream background, deep-ink green, gold accent — matched to the SK Taxation wordmark aesthetic).
- Set up fonts: Playfair Display (headings) + Jost (body) via `next/font`.
- Built all sections as components:
  - `Header` — fixed, shrinks + blurs on scroll, animated mobile menu
  - `Hero` — word-by-word masked headline reveal, parallax decorative circles, slow-spinning dial, animated stat counters (15+ / 200+ / 98%)
  - `Marquee` — infinite scrolling specialties strip on ink background
  - `About` — reveal-on-scroll copy + 2×2 capability grid
  - `Services` — editorial accordion list (Tax Services, Accounting Services, Financial Advisory, Audit & Assurance, Fractional CFO Services) with hover-expand descriptions, gold ↗ arrows and "Need more help?" pill (per client's reference image)
  - `WhyUs` — three lift-on-hover cards
  - `Process` — dark section, 4 steps with scroll-progress gold line
  - `Testimonials` — auto-rotating quote carousel with dot navigation
  - `Contact` — split layout: contact details + consultation form (UI-only, thank-you state)
  - `Footer` — dark, wordmark + nav + contact columns
- Fixed a real bug found during visual verification: `SplitText` words are fully clipped by `overflow-hidden`, so `whileInView` never fired (IntersectionObserver reports zero intersection for clipped elements). Switched to `useInView` on the unclipped container.
- All animations respect `prefers-reduced-motion`.
- Verified: production build passes (static prerender), full page visually checked in browser at desktop and narrow widths — hero, all sections, and footer render and animate correctly.

**Open items / placeholders:**
- Phone, email, and working hours are placeholders — swap in real client details.
- Contact form has no backend yet (front-end only).
- Favicon is still the default Next.js one; a branded favicon could be generated from the wordmark.
