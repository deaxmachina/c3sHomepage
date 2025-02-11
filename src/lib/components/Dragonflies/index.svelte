<script lang="ts">
	import P5 from 'p5-svelte';
	import Dragonfly from './dragonfly';
	import { stores } from '$lib/stores/stores.svelte';

	let { colours } = stores;

	///////////////////////////////////////
	///////////// Initialise //////////////
	///////////////////////////////////////
	let bgColorHex = $derived(colours.colBg);
	$inspect(bgColorHex);
	let colStrokeWingsDragonfly = $derived(colours.colStrokeWingsDragonfly);
	let coloursForStroke = $derived(colours.coloursDragonflies.filter((d) => d !== bgColorHex));
	let coloursForStrokeSmallDragonflies = $derived(
		colours.coloursDragonflies.filter((d) => d !== bgColorHex)
	);

	const breakpointHeight = 800;
	const breakpointWidth = 1400;

	let numbers = $state([1, 2, 3]);
	let total = $derived.by(() => {
		let total = 0;
		for (const n of numbers) {
			total += n;
		}
		return total;
	});

	// Good values: 110, 88, 95
	// TODO: Consider making is random selection from values above for different results
	let numFramesToPlayAnimation = $derived(stores.hasMountedFirstTime ? 195 : 88);

	///////////////////////////////////////
	/////////////// SKETCH ////////////////
	///////////////////////////////////////
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
		let animateDragonfliesCondition;

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
			bgColor.setAlpha(90);

			///////////////////////////////////////////
			/////////// Dragonflies MAIN 2 ////////////
			///////////////////////////////////////////
			getAttr = (sm: number, md: number, lg: number, tablet: number = 1) => {
				// For mobile
				if (p5.windowWidth <= 600 && p5.windowHeight <= 1000) {
					return sm;
				}
				// For desktop witu smaller height (like a 14'' laptop) or tablets
				else if (p5.windowHeight <= breakpointHeight || p5.windowWidth <= breakpointWidth) {
					if (p5.windowWidth >= p5.windowHeight) {
						return md;
					} else {
						return tablet;
					}
				}
				// For desktop with bigger height (above 14'' laptop)
				else {
					return lg;
				}
			};

			// Larage draginfly
			const dataDragonfly1 = {
				scale: getAttr(0.33, 0.53, 0.57, 0.52),
				x: getAttr(
					p5.windowWidth * 0.35,
					p5.windowWidth * 0.35,
					p5.windowWidth * 0.38,
					p5.windowWidth * 0.33
				),
				y: getAttr(
					p5.windowHeight * 0.27,
					p5.windowHeight * 0.3,
					p5.windowHeight * 0.34,
					p5.windowHeight * 0.36
				)
			};
			const dragonfly1 = new Dragonfly(
				colours.coloursDragonflies,
				ctx,
				dataDragonfly1.x,
				dataDragonfly1.y,
				dataDragonfly1.scale,
				Math.PI * 0.2,
				0,
				300,
				colStrokeWingsDragonfly
			);
			dragonflies.push(dragonfly1);
			rotations.push(sampleRotation);

			// Smaller dragonfly
			const dataDragonfly2 = {
				scale: getAttr(0.2, 0.32, 0.38, 0.3),
				x: getAttr(
					p5.windowWidth * 0.75,
					p5.windowWidth * 0.7,
					p5.windowWidth * 0.68,
					p5.windowWidth * 0.8
				),
				y: getAttr(
					p5.windowHeight * 0.54,
					p5.windowHeight * 0.35,
					p5.windowHeight * 0.4,
					p5.windowHeight * 0.48
				)
			};
			const dragonfly2 = new Dragonfly(
				colours.coloursDragonflies,
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
					scale: getAttr(
						p5.random(0.1, 0.2),
						p5.random(0.1, 0.2),
						p5.random(0.2, 0.3),
						p5.random(0.1, 0.3)
					),
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
					scale: getAttr(
						p5.random(0.05, 0.1),
						p5.random(0.1, 0.2),
						p5.random(0.1, 0.2),
						p5.random(0.1, 0.25)
					),
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
						p5.random(p5.windowWidth * 0.5, p5.windowWidth * 0.5 + 400),
						p5.random(50, 180)
					),
					y: getAttr(
						p5.random(p5.windowHeight * 0.45, p5.windowHeight * 0.65),
						p5.random(50, 200),
						p5.random(50, 200),
						p5.random(p5.windowHeight * 0.45, p5.windowHeight * 0.65)
					),
					scale: getAttr(
						p5.random(0.07, 0.15),
						p5.random(0.1, 0.2),
						p5.random(0.1, 0.2),
						p5.random(0.1, 0.25)
					),
					rotate: p5.random(-Math.PI * 0.3, Math.PI * 0.3),
					rotateWing: p5.random(0, Math.PI),
					numPoints: 50,
					strokeFill: p5.random(coloursForStrokeSmallDragonflies),
					fillTopWings: false
				}
			];

			additionalDragonflies.forEach((d, i) => {
				const newDragonfly = new Dragonfly(
					colours.coloursDragonflies,
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

			// Draw and aniamte all the dragonflies below a certain number of frames (50 to 205)
			// if (p5.frameCount >= 100 && p5.frameCount <= 205) {
			// Set the play condition based on whether this is frist time
			// the component has rendered or each subsequent time
			animateDragonfliesCondition = stores.hasMountedFirstTime
				? p5.frameCount >= 100 && p5.frameCount <= 163
				: p5.frameCount <= numFramesToPlayAnimation;
			if (animateDragonfliesCondition) {
				// Clear the background just for the dragonfly at the bottom above the sea
				ctx.clearRect(0, p5.windowHeight * 0.68, p5.windowWidth, p5.windowHeight * 0.32);

				// For the rest of the background, this is the right blend option
				// to allow to have the trailing effect of the dragonflies
				p5.blendMode(p5.REMOVE);
				p5.noStroke();
				p5.fill(bgColor);
				p5.rect(0, 0, p5.windowWidth, p5.windowHeight * 0.68);
				// Make sure to reset the blend value to the default after bg has been drawn
				p5.blendMode(p5.BLEND);

				frameCounts = dragonflies.map((d) => p5.frameCount);
				if (dragonflies.length > 0) {
					dragonflies.forEach((dragonfly, i) => {
						dragonfly.setRotateWing(rotations[i]);
						dragonfly.drawDragonfly();
						// rotations[i] += p5.sin(frameCounts[i] * (i + 1)) * 0.6;
						rotations[i] = Math.abs(p5.sin(frameCounts[i] * ((i % 2) + 2)) * 1.3);
					});
				}
			}
		};

		/////////////////////////////////
		//////////// RESIZE /////////////
		/////////////////////////////////
		// TODO: Copy the final positions into this function when done
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

<div class="wrapper" id="wrapper-dragonflies">
	{#key stores.colourMode}
		<P5 sketch={(p5) => sketch(p5)} />
	{/key}
</div>

<style lang="scss">
	.inner {
		width: 100%;
		height: 100%;
	}
</style>
