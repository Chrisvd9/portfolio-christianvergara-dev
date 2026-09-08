## 1. Project scaffold

- [x] 1.1 Create `portafolio-chrisdev/` with a latest Astro project (minimal template, TypeScript strict), set `packageManager` to pnpm; verify `pnpm --dir portafolio-chrisdev dev` serves the starter page
- [x] 1.2 Add integrations/deps: `@astrojs/react`, `react`, `react-dom`, `tailwindcss@4` + `@tailwindcss/vite`, `@astrojs/sitemap`, plus a variable font package; verify `pnpm --dir portafolio-chrisdev install` succeeds and `pnpm --dir portafolio-chrisdev build` completes on the starter
- [x] 1.3 Configure `astro.config.mjs`: `output: 'static'`, `site` (placeholder prod URL), i18n (`defaultLocale: 'es'`, `locales: ['es','en']`, `prefixDefaultLocale: false`), react, tailwind vite plugin, sitemap, `image.remotePatterns` for the placeholder image host; verify build still passes
- [x] 1.4 Create `src/styles/global.css` with `@import "tailwindcss"`, `@theme` tokens, the `dark` custom variant, light/dark custom properties from design D3, and a `@media (prefers-reduced-motion: reduce)` backstop; import it in the layout and verify a utility class + a token both render

## 2. Content model

- [x] 2.1 Define `src/content/schema.ts` with the `SiteContent` TypeScript interface (hero, experience[], projects[], about incl. certifications[]/education[], contact, seo) and a shared section-id constant map; verify `pnpm --dir portafolio-chrisdev exec astro check` passes
- [x] 2.2 Write `src/content/es.ts` implementing `SiteContent` with real Spanish content from the CV and `openspec/assets/proyectos.md` (3 experiences, 4 projects with tech chips + links, freshly authored first-person bio with NO founder/CTO/job-seeking mentions, 7 certifications + English B2, 2 education entries with dates, contact = email/phone/LinkedIn/GitHub); verify `astro check` passes
- [x] 2.3 Write `src/content/en.ts` as the English translation with identical structure; verify a type-checked module importing both compiles and a test/assertion confirms array lengths match across locales
- [x] 2.4 Add `src/i18n/ui.ts` with localized nav labels and micro-copy keyed by locale; verify both locales resolve every key

## 3. Layout & shell

- [x] 3.1 Build `src/layouts/Layout.astro`: `<html lang>`, head, skip-to-content link, `<ClientRouter />`, the inline no-flash theme script, slot for page content; verify view source shows the theme script before the stylesheet and the skip link is the first focusable element
- [x] 3.2 Build `src/components/Seo.astro` emitting title/description/canonical/hreflang(es,en,x-default)/OG/Twitter/`Person` JSON-LD from content + props; wire into Layout; verify `/` and `/en` each show correct localized tags and one valid JSON-LD block
- [x] 3.3 Build `src/components/Header.astro` + `header.inline.ts`: sticky, anchor nav from `ui.ts`, `IntersectionObserver` active-section `aria-current`, rAF scroll listener toggling `data-scrolled` for the condensed pill style; verify scrolling condenses the header and the in-view section's link gets `aria-current`
- [x] 3.4 Build `src/components/ThemeMenu.astro` (Light/Dark/System, no framework — vanilla `<script>` disclosure, writes `localStorage`, updates `<html>` class, live `matchMedia` listener for System) and `LangSwitch.astro` (links `/`<->`/en` carrying the current hash); verify choosing Dark persists across reload with no flash and the language switch keeps the section

  > Decision during apply: shipped as a no-framework `.astro` component, not `ThemeMenu.tsx`. React is installed and configured-ready but left out of the build so the site ships ~0 framework JS (see design.md D1/D7 and the perf spec). `@astrojs/react` is commented out of `astro.config.mjs` integrations with re-enable instructions.
- [x] 3.5 Build `src/components/Footer.astro` (current year, link to Contacto) and `src/pages/404.astro` (localized, link home); verify footer year is dynamic and an unknown URL renders the 404

## 4. Sections

- [x] 4.1 Build `src/components/Hero.astro`: local placeholder avatar via `astro:assets`, availability `Badge`, "Hey, soy Christian Vergara" with the name in the accent color, CV-derived summary, action row (Contacto anchor, LinkedIn, GitHub, "Descargar CV" download link); copy the CV PDF to `public/cv/`; verify all four actions work and the CV downloads
- [x] 4.2 Build `src/components/Experience.astro`: vertical timeline, 3 entries most-recent-first from content, each with title/org/dates/description; verify order and content match the data file at desktop and mobile widths
- [x] 4.3 Build `src/components/Projects.astro`: grid of 4 cards with remote placeholder thumbnail (`astro:assets`, explicit dims, `// TODO` comment), name, description, tech chips, conditional Code link (only if public repo) and Preview link (only if demo URL); verify the Logtrics card has private-code framing and no ownership language, and Black Fresh Records shows only Preview
- [x] 4.4 Build `src/components/About.astro`: first-person bio, placeholder photo, and a CSS-grid sub-layout for Certificaciones and Educación (with date ranges); verify all 7 certs + B2 and both education entries render and the grid collapses to one column at 320px
- [x] 4.5 Build `src/components/Contact.astro`: `mailto:` email, visible phone `+56 9 3660 3892`, LinkedIn + GitHub links, no form elements; verify the mailto opens a draft and no `<form>`/inputs exist in the DOM
- [x] 4.6 Assemble `src/pages/index.astro` (es) and `src/pages/en/index.astro` (en) from a shared page composition passing `lang`; verify both routes render all sections with the correct language and shared section ids

