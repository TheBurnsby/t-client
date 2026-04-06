<script>
	import { drawer } from "$lib/stores/drawer.svelte.js";

	/** @type {{ label: string, width: string }[]} */
	const widths = [
		{ label: "w-1/4", width: "w-1/4" },
		{ label: "w-1/3", width: "w-1/3" },
		// { label: 'w-2/5', width: 'w-2/5' },
		{ label: "w-1/2", width: "w-1/2" },
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
