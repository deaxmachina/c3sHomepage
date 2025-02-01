<script lang="ts">
	import P5 from 'p5-svelte';
	import Dragonfly from './dragonfly';
	import { colBg, coloursDragonflies, colDark } from '$lib/styles/variables';

	const colours = coloursDragonflies;
	const bgColorHex = colBg;
	const coloursForStroke = colours.filter((d) => d !== bgColorHex);
	const coloursForStrokeSmallDragonflies = colours.filter((d) => d !== bgColorHex);

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
		let getAttr;

		/////////////////////////////////
		//////////// SETUP //////////////
		/////////////////////////////////
		p5.setup = () => {
			p5.createCanvas(p5.windowWidth, p5.windowHeight);
			ctx = p5.canvas.getContext('2d');
			// p5.frameRate(20);
			p5.pixelDensity(2);

			// Convert hex to a p5 color object and set alpha for the bg col
			bgColor = p5.color(bgColorHex);
			bgColor.setAlpha(100);

			///////////////////////////////////////////
			/////////// Dragonflies MAIN 2 ////////////
			///////////////////////////////////////////
			getAttr = (sm: number, md: number, lg: number) => {
				// For mobile
				if (p5.windowWidth <= 600 && p5.windowHeight <= 1000) {
					return sm;
				}
				// For desktop with bigger height (above 14'' laptop)
				else if (p5.windowHeight >= breakpointHeight) {
					return lg;
				}
				// For desktop witu smaller height (like a 14'' laptop)
				else {
					return md;
				}
			};

			// Larage draginfly
			const dataDragonfly1 = {
				scale: getAttr(0.33, 0.53, 0.57),
				x: getAttr(p5.windowWidth * 0.35, p5.windowWidth * 0.35, p5.windowWidth * 0.38),
				y: getAttr(p5.windowHeight * 0.27, p5.windowHeight * 0.3, p5.windowHeight * 0.34)
			};
			const dragonfly1 = new Dragonfly(
				colours,
				ctx,
				dataDragonfly1.x,
				dataDragonfly1.y,
				dataDragonfly1.scale,
				Math.PI * 0.2,
				0,
				300,
				colDark
			);
			dragonflies.push(dragonfly1);
			rotations.push(sampleRotation);

			// Smaller dragonfly
			const dataDragonfly2 = {
				scale: getAttr(0.2, 0.32, 0.38),
				x: getAttr(p5.windowWidth * 0.75, p5.windowWidth * 0.63, p5.windowWidth * 0.66),
				y: getAttr(p5.windowHeight * 0.54, p5.windowHeight * 0.35, p5.windowHeight * 0.4)
			};
			const dragonfly2 = new Dragonfly(
				colours,
				ctx,
				dataDragonfly2.x,
				dataDragonfly2.y,
				dataDragonfly2.scale,
				-Math.PI * 0.3,
				0,
				180,
				p5.random(coloursForStroke)
			);
			dragonflies.push(dragonfly2);
			rotations.push(sampleRotation);

			///////////////////////////////////////////
			///////// Dragonflies ADDITIONAL //////////
			///////////////////////////////////////////
			const additionalDragonflies = [
				// Bottom right dragonfly
				{
					x: p5.random(p5.windowWidth * 0.6, p5.windowWidth * 0.8),
					y: p5.random(p5.windowHeight - 90, p5.windowHeight - 130),
					scale: getAttr(p5.random(0.1, 0.2), p5.random(0.1, 0.2), p5.random(0.2, 0.3)),
					rotate: -Math.PI * 0.3,
					rotateWing: Math.PI,
					numPoints: 60,
					strokeFill: p5.random(coloursForStroke),
					fillTopWings: true
				},
				// Two dragonflies around the middle top
				{
					x: p5.windowWidth * 0.6,
					y: p5.random(50, 100),
					scale: getAttr(p5.random(0.05, 0.1), p5.random(0.1, 0.2), p5.random(0.1, 0.2)),
					rotate: p5.random(-Math.PI * 0.3, Math.PI * 0.3),
					rotateWing: p5.random(0, Math.PI),
					numPoints: 70,
					strokeFill: p5.random(coloursForStrokeSmallDragonflies),
					fillTopWings: false
				},
				// But in the bottom left on mobile
				{
					x: getAttr(
						p5.random(50, 180),
						p5.random(p5.windowWidth * 0.5, p5.windowWidth * 0.5 + 400),
						p5.random(p5.windowWidth * 0.5, p5.windowWidth * 0.5 + 400)
					),
					y: getAttr(
						p5.random(p5.windowHeight * 0.45, p5.windowHeight * 0.65),
						p5.random(50, 200),
						p5.random(50, 200)
					),
					scale: getAttr(p5.random(0.07, 0.15), p5.random(0.1, 0.2), p5.random(0.1, 0.2)),
					rotate: p5.random(-Math.PI * 0.3, Math.PI * 0.3),
					rotateWing: p5.random(0, Math.PI),
					numPoints: 50,
					strokeFill: p5.random(coloursForStrokeSmallDragonflies),
					fillTopWings: false
				}
			];

			additionalDragonflies.forEach((d, i) => {
				const newDragonfly = new Dragonfly(
					colours,
					ctx,
					d.x,
					d.y,
					d.scale,
					d.rotate,
					d.rotateWing,
					d.numPoints,
					d.strokeFill,
					d.fillTopWings
				);
				dragonflies.push(newDragonfly);
				rotations.push(sampleRotation);
			});
		};

		/////////////////////////////////
		///////////// DRAW //////////////
		/////////////////////////////////
		p5.draw = () => {
			// Check if there exists any dragonfly which is being hovered
			existsDragonflyHovered = dragonflies
				.map((d) => d.clicked(p5.mouseX, p5.mouseY, p5.dist))
				.find((d) => d === true);

			// Draw and aniamte all the dragonflies below a certain number of frames
			if (p5.frameCount <= 50) {
				ctx.clearRect(0, p5.windowHeight * 0.68, p5.windowWidth, p5.windowHeight * 0.32);

				frameCounts = dragonflies.map((d) => p5.frameCount);

				p5.stroke(bgColor);
				p5.fill(bgColor);
				p5.rect(0, 0, p5.windowWidth, p5.windowHeight * 0.68);

				if (dragonflies.length > 0) {
					dragonflies.forEach((dragonfly, i) => {
						dragonfly.setRotateWing(rotations[i]);
						dragonfly.drawDragonfly();
						// rotations[i] += p5.sin(frameCounts[i] * (i + 1)) * 0.6;
						rotations[i] = Math.abs(p5.sin(frameCounts[i] * ((i % 2) + 2)) * 1.3);
					});
				}
			}
			// And above that threshold of frames, only aniamte the dragonfly being hovered
			// Note that we still need to make sure that we are drawing the other ones, just
			// not animating them (hence the need for the background etc)
			// else {
			// 	if (existsDragonflyHovered) {
			// 		ctx.clearRect(0, p5.windowHeight * 0.68, p5.windowWidth, p5.windowHeight * 0.32);
			// 		p5.fill(bgColor);
			// 		p5.stroke(bgColor);
			// 		p5.rect(0, 0, p5.windowWidth, p5.windowHeight * 0.68);
			// 		dragonflies.forEach((dragonfly, i) => {
			// 			dragonfly.drawDragonfly();
			// 			if (dragonfly.clicked(p5.mouseX, p5.mouseY, p5.dist)) {
			// 				frameCounts[i] += 1;
			// 				dragonfly.setRotateWing(rotations[i]);
			// 				rotations[i] += p5.sin(frameCounts[i] * (i + 1)) * 0.6;
			// 			}
			// 		});
			// 	}
			// }
		};

		/////////////////////////////////
		//////////// RESIZE /////////////
		/////////////////////////////////
		p5.windowResized = () => {
			// When resizing we will just clear the whole background
			ctx.clearRect(0, 0, p5.windowWidth, p5.windowHeight);

			// Redefine this to get access to the new p5.windowWidth and p5.windowHeight
			getAttr = (sm: number, md: number, lg: number) => {
				// For mobile
				if (p5.windowWidth <= 600 && p5.windowHeight <= 1000) {
					return sm;
				}
				// For desktop with bigger height (above 14'' laptop)
				else if (p5.windowHeight >= breakpointHeight) {
					return lg;
				}
				// For desktop witu smaller height (like a 14'' laptop)
				else {
					return md;
				}
			};

			// Update the data for the dragonflies which is affected by resizing
			// Set the corresponding attrbutes using the class setters
			const newAttributes = [
				{
					x: getAttr(p5.windowWidth * 0.35, p5.windowWidth * 0.35, p5.windowWidth * 0.38),
					y: getAttr(p5.windowHeight * 0.27, p5.windowHeight * 0.3, p5.windowHeight * 0.34),
					scale: getAttr(0.33, 0.53, 0.57)
				},
				{
					x: getAttr(p5.windowWidth * 0.75, p5.windowWidth * 0.63, p5.windowWidth * 0.66),
					y: getAttr(p5.windowHeight * 0.54, p5.windowHeight * 0.35, p5.windowHeight * 0.4),
					scale: getAttr(0.2, 0.32, 0.38)
				},
				{
					x: p5.random(p5.windowWidth * 0.6, p5.windowWidth * 0.8),
					y: p5.random(p5.windowHeight - 100, p5.windowHeight - 160),
					scale: getAttr(p5.random(0.1, 0.2), p5.random(0.1, 0.2), p5.random(0.2, 0.3))
				},
				{
					x: p5.windowWidth * 0.6,
					y: p5.random(50, 100),
					scale: getAttr(p5.random(0.05, 0.1), p5.random(0.1, 0.2), p5.random(0.1, 0.2))
				},
				{
					x: p5.random(p5.windowWidth * 0.5, p5.windowWidth * 0.5 + 400),
					y: p5.random(50, 200),
					scale: getAttr(p5.random(0.05, 0.1), p5.random(0.1, 0.2), p5.random(0.1, 0.2))
				}
			];
			newAttributes.forEach(({ x, y, scale }, i) => {
				dragonflies[i].setX(x);
				dragonflies[i].setY(y);
				dragonflies[i].setScale(scale);
				dragonflies[i].drawDragonfly();
			});
		};
	};
</script>

<P5 {sketch} />
