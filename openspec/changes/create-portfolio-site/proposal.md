## Why

Christian Vergara needs a personal portfolio site to present his profile as a full-stack Software Engineer with a cybersecurity background to recruiters and potential clients. There is no site today — the repository only contains OpenSpec tooling. The reference (midudev's portfolio) sets the bar for structure and polish, but the result must carry Christian's own identity: modern minimalism, emerald accent, a near-black "Cursor-like" dark theme, and smooth, elegant motion.

## What Changes

- Create a new Astro site (latest, static output) under `portafolio-chrisdev/`, using React only as islands, Tailwind CSS v4 (CSS-first config), a small dependency-free `<Reveal>` component for scroll/entrance animations, and Astro's native View Transitions (`<ClientRouter />`).
- Implement a single-page layout with five content areas matching the reference: **Hero**, **Experiencia**, **Proyectos**, **Sobre mí** (with **Certificaciones** + **Educación** sub-blocks), **Contacto/Footer**.
- Implement a sticky **Header** with in-page anchor navigation, a scroll-reactive "pill" treatment, a **theme control** (Light / Dark / System) and a **language control** (ES / EN).
- Implement **bilingual content (ES default at `/`, EN at `/en`)** with per-locale metadata, `hreflang`, localized navigation, and a language switcher that preserves the current section.
- Populate real content from Christian's CV and the provided `openspec/assets/proyectos.md`: 3 work experiences, 4 projects, about text (authored fresh from the CV summary), 7 certifications, 2 education entries, contact details.
- Use generic stock imagery from the internet for project thumbnails and the avatar, each marked as a placeholder to be replaced later.
- Meet quality bars for **SEO**, **accessibility (WCAG 2.1 AA)**, and **performance (Core Web Vitals)** on both desktop and mobile, favouring semantic HTML, CSS grid for layout, and minimal custom CSS.
- Provide a **"Descargar CV"** action linking to the bundled PDF.
- As the final step, relocate `openspec/` and `.claude/` into `portafolio-chrisdev/` so the project is self-contained.

Not in scope: contact form with backend (contact is links + `mailto:` only), CMS, blog, analytics, real project screenshots, custom domain/deploy configuration.

## Capabilities

### New Capabilities

- `site-shell`: Global page shell — HTML document structure, sticky header with anchor navigation and scroll-reactive styling, footer, theme selection (Light/Dark/System with no-flash hydration), bilingual routing (ES at `/`, EN at `/en`) and language switching, and page/section View Transitions.
- `portfolio-sections`: The five content areas (Hero, Experiencia, Proyectos, Sobre mí incl. Certificaciones + Educación, Contacto) — their required content, structure, responsive layout, and entrance/scroll animations driven from localized data files.
- `seo-metadata`: Per-locale `<title>`, meta description, Open Graph / Twitter cards, canonical URLs, `hreflang` alternates, `sitemap.xml`, `robots.txt`, and `Person` JSON-LD structured data.
- `accessibility-performance`: Cross-cutting quality requirements — semantic landmarks and heading order, full keyboard operability and visible focus, color-contrast AA in both themes, `prefers-reduced-motion` handling, responsive behavior from 320px up, and Core Web Vitals / Lighthouse budgets.

### Modified Capabilities

None — greenfield project.

## Impact

- **New project directory**: `portafolio-chrisdev/` (Astro latest, React, Tailwind v4).
- **New dependencies**: `astro`, `@astrojs/react`, `react`, `react-dom`, `tailwindcss` v4 + `@tailwindcss/vite`, `@astrojs/sitemap`, a variable-font package; icons inline as SVG. No animation library — `<Reveal>` is hand-rolled.
- **Assets**: `openspec/assets/Christian_Vergara_CV_Software_2026_Optimizado.pdf` copied into the site as the downloadable CV; reference images in `openspec/assets/` inform design only.
- **Repository layout**: `openspec/` and `.claude/` move from repo root into `portafolio-chrisdev/` at the end of implementation.
- **Tooling**: `pnpm` as package manager; Node 20+.
