import { STATE_KIND, STATE_PRIORITY } from '../constants/priority';
import type { StateKind } from '../constants/priority';

export type ResolveStateInput = {
  loading?: boolean;
  error?: unknown;
  empty?: boolean;
};

export type ResolvedState =
  | { type: typeof STATE_KIND.loading }
  | { type: typeof STATE_KIND.error; error: unknown }
  | { type: typeof STATE_KIND.empty }
  | { type: typeof STATE_KIND.success };

function isActive(
  kind: StateKind,
  input: Required<Pick<ResolveStateInput, 'loading' | 'empty'>> &
    Pick<ResolveStateInput, 'error'>,
): boolean {
  switch (kind) {
    case STATE_KIND.loading:
      return input.loading;
    case STATE_KIND.error:
      return Boolean(input.error);
    case STATE_KIND.empty:
      return input.empty;
    case STATE_KIND.success:
      return true;
  }
}

/**
 * Resolves which application state should render based on priority.
 *
 * Priority: loading → error → empty → success.
 */
export function resolveState({
  loading = false,
  error,
  empty = false,
}: ResolveStateInput): ResolvedState {
  const input = { loading, error, empty };

  for (const kind of STATE_PRIORITY) {
    if (!isActive(kind, input)) {
      continue;
    }

    switch (kind) {
      case STATE_KIND.loading:
        return { type: STATE_KIND.loading };
      case STATE_KIND.error:
        return { type: STATE_KIND.error, error };
      case STATE_KIND.empty:
        return { type: STATE_KIND.empty };
      case STATE_KIND.success:
        return { type: STATE_KIND.success };
    }
  }

  return { type: STATE_KIND.success };
}
