# StateKit Branding Assets

This document explains how branding files in `assets/branding/` should be used across the StateKit repository and future surfaces.

All paths below are repository-relative.

---

## Asset guide

### `github-banner.svg` / `github-banner.png`

**Path:** `./assets/branding/github-banner.png` (README) · `./assets/branding/github-banner.svg` (alternate)  
**Size:** 1024 × 682

**Use for:**

- GitHub repository social/header banner
- Top of the root `README.md`
- Repo-level marketing visuals

**Artwork:** Centered StateKit mark + wordmark (`State` dark, `Kit` in brand gradient) on a light background.

**Do not use for:**

- npm package README (keep package docs lightweight)
- Favicons or avatars

---

### `social-preview.png`

**Path:** `./assets/branding/social-preview.png`  
**Size:** 1024 × 537

**Artwork:** StateKit mark + wordmark, tagline with cyan “React.”, and state icons (Loading, Empty, Error, Success, Skeletons) on a light background.

**Use for:**

- GitHub repository social preview image (Settings → Social preview)
- Link previews when sharing the repository
- General social cards when a page-specific OG image is not available

---

### `og-image.png`

**Path:** `./assets/branding/og-image.png`  
**Size:** 1200 × 630

**Use for:**

- Default Open Graph image for the future StateKit website/docs
- `<meta property="og:image" …>` and Twitter card image defaults
- Fallback preview when a route does not define its own image

**Future website configuration example:**

```html
<meta property="og:image" content="/branding/og-image.png" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="/branding/og-image.png" />
```

---

### `logo.svg`

**Path:** `./assets/branding/logo.svg`

**Use for:**

- Primary horizontal lockup with tagline
- Dark marketing surfaces
- Brand presentations where the full lockup fits

Prefer this when you want mark + wordmark + tagline together.

---

### `logo-light.svg` / `logo-dark.svg`

**Paths:**

- `./assets/branding/logo-light.svg` — for light backgrounds (dark wordmark)
- `./assets/branding/logo-dark.svg` — for dark backgrounds (light wordmark)

**Use for:**

- README headers
- Documentation site navigation
- Light/dark theme logo swaps

---

### `mark.svg`

**Path:** `./assets/branding/mark.svg`

**Use for:**

- GitHub organization/user avatar
- Social avatars
- Compact navigation
- App icons where the wordmark does not fit

---

### `favicon.svg`

**Path:** `./assets/branding/favicon.svg`

**Use for:**

- Browser favicon
- Storybook favicon
- Future website `public/favicon.svg`

Storybook serves it via static dirs as `/branding/favicon.svg`.

---

## Current integrations

| Surface | Asset |
| --- | --- |
| Root `README.md` | `github-banner.png` (780px display width) |
| `packages/react/README.md` | `logo-light.svg` |
| Storybook | `favicon.svg` |
| Future website OG | `og-image.png` |

> GitHub README pages are light by default, so READMEs use `logo-light.svg` (dark wordmark). Use `logo-dark.svg` on dark surfaces.

---

## Rules

1. Keep paths repository-relative in docs and READMEs.
2. Never stretch, rotate, or recolor logos outside approved variants.
3. Prefer SVG for logos; use PNG for banners and social/OG images.
4. Replace PNG placeholders with final exports before public launch.
5. See `assets/branding/brand-guidelines.md` for full brand rules.
