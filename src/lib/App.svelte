<script>
	import gsap from 'gsap';

	import ShaderSee from '$lib/components/ShaderSea/index.svelte';
	import Dragonflies from '$lib/components/Dragonflies/index.svelte';
	import Title from '$lib/components/Title/index.svelte';
	import Announcement from '$lib/components/Announcement/index.svelte';
	import Noise from '$lib/components/Noise/index.svelte';
	import Cursor from '$lib/components/Cursor/index.svelte';
	import Socials from './components/SectionLink/Socials.svelte';
	import Copyright from '$lib/components/Copyright/index.svelte';
	import { stores } from '$lib/stores/stores.svelte';

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

	///////////////////////////////////////
	/////////////// GSAP //////////////////
	///////////////////////////////////////
	// Note that this animation will apply to the colour switch
	// and the menu elements which live in the +page.svelte and
	// also have the class of fade-in
	let timeline = $state(null);
	$effect(() => {
		timeline = gsap.timeline().to('.fade-in', {
			opacity: 1,
			duration: 2,
			delay: 2.2,
			ease: 'power2.out'
		});
	});
</script>

<svelte:window onresize={updateVh} />

<!-- {#if vhWasSet} -->
<div class="wrapper-scenery {stores.colourMode}">
	<div class="wrapper-element gradient fade-in {stores.colourMode}"></div>
	<div class="wrapper-element dragonflies fade-in"><Dragonflies /></div>
	<div class="wrapper-element shadersee"><ShaderSee /></div>
	<div class="wrapper-element title"><Title /></div>
	<div class="wrapper-element announcement fade-in">
		<Announcement>Our next meetup is on Jan 25. Get your tickets now!</Announcement>
	</div>
	<div class="wrapper-element copyright fade-in"><Copyright /></div>
	<div class="wrapper-element socials fade-in"><Socials /></div>
	<div class="wrapper-element noise"><Noise /></div>
	<div class="wrapper-element cursor fade-in"><Cursor /></div>
</div>

<!-- {/if} -->

<style lang="scss">
	.wrapper-scenery {
		cursor: none;
		position: relative;
		width: 100%;
		height: var(--vh, 100vh);
		overflow: hidden;
		background: transparent;
	}
	.fade-in {
		opacity: 0;
	}
	// .wrapper-scenery,
	.gradient {
		background: linear-gradient(
			var(--col-bg) 68%,
			var(--col-accent-1) 80%,
			var(--col-accent-2) 92%
		);

		&.dark {
			background: linear-gradient(to bottom right, transparent 87%, var(--col-accent-1) 98%),
				linear-gradient(to bottom left, transparent 87%, var(--col-accent-1) 98%),
				linear-gradient(var(--col-bg) 70%, var(--col-accent-2) 90%);
		}
	}

	.wrapper-element {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		&.title,
		&.announcement,
		&.socials,
		&.section-links,
		&.copyright,
		&.colour-mode {
			pointer-events: all;
		}
	}

	.cursor {
		@media (max-width: 1000px) {
			display: none;
		}
	}
</style>
