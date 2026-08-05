# StateKit Branding Assets

This folder is the branding foundation for the StateKit open-source project.

Assets follow the official brand board (stylized **S** mark, Inter wordmark, indigo/violet/cyan palette).  
Do **not** use this folder for React package implementation files.

## Contents

| File | Purpose |
| --- | --- |
| `brand-board.png` | Master visual brand board used as the design reference |
| `brand-guidelines.md` | Brand name, package, mission, vision, values, colors, type, logo rules, tone |
| `README.md` | Explains every asset in this directory |
| `logo.svg` | Primary horizontal logo + tagline (`React` in accent cyan) |
| `logo-light.svg` | Horizontal logo for **light** backgrounds (dark wordmark) |
| `logo-dark.svg` | Horizontal logo for **dark** backgrounds (light wordmark) |
| `mark.svg` / `mark.png` | Icon-only segmented S mark (transparent / white) |
| `favicon.svg` | Compact S mark on a light rounded tile |
| `github-banner.svg` / `.png` | README banner (`880×400` PNG preferred; SVG kept as alternate) |
| `social-preview.png` | Social share preview card (`1024×537`, logo + state icons) |
| `og-image.png` | Default Open Graph image for the future website (`1200×630`) |

## Logo anatomy

```
[ S-mark ]  StateKit
            Beautiful UI states for React.
```

- **Mark:** segmented S (Secondary → Primary gradient) + Accent cyan status dot
- **Wordmark:** Inter Bold, `StateKit`
- **Tagline:** Inter Medium; `React` uses Accent `#06B6D4`

## When to use each logo

| Situation | Asset |
| --- | --- |
| README hero, docs dark theme, default lockup | `logo.svg` or `logo-dark.svg` |
| Light docs / light marketing surfaces | `logo-light.svg` |
| GitHub avatar, app icon, compact nav | `mark.svg` |
| Browser tab icon | `favicon.svg` |

## Raster images

`github-banner.png`, `social-preview.png`, and `og-image.png` are brand raster assets.

Replace the current gradient base exports with final designed artwork from the brand board before public launch. Full composition notes live in `docs/branding.md`.

### GitHub banner (`880×400`)

- Light background
- Centered S mark + `StateKit` wordmark (`Kit` in brand gradient)
- README uses `github-banner.png`

### Social preview (`1024×537`)

- Light background with soft purple/blue accents
- Centered S mark + `StateKit` wordmark
- Tagline: Beautiful UI states for React.
- Icon row: Loading · Empty · Error · Success · Skeletons

## Rules

1. Follow `brand-guidelines.md` as the source of truth.
2. Prefer SVG logos whenever the host supports SVG.
3. Never stretch, rotate, or recolor the mark outside approved variants.
4. Keep the cyan status dot — it is part of the identity.
5. Keep semantic colors (Success / Warning / Error) out of the logo.

## Quick reference

- **Brand:** StateKit  
- **Package:** `@statekitjs/react`  
- **Tagline:** Beautiful UI states for React.  
- **Primary:** `#4F46E5` · **Secondary:** `#7C3AED` · **Accent:** `#06B6D4`  
- **Dark:** `#0F172A` · **Light:** `#F8FAFC`
