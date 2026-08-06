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
  [LOADER_TYPE.ring]: styles.type_ring!,
  [LOADER_TYPE.dots]: styles.type_dots!,
  [LOADER_TYPE.circleDots]: styles.type_circle_dots!,
  [LOADER_TYPE.pulse]: styles.type_pulse!,
  [LOADER_TYPE.bars]: styles.type_bars!,
  [LOADER_TYPE.infinity]: styles.type_infinity!,
  [LOADER_TYPE.orbit]: styles.type_orbit!,
  [LOADER_TYPE.spokes]: styles.type_spokes!,
  [LOADER_TYPE.activity]: styles.type_activity!,
  [LOADER_TYPE.ripple]: styles.type_ripple!,
  [LOADER_TYPE.aurora]: styles.type_aurora!,
  [LOADER_TYPE.bloom]: styles.type_bloom!,
  [LOADER_TYPE.eclipse]: styles.type_eclipse!,
  [LOADER_TYPE.orbitals]: styles.type_orbitals!,
  [LOADER_TYPE.flare]: styles.type_flare!,
  [LOADER_TYPE.spectrum]: styles.type_spectrum!,
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

    case LOADER_TYPE.circleDots: {
      const count = 8;
      return (
        <span className={graphicClass} style={style} data-loader={type}>
          <span className={styles.circleDotsWheel}>
            {Array.from({ length: count }, (_, index) => (
              <span
                key={index}
                className={styles.circleDot}
                style={
                  {
                    '--sk-spoke-i': index,
                    ...(mode === 'gradient'
                      ? {
                          background: `color-mix(in srgb, ${to} ${((index / (count - 1)) * 100).toFixed(1)}%, ${from})`,
                        }
                      : null),
                  } as CSSProperties
                }
              />
            ))}
          </span>
        </span>
      );
    }

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

    case LOADER_TYPE.infinity: {
      // Continuous lemniscate (∞) filling the viewBox (padding for stroke).
      const infinityPath =
        'M6 25C6 6 28 6 50 25C72 44 94 44 94 25C94 6 72 6 50 25C28 44 6 44 6 25';
      const infinityStroke =
        mode === 'gradient' ? `url(#${gradientId}-infinity)` : from;

      return (
        <span className={graphicClass} style={style} data-loader={type}>
          <svg
            viewBox="0 0 100 50"
            className={styles.infinitySvg}
            aria-hidden
          >
            {mode === 'gradient' ? (
              <defs>
                <linearGradient
                  id={`${gradientId}-infinity`}
                  x1="6"
                  y1="25"
                  x2="94"
                  y2="25"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor={from} />
                  <stop offset="55%" stopColor={to} />
                  <stop offset="100%" stopColor={from} />
                </linearGradient>
              </defs>
            ) : null}
            <path
              className={styles.infinityTrack}
              d={infinityPath}
              pathLength={100}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              className={styles.infinityPath}
              d={infinityPath}
              pathLength={100}
              fill="none"
              stroke={infinityStroke}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      );
    }

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
            {Array.from({ length: 12 }, (_, index) => (
              <span
                key={index}
                className={styles.activityBlade}
                style={
                  {
                    '--sk-spoke-i': index,
                    ...(mode === 'gradient'
                      ? {
                          background: `color-mix(in srgb, ${to} ${((index / 11) * 100).toFixed(1)}%, ${from})`,
                        }
                      : null),
                  } as CSSProperties
                }
              />
            ))}
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

    case LOADER_TYPE.eclipse:
      return (
        <span className={graphicClass} style={style} data-loader={type}>
          <span className={styles.eclipseDisc} />
          <span className={styles.eclipseDisc} />
        </span>
      );

    case LOADER_TYPE.orbitals:
      return (
        <span className={graphicClass} style={style} data-loader={type}>
          <span className={styles.orbitalPath} />
          <span className={styles.orbitalPath} />
          <span className={styles.orbitalPath} />
          <span className={styles.orbitalDot} />
          <span className={styles.orbitalDot} />
          <span className={styles.orbitalDot} />
          <span className={styles.orbitalCore} />
        </span>
      );

    case LOADER_TYPE.flare:
      return (
        <span className={graphicClass} style={style} data-loader={type}>
          <span className={styles.flareArc} />
          <span className={styles.flareArc} />
          <span className={styles.flareGlow} />
          <span className={styles.flareCore} />
        </span>
      );

    case LOADER_TYPE.spectrum:
      return (
        <span className={graphicClass} style={style} data-loader={type}>
          <span className={styles.spectrumRing} />
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
          <span className={styles.progressBarRow}>
            <span className={styles.progressBarTrack}>
              <span
                className={styles.progressBarFill}
                style={pct == null ? undefined : { width: `${pct}%` }}
              />
            </span>
            <span className={styles.progressBarMeta}>
              {pct == null ? '…' : `${Math.round(pct)}%`}
            </span>
          </span>
        </span>
      );

    case LOADER_TYPE.ring:
    default:
      return (
        <span className={graphicClass} style={style} data-loader="ring">
          <span className={styles.ringTrack} />
          <span className={styles.ringArc} />
        </span>
      );
  }
}
