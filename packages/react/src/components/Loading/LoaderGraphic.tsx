import type { CSSProperties, ReactElement } from 'react';
import {
  LOADER_TYPE,
  type LoaderColor,
  type LoaderType,
} from '../../constants/loader';
import { cx } from '../../utils/cx';
import styles from './LoaderGraphic.module.css';

export type LoaderGraphicProps = {
  type: LoaderType;
  color: LoaderColor;
  progress?: number;
};

const TYPE_CLASS: Record<LoaderType, string> = {
  [LOADER_TYPE.spinner]: styles.type_spinner!,
  [LOADER_TYPE.dots]: styles.type_dots!,
  [LOADER_TYPE.pulse]: styles.type_pulse!,
  [LOADER_TYPE.bars]: styles.type_bars!,
  [LOADER_TYPE.infinity]: styles.type_infinity!,
  [LOADER_TYPE.ring]: styles.type_ring!,
  [LOADER_TYPE.orbit]: styles.type_orbit!,
  [LOADER_TYPE.progressCircle]: styles.type_progress_circle!,
  [LOADER_TYPE.progressBar]: styles.type_progress_bar!,
};

function clampProgress(value: number | undefined): number | undefined {
  if (value == null || Number.isNaN(value)) {
    return undefined;
  }

  return Math.min(100, Math.max(0, value));
}

function resolveColorStyle(color: LoaderColor): {
  mode: 'solid' | 'gradient';
  style: CSSProperties;
} {
  const from = color[0]!;
  const to = color.length > 1 ? color[1]! : from;
  const accent = color.length > 2 ? color[2]! : to;
  const isGradient = color.length > 1;

  return {
    mode: isGradient ? 'gradient' : 'solid',
    style: {
      '--sk-loader-from': from,
      '--sk-loader-to': to,
      '--sk-loader-primary': from,
      '--sk-loader-fill': from,
      '--sk-loader-stroke-color': from,
      '--sk-loader-accent': accent,
    } as CSSProperties,
  };
}

/**
 * Decorative loader graphic. Hidden from AT by the parent Loading region.
 */
export function LoaderGraphic({
  type,
  color,
  progress,
}: LoaderGraphicProps): ReactElement {
  const { mode, style } = resolveColorStyle(color);
  const pct = clampProgress(progress);

  const graphicClass = cx(
    styles.graphic,
    TYPE_CLASS[type],
    mode === 'solid' && styles.color_solid,
    mode === 'gradient' && styles.color_gradient,
  );

  switch (type) {
    case LOADER_TYPE.dots:
      return (
        <span className={graphicClass} style={style} data-loader={type}>
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </span>
      );

    case LOADER_TYPE.pulse:
      return (
        <span className={graphicClass} style={style} data-loader={type}>
          <span className={styles.pulseCore} />
          <span className={styles.pulseRing} />
          <span className={styles.pulseRing} />
        </span>
      );

    case LOADER_TYPE.bars:
      return (
        <span className={graphicClass} style={style} data-loader={type}>
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
        </span>
      );

    case LOADER_TYPE.infinity:
      return (
        <span className={graphicClass} style={style} data-loader={type}>
          <svg viewBox="0 0 64 32" className={styles.infinitySvg} aria-hidden>
            <path
              className={styles.infinityPath}
              d="M8 16 C8 8 16 8 20 16 C24 24 32 24 32 16 C32 8 40 8 44 16 C48 24 56 24 56 16 C56 8 48 8 44 16 C40 24 32 24 32 16 C32 8 24 8 20 16 C16 24 8 24 8 16 Z"
              fill="none"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      );

    case LOADER_TYPE.ring:
      return (
        <span className={graphicClass} style={style} data-loader={type}>
          <span className={styles.ringTrack} />
          <span className={styles.ringArc} />
        </span>
      );

    case LOADER_TYPE.orbit:
      return (
        <span className={graphicClass} style={style} data-loader={type}>
          <span className={styles.orbitCore} />
          <span className={styles.orbitPath} />
          <span className={styles.orbitDot} />
        </span>
      );

    case LOADER_TYPE.progressCircle: {
      const radius = 16;
      const circumference = 2 * Math.PI * radius;
      const offset =
        pct == null
          ? circumference * 0.25
          : circumference - (pct / 100) * circumference;

      return (
        <span
          className={graphicClass}
          style={style}
          data-loader={type}
          data-progress={pct ?? undefined}
        >
          <svg viewBox="0 0 40 40" className={styles.progressSvg} aria-hidden>
            <circle
              className={styles.progressTrack}
              cx="20"
              cy="20"
              r={radius}
              fill="none"
              strokeWidth="4"
            />
            <circle
              className={styles.progressArc}
              cx="20"
              cy="20"
              r={radius}
              fill="none"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              transform="rotate(-90 20 20)"
            />
          </svg>
          <span className={styles.progressLabel}>
            {pct == null ? '…' : `${Math.round(pct)}%`}
          </span>
        </span>
      );
    }

    case LOADER_TYPE.progressBar:
      return (
        <span
          className={graphicClass}
          style={style}
          data-loader={type}
          data-progress={pct ?? undefined}
        >
          <span className={styles.progressBarTrack}>
            <span
              className={styles.progressBarFill}
              style={pct == null ? undefined : { width: `${pct}%` }}
            />
          </span>
          <span className={styles.progressBarMeta}>
            <span>Loading</span>
            <span>{pct == null ? '…' : `${Math.round(pct)}%`}</span>
          </span>
        </span>
      );

    case LOADER_TYPE.spinner:
    default:
      return (
        <span className={graphicClass} style={style} data-loader="spinner">
          <span className={styles.spinner} />
        </span>
      );
  }
}
