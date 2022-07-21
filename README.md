# ADPList challenge

This is my challenge app for ADPlist. It is powered by:

- 🏎 [Turborepo](https://turborepo.org) — High-performance build system for Monorepos
- 🚀 [React](https://reactjs.org/) — JavaScript library for user interfaces
- 🚀 [Next JS](https://nextjs.org/) — The React Framework for Production
- 🛠 [TsDx](https://tsdx.io/) — Zero-config CLI for TypeScript package development
- 🛠 [Tsup](https://github.com/egoist/tsup) — TypeScript bundler powered by esbuild
- 📖 [Storybook](https://storybook.js.org/) — UI component environment powered by Vite

## Getting Started

Clone this project first:

```bash
git clone https://github.com/mychidarko/adplist
cd adplist
```

From here, a setup command has been created to get you started with everything you need. You can simply run `yarn setup` to get everything ready and install dependencies.

## Apps & Packages

This monorepo includes the following packages and applications:

- `apps/docs`: Component documentation site with Storybook
- `apps/meetings-app`: Video conferencing app
- `apps/user-app`: App for user profile
- `packages/@adplist/core`: Core React components
- `packages/@adplist/utils`: Shared React utilities
- `packages/@adplist/tsconfig`: Shared `tsconfig.json`s used throughout the Turborepo
- `packages/eslint-preset-adplist`: ESLint preset

Each package and app is 100% [TypeScript](https://www.typescriptlang.org/).

### Env

Each app has a `.env.example` file which is pre-populated with all the information you need to make this app work. If you however want to use your own Auth0 or Dyte accounts, you can swap out the information in the created `.env` files.

### Useful Commands

- `yarn build` - Build all packages including the Storybook site
- `yarn dev` - Run all packages locally and preview with Storybook
- `yarn lint` - Lint all packages
- `yarn changeset` - Generate a changeset
- `yarn clean` - Clean up all `node_modules` and `dist` folders (runs each package's clean script)
