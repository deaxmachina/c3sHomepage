<script>
	import '$lib/style.scss';
	import ShaderSee from '$lib/components/ShaderSea/index.svelte';
	import Dragonflies from '$lib/components/Dragonflies/index.svelte';
	import BackgroundText from '$lib/components/BackgroundText/index.svelte';
	import Title from '$lib/components/Title/index.svelte';
	import SectionLink from '$lib/components/SectionLink/index3.svelte';
	// import SectionLink from '$lib/components/SectionLink/index2.svelte';
	import Announcement from '$lib/components/Announcement/index.svelte';
	import Noise from '$lib/components/Noise/index.svelte';
	import Cursor from '$lib/components/Cursor/index.svelte';
	import Socials from './components/SectionLink/Socials.svelte';

	// Function to update the CSS variable --vh with the current viewport height.
	let vhWasSet = $state(false);
	const updateVh = () => {
		document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`);
	};

	// Run on mount and attach the resize event listener.
	$effect(() => {
		updateVh();
		vhWasSet = true;
	});
</script>

<svelte:window onresize={updateVh} />

<!-- {#if vhWasSet} -->
<div class="wrapper-scenery">
	<div class="wrapper-gradient"></div>
	<div class="wrapper-dragonflies"><Dragonflies /></div>
	<!-- <div class="wrapper-background-text"><BackgroundText /></div> -->
	<div class="wrapper-shadersee"><ShaderSee /></div>
	<div class="wrapper-title"><Title /></div>

	<div class="wrapper-announcement">
		<Announcement>Our next meetup is on Jan 25. Get your tickets now!</Announcement>
	</div>
	<!-- <div class="wrapper-section-links"><SectionLink /></div> -->
	<div class="copyright">©2025 Creative Coding Crafts Space ♡ ♡ ♡</div>
	<div class="wrapper-socials"><Socials /></div>

	<div class="wrapper-noise"><Noise /></div>
	<div class="wrapper-cursor"><Cursor />Cursor</div>
</div>

<!-- {/if} -->

<style lang="scss">
	@import './styles/variables.scss';
	.wrapper-scenery {
		cursor: none;
		position: relative;
		width: 100%;
		// height: var(--vh, 100vh);
		height: 100vh;
		overflow: hidden;
	}
	.wrapper-gradient {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient($col-bg 68%, $col-accent-1 80%, $col-accent-2 92%);
	}

	.wrapper-noise {
		position: absolute;
		top: 0;
		left: 0;
		pointer-events: none;
		z-index: 102;
		width: 100%;
		height: 100%;
	}

	.wrapper-background-text {
		position: absolute;
		top: 0;
		left: 0;
		opacity: 0.15;
	}
	.wrapper-dragonflies {
		position: absolute;
		top: 0;
		left: 0;
	}
	.wrapper-shadersee {
		position: absolute;
		top: 0;
		left: 0;
	}
	.wrapper-title {
		pointer-events: none;
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
	}
	.wrapper-announcement {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	.wrapper-cursor {
		position: absolute;
		top: 0;
		right: 0;
	}

	.copyright {
		position: absolute;
		right: 7px;
		top: 12px;
		font-family: 'Funnel Sans', serif;
		font-weight: 300;
		color: #221d34;
		font-size: 0.8rem;
		writing-mode: vertical-rl;
	}

	.wrapper-socials {
		position: absolute;
		left: 60px;
		bottom: 12px;
	}
</style>
