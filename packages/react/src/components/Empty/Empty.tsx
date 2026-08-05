import type { ReactElement } from 'react';
import emptySearchFileIcon from '../../icons/empty-search-file.svg';
import { SvgIcon } from '../../icons/SvgIcon';
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
        <SvgIcon svg={emptySearchFileIcon} className={styles.icon} size={28} />
      </div>
      <div className={surface.copy}>
        <h2 className={surface.title}>{title}</h2>
        <p className={surface.description}>{description}</p>
      </div>
    </section>
  );
}
