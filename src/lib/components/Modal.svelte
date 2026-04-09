<script>
	import { modal } from '$lib/stores/modal.svelte.js';
	import XIcon from '$lib/components/icons/XIcon.svelte';

	/**
	 * @typedef {Object} ModalProps
	 * @property {string} [title] - Optional title displayed in the modal header.
	 * @property {import('svelte').Snippet} [children] - Content rendered in the modal body.
	 * @property {import('svelte').Snippet} [footer] - Optional footer area for actions (e.g. buttons).
	 *   When not provided the footer is hidden entirely.
	 * @property {boolean} [closeOnBackdrop=true] - When true, clicking the backdrop closes the modal.
	 *   Set to false to prevent accidental dismissal (e.g. confirmation dialogs).
	 * @property {boolean} [open] - When provided, controls visibility directly instead of the global
	 *   modal store. Use this for component-level modals that should not affect global state.
	 * @property {() => void} [onclose] - Called when the modal requests to close. Required when
	 *   using the `open` prop so the caller can update its own state.
	 */

	/** @type {ModalProps} */
	let { title, children, footer, closeOnBackdrop = true, open, onclose } = $props();

	/** Whether this instance is controlled by the `open` prop or the global store. */
	const isControlled = $derived(open !== undefined);

	/** Resolves the current open state from either the prop or the global store. */
	const isOpen = $derived(isControlled ? open : modal.isOpen);

	/** Closes the modal via the appropriate mechanism. */
	function close() {
		if (isControlled) {
			onclose?.();
		} else {
			modal.close();
		}
	}

	/** Unique id for aria-labelledby binding. */
	const titleId = 'modal-title';

	/**
	 * Closes the modal when the Escape key is pressed.
	 * @param {KeyboardEvent} event
	 */
	function handleKeydown(event) {
		if (event.key === 'Escape') {
			close();
		}
	}

	/**
	 * Handles backdrop click — closes only when closeOnBackdrop is enabled.
	 */
	function handleBackdropClick() {
		if (closeOnBackdrop) {
			close();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if isOpen}
	<!-- Backdrop -->
	<div
		class="fixed inset-0 z-40 bg-black/40"
		role="presentation"
		aria-hidden="true"
		onclick={handleBackdropClick}
	></div>

	<!-- Dialog panel -->
	<div
		role="dialog"
		aria-modal="true"
		aria-labelledby={title ? titleId : undefined}
		class="fixed left-1/2 top-1/2 z-50 flex w-full max-w-md -translate-x-1/2 -translate-y-1/2
			flex-col rounded-lg bg-surface shadow-xl"
	>
		<!-- Header -->
		<div class="flex h-14 shrink-0 items-center justify-between border-b border-border px-4">
			{#if title}
				<h2 id={titleId} class="text-sm font-semibold text-foreground">{title}</h2>
			{:else}
				<span></span>
			{/if}
			<button
				onclick={close}
				class="rounded-md p-1.5 text-muted transition-colors hover:bg-surface-alt hover:text-foreground"
				aria-label="Close modal"
			>
				<XIcon class="h-5 w-5" />
			</button>
		</div>

		<!-- Body -->
		<div class="flex-1 overflow-y-auto p-4">
			{@render children?.()}
		</div>

		<!-- Footer (only rendered when snippet is provided) -->
		{#if footer}
			<div class="shrink-0 border-t border-border px-4 py-3">
				{@render footer()}
			</div>
		{/if}
	</div>
{/if}
