## MODIFIED Requirements

### Requirement: Hero section

The Hero SHALL display: an avatar image (placeholder permitted), an "Disponible para trabajar" / "Available for work" status badge, a heading of the form "Hey, soy Christian Vergara" with the name visually emphasized in the emerald accent, a one-to-two sentence professional summary derived from the CV, and a row of actions linking to Contacto (in-page), LinkedIn, GitHub, and a CV download. The availability badge SHALL carry an animated accent border (a moving conic-gradient "beam" around its pill outline) and SHALL grow slightly on hover with a smooth transition. Both the beam animation and the hover growth SHALL be suppressed under reduced motion, leaving a static bordered pill.

#### Scenario: Hero actions

- **WHEN** the Hero renders
- **THEN** it shows working links to the LinkedIn profile, the GitHub profile (`Chrisvd9`), the Contacto section, and a downloadable CV PDF

#### Scenario: Availability badge

- **WHEN** the Hero renders
- **THEN** a status badge indicating availability for work is visible near the heading
- **AND** an animated accent beam travels around the badge's pill border

#### Scenario: Availability badge hover

- **WHEN** a pointer hovers the availability badge
- **THEN** the badge scales up slightly and returns to its resting size when the pointer leaves

#### Scenario: Name emphasis

- **WHEN** the Hero heading renders
- **THEN** "Christian Vergara" is styled with the emerald accent color while the rest of the heading uses the default foreground color

#### Scenario: Reduced motion

- **WHEN** the visitor's OS requests reduced motion
- **THEN** the availability badge renders as a static bordered pill with no moving beam and no hover scaling

### Requirement: Experiencia section

The Experiencia section SHALL present the three professional roles as a vertical timeline, most recent first: PNUD Chile (Cybersecurity Intern), Vendie (Software Engineer), Grow Cloud SpA (Software Engineer & UX/UI). Each entry SHALL show role title, organization, date range, and a concise description of responsibilities and impact. Each entry SHALL be marked on the timeline by a clearly legible dot that sits centered on the vertical track line, rendered as a filled accent disc with a background-colored ring separating it from the line and a restrained accent glow. Only the most recent role's dot SHALL carry an additional pulsing "ping" ring; the remaining dots SHALL be static.

#### Scenario: Timeline order and content

- **WHEN** the Experiencia section renders
- **THEN** three entries appear ordered from most to least recent
- **AND** each shows title, organization, dates, and description

#### Scenario: Timeline markers

- **WHEN** the Experiencia timeline renders
- **THEN** each entry has a crisp accent dot aligned to the track line with a visible separating ring
- **AND** only the first (most recent) entry's dot shows a pulsing ring

#### Scenario: Reduced motion

- **WHEN** the visitor's OS requests reduced motion
- **THEN** no dot pulses; all markers are static

### Requirement: Proyectos section

The Proyectos section SHALL present four projects as cards, in this order: Logtrics, Academia de Ciberseguridad landing page, Liguanova landing page, and Black Fresh Records. Each card SHALL show a real screenshot of the project, the project name, a short description, its technology chips, and available links. A "Code" link SHALL appear only when a public repository exists; a "Preview"/demo link SHALL appear when a live URL exists. Logtrics SHALL be described as professional work with private code and SHALL NOT reference any founder, CTO, or ownership role.

The section lead SHALL frame these as a sample of the author's most recent work and SHALL state that there are more than 83 projects in total, private and public. No copy in the section SHALL describe the images as placeholders or examples.

The projects SHALL be paginated rather than shown all at once: 2 project cards per page on desktop-width viewports and 1 per page on narrow (mobile) viewports. A pagination control SHALL provide a previous arrow, a next arrow, and one clickable dot per page, with the current page's dot marked as current. There SHALL be no automatic advancing. Paging SHALL wrap or disable the arrows at the ends consistently, and all pagination controls SHALL be keyboard operable with visible focus and accessible names.

Each technology chip SHALL be a full pill. When the technology has a known brand, the chip SHALL show that brand's logo (inline SVG) and use the brand's color; technologies with no known brand mark SHALL render as a plain pill with the label text only. A card whose full stack cannot be disclosed SHALL list only the technologies it may show plus a single locale-appropriate "Confidencial" / "Confidential" badge, rendered distinctly (a lock mark, muted, dashed outline) rather than as a brand or plain chip. The Logtrics card SHALL use this form.

The thumbnail hover treatment SHALL, on pointer hover over a card (pointer-capable viewports), scale the image slightly **down** toward its natural framing so more of the image is revealed, over a soft backlit glow behind the card, with a smooth transition back to rest on pointer-out. This effect SHALL be suppressed under reduced motion.

