/**
 * @module drawer
 * Global drawer state store using Svelte 5 module-level $state.
 * Import `drawer` and call `drawer.open()`, `drawer.close()`, or `drawer.toggle()`
 * from anywhere in the app to control the drawer panel.
 */

let isOpen = $state(false);
let width = $state('w-80');

export const drawer = {
	/** Whether the drawer is currently open. */
	get isOpen() {
		return isOpen;
	},
	/** The current Tailwind width class applied to the drawer panel. */
	get width() {
		return width;
	},
	/**
	 * Opens the drawer, optionally setting a width.
	 * @param {string} [w='w-80'] - Tailwind width class e.g. 'w-96', 'w-1/2', 'w-[600px]'.
	 */
	open: (w = 'w-80') => {
		width = w;
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
