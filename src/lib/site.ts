/** Stable, locale-independent facts about the site and its owner. */

export const OWNER = {
  name: 'Christian Vergara',
  fullName: 'Christian Vergara Domínguez',
  email: 'christianvd99@gmail.com',
  phoneDisplay: '+56 9 3660 3892',
  phoneHref: 'tel:+56936603892',
  linkedin:
    'https://www.linkedin.com/in/christian-vergara-dom%C3%ADnguez-84061121b/',
  github: 'https://github.com/Chrisvd9',
  githubUser: 'Chrisvd9',
} as const;

/** Downloadable CV, one file served from /public for both locales. */
export const CV_PATH = '/cv/Christian_Vergara_CV.pdf';

export const LOCALES = ['es', 'en'] as const;
export const DEFAULT_LOCALE = 'es';

/** Path for a locale's home page. */
export function localizedHome(locale: string): string {
  return locale === DEFAULT_LOCALE ? '/' : `/${locale}`;
}
