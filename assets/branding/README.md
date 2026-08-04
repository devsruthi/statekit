# StateKit Branding Assets

This folder is the branding foundation for the StateKit open-source project.

Use these assets for documentation, GitHub presence, social previews, and community materials.  
Do **not** use this folder for React package implementation files.

## Contents

| File | Purpose |
| --- | --- |
| `brand-guidelines.md` | Source of truth for brand name, package name, mission, vision, values, colors, typography, logo rules, and tone |
| `README.md` | Explains every asset in this directory |
| `logo.svg` | Default full-color horizontal logo (mark + wordmark) |
| `logo-light.svg` | Horizontal logo optimized for dark backgrounds |
| `logo-dark.svg` | Horizontal logo optimized for light backgrounds |
| `mark.svg` | Icon-only brand mark for avatars and compact placements |
| `favicon.svg` | Small icon for browser tabs and site favicons |
| `github-banner.png` | Placeholder for the GitHub repository banner (`1280×640`) |
| `social-preview.png` | Placeholder for Open Graph / social share cards (`1200×630`) |

## Logo assets

### `logo.svg`

Primary horizontal lockup. Prefer this whenever horizontal space is available.

### `logo-light.svg`

Use on dark surfaces such as dark documentation themes, dark hero sections, and dark social cards.

### `logo-dark.svg`

Use on light surfaces such as README headers, light documentation pages, and light marketing sections.

### `mark.svg`

Icon-only mark. Use when the wordmark cannot fit comfortably:

- GitHub avatar
- social avatar
- compact navigation
- app icons

### `favicon.svg`

Optimized square mark for favicons and other very small UI chrome.

## Image placeholders

`github-banner.png` and `social-preview.png` are **text placeholders**, not final binary images.

They document:

- intended dimensions
- usage context
- composition guidance

Replace them with exported PNGs before public brand rollout.

## Usage rules

1. Follow `brand-guidelines.md` for color, type, tone, and logo behavior.
2. Prefer SVG for logos whenever the host supports it.
3. Never stretch, rotate, or recolor logo artwork outside the approved variants.
4. Keep semantic colors (Success, Warning, Error) out of the logo itself.
5. When in doubt, choose the simpler composition.

## Quick reference

- **Brand:** StateKit
- **Package:** `@statekitjs/react`
- **Tagline:** Beautiful UI states for React.
