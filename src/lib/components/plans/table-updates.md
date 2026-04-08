## Table component: schema extensions, event system, and style updates

**Context**: We're extending `<TableComponent>` (path: `src/components/table/Table.svelte`). 
The current column schema shape is:
  { key: string, label: string, type: 'string' | 'number' }

Do not change the existing API — only extend it.

---

### 1. New schema types

Add support for these column `type` values:

- `boolean` — render a checkmark icon (true) or circle-slash icon (false); no raw text
- `icon` — render an icon; assume value is an icon name/component reference (match our existing icon system)
- `datetime` — format as `MMM d, yyyy h:mm a` (e.g. "Apr 3, 2025 2:30 PM")
- `date` — format as `MMM d, yyyy` (e.g. "Apr 3, 2025")
- `tags` — value is `string[]`; render each as a pill. Each tag object may optionally include a `color` hex string; default to `#efefef`. Auto-generate using `contrast-color()` css function for text color from the background hex.

---

### 2. Event system

Add an optional `events` prop to the table. No events should be registered unless explicitly passed. Signature:

```ts
type TableEvents = {
  onRowClick?: (row: RowData) => void
  onCellClick?: (value: any, key: string, row: RowData) => void
  onCellHover?: (value: any, key: string, row: RowData) => void
  onHeaderClick?: (key: string) => void
}
```

Behaviors tied to events:
- `onRowClick`: highlight the clicked row (use a CSS class, not inline style)
    - `onHeaderClick`: sort that column asc → desc → original; indicate sort state visually in the header using an arrow icon
- For tooltips: add an optional `tooltip` config to the column schema definition.
    - Trigger: hover only
    - Config: `{ getValue: (row: RowData) => string }` — caller decides what text to show
    - If `tooltip` is not defined on a column, no tooltip is shown for that column

---

### 3. Add ons
Add an optional `addOns` prop to the table for table-wide optional behaviors. 
It should be designed to grow over time — start with an empty shape but 
establish the pattern.

---

### 4. Style and formatting

- All cell overflow: truncate with ellipsis (`overflow: hidden; text-overflow: ellipsis; white-space: nowrap`)
- Column widths: default to auto; add optional `minWidth` (px value) to column schema
- Tag pills: pill-shaped (`border-radius: 999px`), color from data, auto-contrast text
- Boolean cells: icon only, no text label

---

### 5. Update `table-example`

After implementing the above, update `src/components/table/table-example.svelte` with a demo that exercises every new feature:
- One column per new type (`boolean`, `icon`, `date`, `datetime`, `tags`)
- All four event handlers wired up and logged to console
- At least one column with `minWidth` set
- At least one tag with a custom color hex and one using the default
- At least one tooltip example