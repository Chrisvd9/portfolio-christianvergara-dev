import type { ImageMetadata } from 'astro';

export type Locale = 'es' | 'en';

/** Section ids are shared verbatim across locales so `#hash` transfers on language switch. */
export const SECTION_IDS = ['experience', 'projects', 'about', 'contact'] as const;
export type SectionId = (typeof SECTION_IDS)[number];

export interface NavItem {
  id: SectionId;
  label: string;
}

export interface HeroContent {
  availability: string;
  greeting: string;
  name: string;
  summary: string;
  contactCta: string;
  cvCta: string;
}

export interface ExperienceItem {
  role: string;
  org: string;
  period: string;
  location: string;
  description: string;
}

export interface Project {
  name: string;
  description: string;
  tech: string[];
  image: ImageMetadata;
  imageAlt: string;
  /** Present only when a public repository exists. */
  repo?: string;
  /** Present only when a live demo exists. */
  demo?: string;
  /** Small print under the title, e.g. "Código privado". */
  note?: string;
}

export interface EducationItem {
  title: string;
  org: string;
  period: string;
}

export interface AboutContent {
  title: string;
  paragraphs: string[];
  photo: ImageMetadata;
  photoAlt: string;
  certsTitle: string;
  certs: string[];
  languagesTitle: string;
  languages: string[];
  educationTitle: string;
  education: EducationItem[];
}

export interface ContactContent {
  title: string;
  lead: string;
  emailLabel: string;
  phoneLabel: string;
}

export interface SeoContent {
  title: string;
  description: string;
  ogAlt: string;
  jobTitle: string;
  knowsAbout: string[];
}

export interface UiStrings {
  skipToContent: string;
  primaryNav: string;
  themeMenu: string;
  themeLight: string;
  themeDark: string;
  themeSystem: string;
  languageMenu: string;
  openMenu: string;
  closeMenu: string;
  viewProject: string;
  code: string;
  demo: string;
  projectsPrev: string;
  projectsNext: string;
  /** Accessible name for a project pager dot; `{n}` is replaced with the page number. */
  projectsGoToPage: string;
  backToTop: string;
  footerNote: string;
  notFoundTitle: string;
  notFoundBody: string;
  notFoundCta: string;
}

export interface SiteContent {
  locale: Locale;
  nav: NavItem[];
  hero: HeroContent;
  experienceTitle: string;
  experienceLead: string;
  experience: ExperienceItem[];
  projectsTitle: string;
  projectsLead: string;
  projects: Project[];
  about: AboutContent;
  contact: ContactContent;
  seo: SeoContent;
  ui: UiStrings;
}
