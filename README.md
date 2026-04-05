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

`src/app.html` is the root HTML shell. It has two SvelteKit placeholders:
- `%sveltekit.head%` — where SvelteKit injects `<meta>`, `<link>`, `<script>` tags
- `%sveltekit.body%` — where the rendered page content goes

It also sets `data-sveltekit-preload-data="hover"` on the `<body>`, which prefetches page data when you hover a link.

---

## Route Structure

SvelteKit file-based routing using route groups in `src/routes/`:

```
src/routes/
├── +layout.svelte              ← root: global CSS + favicon only
├── (app)/
│   ├── +layout.svelte          ← wraps pages in <Nav> shell
│   ├── +page.svelte            → /
│   └── table-example/
│       └── +page.svelte        → /table-example
└── (auth)/
    └── +layout.svelte          ← bare layout, no nav (for sign-in etc.)
```

Route groups (folders in parentheses) don't affect the URL — they only control which layout a page inherits.

### Adding a page with nav
1. Create `src/routes/(app)/your-page/+page.svelte`
2. Add `{ label: 'Your Page', path: '/your-page' }` to the `pages` array in `src/routes/(app)/+layout.svelte`

### Adding a page without nav (e.g. sign-in)
Drop a `+page.svelte` inside `src/routes/(auth)/sign-in/` — it inherits the bare `(auth)/+layout.svelte` automatically.

---

## Nav Component

`src/lib/components/Nav.svelte` is a full-page shell with three sections:

- **Header** (full width, fixed height): logo placeholder top-left, profile selector button top-right
- **Sidebar** (`w-56`, fixed): page links in the middle; gear/settings button pinned to the bottom-left
- **Main area**: fills remaining space, renders page content via a `children` snippet

The `pages` array and page content are passed in from `(app)/+layout.svelte`.

#### Placeholders to revisit
- **Logo**: swap the `<span>` div in Nav for `<img src={logo} alt="..." />` once the asset is available
- **Profile selector**: the button in the header top-right
- **Settings menu**: the gear button at the bottom of the sidebar (will expand to admin/profile/settings)

---

## How Components Are Loaded

Components live in `src/lib/components/` and are exported through `src/lib/index.js`:

```js
export { default as Nav } from './components/Nav.svelte';
export { default as Table } from './components/Table.svelte';
```

Pages and layouts import them using the `$lib` alias:

```js
import { Nav, Table } from '$lib';
```

To add a new component: create it in `src/lib/components/`, export it from `src/lib/index.js`, then import via `$lib`.

---

## Resource Loading (CSS, JS)

- **Tailwind CSS** — `app.css` has `@import "tailwindcss"` and is imported once in the root `+layout.svelte`, making it global
- **JavaScript** — Vite + SvelteKit handle bundling automatically; no manual script tags needed
- **Static assets** — go in `static/` and are served at the root path