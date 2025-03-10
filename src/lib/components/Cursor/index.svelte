<script>
	import P5 from 'p5-svelte';
	import Dragonfly from '../Dragonflies/dragonfly';
	import { stores } from '$lib/stores/stores.svelte';

	let { colours } = stores;

	const sketch = (p5) => {
		// Initialise
		let ctx;
		let dragonfly;
		let rotation = 0; // wings
		let rotate = Math.PI * 0.2; // body
		let x, y;

		p5.setup = () => {
			p5.createCanvas(p5.windowWidth, p5.windowHeight);
			p5.pixelDensity(2);
			ctx = p5.canvas.getContext('2d');

			x = p5.mouseX;
			y = p5.mouseY;

			dragonfly = new Dragonfly(
				colours.coloursDragonflies,
				ctx,
				x,
				y,
				0.1,
				rotate,
				0,
				10,
				p5.random(colours.coloursDragonflies.filter((d) => d !== colours.colBg)),
				false
			);
			dragonfly.setRotateWing(rotation);
			dragonfly.drawDragonfly();
		};

		p5.draw = () => {
			p5.clear();
			x = p5.mouseX;
			y = p5.mouseY;

			rotate = p5.map(x, 0, p5.windowWidth, -Math.PI * 0.3, Math.PI * 0.3);

			dragonfly.setX(x);
			dragonfly.setY(y);
			dragonfly.setRotate(rotate);
			dragonfly.setRotateWing(rotation);
			dragonfly.drawDragonfly();
			rotation = Math.abs(p5.sin(p5.frameCount * 0.05) * 0.6);
		};

		p5.windowResized = () => {
			p5.clear();
			x = p5.mouseX;
			y = p5.mouseY;

			rotate = p5.map(x, 0, p5.windowWidth, -Math.PI * 0.3, Math.PI * 0.3);

			dragonfly.setX(x);
			dragonfly.setY(y);
			dragonfly.setRotate(rotate);
			dragonfly.setRotateWing(rotation);
			dragonfly.drawDragonfly();
			rotation = Math.abs(p5.sin(p5.frameCount * 0.05) * 0.6);
		};
	};
</script>

<div class="wrapper"><P5 {sketch} /></div>

<style lang="scss">
	.wrapper {
		width: 100%;
		height: 100%;
	}
</style>
