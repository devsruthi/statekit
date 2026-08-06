import { useMemo, useState } from 'react';
import {
  LOADER_COLOR_GRADIENT,
  LOADER_COLOR_PRIMARY,
  LOADER_TYPE,
  State,
  type LoaderBackground,
  type LoaderColor,
  type LoaderSize,
  type LoaderType,
  type StateLayout,
} from '@statekitjs/react';

type DemoMode = 'loading' | 'empty' | 'error' | 'success';

const MODES: { id: DemoMode; label: string }[] = [
  { id: 'loading', label: 'Loading' },
  { id: 'empty', label: 'Empty' },
  { id: 'error', label: 'Error' },
  { id: 'success', label: 'Success' },
];

const LOADING_LAYOUTS: StateLayout[] = ['default', 'table', 'grid', 'list'];
const LOADER_TYPES = Object.values(LOADER_TYPE);
const LOADER_SIZES: LoaderSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

const BACKGROUND_OPTIONS: {
  id: string;
  label: string;
  value: LoaderBackground;
  swatch?: string;
}[] = [
  { id: 'none', label: 'None', value: 'none' },
  {
    id: 'solid',
    label: 'Indigo',
    value: LOADER_COLOR_PRIMARY,
    swatch: '#4F46E5',
  },
  {
    id: 'gradient',
    label: 'Violet → Blue',
    value: LOADER_COLOR_GRADIENT,
    swatch: 'linear-gradient(135deg, #7C3AED, #2563EB)',
  },
  {
    id: 'cyan',
    label: 'Cyan',
    value: ['#06B6D4'],
    swatch: '#06B6D4',
  },
];

const COLOR_OPTIONS = [
  {
    id: 'solid',
    label: 'Indigo',
    value: LOADER_COLOR_PRIMARY,
    swatch: '#4F46E5',
  },
  {
    id: 'gradient',
    label: 'Brand',
    value: LOADER_COLOR_GRADIENT,
    swatch: 'linear-gradient(135deg, #7C3AED, #2563EB)',
  },
  {
    id: 'custom',
    label: 'Violet → Cyan',
    value: ['#7C3AED', '#06B6D4'] as const satisfies LoaderColor,
    swatch: 'linear-gradient(135deg, #7C3AED, #06B6D4)',
  },
  {
    id: 'cyan',
    label: 'Cyan',
    value: ['#06B6D4'] as const satisfies LoaderColor,
    swatch: '#06B6D4',
  },
] as const;

const USERS = [
  {
    id: 1,
    name: 'Ada Lovelace',
    role: 'Engineer',
    team: 'Platform',
    status: 'online' as const,
    initials: 'AL',
    accent: '#7C3AED',
  },
  {
    id: 2,
    name: 'Grace Hopper',
    role: 'Architect',
    team: 'Systems',
    status: 'away' as const,
    initials: 'GH',
    accent: '#4F46E5',
  },
  {
    id: 3,
    name: 'Alan Turing',
    role: 'Researcher',
    team: 'Cryptography',
    status: 'online' as const,
    initials: 'AT',
    accent: '#06B6D4',
  },
  {
    id: 4,
    name: 'Katherine Johnson',
    role: 'Analyst',
    team: 'Data',
    status: 'busy' as const,
    initials: 'KJ',
    accent: '#2563EB',
  },
  {
    id: 5,
    name: 'Margaret Hamilton',
    role: 'Lead Engineer',
    team: 'Flight',
    status: 'online' as const,
    initials: 'MH',
    accent: '#8B5CF6',
  },
];

const STATUS_LABEL = {
  online: 'Online',
  away: 'Away',
  busy: 'Busy',
} as const;

function BrandMark() {
  return (
    <svg
      className="brand-mark"
      viewBox="0 0 48 48"
      width="48"
      height="48"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="skPlayMark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7C3AED" />
          <stop offset="55%" stopColor="#4F46E5" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>
      </defs>
      <path
        d="M12 16c0-5.5 4.2-9 10.2-9 5.2 0 9.3 2.6 10.4 6.6"
        fill="none"
        stroke="url(#skPlayMark)"
        strokeWidth="6.5"
        strokeLinecap="round"
      />
      <path
        d="M36 24c0 5.5-4.2 9-10.2 9-5.2 0-9.3-2.6-10.4-6.6"
        fill="none"
        stroke="url(#skPlayMark)"
        strokeWidth="6.5"
        strokeLinecap="round"
      />
      <circle cx="36.5" cy="33.5" r="3.4" fill="#06B6D4" />
    </svg>
  );
}

