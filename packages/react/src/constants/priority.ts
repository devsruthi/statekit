/**
 * Priority order for StateKit application states.
 * Lower index = higher priority. Only one state renders at a time.
 */
export const STATE_PRIORITY = ['loading', 'error', 'empty', 'success'] as const;

export type StateKind = (typeof STATE_PRIORITY)[number];

export const STATE_KIND = {
  loading: 'loading',
  error: 'error',
  empty: 'empty',
  success: 'success',
} as const satisfies Record<StateKind, StateKind>;
