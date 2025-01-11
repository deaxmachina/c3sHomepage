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

	const sketch = (p5) => {
		let colourScheme;
		let colours;
		// Bg col
		let colBg;
		let randomColBgDots;

		// Dragonflies
		let ctx;
		let dragonflies = [];
		let sampleRotation = Math.PI * 0.1;
		const rotations = [];
		let dragonfliesAreOverlapping = false;

		p5.setup = () => {
			p5.createCanvas(p5.windowWidth, p5.windowHeight);
			ctx = p5.canvas.getContext('2d');

			// Initialise the colour scheme on load
			colourScheme = 1;
			colours = colourSchemes[colourScheme];
			randomColBgDots = { colBg: '#1e0c42', colDots: '#f0077b' };
			colBg = colourScheme === 0 ? p5.color(randomColBgDots.colBg) : p5.color(0, 0, 0);

			// Dragonflies - add the 2 main dragonflies
			const dragonfly1 = new Dragonfly(
				colours,
				ctx,
				p5.width * 0.35,
				p5.height * 0.37,
				Math.min(0.57, 0.0004 * p5.windowWidth),
				Math.PI * 0.2,
				0,
				200,
				p5.random(colours.filter((d) => d !== randomColBgDots.colBg))
			);
			dragonflies.push(dragonfly1);
			rotations.push(sampleRotation);
			const dragonfly2 = new Dragonfly(
				colours,
				ctx,
				p5.width * 0.67,
				p5.height * 0.56,
				Math.min(0.4, 0.00025 * p5.windowWidth),
				-Math.PI * 0.3,
				0,
				140,
				p5.random(colours.filter((d) => d !== randomColBgDots.colBg))
			);
			dragonflies.push(dragonfly2);
			rotations.push(sampleRotation);

			// Dragonflies - a couple more at the edges
			const posLookup = [
				// { x: width - random(50, 300), y: height - random(50, 200) },
				// { x: width - random(50, 200), y: height - random(50, 300) },
				{ x: p5.random(20, 200), y: p5.height - p5.random(100, 400) },
				{ x: p5.random(100, 600), y: p5.height - p5.random(50, 200) }
			];
			for (const i of [0, 0]) {
				const newDragonfly = new Dragonfly(
					colours,
					ctx,
					posLookup[i].x,
					posLookup[i].y,
					p5.random(0.00008 * p5.windowWidth, 0.0002 * p5.windowWidth),
					p5.random(-Math.PI * 0.3, Math.PI * 0.3),
					p5.random(0, Math.PI),
					p5.random(20, 50),
					p5.random(colours.filter((d) => d !== randomColBgDots.colBg))
				);
				dragonflies.push(newDragonfly);
				rotations.push(sampleRotation);
			}
		};

		p5.draw = () => {
			p5.background(p5.red(colBg), p5.green(colBg), p5.blue(colBg), 60);

			// Smooth sine wave wing flapping motion for dragonfly wings
			if (dragonflies.length > 0) {
				dragonflies.forEach((dragonfly, i) => {
					dragonfly.setRotate(rotations[i]);
					dragonfly.drawDragonfly();
					rotations[i] += p5.sin(p5.frameCount * (i + 1)) * 0.6;
				});
			}
		};
	};
</script>

<P5 {sketch} />
