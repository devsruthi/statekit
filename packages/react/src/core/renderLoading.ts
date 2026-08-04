import { createElement, type ReactElement } from 'react';
import { Loading as DefaultLoading } from '../components/Loading';
import {
  GridSkeleton,
  ListSkeleton,
  TableSkeleton,
} from '../components/skeletons';
import { STATE_LAYOUT, type StateLayout } from '../constants/layout';

export type RenderLoadingOptions = {
  title?: string;
  description?: string;
};

/**
 * Selects the loading presentation for a given layout hint.
 */
export function renderLoading(
  layout: StateLayout = STATE_LAYOUT.default,
  { title, description }: RenderLoadingOptions = {},
): ReactElement {
  switch (layout) {
    case STATE_LAYOUT.table:
      return createElement(TableSkeleton, { label: title });
    case STATE_LAYOUT.grid:
      return createElement(GridSkeleton, { label: title });
    case STATE_LAYOUT.list:
      return createElement(ListSkeleton, { label: title });
    case STATE_LAYOUT.default:
    default:
      return createElement(DefaultLoading, { title, description });
  }
}
