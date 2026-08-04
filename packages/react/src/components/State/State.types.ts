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
   * Only affects the loading state.
   *
   * @default "default"
   */
  layout?: StateLayout;
  /**
   * Success content rendered when no loading, error, or empty state is active.
   */
  children?: ReactNode;
};