export function App() {
  const [mode, setMode] = useState<DemoMode>('loading');
  const [layout, setLayout] = useState<StateLayout>('default');
  const [useCustomComponent, setUseCustomComponent] = useState(false);
  const [loaderType, setLoaderType] = useState<LoaderType>('ring');
  const [loaderSize, setLoaderSize] = useState<LoaderSize>('lg');
  const [backgroundId, setBackgroundId] = useState('none');
  const [backgroundOpacity, setBackgroundOpacity] = useState(0.16);
  const [colorId, setColorId] =
    useState<(typeof COLOR_OPTIONS)[number]['id']>('solid');

  const loaderColor =
    COLOR_OPTIONS.find((option) => option.id === colorId)?.value ??
    LOADER_COLOR_PRIMARY;

  const showLayout = mode === 'loading' && !useCustomComponent;
  const showLoaderControls =
    mode === 'loading' && !useCustomComponent && layout === 'default';
  const showCustomToggle = mode !== 'success';
  const showSurfaceBackground =
    !useCustomComponent &&
    (mode === 'empty' ||
      mode === 'error' ||
      (mode === 'loading' && layout === 'default'));
  const showBackgroundOpacity =
    showSurfaceBackground && backgroundId !== 'none';

  const surfaceBackground =
    BACKGROUND_OPTIONS.find((option) => option.id === backgroundId)?.value ??
    'none';

  const stateProps = useMemo(
    () => ({
      loading: mode === 'loading',
      empty: mode === 'empty',
      error: mode === 'error' ? new Error('Failed to fetch users.') : undefined,
      layout,
      loaderType,
      loaderSize,
      loaderColor,
      loaderBackground: mode === 'loading' ? surfaceBackground : 'none',
      loaderBackgroundOpacity: backgroundOpacity,
      emptyBackground: mode === 'empty' ? surfaceBackground : 'none',
      emptyBackgroundOpacity: backgroundOpacity,
      errorBackground: mode === 'error' ? surfaceBackground : 'none',
      errorBackgroundOpacity: backgroundOpacity,
      loaderProgress:
        loaderType === 'progress-circle' || loaderType === 'progress-bar'
          ? 72
          : undefined,
      onRetry: () => setMode('loading'),
    }),
    [
      backgroundOpacity,
      layout,
      loaderColor,
      loaderSize,
      loaderType,
      mode,
      surfaceBackground,
    ],
  );

  const customToggleLabel =
    mode === 'loading'
      ? 'Pass loadingComponent'
      : mode === 'empty'
        ? 'Pass emptyComponent'
        : 'Pass errorComponent';

  return (
    <div className="page">
      <div className="ambient" aria-hidden="true" />

      <header className="hero">
        <div className="hero__brand">
          <BrandMark />
          <div>
            <p className="hero__eyebrow">@statekitjs/react</p>
            <h1 className="hero__title">
              State<span>Kit</span>
              <em>JS</em>
            </h1>
          </div>
        </div>
        <p className="hero__lede">Beautiful UI states for React.</p>

        <div className="mode-row" role="tablist" aria-label="Demo mode">
          {MODES.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={mode === item.id}
              className={
                mode === item.id ? 'mode-chip mode-chip--active' : 'mode-chip'
              }
              onClick={() => {
                setMode(item.id);
                setUseCustomComponent(false);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </header>

      <div className="workspace">
        <main className="stage" key={mode}>
          <div className="stage__chrome">
            <span className="stage__dot" />
            <span className="stage__dot" />
            <span className="stage__dot" />
            <span className="stage__label">Live preview</span>
          </div>
          <div className="stage__canvas">
            <State
              {...stateProps}
              loadingComponent={
                mode === 'loading' && useCustomComponent ? (
                  <div
                    className="custom-loading"
                    role="status"
                    aria-live="polite"
                  >
                    <p className="custom-badge">User-created component</p>
                    <div className="custom-loading__orb" aria-hidden>
                      <span className="custom-loading__ring" />
                      <span className="custom-loading__core" />
                    </div>
                    <div className="custom-loading__copy">
                      <p className="custom-loading__eyebrow">
                        loadingComponent
                      </p>
                      <h2>Syncing your workspace</h2>
                      <p>
                        This is a user-created component passed via
                        loadingComponent.
                      </p>
                    </div>
                    <div className="custom-loading__track" aria-hidden>
                      <span className="custom-loading__bar" />
                    </div>
                    <ul className="custom-loading__skeleton" aria-hidden>
                      <li />
                      <li />
                      <li />
                    </ul>
                  </div>
                ) : undefined
              }
              emptyComponent={
                mode === 'empty' && useCustomComponent ? (
                  <div className="custom-empty">
                    <p className="custom-badge">User-created component</p>
                    <div className="custom-empty__icon" aria-hidden>
                      <span className="custom-empty__tray" />
                      <span className="custom-empty__dot" />
                    </div>
                    <div className="custom-empty__copy">
                      <h2>No users yet</h2>
                      <p>
                        This is a user-created component passed via
                        emptyComponent. Invite someone to get started.
                      </p>
                    </div>
                  </div>
                ) : undefined
              }
              errorComponent={
                mode === 'error' && useCustomComponent ? (
                  <div className="custom-error">
                    <p className="custom-badge custom-badge--error">
                      User-created component
                    </p>
                    <div className="custom-error__icon" aria-hidden>
                      <span className="custom-error__mark">!</span>
                    </div>
                    <div className="custom-error__copy">
                      <h2>Oops!</h2>
                      <p>
                        This is a user-created component passed via
                        errorComponent. Something went wrong while fetching
                        data.
                      </p>
                    </div>
                    <button
                      type="button"
                      className="custom-error__action"
                      onClick={() => setMode('loading')}
                    >
                      Try again
                    </button>
                  </div>
                ) : undefined
              }
            >
              <div className="users">
                <div className="users__head">
                  <div>
                    <p className="users__eyebrow">Team directory</p>
                    <h2 className="users__title">People</h2>
                  </div>
                  <span className="users__count">{USERS.length} members</span>
                </div>
                <ul className="users__list">
                  {USERS.map((user) => (
                    <li key={user.id} className="users__item">
                      <span
                        className="users__avatar"
                        style={{
                          background: `linear-gradient(145deg, ${user.accent}, color-mix(in srgb, ${user.accent} 55%, #0f172a))`,
                        }}
                        aria-hidden="true"
                      >
                        {user.initials}
                      </span>
                      <div className="users__meta">
                        <div className="users__row">
                          <strong>{user.name}</strong>
                          <span
                            className={`users__status users__status--${user.status}`}
                          >
                            {STATUS_LABEL[user.status]}
                          </span>
                        </div>
                        <div className="users__row users__row--sub">
                          <span>{user.role}</span>
                          <span className="users__dot" aria-hidden="true" />
                          <span>{user.team}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </State>
          </div>
        </main>

        <aside className="panel">
          <div className="panel__head">
            <h2>Controls</h2>
            <p>Tune the live State preview.</p>
          </div>

          {showLayout ? (
            <section className="panel__section">
              <h3>Layout</h3>
              <div className="chip-row">
                {LOADING_LAYOUTS.map((value) => (
                  <button
                    key={value}
                    type="button"
                    className={layout === value ? 'chip chip--active' : 'chip'}
                    onClick={() => setLayout(value)}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </section>
          ) : null}

          {showLoaderControls ? (
            <>
              <section className="panel__section">
                <h3>Loader type</h3>
                <div className="chip-row chip-row--wrap">
                  {LOADER_TYPES.map((value) => (
                    <button
                      key={value}
                      type="button"
                      className={
                        loaderType === value ? 'chip chip--active' : 'chip'
                      }
                      onClick={() => setLoaderType(value)}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </section>

              <section className="panel__section">
                <h3>Size</h3>
                <div className="chip-row">
                  {LOADER_SIZES.map((value) => (
                    <button
                      key={value}
                      type="button"
                      className={
                        loaderSize === value ? 'chip chip--active' : 'chip'
                      }
                      onClick={() => setLoaderSize(value)}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </section>

              <section className="panel__section">
                <h3>Color</h3>
                <div className="swatch-row">
                  {COLOR_OPTIONS.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      className={
                        colorId === option.id
                          ? 'swatch swatch--active'
                          : 'swatch'
                      }
                      title={option.label}
                      aria-label={option.label}
                      onClick={() => setColorId(option.id)}
                    >
                      <span
                        className="swatch__fill"
                        style={{ background: option.swatch }}
                      />
                    </button>
                  ))}
                </div>
              </section>
            </>
          ) : null}

          {showSurfaceBackground ? (
            <>
              <section className="panel__section">
                <h3>Background</h3>
                <div className="swatch-row">
                  {BACKGROUND_OPTIONS.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      className={
                        backgroundId === option.id
                          ? 'swatch swatch--active'
                          : 'swatch'
                      }
                      title={option.label}
                      aria-label={option.label}
                      onClick={() => setBackgroundId(option.id)}
                    >
                      <span
                        className={
                          option.id === 'none'
                            ? 'swatch__fill swatch__fill--none'
                            : 'swatch__fill'
                        }
                        style={
                          option.swatch
                            ? { background: option.swatch }
                            : undefined
                        }
                      />
                    </button>
                  ))}
                </div>
              </section>

              {showBackgroundOpacity ? (
                <section className="panel__section">
                  <div className="range-head">
                    <h3>Opacity</h3>
                    <span>{Math.round(backgroundOpacity * 100)}%</span>
                  </div>
                  <input
                    className="range"
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={backgroundOpacity}
                    onChange={(event) =>
                      setBackgroundOpacity(Number(event.target.value))
                    }
                  />
                </section>
              ) : null}
            </>
          ) : null}

          {showCustomToggle ? (
            <label className="toggle">
              <input
                type="checkbox"
                checked={useCustomComponent}
                onChange={(event) =>
                  setUseCustomComponent(event.target.checked)
                }
              />
              <span className="toggle__ui" aria-hidden="true" />
              <span className="toggle__label">{customToggleLabel}</span>
            </label>
          ) : null}
        </aside>
      </div>

      <footer className="footer">
        <p>
          Built with <code>@statekitjs/react</code>
        </p>
        <div className="footer__links">
          <a
            href="https://www.npmjs.com/package/@statekitjs/react"
            target="_blank"
            rel="noreferrer"
          >
            npm
          </a>
          <a
            href="https://github.com/devsruthi/statekit"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}
