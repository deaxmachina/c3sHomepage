<script lang="ts">
</script>

<div class="wrapper">
	<div class="full-name">
		Creative Coding Crafts Space
		<!-- <div class="full-name-top">Creative Coding Crafts Space</div> -->
	</div>
	<div class="abbr">
		<h1 class="background">c<span class="num">3</span>s</h1>
		<h1 class="foreground">c<span class="num">3</span>s</h1>
	</div>
</div>

<style lang="scss">
	@import '../../styles/variables.scss';
	$base-font-size-title: min(max(220px, 26vw), 400px);
	$height-adjusted-font-size-title: min(max(220px, 22vw), 380px);

	.wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		flex-direction: column;
		margin-bottom: 15px;
		@media (max-width: 1200px) {
			margin-bottom: 35px;
		}
		@media (max-width: 1000px) {
			margin-bottom: 40px;
		}
		@media (max-width: 800px) {
			margin-bottom: 50px;
		}
	}
	.full-name {
		// font-family: 'bitcount-grid-double-circle', sans-serif;
		// font-family: 'bitcount-grid-single-line-ci', sans-serif;
		// font-family: 'bitcount-grid-single-line-sq', sans-serif;
		// font-family: 'bitcount-grid-single-square', sans-serif;
		font-family: 'bitcount-grid-single-circle', sans-serif;
		font-weight: 500;
		font-style: normal;
		font-size: max(22px, calc($base-font-size-title * 0.083));
		color: $col-text-and-accent;
		// color: $col-accent-3;
		line-height: 1;
		text-transform: uppercase;
		position: relative;
		margin: 0 7px 0 7px;
		@media (max-width: 1300px) {
			font-size: max(22px, calc($base-font-size-title * 0.11));
			margin: 0 5px 22px 5px;
			font-weight: 500;
			line-height: 1.05;
			text-align: center;
			// font-family: 'bitcount-grid-double-circle', sans-serif;
		}
		.full-name-top {
			font-family: 'bitcount-grid-single-line-sq', sans-serif;
			// font-family: 'bitcount-grid-single-square', sans-serif;
			position: absolute;
			top: 0;
			font-weight: 500;
			color: $col-accent-3;
			color: $col-text-and-accent;
		}
	}
	.abbr {
		position: relative;
		margin-top: -20px;
	}
	h1 {
		line-height: 0.7;
		font-size: $base-font-size-title;
		font-family: 'sudo', 'lores-9-plus-wide', sans-serif;
		font-weight: 400;
		font-style: normal;
		.num {
			font-size: calc($base-font-size-title * 0.72);
		}
		&.foreground {
			position: absolute;
			top: -10px;
			color: $col-text-and-accent;
		}
		&.background {
			color: $col-accent-2;
		}
	}

	// Specifically for smaller laptops
	@media (max-height: 800px) and (max-width: 1400px) {
		h1 {
			font-size: $height-adjusted-font-size-title;
			.num {
				font-size: calc($height-adjusted-font-size-title * 0.72);
			}
		}
	}
</style>
