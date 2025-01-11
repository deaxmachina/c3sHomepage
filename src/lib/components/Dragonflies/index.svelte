<script>
	import * as d3 from 'd3';
	import P5 from 'p5-svelte';
	import Dragonfly from './dragonfly';

	const extraCols = [
		['#ffeec2', '#fe9e8e', '#f80174', '#c4037a', '#322c8e'],
		['#ffabab', '#ffdaab', '#ddffab', '#abe4ff', '#d9abff'],
		['#f3d597', '#b6d89c', '#92ccb6', '#f87887', '#9e6b7c'],
		['#452e3c', '#ff3d5a', '#ffb969', '#eaf27e', '#3b8c88'],
		['#dae2cb', '#96c3a6', '#6cb6a5', '#221d34', '#90425c']
	];
	let colourSchemes = [
		['#079ea6', '#1e0c42', '#f0077b', '#f5be58', '#e3e0b3'],
		['#ff0092', '#ffca1b', '#b6ff00', '#228dff', '#ba01ff'],
		extraCols[2],
		extraCols[4]
	];

	// Hex color as a string
	let hexColor = '#02070A';

	const sketch = (p5) => {
		let colourScheme;
		let colours;

		// Dragonflies
		let ctx;
		let dragonflies = [];
		let sampleRotation = Math.PI * 0.1;
		const rotations = [];

		p5.setup = () => {
			p5.createCanvas(p5.windowWidth, p5.windowHeight);
			ctx = p5.canvas.getContext('2d');
			p5.frameRate(20);

			// Initialise the colour scheme on load
			colourScheme = 1;
			colours = colourSchemes[colourScheme];

			// Dragonflies - add the 2 main dragonflies
			const dragonfly1 = new Dragonfly(
				colours,
				ctx,
				p5.width * 0.38,
				p5.height * 0.35,
				Math.min(0.57, 0.00035 * p5.windowWidth),
				Math.PI * 0.2,
				0,
				300,
				p5.random(colours)
			);
			dragonflies.push(dragonfly1);
			rotations.push(sampleRotation);
			const dragonfly2 = new Dragonfly(
				colours,
				ctx,
				p5.width * 0.63,
				p5.height * 0.45,
				Math.min(0.4, 0.00015 * p5.windowWidth),
				-Math.PI * 0.3,
				0,
				240,
				p5.random(colours)
			);
			dragonflies.push(dragonfly2);
			rotations.push(sampleRotation);

			// Dragonflies - a couple more at the edges
			const posLookup = [
				{ x: p5.random(p5.width * 0.5 - 100, p5.width * 0.5 + 200), y: p5.random(50, 200) },
				{ x: p5.random(p5.width * 0.5 - 100, p5.width * 0.5 + 400), y: p5.random(50, 200) },
				{ x: p5.random(p5.width * 0.5, p5.width * 0.5 + 600), y: p5.random(100, 300) },
				{ x: p5.random(100, 600), y: p5.height - p5.random(50, 200) }
			];
			for (const i of [0, 1, 2]) {
				const newDragonfly = new Dragonfly(
					colours,
					ctx,
					posLookup[i].x,
					posLookup[i].y,
					p5.random(0.00005 * p5.windowWidth, 0.00015 * p5.windowWidth),
					p5.random(-Math.PI * 0.3, Math.PI * 0.3),
					p5.random(0, Math.PI),
					100
				);
				dragonflies.push(newDragonfly);
				rotations.push(sampleRotation);
			}
		};

		p5.draw = () => {
			// Convert hex to a p5 color object and set alpha
			let bgColor = p5.color(hexColor);
			bgColor.setAlpha(70); // Set alpha (0-255, where 60 is ~24% opacity)
			p5.fill(bgColor);
			p5.noStroke();
			p5.rect(0, 0, p5.width, p5.height * 0.7);

			// Smooth sine wave wing flapping motion for dragonfly wings
			if (dragonflies.length > 0) {
				dragonflies.forEach((dragonfly, i) => {
					dragonfly.setRotate(rotations[i]);
					dragonfly.drawDragonfly();
					rotations[i] += p5.sin(p5.frameCount * (i + 1)) * 0.6;
				});
			}

			if (p5.frameCount >= 50) {
				p5.noLoop();
			}
		};
	};
</script>

<P5 {sketch} />
