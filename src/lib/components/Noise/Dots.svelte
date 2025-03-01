<script lang="ts">
	import P5 from 'p5-svelte';
	import { stores } from '$lib/stores/stores.svelte';
	let { colours } = stores;
	const sketch = (p5) => {
		let strokeColRgb;
		let points = [];
		let r = 2;
		let d = 20;
		let mouseRadius = 70; // Area of influence
		let repelStrength = 20; // How strongly circles move away
		let returnSpeed = 0.05; // Speed of returning to original position

		p5.setup = () => {
			p5.createCanvas(p5.windowWidth, p5.windowHeight);
			p5.pixelDensity(2);
			strokeColRgb = stores.isDarkMode ? stores.colours.colLight : stores.colours.colLight;

			for (let i = 0; i < p5.width; i += r + d) {
				for (let j = 0; j < p5.height; j += r + d) {
					points.push({
						x: i,
						y: j,
						originalX: i, // Store original positions
						originalY: j,
						vx: 0, // Velocity for smooth movement
						vy: 0
					});
				}
			}
		};

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
					// Repel effect
					let angle = Math.atan2(dy, dx);
					let force = (mouseRadius - distance) / mouseRadius; // Strength decreases with distance
					point.vx += Math.cos(angle) * force * repelStrength;
					point.vy += Math.sin(angle) * force * repelStrength;
				}

				// Apply velocity (smooth movement)
				point.vx *= 0.9; // Friction for easing
				point.vy *= 0.9;
				point.x += point.vx;
				point.y += point.vy;

				// Return to grid position when mouse is far away
				if (distance > mouseRadius) {
					point.x += (point.originalX - point.x) * returnSpeed;
					point.y += (point.originalY - point.y) * returnSpeed;
				}

				// Draw the circle
				p5.circle(point.x, point.y, r);
			});
		};
	};
</script>

<div class="wrapper-p5">
	<P5 sketch={(p5) => sketch(p5)} />
</div>

<style lang="scss">
	// .wrapper {
	// 	width: 100%;
	// 	height: 100svh;
	// 	opacity: 0.6;
	// 	mix-blend-mode: lighten;
	// 	&.light {
	// 		mix-blend-mode: lighten;
	// 	}
	// 	&.dark {
	// 		mix-blend-mode: luminosity;
	// 	}
	// 	@media (max-width: 900px) {
	// 		// display: none;
	// 	}
	// }

	.wrapper-p5 {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
	}
</style>
