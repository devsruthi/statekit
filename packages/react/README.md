# @statekit/react

Beautiful loading, empty, error, and success states for React applications.

> Engineering foundation only. Public components ship in a later milestone.

## Development

```bash
# from repository root
pnpm install
pnpm --filter @statekit/react storybook
pnpm --filter @statekit/react test
pnpm --filter @statekit/react build
```

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
