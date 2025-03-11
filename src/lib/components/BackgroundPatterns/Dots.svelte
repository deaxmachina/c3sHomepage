<script lang="ts">
	import P5 from 'p5-svelte';
	import { stores } from '$lib/stores/stores.svelte';
	let { colours } = stores;

	const sketch = (p5) => {
		let strokeColRgb;
		let points = []; // Make sure this is a global variable
		let r = 2;
		let d = 20;
		let mouseRadius = 70;
		let repelStrength = 20;
		let returnSpeed = 0.05;

		/////////////////////////////////
		//////////// SETUP //////////////
		/////////////////////////////////
		const generatePoints = () => {
			points = []; // Reset the array
			for (let i = 0; i < p5.width; i += r + d) {
				for (let j = 0; j < p5.height; j += r + d) {
					points.push({
						x: i,
						y: j,
						originalX: i,
						originalY: j,
						vx: 0,
						vy: 0
					});
				}
			}
		};

		p5.setup = () => {
			p5.createCanvas(p5.windowWidth, p5.windowHeight);
			p5.pixelDensity(2);
			strokeColRgb = stores.isDarkMode ? stores.colours.colLight : stores.colours.colLight;
			generatePoints(); // Generate points initially
		};

		/////////////////////////////////
		//////////// DRAW ///////////////
		/////////////////////////////////
		p5.draw = () => {
			p5.clear();
			p5.noStroke();
			const strokeCol = p5.color(strokeColRgb);
			strokeCol.setAlpha(100);
			p5.fill(strokeCol);

			points.forEach((point) => {
				let dx = point.x - p5.mouseX;
				let dy = point.y - p5.mouseY;
				let distance = Math.sqrt(dx * dx + dy * dy);

				if (distance < mouseRadius) {
					let angle = Math.atan2(dy, dx);
					let force = (mouseRadius - distance) / mouseRadius;
					point.vx += Math.cos(angle) * force * repelStrength;
					point.vy += Math.sin(angle) * force * repelStrength;
				}

				point.vx *= 0.9;
				point.vy *= 0.9;
				point.x += point.vx;
				point.y += point.vy;

				if (distance > mouseRadius) {
					point.x += (point.originalX - point.x) * returnSpeed;
					point.y += (point.originalY - point.y) * returnSpeed;
				}

				p5.circle(point.x, point.y, r);
			});
		};

		/////////////////////////////////
		//////////// RESIZE /////////////
		/////////////////////////////////
		p5.windowResized = () => {
			p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
			generatePoints(); // Regenerate the points to fit the new canvas size
		};
	};
</script>

<div class="wrapper-p5">
	<P5 sketch={(p5) => sketch(p5)} />
</div>

<style lang="scss">
	.wrapper-p5 {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
	}
</style>
