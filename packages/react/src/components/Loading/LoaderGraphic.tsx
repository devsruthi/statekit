import type { CSSProperties, ReactElement } from 'react';
import { useId } from 'react';
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
  [LOADER_TYPE.spokes]: styles.type_spokes!,
  [LOADER_TYPE.activity]: styles.type_activity!,
  [LOADER_TYPE.ripple]: styles.type_ripple!,
  [LOADER_TYPE.aurora]: styles.type_aurora!,
  [LOADER_TYPE.bloom]: styles.type_bloom!,
  [LOADER_TYPE.comet]: styles.type_comet!,
  [LOADER_TYPE.eclipse]: styles.type_eclipse!,
  [LOADER_TYPE.gauge]: styles.type_gauge!,
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

function spokeNodes(count: number, className: string): ReactElement[] {
  return Array.from({ length: count }, (_, index) => (
    <span
      key={index}
      className={className}
      style={{ '--sk-spoke-i': index } as CSSProperties}
    />
  ));
}

/**
 * Decorative loader graphic. Hidden from AT by the parent Loading region.
 */
export function LoaderGraphic({
  type,
  color,
  progress,
}: LoaderGraphicProps): ReactElement {
  const gradientId = useId().replace(/:/g, '');
  const { mode, style } = resolveColorStyle(color);
  const pct = clampProgress(progress);
  const from = color[0]!;
  const to = color.length > 1 ? color[1]! : from;

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

    case LOADER_TYPE.spokes:
      return (
        <span className={graphicClass} style={style} data-loader={type}>
          <span className={styles.spokesWheel}>
            {spokeNodes(8, styles.spoke!)}
          </span>
        </span>
      );

    case LOADER_TYPE.activity:
      return (
        <span className={graphicClass} style={style} data-loader={type}>
          <span className={styles.activityWheel}>
            {spokeNodes(12, styles.activityBlade!)}
          </span>
        </span>
      );

    case LOADER_TYPE.ripple:
      return (
        <span className={graphicClass} style={style} data-loader={type}>
          <span className={styles.rippleRing} />
          <span className={styles.rippleRing} />
          <span className={styles.rippleRing} />
          <span className={styles.rippleCore} />
        </span>
      );

    case LOADER_TYPE.aurora:
      return (
        <span className={graphicClass} style={style} data-loader={type}>
          <span className={styles.auroraArc} />
          <span className={styles.auroraArc} />
          <span className={styles.auroraCore} />
        </span>
      );

    case LOADER_TYPE.bloom:
      return (
        <span className={graphicClass} style={style} data-loader={type}>
          <span className={styles.bloomWheel}>
            {Array.from({ length: 6 }, (_, index) => (
              <span
                key={index}
                className={styles.petal}
                style={{ '--sk-petal-i': index } as CSSProperties}
              />
            ))}
          </span>
          <span className={styles.bloomCore} />
        </span>
      );

    case LOADER_TYPE.comet:
      return (
        <span className={graphicClass} style={style} data-loader={type}>
          <svg viewBox="0 0 40 40" className={styles.cometSvg} aria-hidden>
            <circle
              className={styles.cometTrack}
              cx="20"
              cy="20"
              r="15"
              fill="none"
              strokeWidth="3.5"
            />
            <circle
              className={styles.cometTail}
              cx="20"
              cy="20"
              r="15"
              fill="none"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </svg>
        </span>
      );

    case LOADER_TYPE.eclipse:
      return (
        <span className={graphicClass} style={style} data-loader={type}>
          <span className={styles.eclipseDisc} />
          <span className={styles.eclipseDisc} />
        </span>
      );

    case LOADER_TYPE.gauge: {
      const radius = 16;
      const circumference = 2 * Math.PI * radius;
      // ~75% visible arc, gap for the light track segment
      const arcLength = circumference * 0.75;
      const gapLength = circumference - arcLength;
      const arcStroke =
        mode === 'gradient' ? `url(#${gradientId}-gauge)` : from;

      return (
        <span className={graphicClass} style={style} data-loader={type}>
          <svg viewBox="0 0 40 40" className={styles.gaugeSvg} aria-hidden>
            {mode === 'gradient' ? (
              <defs>
                <linearGradient
                  id={`${gradientId}-gauge`}
                  x1="20"
                  y1="4"
                  x2="4"
                  y2="20"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor={from} />
                  <stop offset="100%" stopColor={to} />
                </linearGradient>
              </defs>
            ) : null}
            <circle
              className={styles.gaugeTrack}
              cx="20"
              cy="20"
              r={radius}
              fill="none"
              strokeWidth="2.5"
            />
            <circle
              cx="20"
              cy="20"
              r={radius}
              fill="none"
              stroke={arcStroke}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={`${arcLength} ${gapLength}`}
              strokeDashoffset="0"
              transform="rotate(-90 20 20)"
            />
          </svg>
          <span className={styles.gaugeCore} />
        </span>
      );
    }

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
