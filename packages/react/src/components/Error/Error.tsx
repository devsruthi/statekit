import type { ReactElement } from 'react';
import surface from '../../styles/surface.module.css';
import { cx } from '../../utils/cx';
import {
  resolveSurfaceBackground,
  SURFACE_BACKGROUND_DEFAULTS,
  type SurfaceBackground,
} from '../../utils/resolveSurfaceBackground';
import styles from './Error.module.css';

export type ErrorProps = {
  /**
   * Error value retained for API compatibility with State.
   * Default copy does not display the raw error message.
   */
  error?: unknown;
  /**
   * Visible title announced via the alert role.
   * @default "Something went wrong!"
   */
  title?: string;
  /**
   * Supporting copy.
   * @default "Unable to load the content."
   */
  description?: string;
  /**
   * Optional retry handler. When provided, a retry button is rendered.
   */
  onRetry?: () => void;
  /**
   * Surface background.
   * - `"none"` → transparent (default)
   * - `[color]` → solid
   * - `[from, to, …]` → linear gradient
   * @default "none"
   */
  background?: SurfaceBackground;
  /**
   * Opacity for `background` when colors are set (0–1).
   * @default 1
   */
  backgroundOpacity?: number;
};

/**
 * Built-in error presentation used by State.
 * Internal only — not part of the public package API.
 */
export function Error({
  error: _error,
  title = 'Something went wrong!',
  description = 'Unable to load the content.',
  onRetry,
  background = SURFACE_BACKGROUND_DEFAULTS.background,
  backgroundOpacity = SURFACE_BACKGROUND_DEFAULTS.backgroundOpacity,
}: ErrorProps): ReactElement {
  const { mode: backgroundMode, style: backgroundStyle } =
    resolveSurfaceBackground(background, backgroundOpacity);

  return (
    <section
      className={cx(surface.surface, styles.root)}
      style={backgroundStyle}
      data-statekit=""
      data-error-background={backgroundMode}
      role="alert"
      aria-live="assertive"
    >
      <div className={cx(surface.media, styles.media)} aria-hidden="true">
        <span className={styles.badge}>
          <span className={styles.mark}>!</span>
        </span>
      </div>
      <div className={surface.copy}>
        <h2 className={surface.title}>{title}</h2>
        <p className={surface.description}>{description}</p>
      </div>
      {onRetry ? (
        <button type="button" className={styles.retry} onClick={onRetry}>
          Try again
        </button>
      ) : null}
    </section>
  );
}
