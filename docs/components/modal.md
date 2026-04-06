# Modal Component

A centered overlay dialog with globally accessible open/close state. Any part of the app can trigger the modal without prop drilling.

---

## Files

| File | Purpose |
|------|---------|
| `src/lib/stores/modal.svelte.js` | Global open/close state store |
| `src/lib/components/Modal.svelte` | The modal dialog component |

---

## Store API

Import and call from anywhere in the app:

```js
import { modal } from '$lib/stores/modal.svelte.js';

modal.open();       // open the modal
modal.close();      // close the modal
modal.toggle();     // toggle open/closed
modal.isOpen;       // reactive boolean — current state
```

---

## Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | — | Optional title displayed in the modal header |
| `children` | `Snippet` | — | Content rendered in the modal body |
| `footer` | `Snippet` | — | Optional footer area (e.g. action buttons). Hidden when not provided |
| `closeOnBackdrop` | `boolean` | `true` | When `false`, clicking the backdrop does not close the modal — useful for confirmation dialogs |

---

## Usage

### Basic

```svelte
<Modal title="My Modal">
  {#snippet children()}
    <p>Modal content here.</p>
  {/snippet}
</Modal>
```

### With footer actions

```svelte
<Modal title="Confirm Delete">
  {#snippet children()}
    <p>Are you sure you want to delete this item?</p>
  {/snippet}
  {#snippet footer()}
    <div class="flex justify-end gap-2">
      <button onclick={modal.close}>Cancel</button>
      <button onclick={handleDelete}>Delete</button>
    </div>
  {/snippet}
</Modal>
```

### Prevent accidental dismissal

```svelte
<Modal title="Required Action" closeOnBackdrop={false}>
  {#snippet children()}
    <p>You must complete this before continuing.</p>
  {/snippet}
</Modal>
```

---

## Behaviour

- Centered in the viewport at all times
- Close button (×) always visible in the modal header
- Pressing `Escape` closes the modal
- Clicking the backdrop closes the modal (when `closeOnBackdrop=true`)
- Footer section is only rendered when the `footer` snippet is provided
- Mounted once in `src/routes/(app)/+layout.svelte` — present on every app route

---

## Layout

```
┌─────────────────────────────┐
│ {title}                 [×] │   ← header (always shown)
├─────────────────────────────┤
│                             │
│   {children}                │   ← scrollable body
│                             │
├─────────────────────────────┤   ← only rendered when footer snippet is provided
│   {footer}                  │
└─────────────────────────────┘
```
