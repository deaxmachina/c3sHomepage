<script>
	import gsap from 'gsap';

	import { stores } from '$lib/stores/stores.svelte';
	import ShaderSee from '$lib/components/ShaderSea/index.svelte';

	$effect(() => {
		gsap.timeline().fromTo(
			'.page',
			{ opacity: 0 },
			{
				opacity: 1,
				duration: 1
			}
		);
	});
</script>

<div class="page wrapper-about {stores.colourMode}">
	<h3 class="title">
		About c3s
		<br />
		Creative Coding Crafts Space
	</h3>
	<div class="wrapper-text">
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
		justify-content: flex-start;
	}

	.fade-in {
		opacity: 0;
		&.mounted-more-than-once {
			opacity: 1;
		}
	}

	.title {
		font-size: 2.4rem;
		margin-bottom: 20px;
		line-height: 1;
		font-family: 'sudo', 'lores-9-plus-wide', sans-serif;
	}

	h3 {
		z-index: 999 !important;
		margin-top: 5rem;
	}
	.wrapper-text {
		width: 100%;
		max-width: 660px;
		height: 500px;
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
