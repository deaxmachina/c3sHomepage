<!-- 
Credits
Animation for the background text is from https://codepen.io/wodniack/pen/gOEbREo 
-->

<script lang="ts">
	class Background {
		constructor() {
			this.container = document.querySelector('.js-background')!;

			this.init();
		}

		init() {
			this.resizeHandler();
			this.bindEvents();
		}

		bindEvents() {
			window.addEventListener('resize', this.resizeHandler.bind(this));
		}

		resizeHandler() {
			this.width = this.container.clientWidth;
			this.height = this.container.clientHeight;

			this.updateWords();
		}

		updateWords() {
			const el = this.container.querySelector('.js-word');

			const size = el.clientHeight;
			const total = Math.ceil(this.height / size) + 2;

			if (size > 0) {
				this.container.innerHTML = '';

				for (let i = 0; i < total; i++) {
					const word = el.cloneNode(true);

					word.style.setProperty('--i', `${i}`);
					word.style.setProperty('--position', String(Math.random()));
					word.style.setProperty('--duration', String(Math.random() * 2));

					this.container.appendChild(word);
				}
			}
		}
	}

	$effect(() => {
		const background = new Background();
	});
</script>

<div class="wrapper">
	<div class="background js-background">
		<div class="background__word js-word"></div>
	</div>
</div>

<style lang="scss">
	.wrapper {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		width: 100vw;
		height: 100vh;
	}

	.background {
		position: absolute;
		inset: 0;
		background-color: none;

		@keyframes background {
			0% {
				transform: translate3d(0, 0, 0);
			}
			100% {
				transform: translate3d(calc(var(--width) * var(--direction)), 0, 0);
			}
		}

		@keyframes noise-background {
			0% {
				transform: translate3d(0, 0, 0);
			}
			20% {
				transform: translate3d(50px, 30px, 0);
			}
			40% {
				transform: translate3d(10px, 50px, 0);
			}
			60% {
				transform: translate3d(30px, 20px, 0);
			}
			80% {
				transform: translate3d(50px, 0, 0);
			}
			100% {
				transform: translate3d(100px, 0, 0);
			}
		}

		&__word {
			--height: 5vh;
			// --height: min(11vh, 160px);
			--width: calc(var(--height) * 18.3173);
			--direction: 1;

			position: relative;

			aspect-ratio: 2802 / 153;
			display: block;
			width: auto;
			height: var(--height);

			&:nth-child(2n + 1) {
				--direction: -1;
			}

			&:before {
				position: absolute;
				top: 0;
				left: calc(var(--position) * var(--width) * -1 - var(--width));

				display: block;
				width: calc(var(--width) * 4);
				height: 100%;

				background: url('images/c3s-9.png') 0 50% / contain;

				animation: background calc(60s + var(--duration) * 60s) linear infinite;

				content: '';
			}
		}
	}
</style>
