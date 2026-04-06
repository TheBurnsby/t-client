/**
 * @module drawer
 * Global drawer state store using Svelte 5 module-level $state.
 * Import `drawer` and call `drawer.open()`, `drawer.close()`, or `drawer.toggle()`
 * from anywhere in the app to control the drawer panel.
 */

let isOpen = $state(false);

export const drawer = {
	/** Whether the drawer is currently open. */
	get isOpen() {
		return isOpen;
	},
	/** Opens the drawer. */
	open: () => {
		isOpen = true;
	},
	/** Closes the drawer. */
	close: () => {
		isOpen = false;
	},
	/** Toggles the drawer open/closed. */
	toggle: () => {
		isOpen = !isOpen;
	},
};
