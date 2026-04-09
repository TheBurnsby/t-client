<script>
	/**
	 * @typedef {Object} CardProps
	 * @property {import('svelte').Snippet} [header] - Optional header content. When not provided the
	 *   header section is hidden entirely.
	 * @property {import('svelte').Snippet} [children] - Main body content of the card.
	 * @property {import('svelte').Snippet} [footer] - Optional footer content. When not provided the
	 *   footer section is hidden entirely.
	 */

	/** @type {CardProps} */
	let { header, children, footer } = $props();
</script>

<div class="flex flex-col rounded-lg bg-surface shadow-xl">
	{#if header}
		<div class="shrink-0 border-b border-border px-4 py-3">
			{@render header()}
		</div>
	{/if}

	<div class="flex-1 p-4">
		{@render children?.()}
	</div>

	{#if footer}
		<div class="shrink-0 border-t border-border px-4 py-3">
			{@render footer()}
		</div>
	{/if}
</div>
