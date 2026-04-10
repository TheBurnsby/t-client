<script>
	import { Nav, Modal } from '$lib';

	/**
	 * @typedef {Object} NavPage
	 * @property {string} label - The display name for the navigation item
	 * @property {string} path - The URL path for the navigation item
	 */

	/** @type {NavPage[]} */
	const pages = [
		{ label: 'Home', path: '/' },
		{ label: 'Table Example', path: '/table-example' },
		{ label: 'Modal Example', path: '/modal-example' },
		{ label: 'Drawer Example', path: '/drawer-example' },
		{ label: 'Theme Example', path: '/theme-example' },
		{ label: 'Tabs Example', path: '/tabs-example' },
		{ label: 'Calendar Example', path: '/calendar-example' },
	];

	let { children } = $props();
</script>

<Nav {pages}>
	{@render children()}
</Nav>

<Modal title="Modal Title">
	{#snippet children()}
		<p class="text-sm text-gray-500">Modal content goes here.</p>
	{/snippet}
</Modal>
