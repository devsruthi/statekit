import type { ReactElement } from 'react';
import styles from './State.module.css';
import type { StateProps } from './State.types';

function getErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  if (typeof error === 'string' && error.length > 0) {
    return error;
  }

  return 'Something went wrong.';
}

function LoadingView(): ReactElement {
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

function ErrorView({ error }: { error: unknown }): ReactElement {
  return (
    <div className={styles.root} role="alert">
      <p className={styles.title}>Something went wrong</p>
      <p className={styles.description}>{getErrorMessage(error)}</p>
    </div>
  );
}

function EmptyView(): ReactElement {
  return (
    <div className={styles.root} role="status">
      <p className={styles.title}>No data</p>
      <p className={styles.description}>There is nothing to display yet.</p>
    </div>
  );
}

/**
 * Renders application UI for loading, error, empty, or success states.
 *
 * Priority order: loading → error → empty → children.
 * Only one state renders at a time.
 */
export function State({
  loading = false,
  error,
  empty = false,
  children,
}: StateProps): ReactElement | null {
  if (loading) {
    return <LoadingView />;
  }

  if (error) {
    return <ErrorView error={error} />;
  }

  if (empty) {
    return <EmptyView />;
  }

  if (children == null) {
    return null;
  }

  return <>{children}</>;
}
