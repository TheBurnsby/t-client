<script>
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Nav } from '$lib';

	const pages = [
		{ label: 'Home', path: '/' },
		{ label: 'Table Example', path: '/table-example' },
	];

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Nav {pages} />

{@render children()}
