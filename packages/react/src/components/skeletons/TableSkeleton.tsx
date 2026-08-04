import type { ReactElement } from 'react';
import { cx } from '../../utils/cx';
import { SkeletonBone, SkeletonRoot } from './SkeletonPrimitives';
import styles from './TableSkeleton.module.css';

const ROWS = [0, 1, 2, 3, 4] as const;

export type TableSkeletonProps = {
  label?: string;
};

/**
 * Table-shaped loading skeleton used by State when layout="table".
 * Internal only — not part of the public package API.
 */
export function TableSkeleton({
  label = 'Loading table',
}: TableSkeletonProps): ReactElement {
  return (
    <SkeletonRoot layout="table" label={label}>
      <div className={styles.table}>
        <div className={styles.header}>
          <SkeletonBone className={styles.cellMd} />
          <SkeletonBone className={styles.cellSm} />
          <SkeletonBone className={styles.cellXs} />
          <SkeletonBone className={cx(styles.cellXs, styles.colOptional)} />
        </div>
        {ROWS.map((row) => (
          <div className={styles.row} key={row}>
            <SkeletonBone className={styles.cellLg} />
            <SkeletonBone className={cx(styles.cellMd, styles.colSecondary)} />
            <SkeletonBone className={cx(styles.cellSm, styles.colTertiary)} />
            <SkeletonBone className={cx(styles.cellXs, styles.colOptional)} />
          </div>
        ))}
      </div>
    </SkeletonRoot>
  );
}
