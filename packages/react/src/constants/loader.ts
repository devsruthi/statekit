import type {
  SurfaceBackground,
  SurfaceColor,
} from '../utils/resolveSurfaceBackground';
import { SURFACE_BACKGROUND_DEFAULTS } from '../utils/resolveSurfaceBackground';

/**
 * Built-in loader visual variants.
 */
export const LOADER_TYPE = {
  ring: 'ring',
  /** Continuous multicolor conic ring. */
  spectrum: 'spectrum',
  dots: 'dots',
  /** Dots arranged in a rotating ring. */
  circleDots: 'circle-dots',
  pulse: 'pulse',
  bars: 'bars',
  infinity: 'infinity',
  orbit: 'orbit',
  /** Rotating radial lines from the center. */
  spokes: 'spokes',
  /** Classic 12-blade fading activity indicator. */
  activity: 'activity',
  /** Expanding concentric rings. */
  ripple: 'ripple',
  /** Dual sweeping arcs. */
  aurora: 'aurora',
  /** Soft rotating petals. */
  bloom: 'bloom',
  /** Overlapping discs in orbit. */
  eclipse: 'eclipse',
  /** Nested orbital dots at different speeds. */
  orbitals: 'orbitals',
  /** Contra-rotating glowing arcs. */
  flare: 'flare',
  /** Circular spinner with a solid center disc and rotating arc. */
  gauge: 'gauge',
  progressCircle: 'progress-circle',
  progressBar: 'progress-bar',
} as const;

export type LoaderType = (typeof LOADER_TYPE)[keyof typeof LOADER_TYPE];

/**
 * Loader size scale.
 */
export const LOADER_SIZE = {
  xs: 'xs',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
} as const;

export type LoaderSize = (typeof LOADER_SIZE)[keyof typeof LOADER_SIZE];

/**
 * One or more CSS colors.
 * - 1 color → solid fill
 * - 2+ colors → gradient (from → to; extras used as accents where applicable)
 */
export type LoaderColor = SurfaceColor;

/**
 * Animation speed presets.
 */
export const LOADER_SPEED = {
  slow: 'slow',
  normal: 'normal',
  fast: 'fast',
} as const;

export type LoaderSpeed = (typeof LOADER_SPEED)[keyof typeof LOADER_SPEED];

/**
 * Loader color theme for surrounding copy/surface.
 */
export const LOADER_THEME = {
  light: 'light',
  dark: 'dark',
  auto: 'auto',
} as const;

export type LoaderTheme = (typeof LOADER_THEME)[keyof typeof LOADER_THEME];

/**
 * Loading surface background.
 * - `"none"` → transparent (default)
 * - `[color]` → solid background
 * - `[from, to, …]` → linear gradient
 */
export type LoaderBackground = SurfaceBackground;

/** Default solid brand indigo. */
export const LOADER_COLOR_PRIMARY = ['#4F46E5'] as const satisfies LoaderColor;

/** Default brand violet → blue gradient. */
export const LOADER_COLOR_GRADIENT = [
  '#7C3AED',
  '#2563EB',
] as const satisfies LoaderColor;

export const LOADER_DEFAULTS = {
  type: LOADER_TYPE.ring,
  size: LOADER_SIZE.md,
  color: LOADER_COLOR_PRIMARY,
  speed: LOADER_SPEED.normal,
  theme: LOADER_THEME.auto,
  background: SURFACE_BACKGROUND_DEFAULTS.background,
  backgroundOpacity: SURFACE_BACKGROUND_DEFAULTS.backgroundOpacity,
  text: 'Loading...',
  subtext: 'Please wait a moment',
} as const;