#### Scenario: Project card links

- **WHEN** a project has a public repository and a live demo
- **THEN** its card shows both a "Code" and a "Preview" link
- **WHEN** a project has only a live demo
- **THEN** its card shows only a "Preview" link and no "Code" link

#### Scenario: Logtrics framing

- **WHEN** the Logtrics card renders
- **THEN** its text presents it as a professional project with private source
- **AND** contains no mention of founder, CTO, co-founder, or company ownership

#### Scenario: Real screenshots and framing copy

- **WHEN** the Proyectos section renders
- **THEN** each card's image is a real screenshot of that project (no "example"/"placeholder" wording in its `alt` or the section lead)
- **AND** the section lead presents them as recent work and mentions 83+ total projects, private and public

#### Scenario: Desktop pagination

- **WHEN** the Proyectos section is viewed at desktop width
- **THEN** exactly 2 project cards are visible and 2 page dots are shown
- **AND** activating the next arrow or the second dot reveals the remaining 2 projects

#### Scenario: Mobile pagination

- **WHEN** the Proyectos section is viewed at 320–640px width
- **THEN** exactly 1 project card is visible and 4 page dots are shown

#### Scenario: Pagination keyboard access

- **WHEN** a keyboard user tabs to the pagination control
- **THEN** the arrows and dots are focusable, have accessible names, show a visible focus ring, and change the visible page when activated

#### Scenario: No autoplay

- **WHEN** the Proyectos section is left untouched
- **THEN** the visible page does not change on its own

#### Scenario: Brand tech chips

- **WHEN** a project lists a technology with a known brand (e.g. Next.js, React, TypeScript, Tailwind CSS, Vite, Motion)
- **THEN** its chip shows the brand's inline SVG logo in the brand color, as a full pill
- **WHEN** a listed technology has no known brand mark (e.g. "SEO")
- **THEN** its chip shows the label text only, as a full pill

#### Scenario: Confidential stack badge

- **WHEN** the Logtrics card renders
- **THEN** it shows brand chips only for Next.js, TypeScript and Tailwind CSS
- **AND** a single "Confidencial" (ES) / "Confidential" (EN) badge with a lock mark and a muted dashed outline, and no other tech chips

#### Scenario: Thumbnail hover

- **WHEN** a pointer hovers a project card on a pointer-capable viewport
- **THEN** the thumbnail scales down toward its natural framing over a soft backlit glow
- **AND** returns to rest when the pointer leaves

#### Scenario: Reduced motion

- **WHEN** the visitor's OS requests reduced motion
- **THEN** the thumbnail does not animate on hover and page changes are instant

## ADDED Requirements

### Requirement: Section heading style

Each section heading SHALL present its icon inline with the title text — the icon rendered directly in the accent color, with no bordered/filled tile or box around it — followed by a short accent-to-transparent gradient underline (a fraction of the column width, not full width), matching the reference.

#### Scenario: Inline icon, no tile

- **WHEN** any section heading renders
- **THEN** its icon sits directly beside the title in the accent color with no box, border, or background behind it
- **AND** a short gradient underline (accent fading to transparent) sits below the heading

### Requirement: Content measure

The main content column (hero and every section) SHALL share one maximum width that is tighter than a full-bleed layout — a comfortable reading measure in line with the reference — applied consistently across all sections and both locales.

#### Scenario: Consistent narrow measure

- **WHEN** the hero, Experiencia, Proyectos, Sobre mí and Contacto sections render on a wide viewport
- **THEN** they all align to the same maximum content width
- **AND** that width is visibly narrower than the viewport with generous side margins

### Requirement: Consistent control and surface shape

Across all sections, interactive buttons, link-buttons, status badges, and technology chips SHALL use a fully rounded (pill) shape. Content surfaces — project cards, "Sobre mí" cards, and contact cards — SHALL use an enlarged corner radius consistent with the reference (noticeably rounder than a standard small radius). The shape language SHALL be uniform between the Spanish and English locales and between light and dark themes.

#### Scenario: Pill controls

- **WHEN** any button, link-button, badge, or tech chip renders in any section
- **THEN** it has a fully rounded pill outline

#### Scenario: Rounded surfaces

- **WHEN** project, "Sobre mí", or contact cards render
- **THEN** they use the enlarged card corner radius consistently

#### Scenario: Locale and theme parity

- **WHEN** the site is compared between `/` and `/en`, and between light and dark themes
- **THEN** control and surface shapes are identical
