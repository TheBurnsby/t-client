# Drawer Component

A right-side sliding panel with globally accessible open/close state. Any part of the app can trigger the drawer without prop drilling.

---

## Files

| File | Purpose |
|------|---------|
| `src/lib/stores/drawer.svelte.js` | Global open/close state store |
| `src/lib/components/Drawer.svelte` | The drawer panel component |

---

## Store API

Import and call from anywhere in the app:

```js
import { drawer } from '$lib/stores/drawer.svelte.js';

drawer.open();           // open at default width (w-80)
drawer.open('w-1/2');   // open at a specific width
drawer.close();          // close the drawer
drawer.toggle();         // toggle open/closed
drawer.isOpen;           // reactive boolean — current state
drawer.width;            // reactive string — current Tailwind width class
```

---

## Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `Snippet` | — | Content rendered inside the drawer body |
| `backdrop` | `boolean` | `true` | When `true`, renders a dimming overlay that closes the drawer on click. Set to `false` to keep the app fully interactive while the drawer is open. |

---

## Usage

### Basic (with backdrop)

```svelte
<Drawer>
  {#snippet children()}
    <p>Drawer content here.</p>
  {/snippet}
</Drawer>
```

### Without backdrop (app stays interactive)

```svelte
<Drawer backdrop={false}>
  {#snippet children()}
    <p>Users can still click the app behind this drawer.</p>
  {/snippet}
</Drawer>
```

---

## Behaviour

- Slides in from the **right** edge of the viewport
- Close button (×) always visible in the drawer header
- Pressing `Escape` closes the drawer
- Clicking the backdrop closes the drawer (when `backdrop=true`)
- Mounted once in `src/routes/(app)/+layout.svelte` — present on every app route

---

## Layout

```
backdrop=true
┌──────────────────────┬─────────────┐
│  (backdrop, dim)     │  Drawer     │
│                      │         [×] │
│                      │  {children} │
│                      │             │
└──────────────────────┴─────────────┘

backdrop=false
┌──────────────────────────┬──────────┐
│  App (fully interactive) │  Drawer  │
│                          │      [×] │
│                          │  {...}   │
└──────────────────────────┴──────────┘
```
