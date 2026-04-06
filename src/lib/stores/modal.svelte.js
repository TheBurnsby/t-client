/**
 * @module modal
 * Global modal state store using Svelte 5 module-level $state.
 * Import `modal` and call `modal.open()`, `modal.close()`, or `modal.toggle()`
 * from anywhere in the app to control the modal dialog.
 */

let isOpen = $state(false);

export const modal = {
	/** Whether the modal is currently open. */
	get isOpen() {
		return isOpen;
	},
	/** Opens the modal. */
	open: () => {
		isOpen = true;
	},
	/** Closes the modal. */
	close: () => {
		isOpen = false;
	},
	/** Toggles the modal open/closed. */
	toggle: () => {
		isOpen = !isOpen;
	},
};