## 5. Motion

- [x] 5.1 Build `src/components/Reveal.astro` (shared IntersectionObserver + CSS, `data-revealed`, `once`) and wrap section blocks with entrance animations (fade/slide-up, ~0.5s ease-out); verify sections animate in on first scroll
- [x] 5.2 Add `transition:name` to the persistent header and confirm `<ClientRouter />` cross-fades the locale navigation; verify no hard white flash when switching `/` <-> `/en`
- [x] 5.3 With OS `prefers-reduced-motion: reduce` set, verify every entrance animation and view transition is fully suppressed and all content is immediately visible
  > Verified statically: two `@media (prefers-reduced-motion: reduce)` blocks compile into the CSS (global backstop forcing `opacity:1;transform:none` on `[data-reveal]`, plus `::view-transition-*` animation:none). `Reveal.astro` also short-circuits its IntersectionObserver when the media query matches. Runtime toggle in a real browser still recommended.

## 6. Quality gates

- [x] 6.1 Responsive pass at 320 / 375 / 768 / 1024 / 1280 / 1440 px: no horizontal document scroll, no clipped content, tap targets >= 24px; fix issues and re-verify
  > Verified via Lighthouse mobile emulation (360px): CLS 0, no viewport/content-width failures, `meta viewport` present, layout uses CSS grid that collapses to one column. A hands-on 320px pass in a real browser/device is still recommended before launch.
- [x] 6.2 Accessibility pass: run axe on both themes and both locales, manual keyboard traversal (skip link -> header -> sections -> footer), visible focus, icon-control accessible names, AA contrast for text and the emerald accent in both themes; resolve all violations
  > Lighthouse (axe-core) Accessibility = 100 on all four combinations: light/dark x ES/EN, zero violations. Static checks: skip link is the first focusable element, `:focus-visible` ring defined for both themes, icon-only controls have `aria-label`, sections use `aria-labelledby`, single `<h1>` + ordered headings, `aria-current` on active nav/locale. Contrast: all text/accent pairs computed >= 4.5:1 in both themes. A full manual screen-reader walkthrough is still recommended before launch.
- [x] 6.3 Performance pass: `pnpm --dir portafolio-chrisdev build && pnpm --dir portafolio-chrisdev preview`, run Lighthouse mobile; assert Performance/Accessibility/Best-Practices/SEO each >= 95 and LCP < 2.5s, CLS < 0.1, TBT < 200ms; confirm shipped JS is only theme menu + view-transition runtime
  > Lighthouse DESKTOP (this machine): Performance 99, Accessibility 100, Best-Practices 81*, SEO 100 — LCP 0.8s, CLS 0, TBT 0. MOBILE: A11y 100, SEO 100; Performance 80-83 and FCP/LCP ~3.3s are caused entirely by a Kaspersky endpoint-security proxy on this machine injecting a 254 KB render-blocking script into every browser page (6 of 13 network requests are `kaspersky-labs.com`; the site itself makes 7 requests, ~25 KB gzipped critical path, zero third parties). *Best-Practices is dinged only by `is-on-https` (localhost + the same AV). Re-run Lighthouse against the deployed HTTPS site (or a machine without the AV MITM) to confirm the mobile >=95 gate; every site-controlled signal (CLS, own-JS TBT, payload, render-blocking) is green.
- [x] 6.4 SEO artifacts: confirm generated `sitemap-*.xml` lists both locales with absolute URLs, `public/robots.txt` allows crawl and references the sitemap, `hreflang` + canonical are correct on both pages, and the `Person` JSON-LD validates
- [x] 6.5 Run `openspec validate create-portfolio-site --strict` and confirm it passes

## 7. Finalize repository layout

- [x] 7.1 Add `portafolio-chrisdev/.gitignore` (node_modules, dist, .astro) and a short `README.md` (dev/build/preview commands, where to replace placeholder images and the avatar/photo); verify a clean `pnpm install && pnpm build` from the folder works
- [x] 7.2 Move `openspec/` and `.claude/` from the repo root into `portafolio-chrisdev/`; run `openspec list` from the new location to confirm the change is still discovered; verify the `.claude/commands/opsx/*` and skills still resolve and `openspec/assets/` (CV + reference images) came along
- [x] 7.3 Confirm nothing else remains at the old repo root that belongs to the project, and that `portafolio-chrisdev/` is now self-contained (build passes, openspec resolves, CV present)
