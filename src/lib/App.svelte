<script>
	import '$lib/style.scss';
	import ShaderSee from '$lib/components/ShaderSea/index.svelte';
	import Dragonflies from '$lib/components/Dragonflies/index.svelte';
	import BackgroundText from '$lib/components/BackgroundText/index.svelte';
	import Title from '$lib/components/Title/index.svelte';
	import SectionLink from '$lib/components/SectionLink/index3.svelte';
	// import SectionLink from '$lib/components/SectionLink/index2.svelte';
	import Announcement from '$lib/components/Announcement/index.svelte';
	import Noise from '$lib/components/Noise/index.svelte';
	import Cursor from '$lib/components/Cursor/index.svelte';
	import Socials from './components/SectionLink/Socials.svelte';
</script>

<div class="wrapper-scenery">
	<div class="wrapper-gradient"></div>
	<div class="wrapper-dragonflies"><Dragonflies /></div>
	<!-- <div class="wrapper-background-text"><BackgroundText /></div> -->
	<div class="wrapper-shadersee"><ShaderSee /></div>
	<div class="wrapper-title"><Title /></div>

	<div class="wrapper-announcement">
		<Announcement>Our next meetup is on Jan 25. Get your tickets now! ♡♥♡</Announcement>
	</div>
	<div class="wrapper-section-links"><SectionLink /></div>
	<div class="copyright">©2025 Creative Coding Crafts Space ♡♥♡ cccspace@gmail.com</div>
	<div class="wrapper-socials"><Socials /></div>

	<div class="wrapper-on-top"><Noise /></div>
	<div class="wrapper-cursor"><Cursor />Cursor</div>
</div>

<style lang="scss">
	@import './styles/variables.scss';
	.wrapper-scenery {
		cursor: none;
		position: relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		// border-top: 40px solid #6cb6a5;
		// border-top: 40px solid #221d34;
		border: 15px solid #221d34;
		border-radius: 40px;
	}
	.wrapper-gradient {
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		// background: linear-gradient(
		// 	$col-bg 70%,
		// 	$col-accent-2-darker 80%,
		// 	$col-accent-2 90%,
		// 	$col-accent-1 100%
		// );
		background: linear-gradient($col-bg 70%, $col-accent-1 80%, $col-accent-2 100%);
	}

	.wrapper-on-top {
		position: absolute;
		top: 0;
		left: 0;
	}

	.wrapper-background-text {
		position: absolute;
		top: 0;
		left: 0;
		opacity: 0.15;
	}
	.wrapper-dragonflies {
		position: absolute;
		top: 0;
		left: 0;
	}
	.wrapper-shadersee {
		position: absolute;
		top: 0;
		left: 0;
	}
	.wrapper-title {
		pointer-events: none;
		position: absolute;
		left: 0;
		bottom: 10px;
		width: 100%;
	}
	.wrapper-announcement {
		position: absolute;
		top: 0;
		left: 0;
	}
	.wrapper-cursor {
		position: absolute;
		top: 0;
		right: 0;
	}

	.copyright {
		position: absolute;
		right: 7px;
		top: 12px;
		font-family: 'Funnel Sans', serif;
		font-weight: 300;
		color: #221d34;
		font-size: 0.8rem;
		writing-mode: vertical-rl;
	}

	.wrapper-socials {
		position: absolute;
		left: 60px;
		bottom: 12px;
	}
</style>
