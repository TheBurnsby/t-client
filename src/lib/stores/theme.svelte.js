/**
 * @typedef {'light' | 'dark'} Theme
 */

/**
 * Theme store — manages light/dark mode.
 * Persists the user's preference in localStorage and applies
 * a `data-theme` attribute to `<html>` for CSS variable switching.
 */
function createTheme() {
	/** @type {Theme} */
	let current = $state('light');

	/**
	 * Applies the theme to the DOM and persists it.
	 * @param {Theme} value
	 */
	function apply(value) {
		current = value;
		if (typeof document !== 'undefined') {
			document.documentElement.setAttribute('data-theme', value);
		}
		if (typeof localStorage !== 'undefined') {
			localStorage.setItem('theme', value);
		}
	}

	/**
	 * Initialises the theme from localStorage or system preference.
	 * Call once on app mount.
	 */
	function init() {
		if (typeof localStorage === 'undefined') return;
		const saved = /** @type {Theme | null} */ (localStorage.getItem('theme'));
		if (saved === 'dark' || saved === 'light') {
			apply(saved);
		} else {
			const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			apply(prefersDark ? 'dark' : 'light');
		}
	}

	/** Toggles between light and dark. */
	function toggle() {
		apply(current === 'light' ? 'dark' : 'light');
	}

	/**
	 * Sets the theme explicitly.
	 * @param {Theme} value
	 */
	function set(value) {
		apply(value);
	}

	return {
		get current() { return current; },
		get isDark() { return current === 'dark'; },
		init,
		toggle,
		set
	};
}

export const theme = createTheme();
