<p align="center">
  <img
    src="../../assets/branding/logo-light.svg"
    alt="StateKit"
    width="200"
  />
</p>

<div align="center">

# @statekitjs/react

Beautiful loading, empty, error and success states for React.

</div>

---

## Installation

```bash
npm install @statekitjs/react
```

or

```bash
pnpm add @statekitjs/react
```

---

## Quick example

```tsx
import { State } from '@statekitjs/react';

function UsersPage({ loading, error, users }) {
  return (
    <State
      loading={loading}
      error={error}
      empty={users.length === 0}
    >
      <UsersTable users={users} />
    </State>
  );
}
```

Customize copy, layouts, and default UI when you need to:

```tsx
<State
  loading={isLoading}
  error={error}
  empty={!users.length}
  layout="table"
  loadingTitle="Fetching users"
  errorTitle="Could not load users"
  onRetry={refetch}
>
  <UsersTable users={users} />
</State>
```

---

## `State` props

Priority when multiple flags are set: **loading → error → empty → children**.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `loading` | `boolean` | `false` | Renders the loading state. Highest priority. |
| `error` | `unknown` | — | When truthy, renders the error state. Accepts an `Error`, `string`, or any value. |
| `empty` | `boolean` | `false` | Renders the empty state. |
| `layout` | `"default" \| "table" \| "grid" \| "list"` | `"default"` | Skeleton layout for the built-in loading UI only. |
| `loadingTitle` | `string` | `"Loading"` | Title for the default loading UI. |
| `loadingDescription` | `string` | `"Please wait while content loads."` | Description for the default loading UI. |
| `emptyTitle` | `string` | `"No data"` | Title for the default empty UI. |
| `emptyDescription` | `string` | `"There is nothing to display yet."` | Description for the default empty UI. |
| `errorTitle` | `string` | `"Something went wrong"` | Title for the default error UI. |
| `errorDescription` | `string` | derived from `error` | Description for the default error UI. |
| `loadingComponent` | `ReactNode` | — | Replaces the built-in loading UI. |
| `emptyComponent` | `ReactNode` | — | Replaces the built-in empty UI. |
| `errorComponent` | `ReactNode` | — | Replaces the built-in error UI. |
| `onRetry` | `() => void` | — | Called when the default error retry action is activated. |
| `children` | `ReactNode` | — | Success content when no loading, error, or empty state is active. |

### Custom empty example

```tsx
<State
  empty={users.length === 0}
  emptyComponent={
    <div>
      <h2>No users yet</h2>
      <p>Invite someone to get started.</p>
    </div>
  }
>
  <UsersTable users={users} />
</State>
```

---

## Development

From the repository root:

```bash
pnpm install
pnpm --filter @statekitjs/react storybook
pnpm --filter @statekitjs/react test
pnpm --filter @statekitjs/react build
```

---

## Package layout

```
packages/react/
├── src/          # library source
├── stories/      # Storybook stories
├── tests/        # Vitest suites
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tsup.config.ts
```

---

## License

MIT
