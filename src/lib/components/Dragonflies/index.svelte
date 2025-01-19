<script>
	import P5 from 'p5-svelte';
	import Dragonfly from './dragonfly';
	import { colBg, coloursDragonflies, colDark } from '$lib/styles/variables';

	const colours = coloursDragonflies;
	const bgColorHex = colBg;
	const coloursForStroke = colours.filter((d) => d !== bgColorHex);

	const breakpointHeight = 800;

	const sketch = (p5) => {
		// Initialise
		let ctx;
		let dragonflies = [];
		let sampleRotation = Math.PI * 0.1;
		let rotations = [];
		let bgColor;
		let existsDragonflyHovered = false; // Keep track if any dragonfly has been hovered
		let frameCounts = []; // Want to keep track of the current number of frame counts for each dragonfly in motion

		p5.setup = () => {
			p5.createCanvas(p5.windowWidth, p5.windowHeight);
			ctx = p5.canvas.getContext('2d');
			p5.frameRate(20);
			p5.pixelDensity(2);

			// Convert hex to a p5 color object and set alpha for the bg col
			bgColor = p5.color(bgColorHex);
			bgColor.setAlpha(100);

			// Dragonflies - add the 2 main dragonflies
			const dataDragonfly1 = {
				scale:
					p5.windowHeight >= breakpointHeight
						? Math.min(0.57, 0.0008 * p5.windowWidth)
						: Math.min(0.53, 0.0008 * p5.windowWidth),
				x: p5.windowHeight >= breakpointHeight ? p5.width * 0.38 : p5.width * 0.35,
				y: p5.windowHeight >= breakpointHeight ? p5.height * 0.34 : p5.height * 0.2
			};

			const dataDragonfly2 = {
				scale:
					p5.windowHeight >= breakpointHeight
						? Math.min(0.38, 0.0004 * p5.windowWidth)
						: Math.min(0.3, 0.0004 * p5.windowWidth),
				x: p5.windowHeight >= breakpointHeight ? p5.width * 0.63 : p5.width * 0.66,
				y: p5.windowHeight >= breakpointHeight ? p5.height * 0.4 : p5.height * 0.35
			};
			const dragonfly1 = new Dragonfly(
				colours,
				ctx,
				dataDragonfly1.x,
				dataDragonfly1.y,
				dataDragonfly1.scale,
				Math.PI * 0.2,
				0,
				400,
				colDark
			);
			dragonflies.push(dragonfly1);
			rotations.push(sampleRotation);
			const dragonfly2 = new Dragonfly(
				colours,
				ctx,
				dataDragonfly2.x,
				dataDragonfly2.y,
				dataDragonfly2.scale,
				-Math.PI * 0.3,
				0,
				200,
				p5.random(coloursForStroke)
			);
			dragonflies.push(dragonfly2);
			rotations.push(sampleRotation);

			// Dragonflies - a couple more at the edges but only on bigger screens
			const additionalDragonflies = [
				{
					x: p5.random(p5.width * 0.6, p5.width * 0.8),
					y: p5.random(p5.height - 100, p5.height - 160),
					scale: p5.random(0.00013 * p5.windowWidth, 0.00018 * p5.windowWidth),
					rotate: -Math.PI * 0.3,
					rotateWing: Math.PI,
					numPoints: 100,
					strokeFill: p5.random(coloursForStroke)
				},
				{
					// x: p5.random(p5.width * 0.5, p5.width * 0.5 + 600),
					x: p5.width * 0.6,
					y: p5.random(50, 100),
					scale: p5.random(0.00005 * p5.windowWidth, 0.00015 * p5.windowWidth),
					rotate: p5.random(-Math.PI * 0.3, Math.PI * 0.3),
					rotateWing: p5.random(0, Math.PI),
					numPoints: 100,
					strokeFill: p5.random(coloursForStroke)
				},
				{
					x: p5.random(p5.width * 0.5, p5.width * 0.5 + 400),
					y: p5.random(50, 200),
					scale: p5.random(0.00005 * p5.windowWidth, 0.0001 * p5.windowWidth),
					rotate: p5.random(-Math.PI * 0.3, Math.PI * 0.3),
					rotateWing: p5.random(0, Math.PI),
					numPoints: 50,
					strokeFill: p5.random(coloursForStroke)
				}
			];
			const additionalDragonfliesByViewport =
				p5.windowWidth >= 1000
					? p5.windowHeight >= breakpointHeight
						? additionalDragonflies
						: additionalDragonflies.slice(0, 2)
					: [];
			if (additionalDragonfliesByViewport.length > 0) {
				additionalDragonfliesByViewport.forEach((d, i) => {
					const newDragonfly = new Dragonfly(
						colours,
						ctx,
						d.x,
						d.y,
						d.scale,
						d.rotate,
						d.rotateWing,
						d.numPoints,
						d.strokeFill
					);
					dragonflies.push(newDragonfly);
					rotations.push(sampleRotation);
				});
			}
		};

		p5.draw = () => {
			// Check if there exists any dragonfly which is being hovered
			existsDragonflyHovered = dragonflies
				.map((d) => d.clicked(p5.mouseX, p5.mouseY, p5.dist))
				.find((d) => d === true);

			// Draw and aniamte all the dragonflies below a certain number of frames
			if (p5.frameCount <= 50) {
				ctx.clearRect(0, p5.height * 0.7, p5.width, p5.height * 0.3);
				//ctx.clearRect(0, 0, p5.width, p5.height);

				frameCounts = dragonflies.map((d) => p5.frameCount);

				p5.stroke(bgColor);
				p5.fill(bgColor);
				p5.rect(0, 0, p5.width, p5.height * 0.7);

				if (dragonflies.length > 0) {
					dragonflies.forEach((dragonfly, i) => {
						dragonfly.setRotate(rotations[i]);
						dragonfly.drawDragonfly();
						rotations[i] += p5.sin(frameCounts[i] * (i + 1)) * 0.6;
					});
				}
			}
			// And above that threshold of frames, only aniamte the dragonfly being hovered
			// Note that we still need to make sure that we are drawing the other ones, just
			// not animating them (hence the need for the background etc)
			else {
				if (existsDragonflyHovered) {
					ctx.clearRect(0, p5.height * 0.7, p5.width, p5.height * 0.3);
					p5.fill(bgColor);
					p5.stroke(bgColor);
					p5.rect(0, 0, p5.width, p5.height * 0.7);
					dragonflies.forEach((dragonfly, i) => {
						dragonfly.drawDragonfly();
						if (dragonfly.clicked(p5.mouseX, p5.mouseY, p5.dist)) {
							frameCounts[i] += 1;
							dragonfly.setRotate(rotations[i]);
							rotations[i] += p5.sin(frameCounts[i] * (i + 1)) * 0.6;
						}
					});
				}
			}
		};
	};
</script>

<P5 {sketch} />
