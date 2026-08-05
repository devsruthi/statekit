# StateKit Brand Guidelines

## Brand Name

StateKit

## Package Name

`@statekitjs/react`

## Tagline

Beautiful UI states for React.

## Mission

StateKit helps developers build beautiful, consistent loading, empty, error, success, and skeleton states with a simple declarative API.

## Vision

Become the standard UI state library for modern React applications.

## Core Values

- Simplicity
- Accessibility
- Performance
- Consistency
- Developer Experience

## Color Palette

| Role | Hex | Swatch intent |
| --- | --- | --- |
| Primary | `#4F46E5` | Indigo — core brand, S-mark midtone |
| Secondary | `#7C3AED` | Violet — S-mark highlight / gradient start |
| Accent | `#06B6D4` | Cyan — status dot, “React” highlight, links |
| Dark | `#0F172A` | Deep navy — dark surfaces, mark tile |
| Light | `#F8FAFC` | Soft white — light surfaces, dark-theme text |
| Success | `#22C55E` | Semantic success only |
| Warning | `#F59E0B` | Semantic warning only |
| Error | `#EF4444` | Semantic error only |

### Mark gradient

The brand mark uses a violet → indigo gradient with a cyan terminal dot:

1. `#7C3AED` (Secondary)
2. `#4F46E5` (Primary)
3. `#3730A3` (deep indigo support)
4. `#06B6D4` (Accent status dot)

### Usage notes

- Prefer Primary + Secondary for brand presence and gradients.
- Use Accent for emphasis only (status, React highlight, interactive cues).
- Keep Success / Warning / Error semantic — never in the logo mark.
- Place logos on Dark (`#0F172A`) or Light (`#F8FAFC`) for reliable contrast.

## Typography

### Primary Font

**Inter**

Use for headings, UI, documentation, and marketing.

Wordmark guidance:

- `StateKit` set in Inter Bold
- Tracking slightly tight (`-0.03em`) for the lockup

### Code Font

**JetBrains Mono**

Use for package names, props, snippets, and terminal-style content.

## Logo System

The identity is built from:

1. **Mark** — stylized “S” stroke with cyan status dot  
2. **Wordmark** — `StateKit`  
3. **Tagline** — `Beautiful UI states for React.` (`React` in Accent)

### Files

| Asset | Use |
| --- | --- |
| `logo.svg` | Primary lockup with tagline (default / dark surfaces) |
| `logo-light.svg` | Horizontal lockup for **light** backgrounds (dark wordmark) |
| `logo-dark.svg` | Horizontal lockup for **dark** backgrounds (light wordmark) |
| `mark.svg` | Icon-only mark on dark rounded tile |
| `favicon.svg` | Compact mark on light rounded tile |

### Usage rules

Always use the horizontal logo when space allows.

Use the icon-only logo for:

- favicon
- GitHub avatar
- social avatar

**Do**

- Keep clear space around the logo ≥ the height of the mark
- Use approved light/dark variants for contrast
- Keep the cyan status dot and gradient intact

**Do not**

- Stretch or distort the logo
- Rotate the logo
- Recolor the logo outside approved variants
- Remove the accent dot
- Add shadows, outlines, or glow effects
- Place the logo on busy or low-contrast imagery

## Tone

StateKit should always feel:

- Modern
- Professional
- Friendly
- Minimal
- Developer First

Also prioritize **Accessible** — accessibility is part of the brand promise, not an afterthought.

Write with clarity and restraint. Prefer concrete API examples over hype.

## Banner & social composition

### `github-banner.svg` / `github-banner.png` — 1024 × 340

- Light background
- Centered S mark + `StateKit` wordmark (`Kit` in brand gradient)
- README uses `github-banner.png`

### `social-preview.png` — 1024 × 537

- Light background with soft purple/blue accents
- Centered S mark + `StateKit` wordmark
- Tagline: Beautiful UI states for React. (`React` in Accent)
- Icon row: Loading · Empty · Error · Success · Skeletons
