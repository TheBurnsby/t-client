<script>
	import { theme } from '$lib';
	import SunIcon from '$lib/components/icons/SunIcon.svelte';
	import MoonIcon from '$lib/components/icons/MoonIcon.svelte';
</script>

<div class="flex h-full items-center justify-center">
	<div class="flex flex-col items-center gap-3">
		<p class="text-sm font-medium text-muted">
			Current theme: <span class="font-semibold text-foreground">{theme.current}</span>
		</p>
		<button
			onclick={() => theme.toggle()}
			class="flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-80"
			style="background-color: var(--color-foreground); color: var(--color-background);"
		>
			{#if theme.isDark}
				<SunIcon class="h-4 w-4" />
				Switch to Light
			{:else}
				<MoonIcon class="h-4 w-4" />
				Switch to Dark
			{/if}
		</button>
	</div>
</div>
