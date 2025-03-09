<script>
	let { col = 'var(--col-accent-2)' } = $props();
</script>

<div class="wrapper">
	<span style:color={col}>scroll up</span>
	<svg width="40" height="40" viewBox="0 0 27.1 80">
		<path
			d="M27.1,40A13.6,13.6,0,1,1,13.6,26.4,13.6,13.6,0,0,1,27.1,40ZM2.2,20.8H24.9a2.2,2.2,0,0,0,2-1.2,2.1,2.1,0,0,0-.2-2.3L15.4,1h0a2,2,0,0,0-1.8-1,2.4,2.4,0,0,0-1.9,1L.4,17.3a2.1,2.1,0,0,0-.1,2.3,2,2,0,0,0,1.9,1.2ZM26.9,60.4a2.2,2.2,0,0,0-2-1.2H2.2A2.1,2.1,0,0,0,.3,60.4a2.1,2.1,0,0,0,.1,2.3L11.7,79a2.2,2.2,0,0,0,1.9,1,2,2,0,0,0,1.8-1h0L26.7,62.7a2.1,2.1,0,0,0,.2-2.3Z"
			transform="translate(0)"
			fill={col}
		/>
	</svg>
	<span style:color={col}
		>scroll down
		<br />
		for more
	</span>
</div>

<style lang="scss">
	* {
		font-family: 'Funnel Sans', serif;
		font-family: 'Titillium Web', serif;
		box-sizing: border-box;
	}
	.wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		span {
			margin: 5px 0;
			font-size: 0.8rem;
			line-height: 1;
			text-align: center;
		}
	}
</style>
