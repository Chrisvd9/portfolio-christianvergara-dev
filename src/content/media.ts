/**
 * Shared image imports so both locale dictionaries reference the same optimized
 * assets. Everything here lives under `src/assets/`, so Astro's image pipeline
 * converts each one to responsive WebP at build — nothing is shipped raw.
 */
import avatar from '@/assets/avatar3.png';
import about from '@/assets/avatar3.png';
import ogCover from '@/assets/og-cover.jpg';
import projectLogtrics from '@/assets/projects/logtrics.png';
import projectAcademia from '@/assets/projects/academia.png';
import projectLiguanova from '@/assets/projects/liguanova.png';
import projectBlackfresh from '@/assets/projects/blackfresh.png';

export const media = {
  avatar,
  about,
  ogCover,
  projectLogtrics,
  projectAcademia,
  projectLiguanova,
  projectBlackfresh,
} as const;
