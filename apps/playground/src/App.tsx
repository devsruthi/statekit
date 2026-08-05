import { useMemo, useState } from 'react';
import { State, type StateLayout } from '@statekitjs/react';

type DemoMode = 'loading' | 'empty' | 'error' | 'success';

const LAYOUTS: StateLayout[] = ['default', 'table', 'grid', 'list'];

const USERS = [
  { id: 1, name: 'Ada Lovelace', role: 'Engineer' },
  { id: 2, name: 'Grace Hopper', role: 'Architect' },
  { id: 3, name: 'Alan Turing', role: 'Researcher' },
];

export function App() {
  const [mode, setMode] = useState<DemoMode>('loading');
  const [layout, setLayout] = useState<StateLayout>('default');

  const stateProps = useMemo(
    () => ({
      loading: mode === 'loading',
      empty: mode === 'empty',
      error: mode === 'error' ? new Error('Failed to fetch users.') : undefined,
      layout,
      onRetry: () => setMode('loading'),
    }),
    [layout, mode],
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
      </div>

      <main className="stage">
        <State
          {...stateProps}
          emptyComponent={
            <div className="custom-empty">
              <h2>No users yet</h2>
              <p>Add someone to get started — this is a custom emptyComponent.</p>
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
