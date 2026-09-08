## Context

Greenfield. The repo currently holds only `openspec/` and `.claude/`. Reference design is midudev's portfolio (see the screenshots in `openspec/assets/`): sticky pill header, dark-first hero with an accent-colored name, a vertical experience timeline, project cards with thumbnail + tech chips + Code/Preview links, an "about" block with photo, and a minimal footer. Content comes from Christian's CV and `openspec/assets/proyectos.md`. See `proposal.md` for motivation and the `specs/` files for the behavior contract.

Constraints: static hosting, `pnpm`, Node 20+, minimal custom CSS, CSS grid for layout, bilingual ES/EN, WCAG 2.1 AA, Core Web Vitals green on mobile.

## Goals / Non-Goals

**Goals:**

- A content architecture where all copy is localized data, not markup, so ES/EN stay in parity and new entries are one-line edits.
- Ship near-zero JavaScript: static HTML for every section; islands only for the theme menu, the language menu, and the scroll-reactive header.
- One design-token layer in CSS (`@theme` + a small set of custom properties) driving both themes; no per-component stylesheets.
- Motion that is smooth by default and genuinely off under `prefers-reduced-motion`.

**Non-Goals:**

- No component library beyond headless primitives; no Shadcn, no MUI.
- No SSR/edge runtime — `output: 'static'`.
- No design system documentation site, Storybook, or visual regression setup.
- No i18n library runtime — routing and dictionaries are hand-rolled with Astro's built-in i18n config.

## Decisions

### D1: Astro static, React islands only

