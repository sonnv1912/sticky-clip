# Sticky Clip

Sticky Clip is a monorepo with the desktop app and its web document site.

## Requirements

- Node.js 20+
- Yarn 1.22.x

## Workspace Layout

- `apps/app`: Electron desktop app
- `apps/document`: product/document website
- `packages/*`: shared assets, hooks, configs, types, and utilities

## Development

Install dependencies:

```bash
yarn install
```

Run the desktop app:

```bash
yarn dev:app
```

Run the document site:

```bash
yarn dev:document
```

## Build

Build everything managed by Turbo:

```bash
yarn build
```

Build only the desktop app:

```bash
yarn build:app
```

Build only the document site:

```bash
yarn build:document
```

## Deploy

Deploy the document site manually:

```bash
yarn deploy:document
```

GitHub Actions also deploys `apps/document/dist` to `gh-pages` on pushes to `main`.
