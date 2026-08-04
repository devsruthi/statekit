import {
  createElement,
  Fragment,
  type ReactElement,
  type ReactNode,
} from 'react';
import { STATE_KIND } from '../constants/priority';
import {
  EmptyView,
  ErrorView,
  LoadingView,
} from '../components/State/DefaultViews';
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
      return createElement(LoadingView);
    case STATE_KIND.error:
      return createElement(ErrorView, { error: resolved.error });
    case STATE_KIND.empty:
      return createElement(EmptyView);
    case STATE_KIND.success:
      if (children == null) {
        return null;
      }
      return createElement(Fragment, null, children);
  }
}
