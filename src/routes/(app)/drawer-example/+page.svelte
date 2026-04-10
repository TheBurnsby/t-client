<script>
	import Drawer from '$lib/components/Drawer.svelte';

	/** @type {{ label: string, width: string }[]} */
	const widths = [
		{ label: 'w-1/4', width: 'w-1/4' },
		{ label: 'w-1/3', width: 'w-1/3' },
		{ label: 'w-1/2', width: 'w-1/2' },
	];

	/** @type {string | null} */
	let activeWidth = $state(null);
</script>

<div class="flex h-full flex-col items-center justify-center gap-3">
	{#each widths as option}
		<button
			onclick={() => (activeWidth = option.width)}
			class="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
		>
			Open drawer — {option.label}
		</button>
	{/each}
</div>

<Drawer open={activeWidth !== null} onclose={() => (activeWidth = null)} width={activeWidth ?? 'w-1/3'} title="Drawer Example" subtitle="Demonstrating drawer widths">
	{#snippet children()}
		<p class="text-sm text-gray-500">Drawer content goes here.</p>
	{/snippet}
</Drawer>
