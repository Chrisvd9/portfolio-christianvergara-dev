## Context

The site is built and matches the create-portfolio-site specs. Stack (see that change's `design.md`): Astro 7 static, Tailwind v4 CSS-first (`src/styles/global.css`), zero framework JS — interactivity is small inline `<script>` blocks re-run on `astro:after-swap` (Header, ThemeMenu, LangSwitch, Reveal). React is installed but the integration is **not** enabled in `astro.config.mjs`.

This change is visual-parity polish against midudev's portfolio (source captured at `openspec/assets/midudev-portafolio-codigofuente.html`). See `proposal.md` for the "why" and `specs/` for the behavior contract. Nothing here changes content, routing, or information architecture.

Relevant current code:
- `src/components/Header.astro` — `#header-bar` toggles `data-scrolled` via a rAF scroll listener; the first pass of this change condensed `max-w-5xl → max-w-3xl` on scroll, which snapped (`max-width: none` can't interpolate). It also rendered a `CV` monogram `<a>`. `LangSwitch` / `ThemeMenu` carry their own `border` + `bg-surface`. See D1 for the rebuild.
- `src/components/Experience.astro` — `<ol class="relative ml-1 border-l border-border">`; each marker is `<span class="absolute -left-[7px] mt-1.5 grid h-3.5 w-3.5 ... rounded-full border-2 border-bg bg-accent-strong">`.
- `src/components/Projects.astro` — maps all 4 projects into a `grid sm:grid-cols-2`; tech chips are `<li class="rounded-md border ...">{t}</li>`; thumbnail hover is `group-hover:scale-[1.03]` (zoom **in**).
- `src/components/Badge.astro` — used only by Hero; pill with a ping dot.
- `src/components/Icon.astro` — inline stroke-icon registry (UI glyphs, `currentColor`). Brand logos are multi-color/fill and do not belong here.
- `src/layouts/Layout.astro` — head declares only `<link rel="icon" href="/favicon.svg">`.
- Design tokens incl. `--accent`, `--accent-strong`, `--accent-glow` (space-separated RGB) live in `global.css`; `@media (prefers-reduced-motion: reduce)` already hard-kills animations/transitions globally.

Constraint: keep the zero-dependency, near-zero-JS posture. Any new interactivity is a small inline script following the existing `init(); document.addEventListener('astro:after-swap', init)` pattern.

## Goals / Non-Goals

**Goals:**

- Reference-faithful header, timeline markers, project presentation, corner-radius language, favicon, and availability badge — without regressing performance, a11y, or the ES/EN + light/dark parity.
- New motion is opt-in and fully inert under `prefers-reduced-motion` (rely on the existing global backstop **plus** explicit `motion-reduce:` / `motion-safe:` utilities where the final state must still differ).
- One build-time-only devDependency (`simple-icons`) for brand path data; no runtime dependency, no enabling the React integration.

**Non-Goals:**

- No carousel/animation library. No React island for pagination. No _runtime_ icon library — `simple-icons` is dev-only and its path strings are inlined at build.
- No change to project data, order, or copy (tech-label normalization is lookup-only — the displayed string is unchanged).
- No redesign of section layout, spacing rhythm, or typography beyond corner radius and the specific items above.

## Decisions

### D1: Header — content-width pill, smooth bare→glass on scroll

The first build tried to animate `max-width` from `none` (5xl parent) to `max-w-3xl`; `max-width: none` is not interpolatable, so the width **snapped** while padding/background eased — the "brusco" the user reported. Fix: stop animating width entirely and make the bar content-width like the reference.

- **Structure**: `<header>` is `fixed inset-x-0 top-0 flex flex-col items-center` (centers the pill and, below it, the mobile dropdown). Inside, one `#header-bar` — `relative flex items-center gap-1 rounded-full px-1.5 py-1.5` — sized to its contents, no `max-width`, no wrapper. Order: `[nav (md+) | mobile toggle]` · divider · `LangSwitch` · `ThemeMenu`. Delete the `CV` monogram and its now-unused `localizedHome` import.
- **Controls**: strip the individual `border`/`bg-surface` off `LangSwitch` and `ThemeMenu`'s trigger so they read as bare glyphs inside the pill (matches the reference); keep their hover colour and hit area (`h-8`).
- **Mobile**: keep the hamburger + dropdown below `md` — all four labels plus the two controls don't fit a centred pill under ~360px. The dropdown moves under the centred pill (`w-[min(15rem,calc(100vw-1.5rem))]`).
- **Scroll transition** (`global.css`, keyed off `#header-bar[data-scrolled]`, toggled by the existing rAF scroll listener at `CONDENSE_AT = 28`):
  - **The glass — `backdrop-filter` + translucent background + border + shadow — is on `#header-bar` itself**, exactly like the reference's `.header-nav`. A child layer at `z-index: -10` (the prior attempt) is painted *behind* its parent and does **not** get a real backdrop in Chrome — the blur silently no-ops. That was the persisting "no se ve el blur".
  - At rest `#header-bar` declares **no** `backdrop-filter` (it is `none`). On scroll it becomes `blur(16px) saturate(170%)`, plus `background: color-mix(in srgb, var(--bg) 68%, transparent)`, `border-color: var(--border)`, a soft shadow — all in the `0.42s var(--ease-out-soft)` transition (Chrome interpolates `backdrop-filter` from `none`; where it can't, the fading background covers it). Do **not** use `blur(0)` as the rest value — Lightning CSS rewrites it to the invalid `blur()`.
  - **No `transform` anywhere on the header** — a transform on `#header-bar` makes it a *backdrop root*, so its own `backdrop-filter` has nothing to sample. The contract is interpolatable properties only: `padding 8px → 5px`, `gap`, and `a[data-navlink]` `padding-block`, all `0.42s`. Net effect ≈ the earlier `scale(0.94)` (pill 48 → ~42 px tall, a few px narrower) with the blur intact.
  - **`browserslist` in `package.json`** — Tailwind v4's Lightning CSS was dropping the unprefixed `backdrop-filter`; the explicit modern-browser target makes it emit both spellings.
  - `@supports not ((backdrop-filter:…) or (-webkit-backdrop-filter:…))` bumps the scrolled background to `92%` opacity.
- **Divider**: one `<span aria-hidden class="mx-0.5 h-5 w-px bg-border">` before the controls.
- **No `transition:persist` on `<header>`** — see D1c (language switch). `transition:name="site-header"` stays for the morph.
- Reduced motion: the global `prefers-reduced-motion` rule zeroes `transition-duration`, so the scrolled padding + `blur(16px)` + translucency apply instantly. Verified: 80 ms after scroll under emulated `reduce`, computed `backdrop-filter` is already `blur(16px) saturate(1.7)`, padding `5px`.

Verified with a software-GL headless capture (`--disable-gpu` does not composite `backdrop-filter` — that gave two earlier false passes): with the glass on `#header-bar` directly, page text behind the pill is visibly frosted.

### D1c: Language switch — must work repeatedly

`<header>` had `transition:persist`, so on a client-side nav (`/` → `/en`) the **same** `<a data-langswitch href="/en">` DOM node carried over — still pointing at English while now *on* English. Second click → `/en` again; the visitor is stuck. (Made worse by the hash-carry script permanently rewriting `a.href` to an absolute URL.)

Fix, both layers:
1. Drop `transition:persist` from `<header>` (keep `transition:name`). The header re-renders per navigation with the correct server-rendered href.
2. Rewrite the `LangSwitch` inline script to **recompute** on every `astro:page-load`: derive the target locale from `location.pathname` (`/en*` → `es`, else `en`), then set each `a[data-langswitch]` `href` (`'/' | '/en'` + current `location.hash`), `hreflang`, `aria-label`, and visible label. Self-correcting regardless of persist.

Verified: `/` → click → `/en` (label "ES", href `/`) → click → `/` (label "EN", href `/en`) → click → `/en`… indefinitely.

### D1b: Content measure → `max-w-4xl`

The reference uses `lg:max-w-4xl` for its column; the site was on `max-w-5xl`. Swap `max-w-5xl → max-w-4xl` in the six components that set it (`Hero`, `Experience`, `Projects`, `About`, `Contact`, `Footer`). Pure find-and-replace; no layout logic changes.

### D2: Experience timeline markers

Replace the single-span marker with the reference's nested structure, centered on the 1px track line (`ol` `border-l`, each `li` `ml-6`; a 14px box at `-left-[7px]` straddles the line):

```
<span class="absolute -left-[7px] mt-1.5 flex size-3.5 items-center justify-center" aria-hidden="true">
  {isFirst && (
    <span class="absolute inline-flex size-full rounded-full bg-accent-strong/40 animate-ping motion-reduce:hidden"></span>
  )}
  <span class="relative inline-flex size-2.5 rounded-full bg-accent-strong ring-2 ring-bg
               shadow-[0_0_8px_2px_rgb(var(--accent-glow)/0.45)]"></span>
</span>
```

- `ring-2 ring-bg` is the separating ring against the track line; the `shadow` is the restrained glow (uses the existing `--accent-glow` token).
- Only `experience[0]` (most recent) gets the `animate-ping` layer — pass an `isFirst`/index check in the `.map`.
- Reduced motion: `motion-reduce:hidden` on the ping keeps every dot static; the global rule would also freeze it, but hiding is cleaner.

### D3: Projects — pagination

- **PerView**: 2 on `min-width: 768px` (`md`), else 1. Read via `window.matchMedia('(min-width: 768px)')`.
- **Markup**: keep the `projects.map(...)` output, but wrap it in an overflow-hidden viewport with a flex track:
  ```
  <div data-projects-viewport class="overflow-hidden">
    <ul data-projects-track class="flex transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none">
      {projects.map(p => <li class="w-full shrink-0 md:w-1/2 px-0 md:px-3">…card…</li>)}
    </ul>
  </div>
  ```
  (Negative margin on the track or `gap` handled with per-item padding to keep the 2-up math exact.)
- **Control**: below the viewport — a prev `<button>`, one `<button role="tab">`-style dot per page, a next `<button>`. All real buttons, `aria-label`s from `ui` strings (add keys), `aria-current="true"` on the active dot, visible `:focus-visible` (global rule already provides it).
- **Script** (inline, `init()` + `astro:after-swap`): compute `perView` from the media query, `pageCount = ceil(total / perView)`, clamp `current`, set `track.style.transform = translateX(-current * 100 / perView * ... )` — simpler: `translateX(-current * 100%)` where the track width is `pageCount * 100%` and each page is a flex row; **chosen** simpler model: track holds items directly, `transform: translateX(calc(-1 * current * 100%))` works only for 1-up. For 2-up, shift by `current * (100% * perView/… )`. Cleanest: `track.style.transform = 'translateX(-' + (current * 100 / pageCount) + '%')` with `track` width `= pageCount/perView * 100%`? This gets fiddly.
  **Final model:** track is `display:flex`, each item `flex: 0 0 (100/perView)%`. Shift = `current * 100%` of the *viewport* → `track.style.transform = translateX(-${current * 100}%)` is wrong for perView=2 (would skip 2 items but 1 page = 2 items, so page N starts at item N*2 → offset N*100% of viewport). ✅ It IS correct: one "page" == one viewport width == `perView` items. So `translateX(-current*100%)` is right for both perView values. Rebuild dots on `resize` when `perView` flips.
- Re-render dots on media-query change; keep `current` page's leading item visible (recompute `current = floor(oldLeadingIndex / perView)`).
- Reduced motion: `motion-reduce:transition-none` on the track → instant page change.

Alternative considered: CSS scroll-snap carousel — better native touch, but 2-up snap points + a synced dot/arrow state is more JS than the translateX model, and arrow "disabled at ends" semantics are muddier.

### D4: Projects — brand tech chips

- New `src/lib/tech-icons.ts`: imports the needed `si*` entries from `simple-icons` (each exposes `.path` — a 24×24 single-path `d` string — and `.hex` — the brand color). Exports `normalizeTech(label)` (`label.toLowerCase().replace(/\s+/g,'').replace(/\d+$/,'')` → `"React 19"` → `react`, `"Next.js"` → `next.js`, `"Tailwind CSS"` → `tailwindcss`) and `techIcons: Record<string, { path: string; bg: string; fg: string }>` keyed by that normalized label. `bg` is `#${hex}` (or a hand-picked darker brand shade where the raw hex can't carry legible text); `fg` (`#fff` or `#0b0c0e`) is chosen per brand to clear 4.5:1 on `bg` and is also the glyph color.
- New `src/components/TechChip.astro`: takes `label`; looks up `techIcons[normalizeTech(label)]`; if found → `<li><span class="inline-flex items-center gap-x-1.5 rounded-full px-2.5 py-1 text-xs font-medium" style={`background:${bg};color:${fg}`}><svg viewBox="0 0 24 24" class="size-3.5" fill="currentColor" aria-hidden="true" set:html={`<path d="${path}"/>`} />{label}</span></li>`; else → plain pill `<li><span class="rounded-full border border-border bg-bg px-2.5 py-1 text-xs text-muted">{label}</span></li>`.
- Seed keys: `next.js` (`siNextdotjs`), `react` (`siReact`), `typescript` (`siTypescript`), `tailwindcss` (`siTailwindcss`), `vite` (`siVite`), `motion` (`siFramer` — `siMotion`/`siOpenai` don't exist in the installed version), plus `supabase`/`vercel` kept as headroom. `SEO` and any unmatched label fall through to the plain pill.
- **`Confidencial` / `Confidential`** is a *third* branch, checked before the brand lookup: for the Logtrics card the client didn't clear disclosing its full stack, so its `tech` array is `['Next.js', 'TypeScript', 'Tailwind CSS', 'Confidencial'|'Confidential']` (per locale) and `TechChip` renders that label as a lock-marked badge — dashed muted border, `Icon name="lock"`, `text-muted` — distinct from both branded and plain pills.
- `set:html` only the `<path>` (data from a trusted dev package, no user input). The monochrome `fill="currentColor"` model keeps every chip visually consistent (brand bg + single-color glyph), which reads as "branded" without shipping multi-color artwork.
- A11y: chip text carries the label, so the SVG is `aria-hidden`. Contrast pairs recorded as a comment in `tech-icons.ts`.

### D5: Projects — thumbnail hover (scale-down + backlight)

- Image: `md:scale-110` at rest (slight overscan crop), `md:group-hover:scale-100` on hover — scales **down** to natural framing, revealing more of the shot. Transition `duration-500` soft easing. Mirror midudev (`md:scale-110` → `md:group-hover:scale-105`), a touch stronger.
- Backlight: on the card's image wrapper, an absolutely-positioned `-z-10` glow that fades in on hover — `before:` or a sibling `<div aria-hidden class="pointer-events-none absolute -inset-4 -z-10 rounded-[inherit] bg-[radial-gradient(closest-side,rgb(var(--accent-glow)/0.28),transparent)] opacity-0 transition-opacity duration-500 group-hover:opacity-100">`. Card needs `relative` + `isolate`.
- Guard both with `motion-safe:` / rely on global reduced-motion (transitions zeroed → no fade, no scale change). Add `motion-reduce:` explicit `scale-100` so RM users see the natural framing, not the cropped rest state.

### D5b: Section headings → reference style

`SectionHeading.astro` currently boxes the icon in a `rounded-2xl border bg-surface` tile and draws a full-width `border`-colored underline. The reference has the icon *inline* in the heading (`<h2 class="flex items-center gap-x-3">`, `size-8` accent SVG, no box) and a short accent underline (`h-px w-20 bg-gradient-to-r from-<accent>/70 to-transparent`). Rework the component to match: drop the `<span>` tile, put `<Icon … class="text-accent" size={30}>` as the first child of the `<h2>`, and change the underline to `mt-4 h-px w-20 from-accent/70 to-transparent`. (Task 4.5's "glyph tile → rounded-2xl" for `SectionHeading` is superseded; `Contact.astro`'s channel tiles keep `rounded-2xl`.)

### D6: Corner-radius sweep → pill + rounder cards

One pass across components; no token needed (Tailwind `rounded-full` / `rounded-3xl`).

| Element | From | To |
|---|---|---|
| Header nav links, mobile panel links | `rounded-lg` / `rounded-xl` | `rounded-full` / `rounded-2xl` panel |
| Hero action buttons (`a`), CV/LinkedIn/GitHub | `rounded-xl` | `rounded-full` |
| Badge | already `rounded-full` | keep |
| Projects: Code/Preview buttons | `rounded-lg` | `rounded-full` |
| Projects: tech chips | `rounded-md` | `rounded-full` (via TechChip) |
| Projects / About / Contact cards | `rounded-2xl` | `rounded-3xl` |
| About inner glow, image | `rounded-2xl/3xl` | image `rounded-3xl` to match card |
| SectionHeading icon tile | `rounded-xl` | `rounded-2xl` (softer, not full — it's a square glyph tile) |
| Contact channel icon tiles | `rounded-xl` | `rounded-2xl` |
| 404 / skip-link / focus | leave | leave |

Parity: same classes render for both locales (shared components) and both themes (no theme-conditional radius).

### D7: Availability badge — border beam + hover grow (in `Badge.astro`)

Wrap the current pill in the reference's conic-gradient border:

```
<span class="group relative inline-flex overflow-hidden rounded-full p-px transition-transform duration-300 motion-safe:hover:scale-105">
  <span aria-hidden="true"
        class="absolute inset-[-1000%] motion-safe:animate-[spin_2s_linear_infinite]
               bg-[conic-gradient(from_90deg_at_50%_50%,var(--accent-strong)_0%,transparent_50%,var(--accent-strong)_100%)]
               motion-reduce:hidden"></span>
  <span class="relative inline-flex items-center gap-2 rounded-full bg-surface px-3.5 py-1.5 text-sm font-medium text-fg backdrop-blur-3xl">
    …ping dot… {label}
  </span>
</span>
```

- `spin` keyframes ship with Tailwind v4 core — arbitrary `animate-[spin_2s_linear_infinite]` just sets duration.
- `motion-safe:` on both the spin and the hover scale; `motion-reduce:hidden` removes the beam so RM users get a clean static pill (the inner `<span>`'s own border/bg reads fine).
- Keep the existing inner ping dot (it already has `motion-reduce:hidden`).
- Badge is only consumed by Hero, so this is contained; Hero markup unchanged.

### D8: Favicon

`public/logo.png` is 1254² / ~231 KB and mostly whitespace — and its `< c / v >` mark is ~3:1, so a plain contain-fit favicon is a tiny sliver. First attempt (plain resize + keeping `favicon.svg` as alternate) still showed a generic letter icon — the browser preferred the stale hand-drawn `favicon.svg`.

Compose a real tile with `sharp` (already a dependency): a 512² dark rounded-rect (`#0b0c0e`, `rx 96`), the **trimmed** logo (`.trim()` → ~1184×377) scaled to ~80% width and centered, then downscaled to `favicon-{32,48,180}.png` (~0.9 / 1.6 / 8 KB) and `favicon-512.png`. **Delete `public/favicon.svg`.** `Layout.astro` head, PNG-only so nothing competes:
```
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
<link rel="icon" type="image/png" sizes="48x48" href="/favicon-48.png" />
<link rel="icon" type="image/png" sizes="180x180" href="/favicon-180.png" />
<link rel="apple-touch-icon" href="/favicon-180.png" />
```
`logo.png` stays in `public/` (unreferenced) as the source asset.

## Risks / Trade-offs

- **Spec ordering** → The two delta files use `## MODIFIED Requirements` against `site-shell` and `portfolio-sections`, which only exist inside the not-yet-archived `create-portfolio-site` change. `openspec validate` passes but archive will refuse until `create-portfolio-site` is archived first. Mitigation: archive `create-portfolio-site` before archiving this change (call out in Migration Plan); no impact on implementation.
- **2-up translateX math** → If item flex-basis and viewport width drift (padding/gutters), pages misalign. Mitigation: gutters as internal item padding, not track gap; item basis exactly `100%/perView`; a Playwright/manual check at 375px, 768px, 1280px.
- **Brand SVG weight** → ~9 inline single-path logos add markup to the projects section HTML. Mitigation: `simple-icons` paths are single-path and compact; chips only render for the techs per card actually listed; still static HTML, no JS, negligible vs. the image payload. `simple-icons` is dev-only — it never reaches the bundle.
- **`simple-icons` export names / "Motion" entry** → the slug for the Motion library may be `siMotion`, `siFramermotion`, or only `siFramer` depending on the installed version. Mitigation: verify exports right after install; fall back to `siFramer` (or a plain pill) for the `motion` key.
- **Brand-color contrast** → Some brand hexes (e.g. Tailwind `#38bdf8`, Supabase `#3ecf8e`) fail 4.5:1 with white text. Mitigation: per-brand `bg` uses a darker brand shade where needed and `fg` is chosen + checked; a brand that can't clear AA either way falls back to the plain pill.
- **`backdrop-saturate` + `backdrop-blur` on Firefox/older Safari** → partial support. Mitigation: `supports-[backdrop-filter]` fallback to a more opaque `bg`; the header stays legible without blur.
- **Scale-down hover reveals placeholder image edges** → current thumbnails are generic placeholders; overscan-at-rest then scale-to-fit could show letterboxing if an asset isn't 16/10. Mitigation: keep `object-cover`; assets already sized 960×600 in the `<Image>` call.

## Migration Plan

1. Implement D1–D8 on a branch; `pnpm check` + `pnpm build` clean.
2. Manual/scripted verification: header at scroll 0 vs >24px (both themes, ES/EN); timeline markers (first pulses, rest static); projects pagination at 375 / 768 / 1280px incl. keyboard + `prefers-reduced-motion`; tech chips (branded + plain "SEO"); thumbnail hover; favicon in a real tab; availability beam + hover, and with RM on.
3. Lighthouse mobile — confirm Performance/Best-Practices/SEO/Accessibility still ≥ 95 and CLS unchanged.
4. Archiving order: `openspec archive create-portfolio-site` first (creates the main specs), then `openspec archive refine-portfolio-visual-polish` (applies these deltas).
5. Rollback: revert the branch merge — all changes are component/style-local, no data or config migration.

## Open Questions

None blocking. Deferred: exact brand list can grow later as new projects/techs are added — additive edits to `tech-icons.ts`, no spec change.
