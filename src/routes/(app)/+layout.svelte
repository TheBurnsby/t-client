<script>
	import { Nav } from '$lib';

	/**
	 * @typedef {Object} NavPage
	 * @property {string} label - The display name for the navigation item
	 * @property {string} path - The URL path for the navigation item
	 */

	/** @type {NavPage[]} */
	const pages = [
		{ label: 'Home', path: '/' },
		{ label: 'Table Example', path: '/table-example' },
	];

	let { children } = $props();
</script>

<Nav {pages}>
	{@render children()}
</Nav>
