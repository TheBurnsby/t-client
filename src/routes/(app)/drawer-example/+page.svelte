<script>
	import { drawer } from '$lib/stores/drawer.svelte.js';

	/** @type {{ label: string, width: string }[]} */
	const widths = [
		{ label: 'Narrow (w-64)', width: 'w-64' },
		{ label: 'Default (w-80)', width: 'w-80' },
		{ label: 'Wide (w-96)', width: 'w-96' },
		{ label: 'Half screen (w-1/2)', width: 'w-1/2' },
	];
</script>

<div class="flex h-full flex-col items-center justify-center gap-3">
	{#each widths as option}
		<button
			onclick={() => drawer.open(option.width)}
			class="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
		>
			Open drawer — {option.label}
		</button>
	{/each}
</div>
