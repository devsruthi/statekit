import type { ReactElement } from 'react';
import surface from '../../styles/surface.module.css';
import { cx } from '../../utils/cx';
import styles from './Empty.module.css';

export type EmptyProps = {
  /**
   * Visible title announced to assistive technologies.
   * @default "No data"
   */
  title?: string;
  /**
   * Supporting copy shown below the title.
   * @default "There is nothing to display yet."
   */
  description?: string;
};

/**
 * Built-in empty presentation used by State.
 * Internal only — not part of the public package API.
 */
export function Empty({
  title = 'No data',
  description = 'There is nothing to display yet.',
}: EmptyProps): ReactElement {
  return (
    <section
      className={cx(surface.surface, styles.root)}
      data-statekit=""
      role="status"
      aria-live="polite"
    >
      <div className={cx(surface.media, styles.media)} aria-hidden="true">
        <svg
          className={styles.icon}
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          focusable="false"
        >
          <rect
            x="4"
            y="6"
            width="16"
            height="12"
            rx="2.5"
            stroke="currentColor"
            strokeWidth="1.75"
          />
          <path
            d="M8 10.5h8M8 13.5h5"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div className={surface.copy}>
        <h2 className={surface.title}>{title}</h2>
        <p className={surface.description}>{description}</p>
      </div>
    </section>
  );
}
