import {
  Fragment,
  createElement,
  type ReactElement,
  type ReactNode,
} from 'react';
import { Empty } from '../components/Empty';
import { Error as ErrorView } from '../components/Error';
import { STATE_LAYOUT, type StateLayout } from '../constants/layout';
import { STATE_KIND } from '../constants/priority';
import { renderLoading } from './renderLoading';
import type { ResolvedState } from './resolveState';

export type RenderStateOptions = {
  children?: ReactNode;
  layout?: StateLayout;
  loadingTitle?: string;
  loadingDescription?: string;
  emptyTitle?: string;
  emptyDescription?: string;
  errorTitle?: string;
  errorDescription?: string;
  loadingComponent?: ReactNode;
  emptyComponent?: ReactNode;
  errorComponent?: ReactNode;
  onRetry?: () => void;
};

function renderNode(node: ReactNode): ReactElement {
  return createElement(Fragment, null, node);
}

/**
 * Maps a resolved application state to the corresponding React tree.
 */
export function renderState(
  resolved: ResolvedState,
  {
    children,
    layout = STATE_LAYOUT.default,
    loadingTitle,
    loadingDescription,
    emptyTitle,
    emptyDescription,
    errorTitle,
    errorDescription,
    loadingComponent,
    emptyComponent,
    errorComponent,
    onRetry,
  }: RenderStateOptions = {},
): ReactElement | null {
  switch (resolved.type) {
    case STATE_KIND.loading:
      if (loadingComponent != null) {
        return renderNode(loadingComponent);
      }

      return renderLoading(layout, {
        title: loadingTitle,
        description: loadingDescription,
      });

    case STATE_KIND.error:
      if (errorComponent != null) {
        return renderNode(errorComponent);
      }

      return createElement(ErrorView, {
        error: resolved.error,
        title: errorTitle,
        description: errorDescription,
        onRetry,
      });

    case STATE_KIND.empty:
      if (emptyComponent != null) {
        return renderNode(emptyComponent);
      }

      return createElement(Empty, {
        title: emptyTitle,
        description: emptyDescription,
      });

    case STATE_KIND.success:
      if (children == null) {
        return null;
      }

      return createElement(Fragment, null, children);
  }
}
