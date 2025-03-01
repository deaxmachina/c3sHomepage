<script lang="ts">
	import P5 from 'p5-svelte';
	import { stores } from '$lib/stores/stores.svelte';
	let { colours } = stores;

	// const sketch = (p5) => {
	// 	let drawTriangle;
	// 	let strokeColRgb;
	// 	p5.setup = () => {
	// 		p5.createCanvas(p5.windowWidth, p5.windowHeight);
	// 		p5.pixelDensity(2);

	// 		drawTriangle = (x, y, r, rot) => {
	// 			let aX = x + r * p5.cos(rot + 0);
	// 			let aY = y + r * p5.sin(rot + 0);
	// 			let bX = x + r * p5.cos(rot + 120);
	// 			let bY = y + r * p5.sin(rot + 120);
	// 			let cX = x + r * p5.cos(rot + 240);
	// 			let cY = y + r * p5.sin(rot + 240);

	// 			p5.triangle(x, y, bX, bY, cX, cY);
	// 			p5.triangle(aX, aY, x, y, cX, cY);
	// 			p5.triangle(aX, aY, bX, bY, x, y);
	// 		};
	// 		strokeColRgb = stores.isDarkMode ? '#3a3159' : '#97d97c';
	// 	};

	// 	p5.draw = () => {
	// 		p5.clear();

	// 		// Kumiko
	// 		p5.push();
	// 		p5.angleMode(p5.DEGREES);
	// 		p5.noFill();
	// 		const strokeCol = p5.color(strokeColRgb); // '#97d97c' '#3a3159'
	// 		strokeCol.setAlpha(130);
	// 		p5.stroke(strokeCol);
	// 		p5.strokeWeight(0.5);
	// 		let r = 30;
	// 		let padX = r + r * p5.cos(60);
	// 		let padY = r * p5.sin(60);
	// 		let distX = r - r * p5.cos(60);
	// 		for (let a = 0; a < 26; a++) {
	// 			for (let b = 0; b < 40; b++) {
	// 				if ((a + b) % 2 == 0) {
	// 					drawTriangle(b * padX, a * padY, r, 0);
	// 				} else {
	// 					drawTriangle(b * padX + distX, a * padY, r, 180);
	// 				}
	// 			}
	// 		}
	// 		p5.pop();
	// 		p5.angleMode(p5.RADIANS);
	// 	};
	// };
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
	<div class="dotted-bg {stores.colourMode}"></div>

	<!-- Kumiko pattern -->
	<!-- {#key stores.colourMode}
		<div class="wrapper-p5">
			<P5 sketch={(p5) => sketch(p5)} />
		</div>
	{/key} -->
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
