<script>
	import Tabs from '$lib/components/Tabs.svelte';
	import Card from '$lib/components/Card.svelte';

	const tabs = [
		{ id: 'summary', label: 'Patient Summary' },
		{ id: 'vitals', label: 'Vitals' },
		{ id: 'medications', label: 'Medications' },
	];
</script>

<div class="mx-auto mt-8 max-w-2xl px-4">
	<Tabs {tabs}>
		{#snippet children(activeTab)}
			{#if activeTab === 'summary'}
				<Card>
					{#snippet header()}
						<h2 class="text-sm font-semibold text-foreground">Patient Summary</h2>
					{/snippet}
					<div class="flex flex-col gap-1 text-sm text-muted">
						<p><span class="font-medium text-foreground">Name:</span> Eleanor Voss</p>
						<p><span class="font-medium text-foreground">DOB:</span> March 12, 1958</p>
						<p><span class="font-medium text-foreground">MRN:</span> 00482916</p>
						<p><span class="font-medium text-foreground">Attending:</span> Dr. Sarah Okonkwo</p>
						<p><span class="font-medium text-foreground">Diagnosis:</span> Congestive Heart Failure</p>
					</div>
				</Card>
			{:else if activeTab === 'vitals'}
				<Card>
					{#snippet header()}
						<h2 class="text-sm font-semibold text-foreground">Latest Vitals</h2>
					{/snippet}
					<div class="flex flex-col gap-1 text-sm text-muted">
						<p><span class="font-medium text-foreground">Blood Pressure:</span> 138 / 86 mmHg</p>
						<p><span class="font-medium text-foreground">Heart Rate:</span> 92 bpm</p>
						<p><span class="font-medium text-foreground">Temperature:</span> 98.9°F</p>
						<p><span class="font-medium text-foreground">O₂ Saturation:</span> 96%</p>
						<p><span class="font-medium text-foreground">Respiratory Rate:</span> 18 breaths/min</p>
					</div>
					{#snippet footer()}
						<p class="text-xs text-muted">Recorded April 9, 2026 at 08:00</p>
					{/snippet}
				</Card>
			{:else if activeTab === 'medications'}
				<Card>
					{#snippet header()}
						<h2 class="text-sm font-semibold text-foreground">Active Medications</h2>
					{/snippet}
					<div class="flex flex-col gap-1 text-sm text-muted">
						<p><span class="font-medium text-foreground">Lisinopril</span> — 10mg, once daily</p>
						<p><span class="font-medium text-foreground">Furosemide</span> — 40mg, twice daily</p>
						<p><span class="font-medium text-foreground">Carvedilol</span> — 6.25mg, twice daily</p>
						<p><span class="font-medium text-foreground">Aspirin</span> — 81mg, once daily</p>
					</div>
				</Card>
			{/if}
		{/snippet}
	</Tabs>
</div>
