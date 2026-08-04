import type { ReactElement } from 'react';
import { SkeletonBone, SkeletonRoot } from './SkeletonPrimitives';
import styles from './ListSkeleton.module.css';

const ITEMS = [0, 1, 2, 3, 4] as const;

export type ListSkeletonProps = {
  label?: string;
};

/**
 * List-shaped loading skeleton used by State when layout="list".
 * Internal only — not part of the public package API.
 */
export function ListSkeleton({
  label = 'Loading list',
}: ListSkeletonProps): ReactElement {
  return (
    <SkeletonRoot layout="list" label={label}>
      <div className={styles.list}>
        {ITEMS.map((item) => (
          <div className={styles.item} key={item}>
            <SkeletonBone className={styles.avatar} />
            <div className={styles.copy}>
              <SkeletonBone className={styles.line} />
              <SkeletonBone className={styles.lineShort} />
            </div>
          </div>
        ))}
      </div>
    </SkeletonRoot>
  );
}
