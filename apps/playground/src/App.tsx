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

const LOADING_LAYOUTS: StateLayout[] = ['default', 'table', 'grid', 'list'];
const LOADER_TYPES = Object.values(LOADER_TYPE);
const LOADER_SIZES: LoaderSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

const BACKGROUND_OPTIONS: {
  id: string;
  label: string;
  value: LoaderBackground;
}[] = [
  { id: 'none', label: 'none (default)', value: 'none' },
  { id: 'solid', label: 'solid [#4F46E5]', value: LOADER_COLOR_PRIMARY },
  {
    id: 'gradient',
    label: 'gradient [#7C3AED → #2563EB]',
    value: LOADER_COLOR_GRADIENT,
  },
  {
    id: 'cyan',
    label: 'solid [#06B6D4]',
    value: ['#06B6D4'],
  },
];

const COLOR_OPTIONS = [
  { id: 'solid', label: 'solid [#4F46E5]', value: LOADER_COLOR_PRIMARY },
  {
    id: 'gradient',
    label: 'gradient [#7C3AED → #2563EB]',
    value: LOADER_COLOR_GRADIENT,
  },
  {
    id: 'custom',
    label: 'custom [#7C3AED → #06B6D4]',
    value: ['#7C3AED', '#06B6D4'] as const satisfies LoaderColor,
  },
  {
    id: 'cyan',
    label: 'solid [#06B6D4]',
    value: ['#06B6D4'] as const satisfies LoaderColor,
  },
] as const;

const USERS = [
  { id: 1, name: 'Ada Lovelace', role: 'Engineer' },
  { id: 2, name: 'Grace Hopper', role: 'Architect' },
  { id: 3, name: 'Alan Turing', role: 'Researcher' },
];

export function App() {
  const [mode, setMode] = useState<DemoMode>('loading');
  const [layout, setLayout] = useState<StateLayout>('default');
  const [useCustomComponent, setUseCustomComponent] = useState(false);
  const [loaderType, setLoaderType] = useState<LoaderType>('spinner');
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
      <header className="header">
        <p className="eyebrow">Local playground</p>
        <h1>@statekitjs/react</h1>
        <p className="lede">
          Flip modes below to exercise loading, empty, error, and success
          against the workspace package.
        </p>
      </header>

      <div className="controls">
        <label>
          Mode
          <select
            value={mode}
            onChange={(event) => {
              setMode(event.target.value as DemoMode);
              setUseCustomComponent(false);
            }}
          >
            <option value="loading">loading</option>
            <option value="empty">no data</option>
            <option value="error">error</option>
            <option value="success">success</option>
          </select>
        </label>

        {showLayout ? (
          <label>
            Layout
            <select
              value={layout}
              onChange={(event) =>
                setLayout(event.target.value as StateLayout)
              }
            >
              {LOADING_LAYOUTS.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>
        ) : null}

        {showLoaderControls ? (
          <>
            <label>
              Loader type
              <select
                value={loaderType}
                onChange={(event) =>
                  setLoaderType(event.target.value as LoaderType)
                }
              >
                {LOADER_TYPES.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Size
              <select
                value={loaderSize}
                onChange={(event) =>
                  setLoaderSize(event.target.value as LoaderSize)
                }
              >
                {LOADER_SIZES.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Color
              <select
                value={colorId}
                onChange={(event) =>
                  setColorId(
                    event.target.value as (typeof COLOR_OPTIONS)[number]['id'],
                  )
                }
              >
                {COLOR_OPTIONS.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </>
        ) : null}

        {showSurfaceBackground ? (
          <>
            <label>
              Background
              <select
                value={backgroundId}
                onChange={(event) => setBackgroundId(event.target.value)}
              >
                {BACKGROUND_OPTIONS.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            {showBackgroundOpacity ? (
              <label>
                Bg opacity ({Math.round(backgroundOpacity * 100)}%)
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={backgroundOpacity}
                  onChange={(event) =>
                    setBackgroundOpacity(Number(event.target.value))
                  }
                />
              </label>
            ) : null}
          </>
        ) : null}

        {showCustomToggle ? (
          <label className="control-toggle">
            <input
              type="checkbox"
              checked={useCustomComponent}
              onChange={(event) =>
                setUseCustomComponent(event.target.checked)
              }
            />
            <span>{customToggleLabel}</span>
          </label>
        ) : null}
      </div>

      <main className="stage">
        <State
          {...stateProps}
          loadingComponent={
            mode === 'loading' && useCustomComponent ? (
              <div className="custom-loading" role="status" aria-live="polite">
                <p className="custom-badge">User-created component</p>
                <div className="custom-loading__orb" aria-hidden>
                  <span className="custom-loading__ring" />
                  <span className="custom-loading__core" />
                </div>
                <div className="custom-loading__copy">
                  <p className="custom-loading__eyebrow">loadingComponent</p>
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
                  <p className="custom-empty__eyebrow">emptyComponent</p>
                  <h2>No users yet</h2>
                  <p>
                    This is a user-created component passed via emptyComponent.
                    Invite someone to get started.
                  </p>
                </div>
                <button
                  type="button"
                  className="custom-empty__action"
                  onClick={() => setMode('success')}
                >
                  Show sample users
                </button>
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
                    This is a user-created component passed via errorComponent.
                    Something went wrong while fetching data.
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
          <ul className="users">
            {USERS.map((user) => (
              <li key={user.id}>
                <strong>{user.name}</strong>
                <span>{user.role}</span>
              </li>
            ))}
          </ul>
        </State>
      </main>
    </div>
  );
}
