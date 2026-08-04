import type { ReactElement } from 'react';
import surface from '../../styles/surface.module.css';
import { cx } from '../../utils/cx';
import styles from './Loading.module.css';

export type LoadingProps = {
  /**
   * Visible title announced to assistive technologies.
   * @default "Loading"
   */
  title?: string;
  /**
   * Supporting copy shown below the title.
   * @default "Please wait while content loads."
   */
  description?: string;
};

/**
 * Built-in loading presentation used by State.
 * Internal only — not part of the public package API.
 */
export function Loading({
  title = 'Loading',
  description = 'Please wait while content loads.',
}: LoadingProps): ReactElement {
  return (
    <section
      className={cx(surface.surface, styles.root)}
      data-statekit=""
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className={cx(surface.media, styles.media)} aria-hidden="true">
        <span className={styles.spinner} />
      </div>
      <div className={surface.copy}>
        <h2 className={surface.title}>{title}</h2>
        <p className={surface.description}>{description}</p>
      </div>
    </section>
  );
}
