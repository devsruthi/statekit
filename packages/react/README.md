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
