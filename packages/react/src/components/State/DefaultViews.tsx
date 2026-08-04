import type { ReactElement } from 'react';
import { getErrorMessage } from '../../utils/getErrorMessage';
import styles from './State.module.css';

export function LoadingView(): ReactElement {
  return (
    <div
      className={styles.root}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <span className={styles.indicator} aria-hidden="true" />
      <p className={styles.title}>Loading</p>
      <p className={styles.description}>Please wait while content loads.</p>
    </div>
  );
}

export function ErrorView({ error }: { error: unknown }): ReactElement {
  return (
    <div className={styles.root} role="alert">
      <p className={styles.title}>Something went wrong</p>
      <p className={styles.description}>{getErrorMessage(error)}</p>
    </div>
  );
}

export function EmptyView(): ReactElement {
  return (
    <div className={styles.root} role="status">
      <p className={styles.title}>No data</p>
      <p className={styles.description}>There is nothing to display yet.</p>
    </div>
  );
}
