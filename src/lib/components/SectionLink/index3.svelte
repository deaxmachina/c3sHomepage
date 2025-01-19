<script lang="ts">
	import Socials from './Socials.svelte';
</script>

<div class="wrapper-section-link">
	<div class="sections">
		<a href="/" class="selected">
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

	<!-- <Socials /> -->
</div>

<style lang="scss">
	@import '../../styles/variables.scss';

	.wrapper-section-link {
		// width: 100%;
		position: absolute;
		top: 10px;
		left: 90px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-direction: column;
		z-index: 100;
		background-color: none;
		padding: 0.7rem 1rem 0rem 1rem;
		// background-color: #4a7d6f9a; // #221d347a; // #4a7d6f7b;
		// backdrop-filter: blur(2px);
		border-radius: 0 0 14px 0;
		// border-radius: 20px 20px 0 0;
		transform: translateX(-50%);
		// border: 1px solid #221d34;
		border-top: none;
		width: 200px;
	}
	.sections {
		display: flex;
		flex-direction: column;
	}

	a {
		color: #221d34 !important;
		font-family: 'sudo', 'lores-9-plus-wide', sans-serif;
		font-family: 'bitcount-grid-double-circle', sans-serif;
		font-family: 'Funnel Sans', serif;
		text-transform: uppercase;
		text-decoration: none;
		color: $col-text-and-accent;
		margin-bottom: 10px;
		font-size: max(0.6770833333vw, 12px);
		line-height: 0;
		font-weight: 500;
		text-transform: uppercase;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		&.selected {
			font-weight: 800;
		}
	}

	.triangle {
		width: 0;
		height: 0;
		border-top: 5px solid transparent;
		border-bottom: 5px solid transparent;
		border-left: 7px solid transparent;
		margin-right: 3px;
		&.selected {
			border-left: 7px solid #221d34;
		}
	}
</style>
