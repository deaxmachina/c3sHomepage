<script>
	import '$lib/styles/style.scss';
	import { page } from '$app/state';

	import gsap from 'gsap';

	import SectionLink from '$lib/components/SectionLink/index.svelte';
	import ColourMode from '$lib/components/ColourMode/index.svelte';
	import Noise from '$lib/components/Noise/index.svelte';
	import Cursor from '$lib/components/Cursor/index.svelte';

	import { stores } from '$lib/stores/stores.svelte';
	let { colours } = stores;

	let { children } = $props();

	///////////////////////////////////////
	/////////////// GSAP //////////////////
	///////////////////////////////////////
	// Note that this animation will apply to the colour switch
	// and the menu elements which live in the +page.svelte and
	// also have the class of fade-in
	// TODO: This one is just buggy
	let timeline = $state(null);
	$effect(() => {
		timeline = gsap.timeline().to('.fade-in-layout', {
			opacity: 1,
			duration: 3,
			delay: 2.2,
			ease: 'power2.out'
		});
		return () => {
			timeline = null;
		};
	});
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
	<div class="layout-wrapper">
		{@render children()}

		<div class="wrapper-element section-links fade-in-layout"><SectionLink /></div>
		<div class="wrapper-element colour-mode fade-in-layout"><ColourMode /></div>

		<div class="wrapper-element cursor"><Cursor /></div>
		<div class="wrapper-element noise"><Noise /></div>
	</div>
</div>

<style lang="scss">
	.layout-wrapper {
		position: relative;
		width: 100%;
		min-height: 100svh;
		overflow: hidden;
		background: transparent;
		border: 15px solid #06030b;
		border-radius: 35px;
	}
	.fade-in-layout {
		opacity: 0;
	}

	.wrapper-element {
		position: absolute;
		top: 0;
		// left: 0;
	}
	.section-links {
		pointer-events: all;
		top: 60px;
		right: 15px;
		@media (max-width: 900px) {
			right: 12px;
		}
	}
	.colour-mode {
		pointer-events: all;
		top: 2px;
		right: 0px;
	}
	.cursor {
		width: 100%;
		height: 100%;
		pointer-events: none;
		@media (max-width: 1000px) {
			display: none;
		}
	}

	.noise {
		width: 100%;
		height: 100%;
		pointer-events: none;
	}
</style>
