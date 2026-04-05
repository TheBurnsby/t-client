# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project
npx sv create my-app
```

To recreate this project with the same configuration:

```sh
# recreate this project
npx sv@0.12.7 create --template minimal --types jsdoc --install npm ./
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.


## Main Template File

t-client/src/app.html is the root HTML shell. It has two SvelteKit placeholders:
- %sveltekit.head% — where SvelteKit injects <meta>, <link>, <script> tags
- %sveltekit.body% — where the rendered page content goes

It also sets data-sveltekit-preload-data="hover" on the <body>, which prefetches page data when you
hover a link.

---
## Layout & Page Loading

SvelteKit uses file-based routing in src/routes/:
src/routes/
├── +layout.svelte        ← wraps ALL pages (nav + children)
├── +page.svelte          ← renders at /
└── table-example/
    └── +page.svelte      ← renders at /table-example

+layout.svelte is the root layout. Every page is rendered inside it via {@render children()}. It also
imports the global CSS (app.css) and the <Nav> component — so both load on every page.

---
## How Components Are Loaded

Components live in src/lib/components/ and are exported through src/lib/index.js:
export { default as Nav } from './components/Nav.svelte';
export { default as Table } from './components/Table.svelte';

Pages and layouts import them using the $lib alias:

import { Nav, Table } from '$lib';

To add a new component: create it in src/lib/components/, export it from src/lib/index.js, then
import via $lib.

---
## Resource Loading (CSS, JS)

- Tailwind CSS — app.css has @import "tailwindcss" and is imported once in +layout.svelte, making it
global
- JavaScript — Vite + SvelteKit handle bundling automatically; no manual script tags needed
- Static assets — go in static/ and are served at the root path

---
## Navigation

The <Nav> component in +layout.svelte has a hardcoded page list:

const pages = [
    { label: 'Home', path: '/' },
    { label: 'Table Example', path: '/table-example' },
];

To add a new page: create a folder + +page.svelte in src/routes/, then add an entry to this list.