Latest Astro (v7 at implementation time; the proposal's "Astro 5" predates the check), `output: 'static'`, `@astrojs/react` for the interactive widgets. Astro components (`.astro`) for everything else. Alternatives: Next.js (heavier client runtime, RSC complexity for a static site), SvelteKit (smaller ecosystem for the team, CV centers on React). Astro gives HTML-first output and per-island hydration, which is the most direct path to the performance budget.

### D2: Tailwind v4, CSS-first config

Use `tailwindcss@4` with `@tailwindcss/vite`. Config lives in `src/styles/global.css` via `@theme` — no `tailwind.config.js`. Accent, background, foreground, muted, border defined as CSS custom properties; dark theme overrides them under `.dark` (class strategy, toggled on `<html>`). Rationale: one file, tokens usable in both Tailwind utilities and raw CSS, matches Christian's current stack (Tailwind 4 in Logtrics). Trade-off: v4 is newer; mitigated by it being stable since early 2025 and the config surface being tiny.

### D3: Palette

```
                 light            dark
--bg             #ffffff / warm   oklch(0.145 0.01 260)   ~near-black, faint cool tint (Cursor-like)
--bg-subtle      #faf9f6          oklch(0.19 0.012 260)
--fg             oklch(0.20 0 0)  oklch(0.96 0 0)
--fg-muted       oklch(0.45 0 0)  oklch(0.72 0 0)
--border         oklch(0.90 0 0)  oklch(0.27 0.01 260)
--accent         emerald-600      emerald-400   (Tailwind emerald; 400 on dark for AA on near-black)
--accent-contrast text on accent  always checked >= 4.5:1
```

Light hero gets a subtle warm cream vertical gradient like the reference; dark hero gets a faint emerald radial glow behind the avatar. Accent is used for the name in the hero, active nav, links, and the availability badge.

### D4: Bilingual routing

Astro i18n config: `defaultLocale: 'es'`, `locales: ['es', 'en']`, `routing.prefixDefaultLocale: false` → ES at `/`, EN at `/en`. Pages: `src/pages/index.astro` (es) and `src/pages/en/index.astro` (en), both thin wrappers that pass a `lang` to a shared `<Page lang={lang} />`. Dictionaries: `src/content/es.ts` and `src/content/en.ts`, each exporting a typed `SiteContent` object (same TypeScript interface → compile-time parity enforcement). A `src/i18n/ui.ts` holds nav labels and micro-copy.

Language switch: since it is a single page per locale, the switcher is a link from `/` to `/en` (and back) that carries the current hash (`#proyectos` ↔ `#projects`); a tiny inline script maps section ids between locales, or — simpler — keep the **same** section ids across locales (`experiencia`, `proyectos`, `sobre-mi`, `contacto`) so the hash just transfers. Chosen: same ids both locales; nav labels differ, ids do not.

### D5: Theme control — no-flash

Inline blocking script in `<head>` (before CSS paint) reads `localStorage.theme` (`'light'|'dark'|'system'`), resolves `system` via `matchMedia`, sets `document.documentElement.classList`. The React `<ThemeMenu>` island only manages the dropdown UI and writes `localStorage` + updates the class; it hydrates `client:idle`. A `matchMedia('(prefers-color-scheme: dark)')` listener updates live while in `system` mode. This is the standard Astro pattern and keeps the island tiny.

### D6: Header behavior

`<Header>` is `.astro` with an island (`client:idle`) or a 15-line inline script for: (a) `IntersectionObserver` on sections → toggle `aria-current` on nav links; (b) a scroll listener (rAF-throttled) toggling a `data-scrolled` attribute that drives the pill/condense styling via CSS. Prefer the inline script over a React island here — no state worth a framework.

### D7: Motion

- **Entrance animations**: a local ~30-line `<Reveal>` Astro component — a single shared `IntersectionObserver` toggling a `data-revealed` attribute, with CSS handling the fade/slide-up (~0.5s, `ease-out`, `once`). No animation library.
  - Rationale: `@astroanimate/core` is at v0.1.2 ("full release coming soon"), single-maintainer, and its peer range is `^4 || ^5 || ^6` — it does **not** declare support for the current Astro v7. design.md already sanctioned a plain-CSS fallback for exactly this case. A hand-rolled reveal is smaller, dependency-free, better for the Lighthouse budget, and fully under our control.
- Global `@media (prefers-reduced-motion: reduce)` rule forces `opacity: 1; transform: none; transition: none` on all `[data-reveal]` wrappers as a hard backstop.
- **View transitions**: `<ClientRouter />` in the layout head for cross-fade on locale navigation and 404 return. Named `transition:name` on the header so it persists across the transition. `<ClientRouter />` already disables its animations under `prefers-reduced-motion`.

### D8: Assets & images

- `astro:assets` `<Image>`/`<Picture>` for all raster images → AVIF/WebP, explicit width/height (no CLS).
- Project thumbnails + avatar: remote placeholder URLs (Unsplash source / picsum) listed in the content files with a `// TODO: replace with real screenshot` comment. Add the remote host(s) to `image.domains` / `image.remotePatterns` in `astro.config`.
- CV: copy the PDF to `public/cv/Christian_Vergara_CV.pdf`; Hero "Descargar CV" is a plain `<a href download>`.
- One variable font, self-hosted via `@fontsource-variable/*` (e.g. Onest or Inter), `font-display: swap`, preloaded.

### D9: Structured data & SEO

A `<Seo>` `.astro` component in the layout head takes `lang`, `title`, `description`, `path` and emits: title/description, canonical, `hreflang` (es/en/x-default), OG + Twitter tags, and a `Person` JSON-LD (name, jobTitle per locale, `sameAs` = [LinkedIn, GitHub], `knowsAbout` = key skills). `@astrojs/sitemap` generates `sitemap-index.xml`; `public/robots.txt` references it. `site` set in `astro.config` to the production URL (placeholder `https://portafolio-chrisdev.pages.dev` until a domain is chosen — an Open Question, does not affect specs).

### D10: Project structure

```
portafolio-chrisdev/
  astro.config.mjs
  package.json                pnpm, "packageManager"
  tsconfig.json
  public/
    robots.txt
    cv/Christian_Vergara_CV.pdf
    og/                        static OG image(s)
  src/
    pages/
      index.astro              lang="es"
      en/index.astro           lang="en"
      404.astro
    layouts/
      Layout.astro             <head>, <Seo>, <ClientRouter>, theme no-flash script, skip link
    components/
      Header.astro  + header.inline.ts
      Hero.astro
      Experience.astro
      Projects.astro
      About.astro               includes Certifications + Education sub-grids
      Contact.astro
      Footer.astro
      ThemeMenu.tsx             island, client:idle
      LangSwitch.astro
      Badge.astro
      SectionHeading.astro
      Reveal.astro              entrance-animation wrapper (IntersectionObserver + CSS)
      Seo.astro
    content/
      es.ts  en.ts              typed SiteContent
      schema.ts                 SiteContent interface + types
    i18n/
      ui.ts                     nav labels, section id map
    styles/
      global.css                @import "tailwindcss"; @theme tokens; reduced-motion backstop
  openspec/                     moved here in the final task
  .claude/                      moved here in the final task
```

### D11: Verification

- `pnpm build` + `pnpm preview`, then Lighthouse (mobile preset) against the preview — assert all four categories >= 95.
- `pnpm dlx @axe-core/cli` or a manual axe DevTools pass on both themes + both locales.
- Manual keyboard walkthrough (skip link → header → sections → footer).
- Toggle OS reduced-motion and confirm no animation.
- Validate JSON-LD with a schema validator; confirm `sitemap` + `hreflang` output.
- `openspec validate create-portfolio-site --strict`.

## Risks / Trade-offs

- **Custom `<Reveal>` instead of an animation library** → Chosen deliberately (see D7); the surface is tiny (one IntersectionObserver + CSS). If richer choreography is wanted later, a library can be layered in without spec changes.
- **Tailwind v4 `@theme` + class-based dark mode** edge cases → Use the documented `@custom-variant dark (&:where(.dark, .dark *))`; validate both themes early.
- **Bilingual content drift** (EN falls behind ES) → Shared TypeScript `SiteContent` interface makes a missing field a build error; both dictionaries imported in a type-checked module.
- **Remote placeholder images hurting LCP / privacy** → Keep the hero avatar local (bundled placeholder), only below-the-fold project thumbnails remote; all have explicit dimensions; swap to local assets when real screenshots arrive.
- **View Transitions + island state** → Keep islands stateless-on-navigation; there is only one page per locale so full-page transitions are low-risk.
- **Scope creep into a component library** → Explicit non-goal; headless + Tailwind only.

## Open Questions

- Final production domain / host (affects only the `site` value and OG absolute URLs — placeholder used until decided; no spec or task impact).
- Which variable font (Onest vs Inter vs Geist) — cosmetic, decided during implementation.
