import type { CSSProperties } from 'react';

/**
 * One or more CSS colors for a state surface background.
 * - 1 color → solid
 * - 2+ colors → linear gradient
 */
export type SurfaceColor = readonly [string, ...string[]];

/**
 * Built-in state surface background.
 * - `"none"` → transparent (default)
 * - `[color]` → solid
 * - `[from, to, …]` → linear gradient
 */
export type SurfaceBackground = 'none' | SurfaceColor;

export const SURFACE_BACKGROUND_DEFAULTS = {
  background: 'none' as const satisfies SurfaceBackground,
  backgroundOpacity: 1,
} as const;

/** Switch title/description to light text above this opacity. */
export const SURFACE_LIGHT_COPY_OPACITY = 0.75;

/** Soft white for copy on strong colored backgrounds. */
const LIGHT_COPY_FG = '#F8FAFC';
const LIGHT_COPY_MUTED = 'rgb(248 250 252 / 78%)';

function clampOpacity(value: number): number {
  if (Number.isNaN(value)) {
    return SURFACE_BACKGROUND_DEFAULTS.backgroundOpacity;
  }

  return Math.min(1, Math.max(0, value));
}

function withOpacity(color: string, opacity: number): string {
  const pct = clampOpacity(opacity) * 100;
  return `color-mix(in srgb, ${color} ${pct}%, transparent)`;
}

/**
 * Resolves a surface background into an inline style that overrides
 * the shared `.surface` elevated fill.
 * When opacity is above 60% with a colored background, title/description
 * tokens flip to a light soft-white for contrast.
 */
export function resolveSurfaceBackground(
  background: SurfaceBackground = SURFACE_BACKGROUND_DEFAULTS.background,
  opacity: number = SURFACE_BACKGROUND_DEFAULTS.backgroundOpacity,
): {
  mode: 'none' | 'solid' | 'gradient';
  style: CSSProperties;
} {
  if (background === 'none' || background.length === 0) {
    return {
      mode: 'none',
      style: { background: 'transparent' },
    };
  }

  const colors = background;
  const clamped = clampOpacity(opacity);
  const mode = colors.length > 1 ? 'gradient' : 'solid';
  const fill =
    mode === 'solid'
      ? withOpacity(colors[0]!, clamped)
      : `linear-gradient(135deg, ${colors
          .map((color) => withOpacity(color, clamped))
          .join(', ')})`;

  const style: CSSProperties = { background: fill };

  if (clamped > SURFACE_LIGHT_COPY_OPACITY) {
    Object.assign(style, {
      '--sk-color-fg': LIGHT_COPY_FG,
      '--sk-color-fg-muted': LIGHT_COPY_MUTED,
    });
  }

  return {
    mode,
    style,
  };
}
