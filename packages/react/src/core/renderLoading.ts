import { createElement, type ReactElement } from 'react';
import { Loading as DefaultLoading } from '../components/Loading';
import {
  GridSkeleton,
  ListSkeleton,
  TableSkeleton,
} from '../components/skeletons';
import { STATE_LAYOUT, type StateLayout } from '../constants/layout';

/**
 * Selects the loading presentation for a given layout hint.
 */
export function renderLoading(
  layout: StateLayout = STATE_LAYOUT.default,
): ReactElement {
  switch (layout) {
    case STATE_LAYOUT.table:
      return createElement(TableSkeleton);
    case STATE_LAYOUT.grid:
      return createElement(GridSkeleton);
    case STATE_LAYOUT.list:
      return createElement(ListSkeleton);
    case STATE_LAYOUT.default:
    default:
      return createElement(DefaultLoading);
  }
}
