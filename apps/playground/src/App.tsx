import { useMemo, useState } from 'react';
import {
  LOADER_COLOR_GRADIENT,
  LOADER_COLOR_PRIMARY,
  LOADER_TYPE,
  State,
  type LoaderColor,
  type LoaderSize,
  type LoaderType,
  type StateLayout,
} from '@statekitjs/react';

type DemoMode = 'loading' | 'empty' | 'error' | 'success';

const LAYOUTS: StateLayout[] = ['default', 'table', 'grid', 'list'];
const LOADER_TYPES = Object.values(LOADER_TYPE);
const LOADER_SIZES: LoaderSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

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
  const [loaderType, setLoaderType] = useState<LoaderType>('spinner');
  const [loaderSize, setLoaderSize] = useState<LoaderSize>('lg');
  const [colorId, setColorId] =
    useState<(typeof COLOR_OPTIONS)[number]['id']>('solid');

  const loaderColor =
    COLOR_OPTIONS.find((option) => option.id === colorId)?.value ??
    LOADER_COLOR_PRIMARY;

  const stateProps = useMemo(
    () => ({
      loading: mode === 'loading',
      empty: mode === 'empty',
      error: mode === 'error' ? new Error('Failed to fetch users.') : undefined,
      layout,
      loaderType,
      loaderSize,
      loaderColor,
      loaderProgress:
        loaderType === 'progress-circle' || loaderType === 'progress-bar'
          ? 72
          : undefined,
      onRetry: () => setMode('loading'),
    }),
    [layout, loaderColor, loaderSize, loaderType, mode],
  );

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
            onChange={(event) => setMode(event.target.value as DemoMode)}
          >
            <option value="loading">loading</option>
            <option value="empty">empty</option>
            <option value="error">error</option>
            <option value="success">success</option>
          </select>
        </label>

        <label>
          Layout
          <select
            value={layout}
            onChange={(event) => setLayout(event.target.value as StateLayout)}
          >
            {LAYOUTS.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>

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
      </div>

      <main className="stage">
        <State
          {...stateProps}
          emptyComponent={
            <div className="custom-empty">
              <h2>No users yet</h2>
              <p>
                Add someone to get started — this is a custom emptyComponent.
              </p>
              <button type="button" onClick={() => setMode('success')}>
                Show sample users
              </button>
            </div>
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
