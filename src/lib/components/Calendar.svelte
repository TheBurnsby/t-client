<script>
	import { untrack } from 'svelte';
	import ChevronLeftIcon from '$lib/components/icons/ChevronLeftIcon.svelte';
	import ChevronRightIcon from '$lib/components/icons/ChevronRightIcon.svelte';

	/**
	 * @typedef {{ date: string, label: string, description?: string, color?: string }} CalendarEvent
	 */

	/**
	 * @typedef {Object} CalendarProps
	 * @property {CalendarEvent[]} [events=[]] - Events to display on the calendar.
	 * @property {number} [defaultMonth] - Initial month (0–11). Defaults to the current month.
	 * @property {number} [defaultYear] - Initial year. Defaults to the current year.
	 */

	/** @type {CalendarProps} */
	let { events = [], defaultMonth, defaultYear } = $props();

	const todayDate = new Date();
	const currentYear = todayDate.getFullYear();

	let selectedMonth = $state(untrack(() => defaultMonth ?? todayDate.getMonth()));
	let selectedYear = $state(untrack(() => defaultYear ?? currentYear));

	const monthNames = [
		'January', 'February', 'March', 'April', 'May', 'June',
		'July', 'August', 'September', 'October', 'November', 'December'
	];
	const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	const years = Array.from({ length: 12 }, (_, i) => currentYear - 10 + i);

	/** @type {(number | null)[]} */
	const calendarDays = $derived.by(() => {
		const firstDay = new Date(selectedYear, selectedMonth, 1).getDay();
		const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
		/** @type {(number | null)[]} */
		const days = [];
		for (let i = 0; i < firstDay; i++) days.push(null);
		for (let d = 1; d <= daysInMonth; d++) days.push(d);
		return days;
	});

	/** @type {Record<string, CalendarEvent[]>} */
	const eventsByDate = $derived.by(() => {
		/** @type {Record<string, CalendarEvent[]>} */
		const map = {};
		for (const event of events) {
			if (!map[event.date]) map[event.date] = [];
			map[event.date].push(event);
		}
		return map;
	});

	/**
	 * Returns events for a given day number in the current month/year view.
	 * @param {number} day
	 * @returns {CalendarEvent[]}
	 */
	function getEventsForDay(day) {
		const dateStr = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
		return eventsByDate[dateStr] ?? [];
	}

	/**
	 * Returns true if the given day is today.
	 * @param {number} day
	 * @returns {boolean}
	 */
	function isToday(day) {
		return (
			day === todayDate.getDate() &&
			selectedMonth === todayDate.getMonth() &&
			selectedYear === todayDate.getFullYear()
		);
	}

	const DEFAULT_EVENT_COLOR = '#d1d5db';

	/** Moves the view back one month, wrapping the year if needed. */
	function prevMonth() {
		if (selectedMonth === 0) {
			selectedMonth = 11;
			selectedYear -= 1;
		} else {
			selectedMonth -= 1;
		}
	}

	/** Moves the view forward one month, wrapping the year if needed. */
	function nextMonth() {
		if (selectedMonth === 11) {
			selectedMonth = 0;
			selectedYear += 1;
		} else {
			selectedMonth += 1;
		}
	}
</script>

<div class="flex flex-col gap-4 rounded-lg bg-surface p-4 shadow-xl">
	<!-- Controls -->
	<div class="flex items-center justify-between">
		<div class="flex items-center gap-2">
			<select
				bind:value={selectedMonth}
				class="rounded-md border border-border bg-surface px-3 py-1.5 text-sm text-foreground transition-colors hover:border-foreground focus:outline-none"
			>
				{#each monthNames as name, i}
					<option value={i}>{name}</option>
				{/each}
			</select>
			<select
				bind:value={selectedYear}
				class="rounded-md border border-border bg-surface px-3 py-1.5 text-sm text-foreground transition-colors hover:border-foreground focus:outline-none"
			>
				{#each years as year}
					<option value={year}>{year}</option>
				{/each}
			</select>
		</div>
		<div class="flex items-center gap-1">
			<button
				onclick={prevMonth}
				class="rounded-md p-1.5 text-muted transition-colors hover:bg-surface-alt hover:text-foreground"
				aria-label="Previous month"
			>
				<ChevronLeftIcon class="h-4 w-4" />
			</button>
			<button
				onclick={nextMonth}
				class="rounded-md p-1.5 text-muted transition-colors hover:bg-surface-alt hover:text-foreground"
				aria-label="Next month"
			>
				<ChevronRightIcon class="h-4 w-4" />
			</button>
		</div>
	</div>

	<!-- Day headers -->
	<div class="grid grid-cols-7">
		{#each dayNames as day}
			<div class="py-2 text-center text-xs font-medium text-muted">{day}</div>
		{/each}
	</div>

	<!-- Calendar grid -->
	<div class="grid grid-cols-7 gap-px bg-border">
		{#each calendarDays as day}
			<div class="min-h-24 overflow-visible p-1.5 {day && isToday(day) ? 'bg-active' : 'bg-surface'}">
				{#if day}
					<span class="text-xs {isToday(day) ? 'font-bold text-foreground' : 'font-medium text-foreground'}">{day}</span>
					<div class="mt-0.5 flex flex-col gap-0.5">
						{#each getEventsForDay(day) as event}
							<div
								class="group relative truncate rounded px-1.5 py-0.5 text-xs font-medium text-gray-900"
								style="background-color: {event.color ?? DEFAULT_EVENT_COLOR};"
							>
								{event.label}
								{#if event.description}
									<div class="pointer-events-none absolute bottom-full left-0 z-50 mb-1 hidden w-max max-w-48 rounded-md bg-foreground px-2 py-1 text-xs text-background shadow-lg group-hover:block">
										{event.description}
									</div>
								{/if}
							</div>
						{/each}
					</div>
				{/if}
			</div>
		{/each}
	</div>
</div>
