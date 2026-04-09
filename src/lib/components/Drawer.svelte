<script>
	import { drawer } from '$lib/stores/drawer.svelte.js';
	import XIcon from '$lib/components/icons/XIcon.svelte';

	/**
	 * @typedef {Object} DrawerProps
	 * @property {import('svelte').Snippet} [children] - Content rendered inside the drawer panel.
	 * @property {boolean} [backdrop=true] - When true, renders a dimming overlay that closes the
	 *   drawer on click. Set to false to let users interact with the app while the drawer is open.
	 */

	/** @type {DrawerProps} */
	let { children, backdrop = true } = $props();

	/**
	 * Closes the drawer when the Escape key is pressed.
	 * @param {KeyboardEvent} event
	 */
	function handleKeydown(event) {
		if (event.key === 'Escape') {
			drawer.close();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<!-- Backdrop (only when enabled and drawer is open) -->
{#if drawer.isOpen && backdrop}
	<div
		class="fixed inset-0 z-40 bg-black/40"
		role="presentation"
		aria-hidden="true"
		onclick={drawer.close}
	></div>
{/if}

<!-- Drawer panel -->
<div
	role="dialog"
	aria-modal="true"
	aria-label="Drawer"
	class="fixed inset-y-0 right-0 z-50 flex flex-col bg-surface shadow-xl transition-transform duration-300
		{drawer.width} {drawer.isOpen ? 'translate-x-0' : 'translate-x-full'}"
>
	<!-- Drawer header -->
	<div class="flex h-14 shrink-0 items-center justify-end border-b border-border px-4">
		<button
			onclick={drawer.close}
			class="rounded-md p-1.5 text-muted transition-colors hover:bg-surface-alt hover:text-foreground"
			aria-label="Close drawer"
		>
			<XIcon class="h-5 w-5" />
		</button>
	</div>

	<!-- Drawer body -->
	<div class="flex-1 overflow-y-auto p-4">
		{@render children?.()}
	</div>
</div>
