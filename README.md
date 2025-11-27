# Alpine Robotics Website

Modern static site for FTC Team 25710 with light/dark theming, animated hero, and responsive galleries.

## Design tokens

- Colors (light): `--color-bg-light: #f3f7f9`, `--card-bg: #fff`, `--text-primary: #0f2014`, `--text-secondary: #4a5b66`, accents `--color-accent: #22c55e`, `--color-blue: #00b4ff`.
- Colors (dark, via `body[data-theme="dark"]`): background `--color-bg-light: #0b1014`, `--card-bg: #121b22`, `--text-primary-dark: #f9fafb`, `--text-secondary-dark: #cfd8e3`.
- Typography: headings `Space Grotesk`, body `Inter`.
- Radii/spacing: `--radius-lg: 24px`; spacing tokens `--space-2`…`--space-16`.
- Motion: durations `--duration-fast/base/slow`, easing `--easing-smooth`, `--easing-bounce`.

## Structure

- Root pages: `index.html`, `404.html`.
- Subpages in `pages/`: `about.html`, `seasons.html`, `robots.html`, `team.html`, `gallery.html`, `sponsors.html`.
- Assets: `assets/css/main.css`, `assets/css/pages.css`, `assets/js/main.js`, `images/`.

## Components & theming

- Theme toggle switches `body[data-theme]` between light/dark (persists in `localStorage`).
- Shared cards (`.card`, `.metric`, hero info card) inherit text colors via tokens, so new text stays readable in both themes.
- Section headers (`.section__header`, `.section__title`, `.section__description`) stack vertically in light mode for clean alignment.

## Animations

- GSAP is used for hero entrance and scroll reveals (`assets/js/main.js`); respects `prefers-reduced-motion`.

## Updating content

- Hero stats/cta: edit `index.html` hero copy and metrics.
- Pages: update text in `pages/*.html`; navigation is shared markup on each page.
- Gallery: add images under `images/galleryImages/...` and insert new `<article class="gallery-card">` entries; include `loading="lazy" decoding="async" sizes="..."`.

## Running checks

- Open `index.html` in a browser; theme toggle should persist.
- Lighthouse (Chrome DevTools):
  1. Open DevTools → Lighthouse → check Performance/Accessibility/Best Practices/SEO.
  2. Run for both mobile and desktop.
  3. Verify contrast in both light/dark themes and that `prefers-reduced-motion` skips animations.
- Quick AX sanity:
  - Ensure all images have `alt`.
  - Tab through nav/toggle/CTAs to confirm focus states are visible.

## Analytics

- Google Tag Manager is included in page heads; CTA buttons carry `data-gtag` attributes to track key actions.
