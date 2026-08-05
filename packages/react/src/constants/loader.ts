/**
 * Built-in loader visual variants.
 */
export const LOADER_TYPE = {
  spinner: 'spinner',
  dots: 'dots',
  pulse: 'pulse',
  bars: 'bars',
  infinity: 'infinity',
  ring: 'ring',
  orbit: 'orbit',
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
export type LoaderColor = readonly [string, ...string[]];

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

/** Default solid brand indigo. */
export const LOADER_COLOR_PRIMARY = ['#4F46E5'] as const satisfies LoaderColor;

/** Default brand violet → blue gradient. */
export const LOADER_COLOR_GRADIENT = [
  '#7C3AED',
  '#2563EB',
] as const satisfies LoaderColor;

export const LOADER_DEFAULTS = {
  type: LOADER_TYPE.spinner,
  size: LOADER_SIZE.lg,
  color: LOADER_COLOR_PRIMARY,
  speed: LOADER_SPEED.normal,
  theme: LOADER_THEME.auto,
  text: 'Loading',
  subtext: 'Please wait while content loads.',
} as const;
