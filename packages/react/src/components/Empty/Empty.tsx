import type { ReactElement } from 'react';
import surface from '../../styles/surface.module.css';
import { cx } from '../../utils/cx';
import {
  resolveSurfaceBackground,
  SURFACE_BACKGROUND_DEFAULTS,
  type SurfaceBackground,
} from '../../utils/resolveSurfaceBackground';
import styles from './Empty.module.css';

export type EmptyProps = {
  /**
   * Visible title announced to assistive technologies.
   * @default "No records found"
   */
  title?: string;
  /**
   * Supporting copy shown below the title.
   * @default "There are no records to display."
   */
  description?: string;
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
 * Built-in empty presentation used by State.
 * Internal only — not part of the public package API.
 */
export function Empty({
  title = 'No records found',
  description = 'There are no records to display.',
  background = SURFACE_BACKGROUND_DEFAULTS.background,
  backgroundOpacity = SURFACE_BACKGROUND_DEFAULTS.backgroundOpacity,
}: EmptyProps): ReactElement {
  const { mode: backgroundMode, style: backgroundStyle } =
    resolveSurfaceBackground(background, backgroundOpacity);

  return (
    <section
      className={cx(surface.surface, styles.root)}
      style={backgroundStyle}
      data-statekit=""
      data-empty-background={backgroundMode}
      role="status"
      aria-live="polite"
    >
      <div className={cx(surface.media, styles.media)} aria-hidden="true">
        <svg
          className={styles.icon}
          viewBox="0 0 24 24"
          width="22"
          height="22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          focusable="false"
        >
          <circle
            cx="5"
            cy="6.5"
            r="1.35"
            stroke="currentColor"
            strokeWidth="1.7"
          />
          <circle
            cx="5"
            cy="12"
            r="1.35"
            stroke="currentColor"
            strokeWidth="1.7"
          />
          <circle
            cx="5"
            cy="17.5"
            r="1.35"
            stroke="currentColor"
            strokeWidth="1.7"
          />
          <path
            d="M8.25 6.5h10.5M8.25 12h7.25M8.25 17.5h4.5"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
          <circle
            cx="16.25"
            cy="15.25"
            r="4"
            stroke="currentColor"
            strokeWidth="1.7"
          />
          <path
            d="M19.15 18.15 21.35 20.35"
            stroke="currentColor"
            strokeWidth="1.7"
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
