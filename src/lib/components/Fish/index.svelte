<script lang="ts">
	import P5 from 'p5-svelte';
	import { stores } from '$lib/stores/stores.svelte';
	let { colours } = stores;

	const sketch = (p5) => {
		let jumpDuration = 1; // How long the fish takes to complete the jump (in seconds)
		let jumpInterval = 5; // Time between jumps (in seconds)
		let startTime;
		let isJumping = false;
		function drawFish(x, y, angle, alpha) {
			p5.push();
			p5.translate(x, y);
			p5.rotate(angle);
			const col = p5.color(colours.colSee);
			p5.fill(col);
			col.setAlpha(alpha);
			p5.noStroke();

			p5.ellipse(0, 0, 30, 10); // Fish body
			// p5.triangle(-20, 0, -30, -10, -30, 10); // Fish tail

			p5.pop();
		}

		p5.setup = () => {
			p5.createCanvas(p5.windowWidth, p5.windowHeight);
			p5.pixelDensity(2);
			startTime = p5.millis();
		};

		p5.draw = () => {
			p5.clear();
			let elapsed = (p5.millis() - startTime) / 1000; // Convert ms to seconds

			if (elapsed > jumpInterval) {
				startTime = p5.millis(); // Reset timer
				isJumping = true;
			}

			if (isJumping) {
				let t = (p5.millis() - startTime) / 1000 / jumpDuration; // Normalize time

				if (t > 1) {
					isJumping = false; // End jump
					return;
				}

				let x = p5.lerp(100, p5.width / 2, t); // Horizontal movement
				let y = p5.height - 50 - p5.sin(t * p5.PI) * 200; // Arc movement

				let dx = p5.lerp(100, p5.width / 2, t + 0.01) - x; // Estimate direction
				let dy = p5.height - 50 - p5.sin((t + 0.01) * p5.PI) * 200 - y;
				let angle = p5.atan2(dy, dx); // Get angle in radians
				let fadeAmount = p5.constrain(p5.map(y, p5.height - 50, p5.height - 250, 0, 255), 0, 255);
				drawFish(x, y, angle, fadeAmount);
			}
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
