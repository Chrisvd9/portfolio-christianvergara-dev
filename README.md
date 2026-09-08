# portafolio-chrisdev

Personal portfolio for **Christian Vergara** — full-stack Software Engineer with a
cybersecurity background. Astro (static) + Tailwind CSS v4, bilingual ES/EN.

## Stack

| Area | Choice |
| --- | --- |
| Framework | Astro 7 · `output: 'static'` |
| Styles | Tailwind CSS v4 (CSS-first, `src/styles/global.css`) |
| UI JS | None shipped by default — vanilla `<script>` islands only. React is installed and one line away (see `astro.config.mjs`). |
| Motion | Custom `<Reveal>` (IntersectionObserver + CSS) + Astro View Transitions |
| Fonts | Bricolage Grotesque (display) + Onest (body), self-hosted via Fontsource |
| i18n | Astro i18n — ES at `/`, EN at `/en` |
| SEO | per-locale meta, `hreflang`, `@astrojs/sitemap`, `robots.txt`, `Person` JSON-LD |
| Images | `astro:assets` (sharp) → WebP with explicit dimensions |

## Commands

```bash
pnpm install       # Node 20+
pnpm dev           # dev server
pnpm build         # -> dist/
pnpm preview       # serve the production build
pnpm check         # astro + TypeScript diagnostics
```

## Editing content

All copy lives in typed data files — no text is hard-coded in components:

- `src/content/es.ts` — Spanish content
- `src/content/en.ts` — English content (must keep the same shape; a build-time
  guard in `src/i18n/ui.ts` fails if the array counts diverge)
- `src/content/schema.ts` — the `SiteContent` type
- `src/lib/site.ts` — email, phone, social URLs, CV path

## Replacing the placeholders

Everything below is a **generic placeholder** — swap the files, keep the names:

| File | What it is |
| --- | --- |
| `src/assets/avatar.jpg` | hero avatar (square) |
| `src/assets/about.jpg` | "Sobre mí" photo (portrait ~4:5) |
| `src/assets/project-*.jpg` | project thumbnails (16:10) — `logtrics`, `liguanova`, `academia`, `blackfresh` |
| `src/assets/og-cover.jpg` | social share image (1200×630) |
| `public/cv/Christian_Vergara_CV.pdf` | downloadable CV |

Also update **`site`** in `astro.config.mjs` and the `Sitemap:` line in
`public/robots.txt` once the production domain is decided.

## Deploy

Static output — deploy `dist/` to any host (Cloudflare Pages, Vercel, Netlify).
No adapter, no server runtime.

## Project docs

Planning artifacts (proposal, specs, design, tasks) live in
`openspec/changes/` and are managed with the OpenSpec CLI (`openspec list`).
