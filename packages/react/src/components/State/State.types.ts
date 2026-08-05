import type { ReactNode } from 'react';
import type { StateLayout } from '../../constants/layout';
import type {
  LoaderColor,
  LoaderSize,
  LoaderSpeed,
  LoaderTheme,
  LoaderType,
} from '../../constants/loader';

export type StateProps = {
  /**
   * When true, renders the loading state.
   * Takes highest priority over error, empty, and children.
   */
  loading?: boolean;
  /**
   * When truthy, renders the error state.
   * Accepts an `Error`, string, or any unknown value.
   */
  error?: unknown;
  /**
   * When true, renders the empty state.
   */
  empty?: boolean;
  /**
   * Layout hint for smart loading skeletons.
   * Only affects the built-in loading state.
   *
   * @default "default"
   */
  layout?: StateLayout;
  /**
   * Built-in loader visual variant (default layout only).
   * @default "spinner"
   */
  loaderType?: LoaderType;
  /**
   * Built-in loader size.
   * @default "lg"
   */
  loaderSize?: LoaderSize;
  /**
   * One or more CSS colors for the built-in loader.
   * - `[color]` → solid
   * - `[from, to, ...]` → gradient
   *
   * @default ["#4F46E5"]
   * @example
   * loaderColor={['#4F46E5']}
   * loaderColor={['#7C3AED', '#06B6D4']}
   */
  loaderColor?: LoaderColor;
  /**
   * Built-in loader animation speed.
   * @default "normal"
   */
  loaderSpeed?: LoaderSpeed;
  /**
   * Theme for the built-in loading surface.
   * @default "auto"
   */
  loaderTheme?: LoaderTheme;
  /**
   * Progress percentage (0–100) for `progress-circle` / `progress-bar`.
   */
  loaderProgress?: number;
  /**
   * Title shown by the default loading UI.
   */
  loadingTitle?: string;
  /**
   * Description shown by the default loading UI.
   */
  loadingDescription?: string;
  /**
   * Title shown by the default empty UI.
   */
  emptyTitle?: string;
  /**
   * Description shown by the default empty UI.
   */
  emptyDescription?: string;
  /**
   * Title shown by the default error UI.
   */
  errorTitle?: string;
  /**
   * Description shown by the default error UI.
   * When omitted, a message is derived from `error`.
   */
  errorDescription?: string;
  /**
   * Replaces the built-in loading UI when provided.
   */
  loadingComponent?: ReactNode;
  /**
   * Replaces the built-in empty UI when provided.
   */
  emptyComponent?: ReactNode;
  /**
   * Replaces the built-in error UI when provided.
   */
  errorComponent?: ReactNode;
  /**
   * Called when the user activates the default error retry action.
   */
  onRetry?: () => void;
  /**
   * Success content rendered when no loading, error, or empty state is active.
   */
  children?: ReactNode;
};
