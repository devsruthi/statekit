import { describe, expect, it } from 'vitest';
import { STATE_LAYOUT } from '../src/constants/layout';
import { renderLoading } from '../src/core/renderLoading';

describe('renderLoading', () => {
  it('returns DefaultLoading for the default layout', () => {
    const element = renderLoading(STATE_LAYOUT.default);
    expect(element.type).toBeTypeOf('function');
    expect((element.type as { name?: string }).name).toBe('Loading');
  });

  it('returns TableSkeleton for the table layout', () => {
    const element = renderLoading(STATE_LAYOUT.table);
    expect((element.type as { name?: string }).name).toBe('TableSkeleton');
  });

  it('returns GridSkeleton for the grid layout', () => {
    const element = renderLoading(STATE_LAYOUT.grid);
    expect((element.type as { name?: string }).name).toBe('GridSkeleton');
  });

  it('returns ListSkeleton for the list layout', () => {
    const element = renderLoading(STATE_LAYOUT.list);
    expect((element.type as { name?: string }).name).toBe('ListSkeleton');
  });
});
