<script>
	import Instructions from '$lib/components/ScrollInstructions/Instructions.svelte';
	import { stores } from '$lib/stores/stores.svelte';
</script>

<div
	class="wrapper-inner {stores.colourMode}"
	style="--accent-col: {stores.colourMode === 'light'
		? 'var(--col-accent-2)'
		: 'var(--col-accent-1)'}"
>
	<h3 class="title">
		<span class="other">About</span>
		<span class="abbr">
			<span class="abbr-bottom">c3s</span>
			<span class="abbr-top">c3s</span>
		</span>

		<br />
		<span class="full-name">Creative Coding Crafts Space</span>
	</h3>

	<div class="wrapper-instructions">
		<Instructions col="var(--col-text-and-accent)" />
	</div>
	<div class="wrapper-text">
		<p>
			We are a London-based and online community dedicated to making space for creativity - physical
			space, head space, collaboration space. A playground for exploring the tools, ideas, and
			experiments that live at the intersection of code and art. In concrete terms, we’re looking at
			browser-based sketches (p5.js, Three.js, d3.js, GSAP, etc.), using physical tools like pen
			plotters and circuits, and occasionally exploring the weird and wonderful edges of creative
			expression - like quantum computers’ involvement in music.
		</p>
		<p>
			We meet about once a month in London, in or around Hackney Wick - an area known for its large
			artistic community and a Creative Enterprise Zone . You can find out more about our past
			events
			<a target="_blank" rel="noopener noreferrer" href="https://lu.ma/c3s"> here </a>
			and all the resources we used in those
			<a href="/resources"> here </a>. c3s was started in 2024 by
			<a target="_blank" rel="noopener noreferrer" href="https://deabankova.com/"> Dea Bankova </a>
			and
			<a target="_blank" rel="noopener noreferrer" href="https://prasantakrdutta.com/">
				Prasanta Kumar Dutta
			</a>. We actively encourage community driven-initiatives, such as our spin-off Creative Coding
			Bookclub, and community participation in person or on our
			<a target="_blank" rel="noopener noreferrer" href="https://discord.gg/HGH7uEpy99">
				Discord server
			</a>.
		</p>
		<p>
			We believe that creativity as a shared experience is something much greater than a ‘nice to
			have’ in our lives and hope to contribute in whatever way we can to keeping that spark alive
			in our little corner of the world.
		</p>

		<div class="shadow-bottom"></div>
	</div>
</div>

<style lang="scss">
	* {
		font-family: var(--font-main);
		box-sizing: border-box;
		color: var(--col-text-and-accent);
	}

	.wrapper-inner {
		width: 100%;
		max-width: 540px;
		z-index: 999 !important;
		margin-top: 5rem;
		padding: 1.5rem;
		@media (max-width: 600px) {
			margin-top: 4rem;
		}

		.wrapper-instructions {
			position: absolute;
			left: 50%;
			transform: translate(calc(-50% - 350px), 0px);
		}

		.title {
			margin-bottom: 20px;
			.other {
				font-family: var(--font-fancy), sans-serif;
				font-size: 6rem;
				color: var(--accent-col);
				margin-right: 15px;
			}
			.abbr {
				position: relative;
				display: inline-block;
			}
			.abbr-bottom {
				font-family: var(--font-fancy), sans-serif;
				font-size: 7rem;
				color: var(--accent-col);
			}
			.abbr-top {
				font-family: var(--font-fancy), sans-serif;
				position: absolute;
				top: -4px;
				left: 0;
				font-size: 7rem;
				color: var(--col-text-and-accent);
			}
			.full-name {
				font-family: var(--font-dotted-main), sans-serif;
				font-weight: 500;
				font-size: 1.7rem;
				color: var(--accent-col);
			}

			@media (max-width: 600px) {
				.other {
					font-size: 4rem;
					margin-right: 15px;
				}
				.abbr-bottom {
					font-size: 5rem;
				}
				.abbr-top {
					top: -4px;
					font-size: 5rem;
				}
				.full-name {
					font-size: 1.5rem;
				}
			}
		}

		.wrapper-text {
			width: 100%;
			max-width: 500px;
			height: 370px;
			overflow-y: scroll;
			position: relative;

			-ms-overflow-style: none; /* Hides scrollbar in Internet Explorer and Edge */
			scrollbar-width: none; /* Hides scrollbar in Firefox */

			/* Hides scrollbar in WebKit-based browsers (Chrome, Safari, etc.) */
			&::-webkit-scrollbar {
				display: none;
			}

			p {
				color: var(--col-text-and-accent);
				margin-bottom: 20px;
				font-weight: 100;
				font-size: 1.2rem;
			}

			@media (max-width: 600px) {
				height: 330px;
			}
		}

		a {
			text-decoration: none;
			border-bottom: 2px dotted var(--accent-col);
			transition: all 0.5s ease;
			&:hover {
				border-bottom: 2px solid var(--accent-col);
			}
		}
	}

	.shadow-bottom {
		position: sticky;
		bottom: -20px;
		left: 0;
		width: 100%;
		height: 70px;
		background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, var(--col-bg) 70%);
		pointer-events: none;
		z-index: 1;

		@media (max-width: 900px) {
			display: none;
		}
	}
</style>
