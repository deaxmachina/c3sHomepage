<script>
	import gsap from 'gsap';
	import ShaderSee from '$lib/components/ShaderSea/index.svelte';
	import Dragonflies from '$lib/components/Dragonflies/index.svelte';
	import Title from '$lib/components/Title/index.svelte';
	import Announcement from '$lib/components/Announcement/index.svelte';
	import Socials from '$lib/components/Socials/index.svelte';
	import Copyright from '$lib/components/Copyright/index.svelte';
	import { stores } from '$lib/stores/stores.svelte';

	///////////////////////////////////////
	/////////////// GSAP //////////////////
	///////////////////////////////////////
	// Note that this animation will apply to the colour switch
	// and the menu elements which live in the +page.svelte and
	// also have the class of fade-in. This only plays the first
	// time the component mounts, i.e. stores.hasMountedFirstTime = true,
	// and not each time user navigates back to home route
	let timeline = $state(null);
	$effect(() => {
		if (stores.hasMountedFirstTime) {
			timeline = gsap.timeline().to('.fade-in', {
				opacity: 1,
				duration: 3,
				delay: 2.2,
				ease: 'power2.out',
				onComplete: () => {
					if (stores.hasMountedFirstTime) {
						stores.hasMountedFirstTime = false;
					}
				}
			});
		}

		return () => {
			timeline = null;
		};
	});
</script>

<div class="wrapper-scenery {stores.colourMode}">
	<div
		class="wrapper-element gradient fade-in {stores.colourMode}"
		class:mounted-more-than-once={!stores.hasMountedFirstTime}
	></div>

	<div class="wrapper-element shadersee"><ShaderSee /></div>
	<div
		class="wrapper-element dragonflies fade-in"
		class:mounted-more-than-once={!stores.hasMountedFirstTime}
	>
		<Dragonflies />
	</div>

	<div class="wrapper-element title"><Title /></div>

	<div
		class="wrapper-element copyright fade-in"
		class:mounted-more-than-once={!stores.hasMountedFirstTime}
	>
		<Copyright />
	</div>
	<div
		class="wrapper-element socials fade-in"
		class:mounted-more-than-once={!stores.hasMountedFirstTime}
	>
		<Socials />
	</div>

	<div
		class="wrapper-element announcement fade-in"
		class:mounted-more-than-once={!stores.hasMountedFirstTime}
	>
		<Announcement />
	</div>
</div>

<style lang="scss">
	.fade-in {
		opacity: 0;
		&.mounted-more-than-once {
			opacity: 1;
		}
	}
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

			background: linear-gradient(var(--col-bg) 0%, var(--col-bg) 100%);
			// background: var(--col-bg);
		}
	}

	.gradient,
	.dragonflies,
	.shadersee,
	.title {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}

	.title,
	.announcement,
	.section-links,
	.colour-mode,
	.copyright,
	.socials {
		pointer-events: all;
	}
</style>
