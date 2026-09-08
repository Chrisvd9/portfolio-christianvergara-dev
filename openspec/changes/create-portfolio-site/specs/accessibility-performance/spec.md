## Purpose

The cross-cutting quality bar the site must clear on every screen size: operable and perceivable by assistive technology to WCAG 2.1 AA, and fast enough to pass Core Web Vitals on mid-range mobile hardware.

## ADDED Requirements

### Requirement: Keyboard operability

All interactive elements — navigation links, theme control, language control, project links, contact links, CV download — SHALL be reachable and operable with the keyboard alone, in a logical order, with a visible focus indicator. A "skip to content" link SHALL be the first focusable element.

#### Scenario: Full keyboard traversal

- **WHEN** a user tabs through the page from the top
- **THEN** the first stop is a "skip to content" link, and every interactive control can be focused and activated without a mouse

#### Scenario: Visible focus

- **WHEN** any interactive element receives keyboard focus
- **THEN** a clearly visible focus indicator is shown against both light and dark backgrounds

### Requirement: Color contrast

Text and meaningful non-text elements SHALL meet WCAG 2.1 AA contrast ratios (4.5:1 for normal text, 3:1 for large text and UI components) in both the light and dark themes, including the emerald accent wherever it conveys text or state.

#### Scenario: Contrast in both themes

- **WHEN** the page is audited in the light theme and again in the dark theme
- **THEN** no text or essential UI element falls below its required contrast ratio

### Requirement: Accessible names and semantics

Images SHALL have appropriate `alt` text (empty for decorative), icon-only controls SHALL have accessible names, form-free interactive widgets (theme/language menus) SHALL expose correct roles and states, and the current section/locale SHALL be conveyed with `aria-current`.

#### Scenario: Icon control has a name

- **WHEN** a screen reader focuses the theme control
- **THEN** it announces a meaningful name and the currently selected option

#### Scenario: Decorative images ignored

- **WHEN** a screen reader traverses purely decorative imagery
- **THEN** those images are not announced

### Requirement: Reduced motion

When the visitor's system requests reduced motion, entrance animations, view transitions, and any parallax or scroll-driven effects SHALL be disabled, with content shown in its final state.

#### Scenario: Motion disabled

- **WHEN** `prefers-reduced-motion: reduce` is set
- **THEN** no animated movement or fading occurs anywhere on the site

### Requirement: Responsive from 320px

The layout SHALL render without horizontal page scrolling and without clipped content at viewport widths from 320px to at least 1440px, with tap targets of at least 24x24 CSS pixels on touch.

#### Scenario: Narrow viewport integrity

- **WHEN** the site is viewed at 320px width
- **THEN** there is no horizontal scrollbar on the document and no content is cut off

### Requirement: Performance budgets

Production builds SHALL meet these targets on a simulated mid-range mobile device: Largest Contentful Paint under 2.5s, Cumulative Layout Shift under 0.1, Total Blocking Time under 200ms, and a Lighthouse Performance score of at least 95. Images SHALL be served in modern formats with explicit dimensions; render-blocking resources SHALL be minimized; JavaScript SHALL ship only for the interactive islands.

#### Scenario: Lighthouse mobile audit

- **WHEN** a Lighthouse mobile audit is run against a production build
- **THEN** Performance, Accessibility, Best Practices and SEO categories each score at least 95
- **AND** LCP, CLS and TBT are within the stated budgets

#### Scenario: Minimal JavaScript

- **WHEN** the home page is loaded
- **THEN** the only client-side JavaScript delivered corresponds to the theme control, language control, and view-transition runtime — not the static content sections

### Requirement: No layout shift from fonts or images

Fonts SHALL load without blocking text rendering and without a visible reflow, and all media SHALL reserve their space before loading.

#### Scenario: Stable load

- **WHEN** the page loads on a throttled connection
- **THEN** text remains visible during font load and no section jumps as images arrive
