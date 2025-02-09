<script lang="ts">
	import gsap from 'gsap';
	import TextPlugin from 'gsap/dist/TextPlugin'; // Ensure UMD version

	///////////////////////////////////////
	/////////////// GSAP //////////////////
	///////////////////////////////////////
	// Animation to type the words 'Creative coding crafts space' out
	// followed by fading in the title 'c3s'
	let timeline = $state(null);
	$effect(() => {
		gsap.registerPlugin(TextPlugin);
		timeline = gsap
			.timeline()
			.to('#wrapper-title .full-name', {
				text: {
					value: 'Creative coding crafts space'
				},
				duration: 1,
				delay: 0.5,
				ease: 'none'
			})
			.to('#wrapper-title .abbr', {
				opacity: 1,
				duration: 1,
				delay: 0.2,
				ease: 'none'
			});
	});
</script>

<!-- TODO: Restructure this to have semantic html -->
<div class="wrapper" id="wrapper-title">
	<div class="full-name">
		<!-- Creative Coding Crafts Space -->
	</div>
	<div class="abbr">
		<h1 class="background">c<span class="num">3</span>s</h1>
		<h1 class="foreground">c<span class="num">3</span>s</h1>
	</div>
</div>

<style lang="scss">
	$base-font-size-title: min(max(280px, 26vw), 400px);
	$height-adjusted-font-size-title: min(max(220px, 22vw), 380px);

	.wrapper {
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translate(-50%, 0);
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
		color: var(--col-text-subtitle-main);
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
		}
		.full-name-top {
			font-family: 'bitcount-grid-single-line-sq', sans-serif;
			position: absolute;
			top: 0;
			font-weight: 500;
		}
	}
	.abbr {
		position: relative;
		margin-top: -20px;
		opacity: 0;
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
			color: var(--col-text-title-main);
		}
		&.background {
			color: var(--col-text-title-accent);
		}
	}

	// Form md and sm phones
	@media (max-width: 440px) {
		h1 {
			font-size: calc($height-adjusted-font-size-title * 0.9);
			.num {
				font-size: calc($height-adjusted-font-size-title * 0.9 * 0.72);
			}
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
