<script>
	import Tabs from '$lib/components/Tabs.svelte';
	import Card from '$lib/components/Card.svelte';

	const tabs = [
		{ id: 'overview', label: 'Overview' },
		{ id: 'activity', label: 'Activity' },
		{ id: 'settings', label: 'Settings' },
	];
</script>

<div class="mx-auto mt-8 max-w-2xl px-4">
	<Tabs {tabs}>
		{#snippet children(activeTab)}
			{#if activeTab === 'overview'}
				<Card>
					{#snippet header()}
						<h2 class="text-sm font-semibold text-foreground">Overview</h2>
					{/snippet}
					<p class="text-sm text-muted">This is the overview panel. Summary information goes here.</p>
				</Card>
			{:else if activeTab === 'activity'}
				<Card>
					{#snippet header()}
						<h2 class="text-sm font-semibold text-foreground">Activity</h2>
					{/snippet}
					<p class="text-sm text-muted">Recent activity and events are shown here.</p>
					{#snippet footer()}
						<p class="text-xs text-muted">Last updated just now</p>
					{/snippet}
				</Card>
			{:else if activeTab === 'settings'}
				<Card>
					{#snippet header()}
						<h2 class="text-sm font-semibold text-foreground">Settings</h2>
					{/snippet}
					<p class="text-sm text-muted">Configuration options and preferences live here.</p>
				</Card>
			{/if}
		{/snippet}
	</Tabs>
</div>
