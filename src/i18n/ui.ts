import type { Locale, SiteContent } from '@/content/schema';
import { es } from '@/content/es';
import { en } from '@/content/en';

const content: Record<Locale, SiteContent> = { es, en };

export function getContent(locale: string): SiteContent {
  return locale === 'en' ? content.en : content.es;
}

export function otherLocale(locale: Locale): Locale {
  return locale === 'es' ? 'en' : 'es';
}

/**
 * Dev-time parity guard: both dictionaries must expose the same number of
 * experiences, projects, certifications and education entries.
 */
export function assertLocaleParity(): void {
  const shape = (c: SiteContent) => ({
    nav: c.nav.length,
    experience: c.experience.length,
    projects: c.projects.length,
    certs: c.about.certs.length,
    education: c.about.education.length,
  });
  const a = JSON.stringify(shape(es));
  const b = JSON.stringify(shape(en));
  if (a !== b) {
    throw new Error(`i18n parity mismatch:\n  es=${a}\n  en=${b}`);
  }
}

assertLocaleParity();
