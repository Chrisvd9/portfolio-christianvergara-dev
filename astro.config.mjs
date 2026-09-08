// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// React is installed and ready for interactive islands. The current site ships
// zero framework JS on purpose (see design.md D1/D7), so the integration is
// left out to avoid an unused runtime chunk. To add a React island:
//   1. `import react from '@astrojs/react'`
//   2. add `react()` to `integrations` below
//   3. use a `.tsx` component with a `client:*` directive

// TODO: replace with the real production domain once chosen.
const SITE = 'https://portafolio-chrisdev.pages.dev';

export default defineConfig({
  site: SITE,
  trailingSlash: 'never',
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: { es: 'es', en: 'en' },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
