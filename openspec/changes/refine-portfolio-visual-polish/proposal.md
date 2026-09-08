## Why

The portfolio site is live but several areas fall short of the polish set by the reference (midudev's portfolio): the header condenses too bluntly and carries an unwanted `CV` monogram, the experience timeline dots read as visual noise, the projects section shows all four cards flat with plain text tech chips, corner radii are inconsistent, the browser tab still uses the default favicon, and the "Disponible para trabajar" badge lacks the animated treatment it has in the reference. This change closes that visual-parity gap without touching content or information architecture.

## What Changes

- **Header**: remove the `CV` monogram link; rebuild it as a single centered, content-width, fully-rounded (pill) bar like the reference; at the top it is bare (no background), and on scroll it *eases* into a glass state (blur + translucency + hairline border + soft shadow) while contracting slightly — the transition is animated smoothly in both directions (the previous build snapped because it interpolated `max-width` from `none`); add a thin `|` divider separating the nav area from the language + theme controls.
- **Content width**: narrow the shared content column (hero + all sections) from `max-w-5xl` to `max-w-4xl` to match the reference's tighter measure.
- **Section headings**: drop the boxed icon tile — render the icon inline with the title in the accent color and use a short accent gradient underline, like the reference.
- **Language switch bug**: the switch is stuck after one use (the persisted header keeps the stale `href`); make it re-point to the other locale on every navigation so it toggles freely both ways.
- **Experience timeline**: redesign the per-item dot so it reads as an intentional marker (crisper size, ring against the track line, restrained accent glow, single optional "ping" on the most recent role only) instead of the current look.
- **Projects**: paginate the four projects — 2 per page on desktop (2 pages), 1 per page on mobile (4 pages) — with a `‹ · · ›` control (prev/next arrows + clickable dots), no autoplay. Add brand-logo tech chips: an inline brand-icon registry (Next.js, React, TypeScript, Tailwind CSS, Vite, Motion…), each chip in its brand color like the reference; entries with no brand mark (e.g. `SEO`) render as a plain rounded chip; Logtrics (client didn't clear its full stack) shows only Next.js / TypeScript / Tailwind CSS plus a "Confidencial" / "Confidential" lock badge. Change the thumbnail hover so the image scales **down** toward its natural framing (revealing more of the shot) over a soft backlit glow, replacing the current zoom-in.
- **Rounding**: move buttons, badges, and tech chips to full pill (`rounded-full`); increase card/container radius (project cards, about cards, contact cards → `rounded-3xl`) for a consistent, softer language matching the reference.
- **Favicon**: use `/public/logo.png` as the browser-tab icon (with the existing `favicon.svg` kept as an alternate).
- **Availability badge**: add an animated conic-gradient border beam around the "Disponible para trabajar" pill and a subtle grow-on-hover, matching the reference; disabled under `prefers-reduced-motion`.

Not in scope: new sections, information-architecture changes, analytics. (The projects lead copy and image `alt` text are refreshed to drop the "placeholder/example" wording now that real screenshots are in place — the author brought in the assets; this change updates the words around them.) All icons remain inline SVG (no runtime icon library); brand-logo path data comes from `simple-icons`, a build-time devDependency only.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `site-shell`: Header becomes a centered content-width pill with no monogram, a nav↔controls divider, and a smoothly-eased bare→glass transition on scroll; the browser-tab favicon requirement changes to use the logo, sized for a tab.
- `portfolio-sections`: Experience timeline marker appearance is specified; Projects gains a pagination requirement (2-up desktop / 1-up mobile with arrows + dots), brand-logo tech chips, and a defined thumbnail hover; a shared content-measure requirement and a global control-shape requirement (pill buttons/badges/chips, larger card radius) are added; the availability badge gains an animated border and hover-grow, all motion-safe.

## Impact

- **Components**: `src/components/Header.astro` (full rebuild — pill markup + scroll script), `src/components/LangSwitch.astro` + `src/components/ThemeMenu.astro` (bare controls inside the pill), `src/components/Experience.astro`, `src/components/Projects.astro` (inline pagination script + styles), `src/components/Badge.astro`, `src/components/Hero.astro`, `src/components/Contact.astro`, `src/components/About.astro`, `src/components/Footer.astro`, `src/components/SectionHeading.astro` (radius + `max-w-4xl`).
- **New file(s)**: `src/lib/tech-icons.ts` — brand-SVG registry keyed by normalized tech label, sourcing path data + brand hex from `simple-icons`; `src/components/TechChip.astro` — renders a branded or plain pill.
- **New devDependency**: `simple-icons` (brand path data resolved at build time; nothing ships to the client but the inlined `<path>` strings). No runtime dependency added.
- **Styles**: `src/styles/global.css` — header condense transition, glass backdrop tokens, border-beam keyframes, reduced-motion backstops.
- **Layout**: `src/layouts/Layout.astro` — `<link rel="icon">` entries.
- **Content/data**: `es.ts` / `en.ts` — Logtrics `tech` trimmed to `Next.js / TypeScript / Tailwind CSS / Confidencial|Confidential`; `projectsLead` rewritten (recent work + 83+ projects); the four project `imageAlt`s and `about.photoAlt` drop "de ejemplo" / "Sample"; project order → Logtrics, Academia, Liguanova, Black Fresh. New `ui` keys for the pager.
- **Assets**: `public/logo.png` composed into `favicon-{32,48,180}.png`; real project screenshots + author photo live under `src/assets/` (so only optimized WebP ships); unused placeholder JPGs deleted.
- **One build-time devDependency** (`simple-icons`); a `browserslist` key added to `package.json` (so Lightning CSS keeps the standard `backdrop-filter`); no runtime dependency changes. No new runtime JavaScript beyond the projects pagination control and the language-switch re-point.
