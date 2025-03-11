<script lang="ts">
	import P5 from 'p5-svelte';
	import { stores } from '$lib/stores/stores.svelte';
	let { colours } = stores;
	import Dots from './Dots.svelte';
</script>

<!-- <animate attributeName="seed" from="0" to="100" dur="2s" repeatCount="indefinite" /> -->

<div class="wrapper {stores.colourMode}">
	<!-- Noise filter  -->
	<!-- <svg width="100%" height="100%">
		<defs>
			<filter id="noiseFilter">
				<feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="1" stitchTiles="stitch">
				</feTurbulence>
				<feComponentTransfer>
					<feFuncR type="linear" slope="0.5" />
					<feFuncG type="linear" slope="0.5" />
					<feFuncB type="linear" slope="0.5" />
					<feFuncA type="linear" slope="0.5" />
				</feComponentTransfer>
				<feColorMatrix type="saturate" values="0" />
			</filter>
		</defs>
		<rect width="100%" height="100%" filter="url(#noiseFilter)" />
	</svg> -->

	<!-- Dotted pattern  -->
	<!-- <div class="dotted-bg {stores.colourMode}"></div> -->

	<!-- Kumiko pattern -->
	{#key stores.colourMode}
		<Dots />
	{/key}
</div>

<style lang="scss">
	.wrapper {
		width: 100%;
		height: 100%;
		opacity: 0.6;
		mix-blend-mode: lighten; //  multiply; //luminosity; //lighten; //difference; //darken; // color-burn;
		&.light {
			mix-blend-mode: lighten;
		}
		&.dark {
			mix-blend-mode: luminosity;
		}

		@media (max-width: 900px) {
			// display: none;
		}
	}

	.dotted-bg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
		// &.light {
		// 	mix-blend-mode: lighten;
		// }
		// &.dark {
		// 	mix-blend-mode: luminosity;
		// }
		--circle_w: 2px;
		--m_bet_circle: 15px;
		--circle_color: #eaeace45;
		// --circle_color: #eaeace56;
		--bg_color: transparent;
		--A: calc(var(--circle_w) + var(--m_bet_circle));
		--B: calc(var(--circle_w) / 2);
		background:
			0 0 / var(--A) var(--A)
				radial-gradient(circle at center, var(--circle_color) var(--B), var(--bg_color) var(--B)),
			center/cover no-repeat;
	}

	.wrapper-p5 {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
	}
</style>
