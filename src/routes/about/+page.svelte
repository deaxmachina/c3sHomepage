<script>
	import { stores } from '$lib/stores/stores.svelte';
	import ShaderSee from '$lib/components/ShaderSea/index.svelte';
</script>

<div class="wrapper-about {stores.colourMode}">
	<div
		class="wrapper-element gradient fade-in {stores.colourMode}"
		class:mounted-more-than-once={!stores.hasMountedFirstTime}
	></div>
	<div class="wrapper-element shadersee"><ShaderSee /></div>

	<div class="wrapper-text">
		<h3 class="title">
			About c3s
			<br />
			Creative Coding Crafts Space
		</h3>
		<p>
			We believe that creativity is more than a mere hobby; it is a catalyst for growth and a
			life-force. This community exists to make ‘space’ for that - physical space, head space,
			collaboration space. Space to get together and craft coding projects, generative artwork, new
			or ‘traditional’ forms of creative coding projects born out of the interactions and
			inspiration that ‘space’ allows for.

			<br /><br />
			We meet about once a month in London, in or around Hackney Wick - an area known for its large artistic
			community and a [Creative Enterprise Zone].You can find out more about our past events [here] and
			all the resources we used in those [here].

			<br /><br />c3s was started in 2024 by Dea Bankova and Prasanta Kumar Dutta. We actively
			encourage community driven-initiatives, such as our spin-off Creative Coding Bookclub, and
			community participation in person or on our [Discord server]
		</p>
	</div>
</div>

<style lang="scss">
	* {
		font-family: 'Titillium Web', serif;
		box-sizing: border-box;
		color: var(--col-text-and-accent);
	}
	.wrapper-about {
		width: 100%;
		min-height: 100svh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.fade-in {
		opacity: 0;
		&.mounted-more-than-once {
			opacity: 1;
		}
	}
	.gradient {
		background: linear-gradient(
			var(--col-bg) 68%,
			var(--col-accent-1) 80%,
			var(--col-accent-2) 92%
		);
		&.dark {
			background: linear-gradient(to bottom right, transparent 87%, var(--col-accent-1) 98%),
				linear-gradient(to bottom left, transparent 87%, var(--col-accent-1) 98%),
				linear-gradient(var(--col-bg) 70%, var(--col-accent-2) 90%);
			background: linear-gradient(var(--col-bg) 0%, var(--col-bg) 100%);
		}
	}
	.gradient,
	.shadersee {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}

	.title {
		font-size: 2.4rem;
		margin-bottom: 20px;
		line-height: 1;
		font-family: 'sudo', 'lores-9-plus-wide', sans-serif;
	}

	.wrapper-text {
		width: 100%;
		max-width: 600px;
		height: 600px;
		overflow-y: scroll;
		z-index: 999 !important;

		p {
			color: var(--col-text-and-accent);
			margin-bottom: 20px;
			font-weight: 100;
			font-size: 1.2rem;
		}
	}
</style>
