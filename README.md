<p align="center">
  <img
    src="./assets/branding/github-banner.png"
    alt="StateKit Banner"
    width="720"
  />
</p>

<div align="center">

<p>
  <a href="https://www.npmjs.com/package/@statekitjs/react"><img src="https://img.shields.io/npm/v/@statekitjs/react?style=for-the-badge" alt="npm version" /></a>
  <img src="https://img.shields.io/github/stars/devsruthi/statekit?style=for-the-badge" alt="GitHub stars" />
  <img src="https://img.shields.io/github/license/devsruthi/statekit?style=for-the-badge" alt="License" />
  <img src="https://img.shields.io/badge/TypeScript-Ready-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
</p>

<p>
Stop rewriting loading, empty, error, and success UI.
Build consistent user experiences with one elegant API.
</p>

</div>

# Why StateKitJS?

Every React application repeats the same UI patterns.

```tsx
if (loading) return <Spinner />

if (error) return <Error />

if (!users.length) return <Empty />

return <Users />
```

Eventually every project becomes filled with duplicated rendering logic.

StateKitJS replaces all of that with one declarative component.

```tsx
<State
    loading={loading}
    error={error}
    empty={users.length === 0}
>
    <Users />
</State>
```

Simple.

Reusable.

Readable.

Consistent.


# Features

- 🚀 One-line state rendering
- 📦 Beautiful loading states
- ❌ Elegant error components
- 📭 Empty state components
- 🦴 Responsive skeleton loaders
- 🌙 Dark mode ready
- 📱 Mobile responsive
- ♿ Accessibility first
- 🌲 Tree-shakable
- ⚡ Tiny bundle size
- 🔷 TypeScript support
- 🎨 Fully customizable


# Packages

| Package | Description |
|----------|-------------|
| **@statekitjs/react** | React component library |

More packages are planned.

- @statekitjs/icons
- @statekitjs/themes
- @statekitjs/utils
- @statekitjs/cli


# Installation

```bash
npm install @statekitjs/react
```

or

```bash
pnpm add @statekitjs/react
```


# Quick Example

```tsx
import { State } from "@statekitjs/react";

function UsersPage() {
  return (
    <State
      loading={loading}
      error={error}
      empty={users.length === 0}
    >
      <UsersTable />
    </State>
  );
}
```


# `State` props

Priority when multiple flags are set: **loading → error → empty → children**.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `loading` | `boolean` | `false` | Renders the loading state. Highest priority. |
| `error` | `unknown` | — | When truthy, renders the error state. Accepts an `Error`, `string`, or any value. |
| `empty` | `boolean` | `false` | Renders the empty state. |
| `layout` | `"default" \| "table" \| "grid" \| "list"` | `"default"` | Skeleton layout for the built-in loading state. |
| `loaderType` | `"spinner" \| "dots" \| "pulse" \| "bars" \| "infinity" \| "ring" \| "orbit" \| "spokes" \| "activity" \| "ripple" \| "aurora" \| "bloom" \| "comet" \| "eclipse" \| "gauge" \| "progress-circle" \| "progress-bar"` | `"spinner"` | Built-in loader visual (default layout only). |
| `loaderSize` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"lg"` | Built-in loader size. |
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
| `emptyBackground` | `"none" \| [color] \| [from, to, …]` | `"none"` | Empty surface background. One color = solid, 2+ = gradient. |
| `emptyBackgroundOpacity` | `number` (0–1) | `1` | Opacity applied to `emptyBackground`. |
| `errorTitle` | `string` | `"Something went wrong!"` | Title for the default error UI. |
| `errorDescription` | `string` | `"Unable to load the content."` | Description for the default error UI. |
| `errorBackground` | `"none" \| [color] \| [from, to, …]` | `"none"` | Error surface background. One color = solid, 2+ = gradient. |
| `errorBackgroundOpacity` | `number` (0–1) | `1` | Opacity applied to `errorBackground`. |
| `loadingComponent` | `ReactNode` | — | Replaces the built-in loading UI. |
| `emptyComponent` | `ReactNode` | — | Replaces the built-in empty UI. |
| `errorComponent` | `ReactNode` | — | Replaces the built-in error UI. |
| `onRetry` | `() => void` | — | Called when the default error retry action is activated. |
| `children` | `ReactNode` | — | Success content when no loading, error, or empty state is active. |

### Loader example

```tsx
<State
  loading={isLoading}
  loaderType="spinner"
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
  loaderType="spinner"
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


# Project Structure

```
statekit
│
├── packages/
│   └── react/
│
├── apps/
│   ├── website/
│   └── playground/
│
├── docs/
│
├── examples/
│
└── rfcs/
```


# Philosophy

StateKitJS focuses on one thing.

Making application states beautiful.

Instead of writing repetitive conditional rendering across your application, developers should describe the state—not how to render it.


# Roadmap

## v0.2

- Animated Loading
- Card Skeleton
- Dashboard Skeleton
- Timeline Skeleton


## v0.3

- React Query Integration
- SWR Integration
- RTK Query Integration


## v0.4

- Theme System
- Dark Mode
- Custom Animations


## v1.0

- Stable API
- Complete Documentation
- Production Ready


# Contributing

We welcome contributions.

```bash
git clone https://github.com/devsruthi/statekit.git

pnpm install

pnpm dev
```



# Built With

- React
- TypeScript
- Vite
- Storybook
- Vitest
- pnpm Workspaces
- Changesets
- GitHub Actions


# License

MIT


<div align="center">

### ⭐ If you like StateKitJS, please consider giving it a Star.

Built with ❤️ by Sruthi

</div>
