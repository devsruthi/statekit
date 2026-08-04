import type { ReactElement } from 'react';
import surface from '../../styles/surface.module.css';
import { cx } from '../../utils/cx';
import { getErrorMessage } from '../../utils/getErrorMessage';
import styles from './Error.module.css';

export type ErrorProps = {
  /**
   * Error value used to derive the visible message when `description` is omitted.
   */
  error?: unknown;
  /**
   * Visible title announced via the alert role.
   * @default "Something went wrong"
   */
  title?: string;
  /**
   * Supporting copy. When omitted, a message is derived from `error`.
   */
  description?: string;
  /**
   * Optional retry handler. When provided, a retry button is rendered.
   */
  onRetry?: () => void;
};

/**
 * Built-in error presentation used by State.
 * Internal only — not part of the public package API.
 */
export function Error({
  error,
  title = 'Something went wrong',
  description,
  onRetry,
}: ErrorProps): ReactElement {
  const message = description ?? getErrorMessage(error);

  return (
    <section
      className={cx(surface.surface, styles.root)}
      data-statekit=""
      role="alert"
      aria-live="assertive"
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
          <path
            d="M12 8v5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="12" cy="16.5" r="1" fill="currentColor" />
          <path
            d="M12 3.75 20.25 19.5H3.75L12 3.75Z"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className={surface.copy}>
        <h2 className={surface.title}>{title}</h2>
        <p className={surface.description}>{message}</p>
      </div>
      {onRetry ? (
        <button type="button" className={styles.retry} onClick={onRetry}>
          Try again
        </button>
      ) : null}
    </section>
  );
}
