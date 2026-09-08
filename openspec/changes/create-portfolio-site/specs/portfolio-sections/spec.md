## Purpose

The five content areas of the portfolio and the rules for what each must show, how it is laid out responsively, and how it animates into view. Content is data-driven and localized, so the same structure renders for both Spanish and English.

## ADDED Requirements

### Requirement: Localized content source

All visible copy for the sections SHALL come from per-locale data files (one set for Spanish, one for English) rather than being hard-coded in markup. Every content item present in one locale SHALL have an equivalent in the other.

#### Scenario: Parity between locales

- **WHEN** a section renders in English
- **THEN** it shows the same number of experiences, projects, certifications and education entries as the Spanish version, with translated text

### Requirement: Hero section

The Hero SHALL display: an avatar image (placeholder permitted), an "Disponible para trabajar" / "Available for work" status badge, a heading of the form "Hey, soy Christian Vergara" with the name visually emphasized in the emerald accent, a one-to-two sentence professional summary derived from the CV, and a row of actions linking to Contacto (in-page), LinkedIn, GitHub, and a CV download.

#### Scenario: Hero actions

- **WHEN** the Hero renders
- **THEN** it shows working links to the LinkedIn profile, the GitHub profile (`Chrisvd9`), the Contacto section, and a downloadable CV PDF

#### Scenario: Availability badge

- **WHEN** the Hero renders
- **THEN** a status badge indicating availability for work is visible near the heading

#### Scenario: Name emphasis

- **WHEN** the Hero heading renders
- **THEN** "Christian Vergara" is styled with the emerald accent color while the rest of the heading uses the default foreground color

### Requirement: Experiencia section

The Experiencia section SHALL present the three professional roles as a vertical timeline, most recent first: PNUD Chile (Cybersecurity Intern), Vendie (Software Engineer), Grow Cloud SpA (Software Engineer & UX/UI). Each entry SHALL show role title, organization, date range, and a concise description of responsibilities and impact.

#### Scenario: Timeline order and content

- **WHEN** the Experiencia section renders
- **THEN** three entries appear ordered from most to least recent
- **AND** each shows title, organization, dates, and description

### Requirement: Proyectos section

The Proyectos section SHALL present four projects as cards: Logtrics, Liguanova landing page, Academia de Ciberseguridad landing page, and Black Fresh Records. Each card SHALL show a thumbnail image (generic placeholder marked for later replacement), the project name, a short description, its technology chips, and available links. A "Code" link SHALL appear only when a public repository exists; a "Preview"/demo link SHALL appear when a live URL exists. Logtrics SHALL be described as professional work with private code and SHALL NOT reference any founder, CTO, or ownership role.

#### Scenario: Project card links

- **WHEN** a project has a public repository and a live demo
- **THEN** its card shows both a "Code" and a "Preview" link
- **WHEN** a project has only a live demo
- **THEN** its card shows only a "Preview" link and no "Code" link

#### Scenario: Logtrics framing

- **WHEN** the Logtrics card renders
- **THEN** its text presents it as a professional project with private source
- **AND** contains no mention of founder, CTO, co-founder, or company ownership

#### Scenario: Placeholder images flagged

- **WHEN** project thumbnails render
- **THEN** each uses a generic stock image and is annotated in the codebase as a placeholder to replace

### Requirement: Sobre mí section

The Sobre mí section SHALL contain a freshly written narrative bio (authored from the CV summary, first person) that describes Christian as a full-stack Software Engineer with a cybersecurity foundation, plus a photo (placeholder permitted). It SHALL include two sub-blocks laid out on a grid: **Certificaciones** listing AWS Solutions Architect Associate, AWS Cloud Practitioner, eJPTv2, CEH, Cisco CyberOps Associate, Cisco Cybersecurity Essentials, Cisco Introduction to Cybersecurity, and English B2; and **Educación** listing Universidad Mayor (Técnico Universitario en Ciberseguridad) and Coding Dojo / Colorado Technical University (Full-Stack JavaScript / MERN), each with its date range. The bio SHALL NOT mention job seeking or any startup ownership.

#### Scenario: Bio content and tone

- **WHEN** the Sobre mí section renders
- **THEN** it shows a first-person bio emphasizing full-stack engineering and security
- **AND** contains no statement about looking for work or owning/founding a company

#### Scenario: Certifications and education present

- **WHEN** the Sobre mí section renders
- **THEN** all listed certifications and both education entries are shown, education entries including their date ranges

### Requirement: Contacto section

The Contacto section SHALL present direct contact channels only — an email link (`mailto:christianvd99@gmail.com`), the phone number `+56 9 3660 3892`, and links to the LinkedIn and GitHub profiles. It SHALL NOT contain a form or any submission that posts data to a server.

#### Scenario: Contact channels

- **WHEN** the Contacto section renders
- **THEN** it shows a working `mailto:` email link, the visible phone number, and LinkedIn and GitHub links
- **AND** no form fields are present

### Requirement: Responsive layout

Sections SHALL use CSS grid for multi-column arrangements, collapsing to a single column on narrow viewports, and SHALL remain usable and readable from 320px width upward with no horizontal page scroll.

#### Scenario: Mobile layout

- **WHEN** the site is viewed at 320px width
- **THEN** all sections stack in a single readable column with no horizontal overflow

#### Scenario: Desktop layout

- **WHEN** the site is viewed at 1280px width
- **THEN** the Experiencia and Proyectos entries use a multi-column grid consistent with the reference design

### Requirement: Entrance animations

Section content SHALL animate on entering the viewport (fade/slide) with smooth easing. Animations SHALL be subtle and SHALL be fully suppressed when the visitor requests reduced motion, leaving content immediately visible.

#### Scenario: Scroll-in animation

- **WHEN** a section scrolls into view for the first time
- **THEN** its content transitions in smoothly rather than appearing abruptly

#### Scenario: Reduced motion

- **WHEN** the visitor's OS requests reduced motion
- **THEN** all section content is rendered immediately with no entrance animation
