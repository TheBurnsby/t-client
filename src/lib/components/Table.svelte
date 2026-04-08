<script>
  import CheckIcon from '$lib/components/icons/CheckIcon.svelte';
  import NoSymbolIcon from '$lib/components/icons/NoSymbolIcon.svelte';
  import ChevronUpIcon from '$lib/components/icons/ChevronUpIcon.svelte';
  import ChevronDownIcon from '$lib/components/icons/ChevronDownIcon.svelte';

  /**
   * @typedef {import('$lib/types').ColumnSchema} ColumnSchema
   * @typedef {import('$lib/types').TableEvents} TableEvents
   * @typedef {import('$lib/types').TableAddOns} TableAddOns
   * @typedef {import('$lib/types').TagValue} TagValue
   */

  /**
   * @type {{
   *   schema?: ColumnSchema[],
   *   data?: Record<string, any>[],
   *   events?: TableEvents,
   *   addOns?: TableAddOns
   * }}
   */
  let { schema = [], data = [], events = {}, addOns = {} } = $props();

  /** @type {string|null} */
  let sortKey = $state(null);
  /** @type {'asc'|'desc'|null} */
  let sortDir = $state(null);
  /** @type {Record<string, any>|null} */
  let activeRow = $state(null);
  let tooltip = $state({ visible: false, text: '', x: 0, y: 0, below: false });

  let sortedData = $derived.by(() => {
    if (!sortKey || !sortDir) return data;
    const key = /** @type {string} */ (sortKey);
    return [...data].sort((a, b) => {
      const av = a[key];
      const bv = b[key];
      if (av == null) return 1;
      if (bv == null) return -1;
      const cmp = av < bv ? -1 : av > bv ? 1 : 0;
      return sortDir === 'asc' ? cmp : -cmp;
    });
  });

  /**
   * Computes a contrasting text color (black or white) for a given background hex.
   * @param {string} hex
   * @returns {string}
   */
  function contrastColor(hex) {
    if (!/^#[0-9a-fA-F]{6}$/.test(hex)) return '#000000';
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    /** @param {number} c */
    const lin = (c) => {
      c /= 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    };
    const L = 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
    return L > 0.179 ? '#000000' : '#ffffff';
  }

  /**
   * Formats a value as "MMM d, yyyy".
   * @param {any} value
   * @returns {string}
   */
  function formatDate(value) {
    if (value == null) return '';
    return new Date(value).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }

  /**
   * Formats a value as "MMM d, yyyy h:mm a".
   * @param {any} value
   * @returns {string}
   */
  function formatDatetime(value) {
    if (value == null) return '';
    const d = new Date(value);
    const date = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const time = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    return `${date} ${time}`;
  }

  /**
   * Normalizes a tag value to a {label, color} object.
   * @param {TagValue} tag
   * @returns {{ label: string, color: string }}
   */
  function normalizeTag(tag) {
    if (typeof tag === 'string') return { label: tag, color: '#efefef' };
    const raw = tag.color ?? '';
    const color = /^#[0-9a-fA-F]{6}$/.test(raw) ? raw : '#efefef';
    return { label: tag.label, color };
  }

  /**
   * Handles header click: notifies caller and cycles sort state.
   * @param {string} key
   */
  function handleHeaderClick(key) {
    if (events?.onHeaderClick) events.onHeaderClick(key);
    if (sortKey === key) {
      if (sortDir === 'asc') sortDir = 'desc';
      else { sortKey = null; sortDir = null; }
    } else {
      sortKey = key;
      sortDir = 'asc';
    }
  }

  /**
   * Handles row click: highlights the row and notifies caller.
   * @param {Record<string, any>} row
   */
  function handleRowClick(row) {
    if (!events?.onRowClick) return;
    activeRow = activeRow === row ? null : row;
    events.onRowClick(row);
  }

  /**
   * Handles cell mouseenter: shows tooltip if configured and notifies caller.
   * @param {MouseEvent} e
   * @param {any} value
   * @param {ColumnSchema} col
   * @param {Record<string, any>} row
   */
  function handleCellMouseEnter(e, value, col, row) {
    if (events?.onCellHover) events.onCellHover(value, col.key, row);
    if (col.tooltip) {
      const rect = /** @type {HTMLElement} */ (e.currentTarget).getBoundingClientRect();
      const rawX = rect.left + rect.width / 2;
      const x = Math.max(80, Math.min(rawX, window.innerWidth - 80));
      const fitsAbove = rect.top >= 40;
      tooltip = {
        visible: true,
        text: col.tooltip.getValue(row),
        x,
        y: fitsAbove ? rect.top - 8 : rect.bottom + 8,
        below: !fitsAbove,
      };
    }
  }

  /** @param {ColumnSchema} col */
  function handleCellMouseLeave(col) {
    if (col.tooltip) tooltip = { ...tooltip, visible: false };
  }
</script>

{#if tooltip.visible}
  <div
    class="fixed z-50 -translate-x-1/2 rounded bg-gray-900 px-2 py-1 text-xs text-white shadow pointer-events-none"
    class:-translate-y-full={!tooltip.below}
    style="top: {tooltip.y}px; left: {tooltip.x}px;"
  >
    {tooltip.text}
    {#if !tooltip.below}
      <div class="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
    {:else}
      <div class="absolute left-1/2 bottom-full -translate-x-1/2 border-4 border-transparent" style="border-bottom-color: #111827;"></div>
    {/if}
  </div>
{/if}

<div class="overflow-x-auto">
  <table class="min-w-full border border-gray-200 text-sm">
    <thead class="bg-gray-100 text-left">
      <tr>
        {#each schema as col}
          <th
            class="px-4 py-2 font-semibold text-gray-700 border-b border-gray-200 overflow-hidden text-ellipsis whitespace-nowrap"
            class:cursor-pointer={!!events?.onHeaderClick}
            class:select-none={!!events?.onHeaderClick}
            style={col.minWidth ? `min-width: ${col.minWidth}px` : ''}
            tabindex={events?.onHeaderClick ? 0 : undefined}
            aria-sort={events?.onHeaderClick
              ? sortKey === col.key
                ? sortDir === 'asc' ? 'ascending' : 'descending'
                : 'none'
              : undefined}
            onclick={events?.onHeaderClick ? () => handleHeaderClick(col.key) : undefined}
            onkeydown={events?.onHeaderClick
              ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleHeaderClick(col.key); } }
              : undefined}
          >
            <span class="flex items-center gap-1">
              {col.label}
              {#if events?.onHeaderClick && sortKey === col.key}
                {#if sortDir === 'asc'}
                  <ChevronUpIcon class="w-3 h-3 shrink-0" />
                {:else if sortDir === 'desc'}
                  <ChevronDownIcon class="w-3 h-3 shrink-0" />
                {/if}
              {/if}
            </span>
          </th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each sortedData as row, i}
        <tr
          class={activeRow === row
            ? 'row-active'
            : i % 2 === 0
              ? 'bg-white'
              : 'bg-gray-50'}
          class:cursor-pointer={!!events?.onRowClick}
          tabindex={events?.onRowClick ? 0 : undefined}
          onclick={() => handleRowClick(row)}
          onkeydown={events?.onRowClick
            ? (e) => { if (e.key === 'Enter' || e.key === ' ') handleRowClick(row); }
            : undefined}
        >
          {#each schema as col}
            {@const value = row[col.key]}
            <td
              class="px-4 py-2 text-gray-800 border-b border-gray-100"
              class:overflow-hidden={col.type !== 'tags'}
              class:text-ellipsis={col.type !== 'tags'}
              class:whitespace-nowrap={col.type !== 'tags'}
              style={col.minWidth ? `min-width: ${col.minWidth}px` : ''}
              onclick={() => events?.onCellClick?.(value, col.key, row)}
              onmouseenter={(e) => handleCellMouseEnter(e, value, col, row)}
              onmouseleave={() => handleCellMouseLeave(col)}
            >
              {#if col.type === 'boolean'}
                {#if value}
                  <CheckIcon class="w-4 h-4 text-green-600" />
                {:else}
                  <NoSymbolIcon class="w-4 h-4 text-red-400" />
                {/if}
              {:else if col.type === 'icon'}
                {@const IconComponent = value}
                <IconComponent class="w-4 h-4" />
              {:else if col.type === 'date'}
                {formatDate(value)}
              {:else if col.type === 'datetime'}
                {formatDatetime(value)}
              {:else if col.type === 'tags'}
                <div class="flex flex-wrap gap-1">
                  {#each (value ?? []).map(normalizeTag) as tag}
                    <span
                      class="px-2 py-0.5 text-xs font-medium"
                      style="background-color: {tag.color}; color: {contrastColor(tag.color)}; border-radius: 999px;"
                    >
                      {tag.label}
                    </span>
                  {/each}
                </div>
              {:else}
                {value ?? ''}
              {/if}
            </td>
          {/each}
        </tr>
      {/each}
      {#if data.length === 0}
        <tr>
          <td colspan={schema.length} class="px-4 py-4 text-center text-gray-400">
            No data
          </td>
        </tr>
      {/if}
    </tbody>
  </table>
</div>

<style>
  .row-active {
    background-color: #dbeafe;
  }
</style>
