import type { ReactElement } from 'react';
import { renderState } from '../../core/renderState';
import { resolveState } from '../../core/resolveState';
import type { StateProps } from './State.types';

/**
 * Renders application UI for loading, error, empty, or success states.
 *
 * Priority order: loading → error → empty → children.
 * Only one state renders at a time.
 */
export function State({
  loading = false,
  error,
  empty = false,
  children,
}: StateProps): ReactElement | null {
  const resolved = resolveState({ loading, error, empty });
  return renderState(resolved, { children });
}
