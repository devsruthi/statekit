# Playground

Local Vite app for trying `@statekitjs/react` against the workspace package.

## Run

From the repo root:

```bash
pnpm install
pnpm --filter @statekitjs/react build
pnpm --filter @statekit/playground dev
```

Or from the root after wiring scripts: `pnpm playground`.

Open http://localhost:5173

Rebuild the library after source changes:

```bash
pnpm --filter @statekitjs/react build
```

For hot-reloading library changes in another terminal:

```bash
pnpm --filter @statekitjs/react dev
```
