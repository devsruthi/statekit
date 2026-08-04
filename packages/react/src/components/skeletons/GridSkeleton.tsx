import type { ReactElement } from 'react';
import { SkeletonBone, SkeletonRoot } from './SkeletonPrimitives';
import styles from './GridSkeleton.module.css';

const CARDS = [0, 1, 2, 3, 4, 5] as const;

export type GridSkeletonProps = {
  label?: string;
};

/**
 * Grid-shaped loading skeleton used by State when layout="grid".
 * Internal only — not part of the public package API.
 */
export function GridSkeleton({
  label = 'Loading grid',
}: GridSkeletonProps): ReactElement {
  return (
    <SkeletonRoot layout="grid" label={label}>
      <div className={styles.grid}>
        {CARDS.map((card) => (
          <div className={styles.card} key={card}>
            <SkeletonBone className={styles.thumb} />
            <SkeletonBone className={styles.line} />
            <SkeletonBone className={styles.lineShort} />
          </div>
        ))}
      </div>
    </SkeletonRoot>
  );
}
