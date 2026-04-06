<script>
	import { modal } from '$lib/stores/modal.svelte.js';

	/**
	 * @typedef {Object} ModalProps
	 * @property {string} [title] - Optional title displayed in the modal header.
	 * @property {import('svelte').Snippet} [children] - Content rendered in the modal body.
	 * @property {import('svelte').Snippet} [footer] - Optional footer area for actions (e.g. buttons).
	 *   When not provided the footer is hidden entirely.
	 * @property {boolean} [closeOnBackdrop=true] - When true, clicking the backdrop closes the modal.
	 *   Set to false to prevent accidental dismissal (e.g. confirmation dialogs).
	 */

	/** @type {ModalProps} */
	let { title, children, footer, closeOnBackdrop = true } = $props();

	/** Unique id for aria-labelledby binding. */
	const titleId = 'modal-title';

	/**
	 * Closes the modal when the Escape key is pressed.
	 * @param {KeyboardEvent} event
	 */
	function handleKeydown(event) {
		if (event.key === 'Escape') {
			modal.close();
		}
	}

	/**
	 * Handles backdrop click — closes only when closeOnBackdrop is enabled.
	 */
	function handleBackdropClick() {
		if (closeOnBackdrop) {
			modal.close();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if modal.isOpen}
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
			flex-col rounded-lg bg-white shadow-xl"
	>
		<!-- Header -->
		<div class="flex h-14 shrink-0 items-center justify-between border-b border-gray-200 px-4">
			{#if title}
				<h2 id={titleId} class="text-sm font-semibold text-gray-900">{title}</h2>
			{:else}
				<span></span>
			{/if}
			<button
				onclick={modal.close}
				class="rounded-md p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
				aria-label="Close modal"
			>
				<!-- × icon -->
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
				>
					<line x1="18" y1="6" x2="6" y2="18" />
					<line x1="6" y1="6" x2="18" y2="18" />
				</svg>
			</button>
		</div>

		<!-- Body -->
		<div class="flex-1 overflow-y-auto p-4">
			{@render children?.()}
		</div>

		<!-- Footer (only rendered when snippet is provided) -->
		{#if footer}
			<div class="shrink-0 border-t border-gray-200 px-4 py-3">
				{@render footer()}
			</div>
		{/if}
	</div>
{/if}
