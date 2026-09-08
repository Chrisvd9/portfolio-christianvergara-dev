## MODIFIED Requirements

### Requirement: Language switcher

The header SHALL provide a control to switch between Spanish and English. Switching SHALL navigate to the equivalent URL in the other locale and SHALL preserve the section the visitor is currently viewing. The control SHALL always point at the *other* locale relative to the page currently shown — including after a client-side (view-transition) navigation, so a visitor can switch locale repeatedly and always return. Its visible label and `hreflang` SHALL reflect that target locale.

#### Scenario: Switch language from a section

- **WHEN** a visitor viewing the "Proyectos" section on `/` activates the switch
- **THEN** the browser navigates to `/en` scrolled to the equivalent "Projects" section

#### Scenario: Switch back and forth

- **WHEN** a visitor on `/` switches to English, then activates the switch again
- **THEN** they return to `/` (Spanish)
- **AND** the control's label reads "ES" on `/en` and "EN" on `/`, each time pointing at the other locale

#### Scenario: Current language indicated

- **WHEN** the language control is displayed
- **THEN** the target locale is conveyed by its label and `hreflang`

### Requirement: Sticky header with section navigation

A header SHALL remain fixed at the top of the viewport while scrolling and SHALL contain in-page links to Experiencia, Proyectos, Sobre mí and Contacto. Activating a link SHALL move the view to that section. The link for the section currently in view SHALL be marked active.

The header SHALL be a single centered, content-width, fully rounded (pill) bar — not a full-width spanning bar — and SHALL NOT display a brand monogram or logo mark. A thin vertical divider SHALL separate the navigation area from the language and theme controls.

At the top of the page the pill SHALL have no background, border, or shadow. On scroll away from the top it SHALL ease into a "glass" state — a translucent backdrop that **actually blurs the page content behind it** (`backdrop-filter`), plus a hairline border and soft shadow — while contracting slightly. Both the backdrop's appearance and the size change SHALL be animated in both directions with a smooth easing curve (no abrupt jump, no snapping), and SHALL reverse when the visitor scrolls back to the top. The contraction SHALL NOT be produced by a `transform` on any ancestor of the backdrop layer (that would defeat the blur).

#### Scenario: Navigate to a section

- **WHEN** a visitor activates the "Sobre mí" navigation link
- **THEN** the corresponding section is brought into view and the URL hash updates

#### Scenario: Active section highlighting

- **WHEN** a section occupies the majority of the viewport
- **THEN** its navigation link is marked active (`aria-current`)

#### Scenario: Compact rounded pill

- **WHEN** the header renders at any scroll position
- **THEN** it is a centered pill only as wide as its contents, with fully rounded ends

#### Scenario: Smooth glass transition on scroll

- **WHEN** the page is scrolled down from the top
- **THEN** over a short eased transition the pill contracts slightly and a translucent backdrop with a hairline border fades in
- **AND** scrolling back to the top reverses the same transition, leaving the pill backdrop-free
- **AND** at no point does the size or backdrop change instantaneously

#### Scenario: Backdrop genuinely blurs

- **WHEN** the header is in its scrolled glass state over page content
- **THEN** the content directly behind the pill is visibly blurred, not merely tinted

#### Scenario: No brand monogram

- **WHEN** the header renders at any scroll position or viewport width
- **THEN** no "CV" monogram or logo image is shown in the header

#### Scenario: Divider before the controls

- **WHEN** the header renders
- **THEN** a thin vertical divider separates the navigation (or its mobile toggle) from the language and theme controls

#### Scenario: Reduced motion

- **WHEN** the visitor's OS requests reduced motion
- **THEN** the scrolled state still applies its final compact size and glass backdrop, but with no animated transition

## ADDED Requirements

### Requirement: Browser tab icon

The site SHALL use the site logo (`public/logo.png`) as the browser-tab icon (favicon) for every page and locale, composed so it is legible at tab size: the wide logo mark centered on a filled square tile, exported as PNGs at tab-appropriate resolutions (not the multi-hundred-KB source file). The `<link rel="icon">` entries SHALL be the only favicon declarations (no stale SVG or default icon that a browser would prefer instead) and SHALL be present in the document head before first paint. An `apple-touch-icon` SHALL also be declared.

#### Scenario: Favicon served

- **WHEN** any page of the site loads in a browser
- **THEN** the browser tab shows the emerald logo mark on its tile
- **AND** the document head's only favicon links are PNG `<link rel="icon">` entries (plus `apple-touch-icon`), each a few KB, pointing at the composed logo

#### Scenario: No competing icon

- **WHEN** the browser resolves the page icon
- **THEN** there is no other icon declaration (SVG `rel="icon"`, or an unreferenced `/favicon.svg` / `/favicon.ico` the browser would fall back to) that overrides the logo PNG
