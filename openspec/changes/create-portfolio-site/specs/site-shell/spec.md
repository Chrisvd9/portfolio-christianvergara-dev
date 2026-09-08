## Purpose

The global page shell that every visitor sees: document structure, the sticky header with navigation, the theme and language controls, the footer, and the transitions between states. It frames all content and owns cross-page concerns like locale routing and color theme.

## ADDED Requirements

### Requirement: Bilingual routing

The site SHALL serve Spanish content at the root path (`/`) and English content under `/en`. Both locales SHALL expose the same sections and structure. A request to an unknown path SHALL return a localized 404 page for the closest matching locale.

#### Scenario: Default locale at root

- **WHEN** a visitor loads `/`
- **THEN** the page renders in Spanish with `<html lang="es">`
- **AND** all navigation links point to non-prefixed paths

#### Scenario: English locale

- **WHEN** a visitor loads `/en`
- **THEN** the page renders in English with `<html lang="en">`
- **AND** all navigation links are prefixed with `/en`

#### Scenario: Unknown path

- **WHEN** a visitor loads a path that does not exist
- **THEN** a 404 page is shown with localized text and a link back to the home page

### Requirement: Language switcher

The header SHALL provide a control to switch between Spanish and English. Switching SHALL navigate to the equivalent URL in the other locale and SHALL preserve the section the visitor is currently viewing.

#### Scenario: Switch language from a section

- **WHEN** a visitor viewing the "Proyectos" section on `/` activates the English option
- **THEN** the browser navigates to `/en` scrolled to the equivalent "Projects" section

#### Scenario: Current language indicated

- **WHEN** the language control is displayed
- **THEN** the active locale is visually and programmatically marked as current (`aria-current`)

### Requirement: Theme selection

The site SHALL offer three color-theme options — Light, Dark, and System — selectable from a header control. The choice SHALL persist across visits. On first visit the System option SHALL apply, following the operating-system preference. The selected theme SHALL be applied before first paint with no flash of the wrong theme.

#### Scenario: Explicit dark choice persists

- **WHEN** a visitor selects "Dark" and later reloads the page
- **THEN** the page renders in the dark theme immediately, with no light flash

#### Scenario: System option follows OS

- **WHEN** the theme is set to "System" and the OS switches from light to dark
- **THEN** the page reflects the dark theme without a manual reload

#### Scenario: Theme control reflects state

- **WHEN** a theme is active
- **THEN** the header control indicates which of the three options is selected

### Requirement: Sticky header with section navigation

A header SHALL remain fixed at the top of the viewport while scrolling and SHALL contain in-page links to Experiencia, Proyectos, Sobre mí and Contacto. Activating a link SHALL move the view to that section. The link for the section currently in view SHALL be marked active. On scroll away from the top, the header SHALL adopt a condensed "pill" treatment.

#### Scenario: Navigate to a section

- **WHEN** a visitor activates the "Sobre mí" navigation link
- **THEN** the corresponding section is brought into view and the URL hash updates

#### Scenario: Active section highlighting

- **WHEN** a section occupies the majority of the viewport
- **THEN** its navigation link is marked active (`aria-current`)

#### Scenario: Condensed header on scroll

- **WHEN** the page is scrolled down from the top
- **THEN** the header shrinks to its condensed pill style
- **AND** returns to its full style when scrolled back to the top

### Requirement: Footer

Every page SHALL render a footer containing a copyright line with the current year and a link to the Contacto section.

#### Scenario: Footer content

- **WHEN** any page finishes loading
- **THEN** a footer is present with the current year and a working link to Contacto

### Requirement: Animated view transitions

Navigations within the site (locale switches, 404 return) SHALL use animated view transitions. When the visitor's system requests reduced motion, transitions SHALL fall back to an instant, non-animated change.

#### Scenario: Transition between locales

- **WHEN** a visitor switches locale
- **THEN** the page content cross-fades rather than doing a hard reload flash

#### Scenario: Reduced motion honored

- **WHEN** the visitor's OS setting requests reduced motion
- **THEN** view transitions complete instantly with no movement or fade
