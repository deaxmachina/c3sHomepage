<script lang="ts">
	import * as d3 from 'd3';
	let { sectionLink, sectionTitle, children, contentSlot, randomOffset = 0, ...props } = $props();

	/**************************************
	 * Logic for dragging the item and
	 * positioning it anywhere on screen
	 *************************************/
	let x = $state(0);
	let y = $state(0);
	let offsetX = $state(0);
	let offsetY = $state(0);

	function dragStart(event: MouseEvent) {
		const { clientX, clientY } = event.sourceEvent;
		offsetX = clientX - x;
		offsetY = clientY - y;
	}
	function drag(event: MouseEvent) {
		// Update position based on mouse coordinates and offset
		const { clientX, clientY } = event.sourceEvent;
		x = clientX - offsetX;
		y = clientY - offsetY;
		d3.select(this).style('transform', `translate(${x}px, ${y}px)`);
	}
	$effect(() => {
		d3.select(`.wrapper-section-link.${sectionLink}`).call(
			d3.drag().on('start', dragStart).on('drag', drag)
		);
	});
</script>

<a href="/{sectionLink}" class="wrapper-section-link {sectionLink}" {...props}>
	<!-- {@render children()} -->

	{#if contentSlot}
		<p class="section-description">
			{@render contentSlot()}
		</p>
	{/if}

	<h2>{sectionTitle}</h2>
</a>

<style lang="scss">
	.wrapper-section-link {
		position: absolute;

		text-decoration: none;
		color: #dae2cb;

		width: 150px;
		height: 150px;
		padding: 10px;
		text-align: center;
		border-radius: 230px;

		border-radius: 51% 49% 48% 52% / 62% 44% 56% 38%;
		// opacity: 0.8;
		// background: #54448e49;
		background: #221d3430;
		// box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
		backdrop-filter: blur(5px);
		// -webkit-backdrop-filter: blur(10px); // Safari support
		// border-top: 2px solid #dae2cb;
		// border-bottom: 4px solid #dae2cb;
		border: 1px solid #dae2cb;
	}

	h2 {
		font-family: 'sudo', 'lores-9-plus-wide', sans-serif;
		font-family: 'bitcount-grid-double-circle', sans-serif;
		font-family: 'Della Respira', serif;

		text-transform: uppercase;
		font-weight: 400;
		line-height: 1;
		font-size: 0.9rem;
		position: absolute;
		width: 100%;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: #dae2cb;
	}

	.section-description {
		text-align: left;
		margin-top: 10px;
		font-family: 'Della Respira', serif;
	}
</style>
