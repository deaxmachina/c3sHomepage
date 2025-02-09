<script>
	import '$lib/styles/style.scss';
	import SectionLink from '$lib/components/SectionLink/index.svelte';
	import ColourMode from '$lib/components/ColourMode/index.svelte';

	import { stores } from '$lib/stores/stores.svelte';
	let { colours } = stores;

	let { children } = $props();
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
	<div class="wrapper-element section-links fade-in"><SectionLink /></div>
	<div class="wrapper-element colour-mode fade-in"><ColourMode /></div>
	{@render children()}
</div>

<style lang="scss">
	.wrapper-element {
		position: absolute;
		background: none;
		top: 0;
		right: 0;
		width: 200px;
		height: 200px;
		&.colour-mode {
			z-index: 10;
		}
	}
	.fade-in {
		opacity: 0;
	}
</style>
