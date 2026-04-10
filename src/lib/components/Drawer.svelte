<script>
	import XIcon from '$lib/components/icons/XIcon.svelte';

	/**
	 * @typedef {Object} DrawerProps
	 * @property {boolean} open - Controls whether the drawer is visible.
	 * @property {() => void} onclose - Called when the drawer requests to close (X button, backdrop
	 *   click, or Escape key). The caller is responsible for updating the `open` state.
	 * @property {string} title - Heading displayed in the drawer header.
	 * @property {string} [subtitle] - Optional secondary line displayed below the title.
	 * @property {import('svelte').Snippet} [children] - Content rendered inside the drawer panel.
	 * @property {string} [width='w-1/3'] - Tailwind width class applied to the drawer panel.
	 * @property {boolean} [backdrop=true] - When true, renders a dimming overlay behind the drawer.
	 *   Clicking it triggers onclose. Set to false to allow interaction with the page behind.
	 */

	/** @type {DrawerProps} */
	let { open, onclose, title, subtitle, children, width = 'w-1/3', backdrop = true } = $props();

	/**
	 * Closes the drawer when the Escape key is pressed.
	 * @param {KeyboardEvent} event
	 */
	function handleKeydown(event) {
		if (event.key === 'Escape') onclose();
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open && backdrop}
	<div
		class="fixed inset-0 z-40 bg-black/40"
		role="presentation"
		aria-hidden="true"
		onclick={onclose}
	></div>
{/if}

<div
	role="dialog"
	aria-modal="true"
	aria-label="Drawer"
	class="fixed inset-y-0 right-0 z-50 flex flex-col bg-surface shadow-xl transition-transform duration-300
		{width} {open ? 'translate-x-0' : 'translate-x-full'}"
>
	<div class="flex shrink-0 items-start justify-between border-b border-border px-4 py-3">
		<div class="flex flex-col gap-0.5">
			<h2 class="text-sm font-semibold text-foreground">{title}</h2>
			{#if subtitle}
				<p class="text-xs text-muted">{subtitle}</p>
			{/if}
		</div>
		<button
			onclick={onclose}
			class="rounded-md p-1.5 text-muted transition-colors hover:bg-surface-alt hover:text-foreground"
			aria-label="Close drawer"
		>
			<XIcon class="h-5 w-5" />
		</button>
	</div>

	<div class="flex-1 overflow-y-auto p-4">
		{@render children?.()}
	</div>
</div>
