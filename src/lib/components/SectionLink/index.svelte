<script lang="ts">
	import * as d3 from 'd3';
	let { sectionLink, sectionTitle, children, contentSlot, ...props } = $props();

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
	<h2>::: {sectionTitle} :::</h2>
	<!-- {@render children()} -->

	{#if contentSlot}
		<p class="section-description">
			{@render contentSlot()}
		</p>
	{/if}
</a>

<style lang="scss">
	.wrapper-section-link {
		position: absolute;

		text-decoration: none;
		color: #dae2cb;

		width: 180px;
		height: 260px;
		padding: 15px 5px 10px 5px;
		text-align: center;

		background-color: #6cb6a528;
		// background: #54448e49;
		// background: #221d3450;
		// box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
		backdrop-filter: blur(10px);
		// border-radius: 0 20px 0 20px;
		-webkit-backdrop-filter: blur(10px); // Safari support
		border: 1px solid #dae2cb55;
	}

	h2 {
		font-family: 'sudo', 'lores-9-plus-wide', sans-serif;
		// font-family: 'bitcount-grid-double-circle', sans-serif;
		text-transform: uppercase;
		font-weight: 400;
		font-style: normal;
		line-height: 1;
		font-size: 1rem;
	}

	.section-description {
		font-family: 'Courier New', Courier, monospace;
	}
</style>
