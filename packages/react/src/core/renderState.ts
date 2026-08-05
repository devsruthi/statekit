import {
  Fragment,
  createElement,
  type ReactElement,
  type ReactNode,
} from 'react';
import { Empty } from '../components/Empty';
import { Error as ErrorView } from '../components/Error';
import { STATE_LAYOUT, type StateLayout } from '../constants/layout';
import type {
  LoaderBackground,
  LoaderColor,
  LoaderSize,
  LoaderSpeed,
  LoaderTheme,
  LoaderType,
} from '../constants/loader';
import type { SurfaceBackground } from '../utils/resolveSurfaceBackground';
import { STATE_KIND } from '../constants/priority';
import { renderLoading } from './renderLoading';
import type { ResolvedState } from './resolveState';

export type RenderStateOptions = {
  children?: ReactNode;
  layout?: StateLayout;
  loaderType?: LoaderType;
  loaderSize?: LoaderSize;
  loaderColor?: LoaderColor;
  loaderSpeed?: LoaderSpeed;
  loaderTheme?: LoaderTheme;
  loaderBackground?: LoaderBackground;
  loaderBackgroundOpacity?: number;
  loaderProgress?: number;
  loadingTitle?: string;
  loadingDescription?: string;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyBackground?: SurfaceBackground;
  emptyBackgroundOpacity?: number;
  errorTitle?: string;
  errorDescription?: string;
  errorBackground?: SurfaceBackground;
  errorBackgroundOpacity?: number;
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
    loaderType,
    loaderSize,
    loaderColor,
    loaderSpeed,
    loaderTheme,
    loaderBackground,
    loaderBackgroundOpacity,
    loaderProgress,
    loadingTitle,
    loadingDescription,
    emptyTitle,
    emptyDescription,
    emptyBackground,
    emptyBackgroundOpacity,
    errorTitle,
    errorDescription,
    errorBackground,
    errorBackgroundOpacity,
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
        type: loaderType,
        size: loaderSize,
        color: loaderColor,
        speed: loaderSpeed,
        theme: loaderTheme,
        background: loaderBackground,
        backgroundOpacity: loaderBackgroundOpacity,
        progress: loaderProgress,
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
        background: errorBackground,
        backgroundOpacity: errorBackgroundOpacity,
      });

    case STATE_KIND.empty:
      if (emptyComponent != null) {
        return renderNode(emptyComponent);
      }

      return createElement(Empty, {
        title: emptyTitle,
        description: emptyDescription,
        background: emptyBackground,
        backgroundOpacity: emptyBackgroundOpacity,
      });

    case STATE_KIND.success:
      if (children == null) {
        return null;
      }

      return createElement(Fragment, null, children);
  }
}
