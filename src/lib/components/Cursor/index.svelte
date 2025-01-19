<script>
	import P5 from 'p5-svelte';
	import {
		colBg,
		coloursDragonflies,
		colDark,
		colAccent1,
		colAccent2,
		colAccent3,
		colAccent4
	} from '$lib/styles/variables';
	import { Flower } from './flower';

	const sketch = (p5) => {
		let flower;
		let zoff = 0;
		let aIncrement = p5.PI / 100;
		let xoffIncrement = 0.07; // how much to increment xoff for the wings

		let colCircle = p5.color(colDark);
		// colCircle.setAlpha(250);

		p5.setup = () => {
			p5.createCanvas(p5.windowWidth, p5.windowHeight);
			p5.frameRate(60);
			p5.pixelDensity(2);

			flower = new Flower(aIncrement, xoffIncrement, p5);
		};

		let alpha = 0;
		p5.draw = () => {
			p5.clear();
			const x = p5.mouseX;
			const y = p5.mouseY;
			const colStroke = p5.color(colBg);
			colStroke.setAlpha(30);
			const col1 = p5.color(colAccent1);
			col1.setAlpha(8);
			const col2 = p5.color(colAccent2);
			col2.setAlpha(8);
			const col3 = p5.color(colAccent3);
			col3.setAlpha(8);

			// p5.push();
			// p5.fill(colCircle);
			// p5.noStroke();
			// p5.blendMode(p5.DARKEST);
			// p5.circle(x, y, 20);
			// p5.pop();

			const drawBlob = (
				rMin = 30,
				rMax = 60,
				strokeMin = 2,
				strokeMax = 8,
				colourStroke = colStroke
			) => {
				p5.stroke(colourStroke);
				p5.noFill();

				let prevX = null;
				let prevY = null;

				let firstX = null;
				let firstY = null;

				for (let a = 0; a < p5.TWO_PI; a += 0.01) {
					let xoff = p5.map(p5.cos(a), -1, 1, 0, 1);
					let yoff = p5.map(p5.sin(a), -1, 1, 0, 1);
					let r = p5.map(p5.noise(xoff, yoff, zoff), 0, 1, rMin, rMax);
					let x = p5.mouseX + r * p5.cos(a);
					let y = p5.mouseY + r * p5.sin(a);

					// Save the first point to close the circle later
					if (firstX === null && firstY === null) {
						firstX = x;
						firstY = y;
					}
					// Variable stroke weight based on angle
					let weight = p5.map(p5.sin(a + zoff), -1, 1, strokeMin, strokeMax); // Adjust range as needed
					p5.strokeWeight(weight);
					// Draw the segment
					if (prevX !== null && prevY !== null) {
						p5.line(prevX, prevY, x, y);
					}
					prevX = x;
					prevY = y;
				}
				// Close the loop by connecting the last point to the first point
				p5.strokeWeight(p5.map(p5.sin(zoff), -1, 1, strokeMin, strokeMax)); // Match stroke weight for smoothness
				p5.line(prevX, prevY, firstX, firstY);
				zoff += 0.003;
			};

			// drawBlob(1, p5.mouseY * 0.03, 18, 20, col3);
			// drawBlob(1, p5.mouseY * 0.1, 25, 35, p5.mouseX <= p5.width * 0.5 ? col1 : col3);
			// drawBlob(2, p5.mouseY * 0.2, 35, 45, col2);

			drawBlob(30, p5.mouseY * 0.15, 2, 8);
			drawBlob(20, p5.mouseY * 0.1, 1, 2);
			drawBlob(15, p5.mouseY * 0.05, 1, 2);
			drawBlob(10, p5.mouseY * 0.02, 1, 2);
		};
	};
</script>

<div class="wrapper"><P5 {sketch} /></div>

<style lang="scss">
	.wrapper {
		width: 100%;
		height: 100vh;
	}
</style>
