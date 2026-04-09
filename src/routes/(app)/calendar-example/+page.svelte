<script>
	import Calendar from '$lib/components/Calendar.svelte';

	/**
	 * @type {Array<{ date: string, label: string, color: string, details?: Record<string, string> }>}
	 */
	const events = [
		{
			date: '2026-04-09',
			label: 'Morning Rounds',
			color: '#bfdbfe',
			details: { ward: 'Ward 3 — ICU', 'led by': 'Dr. Okonkwo', time: '07:30 – 09:00' },
		},
		{
			date: '2026-04-09',
			label: 'Cardiology Consult',
			color: '#fde68a',
			details: { patient: 'Eleanor Voss', MRN: '00482916', location: 'Room 214B' },
		},
		{
			date: '2026-04-11',
			label: 'Staff Training',
			color: '#bbf7d0',
			details: { topic: 'Infection Control Recertification', location: 'Conference Room A', duration: '2 hours' },
		},
		{
			date: '2026-04-14',
			label: 'Surgical Review',
			color: '#fca5a5',
			details: { focus: 'Pre-op orthopedic procedures', chair: 'Dr. James Patel', location: 'OR Suite' },
		},
		{
			date: '2026-04-16',
			label: 'Pharmacy Audit',
			color: '#fed7aa',
			details: { scope: 'Controlled substances', auditor: 'Linda Tran', frequency: 'Quarterly' },
		},
		{
			date: '2026-04-21',
			label: 'Tumor Board',
			color: '#e9d5ff',
			details: { type: 'Multidisciplinary oncology review', cases: '4 scheduled', location: 'Oncology Conf. Room' },
		},
		{
			date: '2026-04-24',
			label: 'Resident Orientation',
			color: '#bbf7d0',
			details: { cohort: 'Incoming residents', location: 'Admin Suite B', coordinator: 'Dr. Marcus Hale' },
		},
		{
			date: '2026-04-28',
			label: 'Department Review',
			color: '#bfdbfe',
			details: { scope: 'Performance and incident review', frequency: 'Monthly', chair: 'Dr. Okonkwo' },
		},
	];
</script>

<div class="mx-auto mt-8 max-w-4xl px-4">
	<Calendar {events} />
</div>
