<script>
	import { stores } from '$lib/stores/stores.svelte';
	import App from '$lib/App.svelte';

	let { colours } = stores;
</script>

<div
	style="
    --col-bg: {colours.colBg};
		--col-text-and-accent: {colours.colTextAndAccent};
		--col-text-title-main: {colours.colTextTitleMain};
		--col-text-subtitle-main: {colours.colTextSubtitleMain};
		--col-text-title-accent: {colours.colTextTitleAccent};
		--col-stroke-wings-dragonfly: {colours.colStrokeWingsDragonfly};
		--col-dark: {colours.colDark}; 
		--col-light: {colours.colLight}; 
		--col-accent-1: {colours.colAccent1};
		--col-accent-2: {colours.colAccent2};
		--col-accent-2-darker: {colours.colAccent2};
		--col-accent-3: {colours.colAccent3};
  "
>
	<App />
</div>
