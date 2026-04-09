<script>
	import Calendar from '$lib/components/Calendar.svelte';

	const events = [
		{ date: '2026-04-09', label: 'Morning Rounds', description: 'ICU rounds with Dr. Okonkwo — Ward 3', color: '#bfdbfe' },
		{ date: '2026-04-09', label: 'Cardiology Consult', description: 'Patient Eleanor Voss — MRN 00482916', color: '#fde68a' },
		{ date: '2026-04-11', label: 'Staff Training', description: 'Annual infection control recertification', color: '#bbf7d0' },
		{ date: '2026-04-14', label: 'Surgical Review', description: 'Pre-op review for scheduled orthopedic procedures', color: '#fca5a5' },
		{ date: '2026-04-16', label: 'Pharmacy Audit', description: 'Quarterly controlled substances audit', color: '#fed7aa' },
		{ date: '2026-04-21', label: 'Tumor Board', description: 'Multidisciplinary oncology case review', color: '#e9d5ff' },
		{ date: '2026-04-24', label: 'New Resident Orientation', description: 'Onboarding for incoming residents — Admin Suite B', color: '#bbf7d0' },
		{ date: '2026-04-28', label: 'Department Review', description: 'Monthly department performance and incident review', color: '#bfdbfe' },
	];
</script>

<div class="mx-auto mt-8 max-w-4xl px-4">
	<Calendar {events} />
</div>
