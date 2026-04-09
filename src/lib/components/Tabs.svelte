<script>
	/**
	 * @typedef {{ id: string, label: string }} Tab
	 */

	/**
	 * @typedef {Object} TabsProps
	 * @property {Tab[]} tabs - The list of tabs to render in the tab bar.
	 * @property {import('svelte').Snippet<[string]>} [children] - Content area. Receives the active
	 *   tab id as an argument so the caller can conditionally render the correct panel.
	 * @property {string} [defaultTab] - The id of the tab that is active on mount. Defaults to the
	 *   first tab in the list.
	 */

	import { untrack } from 'svelte';

	/** @type {TabsProps} */
	let { tabs, children, defaultTab } = $props();

	/** @type {string} */
	let activeTab = $state(untrack(() => defaultTab ?? tabs[0]?.id));
</script>

<div class="flex flex-col">
	<!-- Tab bar -->
	<div class="flex border-b border-border">
		{#each tabs as tab (tab.id)}
			<button
				onclick={() => (activeTab = tab.id)}
				class="px-4 py-2.5 text-sm font-medium transition-colors
					{activeTab === tab.id
					? 'border-b-2 border-foreground text-foreground'
					: 'text-muted hover:text-foreground'}"
			>
				{tab.label}
			</button>
		{/each}
	</div>

	<!-- Panel -->
	<div class="pt-4">
		{@render children?.(activeTab)}
	</div>
</div>
