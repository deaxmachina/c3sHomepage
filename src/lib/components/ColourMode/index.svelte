<script lang="ts">
	import { stores } from '$lib/stores/stores.svelte';
	import Toggle from './Toggle.svelte';

	let { colours } = stores;

	const lightMode = () => {
		colours.colBg = '#eaeace';
		colours.colDark = '#eaeace';
		colours.colStrokeWingsDragonfly = '#221d34';
		colours.colTextAndAccent = '#221d34';
		colours.colTextTitleMain = '#221d34';
		colours.colTextTitleAccent = '#6cb6a5';

		stores.colourMode = 'light';
	};

	const darkMode = () => {
		colours.colBg = '#221d34';
		colours.colDark = '#221d34';
		colours.colStrokeWingsDragonfly = '#eaeace';
		colours.colTextAndAccent = '#eaeace';
		colours.colTextTitleMain = '#eaeace';
		colours.colTextTitleAccent = '#fa008a'; //'#fa008a'; // '#221d34'; // #6cb6a5

		stores.colourMode = 'dark';
	};
</script>

<div class="wrapper">
	<!-- <button onclick={lightMode}>light</button> -->
	<!-- <button onclick={darkMode}>dark</button> -->
	<Toggle />
</div>

<style lang="scss">
	.wrapper {
		position: absolute;
		right: 40px;
		top: 10px;

		button {
			border: none;
			padding: 0.3rem 1rem;
			background: var(--col-accent-3);
		}
	}
</style>
