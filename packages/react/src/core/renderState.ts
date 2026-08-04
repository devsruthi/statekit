import {
  createElement,
  Fragment,
  type ReactElement,
  type ReactNode,
} from 'react';
import { Empty } from '../components/Empty';
import { Error as ErrorView } from '../components/Error';
import { Loading } from '../components/Loading';
import { STATE_KIND } from '../constants/priority';
import type { ResolvedState } from './resolveState';

export type RenderStateOptions = {
  children?: ReactNode;
};

/**
 * Maps a resolved application state to the corresponding React tree.
 */
export function renderState(
  resolved: ResolvedState,
  { children }: RenderStateOptions = {},
): ReactElement | null {
  switch (resolved.type) {
    case STATE_KIND.loading:
      return createElement(Loading);
    case STATE_KIND.error:
      return createElement(ErrorView, { error: resolved.error });
    case STATE_KIND.empty:
      return createElement(Empty);
    case STATE_KIND.success:
      if (children == null) {
        return null;
      }
      return createElement(Fragment, null, children);
  }
}
