## Purpose

Everything that makes the portfolio discoverable and correctly represented by search engines and social platforms: per-locale metadata, alternate-language signals, crawl directives, and structured data about Christian as a person.

## ADDED Requirements

### Requirement: Per-locale page metadata

Each localized page SHALL define a unique, descriptive `<title>` and meta description in its own language, a `<meta name="viewport">` for responsive rendering, and a `<link rel="canonical">` pointing to its absolute URL.

#### Scenario: Spanish metadata

- **WHEN** `/` is loaded
- **THEN** the title and meta description are in Spanish and describe Christian Vergara as a full-stack / cybersecurity engineer
- **AND** a canonical link points to the absolute Spanish URL

#### Scenario: English metadata

- **WHEN** `/en` is loaded
- **THEN** the title and meta description are in English
- **AND** the canonical link points to the absolute English URL

### Requirement: Alternate language links

Every page SHALL declare `hreflang` alternate links for the Spanish and English versions plus an `x-default`.

#### Scenario: hreflang alternates present

- **WHEN** any localized page is loaded
- **THEN** the document head contains `rel="alternate"` `hreflang` entries for `es`, `en`, and `x-default` with absolute URLs

### Requirement: Social sharing cards

Each page SHALL provide Open Graph and Twitter Card meta tags — type, title, description, URL, locale, and a preview image — so shared links render a rich card.

#### Scenario: Open Graph on share

- **WHEN** a page URL is shared to a platform that reads Open Graph
- **THEN** the platform can display a title, description, and preview image sourced from the page's meta tags

### Requirement: Crawl directives and sitemap

The site SHALL publish a `robots.txt` that allows crawling and references the sitemap, and a `sitemap.xml` that lists both localized pages.

#### Scenario: Sitemap lists both locales

- **WHEN** `sitemap.xml` is requested
- **THEN** it contains entries for both the Spanish and English pages with absolute URLs

#### Scenario: robots allows indexing

- **WHEN** `robots.txt` is requested
- **THEN** it permits crawling of the site and points to `sitemap.xml`

### Requirement: Structured data

Each page SHALL embed `Person` JSON-LD structured data describing Christian Vergara, including name, job title, same-as links to LinkedIn and GitHub, and knowledge areas.

#### Scenario: Person JSON-LD valid

- **WHEN** a page is loaded
- **THEN** it contains a single valid `application/ld+json` block of type `Person` with name, `jobTitle`, and `sameAs` array

### Requirement: Semantic document outline

Each page SHALL have exactly one `<h1>`, a logical heading hierarchy without skipped levels, and landmark elements (`header`, `main`, `nav`, `footer`) identifying page regions.

#### Scenario: Single h1 and landmarks

- **WHEN** a page is analyzed
- **THEN** it has one `<h1>`, no skipped heading levels, and `header` / `nav` / `main` / `footer` landmarks
