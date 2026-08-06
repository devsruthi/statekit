<p align="center">
  <img
    src="../../assets/branding/github-banner.png"
    alt="StateKitJS"
    width="520"
  />
</p>

<div align="center">

# @statekitjs/react

Beautiful loading, empty, error and success states for React.

[![npm version](https://img.shields.io/npm/v/@statekitjs/react.svg?color=cb3837)](https://www.npmjs.com/package/@statekitjs/react)
[![Docs](https://img.shields.io/badge/docs-live-blue)](https://statekitjs-playground.vercel.app)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)

**Docs:** [Documentation & live demos](https://statekitjs-playground.vercel.app)

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
  errorRetryLabel="Retry now"
  errorRetryStyle={{ background: '#4F46E5', color: '#fff', border: 'none' }}
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
| `layout` | `"default" \| "table" \| "grid" \| "list"` | `"default"` | Skeleton layout for the built-in loading state. |
| `loaderType` | `"ring" \| "dots" \| "circle-dots" \| "pulse" \| "bars" \| "infinity" \| "orbit" \| "spokes" \| "activity" \| "ripple" \| "aurora" \| "bloom" \| "eclipse" \| "orbitals" \| "flare" \| "spectrum" \| "gauge" \| "progress-circle" \| "progress-bar"` | `"ring"` | Built-in loader visual (default layout only). |
| `loaderSize` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"` | Built-in loader size. |
| `loaderColor` | `[color]` or `[from, to, …]` | `["#4F46E5"]` | Color array: 1 = solid, 2+ = gradient. |
| `loaderSpeed` | `"slow" \| "normal" \| "fast"` | `"normal"` | Loader animation speed. |
| `loaderTheme` | `"light" \| "dark" \| "auto"` | `"auto"` | Theme for the built-in loading surface. |
| `loaderBackground` | `"none" \| [color] \| [from, to, …]` | `"none"` | Loading surface background. One color = solid, 2+ = gradient. |
| `loaderBackgroundOpacity` | `number` (0–1) | `1` | Opacity applied to `loaderBackground`. |
| `loaderProgress` | `number` | — | Progress 0–100 for `progress-circle` / `progress-bar`. |
| `loadingTitle` | `string` | `"Loading..."` | Title for the default loading UI. |
| `loadingDescription` | `string` | `"Please wait a moment"` | Description for the default loading UI. |
| `emptyTitle` | `string` | `"No records found"` | Title for the default empty UI. |
| `emptyDescription` | `string` | `"There are no records to display."` | Description for the default empty UI. |
| `emptyIcon` | `ReactNode` | — | Replaces the built-in empty icon. |
| `emptyBackground` | `"none" \| [color] \| [from, to, …]` | `"none"` | Empty surface background. One color = solid, 2+ = gradient. |
| `emptyBackgroundOpacity` | `number` (0–1) | `1` | Opacity applied to `emptyBackground`. |
| `errorTitle` | `string` | `"Something went wrong!"` | Title for the default error UI. |
| `errorDescription` | `string` | `"Unable to load the content."` | Description for the default error UI. |
| `errorIcon` | `ReactNode` | — | Replaces the built-in error icon. |
| `errorBackground` | `"none" \| [color] \| [from, to, …]` | `"none"` | Error surface background. One color = solid, 2+ = gradient. |
| `errorBackgroundOpacity` | `number` (0–1) | `1` | Opacity applied to `errorBackground`. |
| `errorRetryLabel` | `string` | `"Try again"` | Label for the built-in error retry button. |
| `errorRetryStyle` | `CSSProperties` | — | Inline styles for the built-in error retry button. |
| `errorRetryComponent` | `ReactNode` | — | Replaces the built-in error retry button. |
| `errorHideRetry` | `boolean` | `false` | Hides the built-in error retry button when true. |
| `loadingComponent` | `ReactNode` | — | Replaces the built-in loading UI. |
| `emptyComponent` | `ReactNode` | — | Replaces the built-in empty UI. |
| `errorComponent` | `ReactNode` | — | Replaces the built-in error UI. |
| `onRetry` | `() => void` | — | Called when the default error retry action is activated. |
| `children` | `ReactNode` | — | Success content when no loading, error, or empty state is active. |

### Loader example

```tsx
<State
  loading={isLoading}
  loaderType="ring"
  loaderSize="lg"
  loaderColor={['#4F46E5']}
  loadingTitle="Loading your data..."
  loadingDescription="Please wait while we load the data."
>
  <UsersTable users={users} />
</State>
```

Gradient (2+ colors):

```tsx
<State
  loading
  loaderType="ring"
  loaderColor={['#7C3AED', '#06B6D4']}
/>
```

### Custom loader example

```tsx
<State
  loading={isLoading}
  loadingComponent={
    <div>
      <h2>Fetching users…</h2>
      <p>Hang tight while we load your data.</p>
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
