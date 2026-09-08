/**
 * Brand-logo registry for the project tech chips.
 *
 * Path data + brand hex come from `simple-icons` (a build-time devDependency).
 * Astro renders components to HTML, so nothing from this module reaches the
 * client bundle — only the inlined `<path>` string ends up in the markup.
 *
 * Each glyph is drawn monochrome in `fg` (`fill="currentColor"`) on a `bg`
 * chip, which keeps every chip visually consistent while still reading as the
 * brand.
 *
 * Contrast pairs — all verified ≥ 4.5:1 (WCAG 2.1 AA, normal text):
 *   next.js      #000000 / #ffffff   21.0
 *   react        #20232a / #61dafb    9.7
 *   typescript   #2565ae / #ffffff    5.9
 *   tailwindcss  #06b6d4 / #0b0c0e    8.1
 *   supabase     #1f1f1f / #3fcf8e    8.3
 *   vercel       #000000 / #ffffff   21.0
 *   vite         #9135ff / #ffffff    5.1
 *   motion       #0055ff / #ffffff    5.6
 *
 * OpenAI is intentionally absent — `simple-icons` no longer ships that mark, so
 * an `OpenAI` label falls through to the plain (unbranded) pill.
 */
import {
  siNextdotjs,
  siReact,
  siTypescript,
  siTailwindcss,
  siSupabase,
  siVercel,
  siVite,
  siFramer,
} from 'simple-icons';

export interface TechIcon {
  /** `simple-icons` 24×24 single-path `d` attribute. */
  path: string;
  /** Chip background. */
  bg: string;
  /** Label + glyph color. Meets 4.5:1 on `bg`. */
  fg: string;
}

/**
 * Lookup key for a tech label: lowercase, whitespace removed, trailing version
 * digits dropped. `"Tailwind CSS"` → `tailwindcss`, `"React 19"` → `react`.
 */
export function normalizeTech(label: string): string {
  return label.toLowerCase().replace(/\s+/g, '').replace(/\d+$/, '');
}

const techIcons: Record<string, TechIcon> = {
  'next.js': { path: siNextdotjs.path, bg: '#000000', fg: '#ffffff' },
  react: { path: siReact.path, bg: '#20232a', fg: '#61dafb' },
  typescript: { path: siTypescript.path, bg: '#2565ae', fg: '#ffffff' },
  tailwindcss: { path: siTailwindcss.path, bg: '#06b6d4', fg: '#0b0c0e' },
  supabase: { path: siSupabase.path, bg: '#1f1f1f', fg: '#3fcf8e' },
  vercel: { path: siVercel.path, bg: '#000000', fg: '#ffffff' },
  vite: { path: siVite.path, bg: '#9135ff', fg: '#ffffff' },
  // "Motion" (motion.dev) was formerly Framer Motion — the Framer mark stands in.
  motion: { path: siFramer.path, bg: '#0055ff', fg: '#ffffff' },
};

/** Brand chip config for a tech label, or `undefined` for an unbranded pill. */
export function techIcon(label: string): TechIcon | undefined {
  return techIcons[normalizeTech(label)];
}
