<script>
	import { modal } from '$lib/stores/modal.svelte.js';
</script>

<div class="flex h-full items-center justify-center">
	<button
		onclick={modal.open}
		class="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
	>
		Open modal
	</button>
</div>
