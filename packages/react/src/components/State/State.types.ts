import type { ReactNode } from 'react';
import type { StateLayout } from '../../constants/layout';

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
