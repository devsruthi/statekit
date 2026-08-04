/**
 * Layout hints for smart loading skeletons.
 */
export const STATE_LAYOUT = {
  default: 'default',
  table: 'table',
  grid: 'grid',
  list: 'list',
} as const;

export type StateLayout = (typeof STATE_LAYOUT)[keyof typeof STATE_LAYOUT];
