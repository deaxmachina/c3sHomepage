<script>
	import gsap from 'gsap';
	import About from '$lib/components/About/index.svelte';
	import { stores } from '$lib/stores/stores.svelte';

	$effect(() => {
		gsap.timeline().fromTo(
			'.page',
			{ opacity: 0 },
			{
				opacity: 1,
				duration: 1
			}
		);
	});
</script>

<div class="page wrapper-about {stores.colourMode}">
	<About />
</div>

<style lang="scss">
	.wrapper-about {
		width: 100%;
		min-height: 100svh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
	}
</style>
