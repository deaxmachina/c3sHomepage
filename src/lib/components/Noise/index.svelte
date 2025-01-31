<!-- Resouce for the noise if done just with css (currently not being used here): 
https://css-tricks.com/making-static-noise-from-a-weird-css-gradient-bug/
https://codepen.io/t_afif/pen/oNdKYge 
-->

<div class="wrapper">
	<svg width="100%" height="100%">
		<filter id="noiseFilter">
			<feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="9" stitchTiles="stitch">
				<animate attributeName="seed" from="0" to="100" dur="2s" repeatCount="indefinite" />
			</feTurbulence>
			<feComponentTransfer>
				<feFuncR type="linear" slope="0.7" />
				<feFuncG type="linear" slope="0.7" />
				<feFuncB type="linear" slope="0.7" />
				<feFuncA type="linear" slope="0.65" />
			</feComponentTransfer>
			<feColorMatrix type="saturate" values="0" />
		</filter>
		<rect width="100%" height="100%" filter="url(#noiseFilter)" />
	</svg>
</div>

<style lang="scss">
	// .wrapper {
	// 	width: 100vw;
	// 	height: 100vh;
	// 	background:
	// 		repeating-radial-gradient(#000 0 0.0001%, #fff 0 0.0002%) 50% 0/2500px 2500px,
	// 		repeating-conic-gradient(#000 0 0.0001%, #fff 0 0.0002%) 60% 60%/2500px 2500px;
	// 	background-blend-mode: difference;
	// 	animation: b 5s infinite alternate;
	// 	opacity: 0.1;
	// }

	.wrapper {
		width: 100vw;
		height: 100vh;
		opacity: 0.7;
	}

	@keyframes b {
		100% {
			background-position:
				50% 0,
				60% 50%;
		}
	}
</style>
