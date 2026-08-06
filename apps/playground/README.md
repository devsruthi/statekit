# Playground

Interactive demo for `@statekitjs/react` — loading, empty, error, and success states.

## Run locally

From the repo root:

```bash
pnpm install
pnpm --filter @statekitjs/react build
pnpm --filter @statekit/playground dev
```

Or: `pnpm playground`

Open http://localhost:5173

Rebuild the library after source changes:

```bash
pnpm --filter @statekitjs/react build
```

## Deploy to Vercel

1. Import the GitHub repo in Vercel
2. Set **Root Directory** to `apps/playground`
3. Framework preset: Vite (or leave auto)
4. `vercel.json` already sets install/build commands for the monorepo

Or from CLI (with Root Directory = `apps/playground`):

```bash
vercel
```
