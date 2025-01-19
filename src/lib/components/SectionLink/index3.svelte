<script lang="ts">
</script>

<div class="wrapper-section-link">
	<a href="/">
		<div class="triangle selected"></div>
		Home
	</a>
	<a href="/about">
		<div class="triangle"></div>
		About</a
	>
	<a href="/events">
		<div class="triangle"></div>
		Events</a
	>
	<a href="/resources">
		<div class="triangle"></div>
		Resources</a
	>
</div>

<style lang="scss">
	@import '../../styles/variables.scss';

	.wrapper-section-link {
		// width: 100%;
		position: absolute;
		bottom: 0px;
		left: 50%;
		display: flex;
		flex-direction: row;
		z-index: 100;
		background-color: none;
		padding: 0.7rem 10rem 0rem 10rem;
		background-color: #4a7d6f7b;
		backdrop-filter: blur(2px);
		// border-radius: 0 0 14px 14px;
		border-radius: 20px 20px 0 0;
		transform: translateX(-50%);
		// border: 2px solid #221d34;
		border-top: none;
	}

	a {
		color: #dae2cb !important;
		font-family: 'sudo', 'lores-9-plus-wide', sans-serif;
		font-family: 'bitcount-grid-double-circle', sans-serif;
		font-family: 'Funnel Sans', serif;
		text-transform: uppercase;
		text-decoration: none;
		color: $col-text-and-accent;
		margin-bottom: 10px;
		font-size: max(0.6770833333vw, 12px);
		line-height: 0;
		font-weight: 600;
		text-transform: uppercase;
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}

	.triangle {
		width: 0;
		height: 0;
		border-top: 5px solid transparent;
		border-bottom: 5px solid transparent;
		border-left: 7px solid transparent;
		margin-right: 3px;
		&.selected {
			border-left: 7px solid #dae2cb;
		}
	}
</style>
