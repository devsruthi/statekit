import type { ReactElement, ReactNode } from 'react';
import '../../styles/surface.module.css';
import { cx } from '../../utils/cx';
import styles from './skeleton.module.css';

export type SkeletonRootProps = {
  children: ReactNode;
  className?: string;
  /**
   * Identifies the skeleton layout for tests and styling hooks.
   */
  layout: 'table' | 'grid' | 'list';
  /**
   * Screen-reader label for the busy status region.
   * @default "Loading"
   */
  label?: string;
};

/**
 * Accessible shell shared by layout skeletons.
 */
export function SkeletonRoot({
  children,
  className,
  layout,
  label = 'Loading',
}: SkeletonRootProps): ReactElement {
  return (
    <section
      className={cx(styles.root, className)}
      data-statekit=""
      data-statekit-skeleton={layout}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <span className={styles.srOnly}>{label}</span>
      <div aria-hidden="true">{children}</div>
    </section>
  );
}

export type SkeletonBoneProps = {
  className?: string;
};

/**
 * Single shimmering placeholder block.
 */
export function SkeletonBone({ className }: SkeletonBoneProps): ReactElement {
  return <span className={cx(styles.bone, className)} />;
}
