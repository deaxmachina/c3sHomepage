<script lang="ts">
	import gsap from 'gsap';

	import { imgUrlBuilder, processContent } from '$lib/utils/sanity';
	import Resource from '$lib/components/Resource/index.svelte';
	import Instructions from '$lib/components/ScrollInstructions/Instructions.svelte';

	// This data comes from what we return in the load function in +page.ts
	const { data } = $props();
	let { eventResources } = data;

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

	let scrollContainer;
	let showFixedElement = $state(true);

	function handleScroll() {
		if (!scrollContainer) return;

		// Show the fixed element only when fully scrolled to the left
		showFixedElement = scrollContainer.scrollLeft === 0;
	}

	function handleWheel(event) {
		if (!scrollContainer) return;

		// Prevent vertical scrolling and convert to horizontal scroll
		event.preventDefault();
		scrollContainer.scrollLeft += event.deltaY;

		// Call scroll handler to update visibility of fixed element
		handleScroll();
	}
</script>

<div class="scroll-instructions {showFixedElement ? '' : 'hidden'}">
	<Instructions />
</div>

<div
	class="page wrapper-resources scroll-container"
	bind:this={scrollContainer}
	onwheel={handleWheel}
	onscroll={handleScroll}
>
	<div class="wrapper-inner">
		{#each eventResources as eventResource}
			<Resource {imgUrlBuilder} {processContent} {eventResource}></Resource>
		{/each}
	</div>
</div>

<style lang="scss">
	.scroll-instructions {
		position: fixed;
		left: 50px;
		top: 30%;
		transform: translate(0, -50%);
		opacity: 1;
		transition: opacity 0.3s ease-in-out;
		&.hidden {
			opacity: 0;
		}
		@media (max-width: 600px) {
			display: none;
		}
	}

	.wrapper-resources {
		// background-color: var(--col-bg);
		color: var(--col-text-and-accent);
		display: flex;
		align-items: flex-start;
		justify-content: center;
		flex-direction: column;
		overflow: scroll;
		/* Hide scrollbar for Chrome, Safari, and Edge */
		scrollbar-width: none; /* Firefox */

		/* Hide scrollbar for WebKit browsers (Chrome, Safari, Edge) */
		&::-webkit-scrollbar {
			display: none;
		}

		@media (max-width: 600px) {
			margin-top: 50px;
		}
	}
	.wrapper-inner {
		// border: 2px solid red;
		position: relative;
		display: flex;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-items: flex-start;
		padding: 150px;
		// max-width: 1600px;
		@media (max-width: 600px) {
			padding: 50px 0;
		}
	}
	.noise {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}
</style>
