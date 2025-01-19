<script>
	import '$lib/style.scss';
	import ShaderSee from '$lib/components/ShaderSea/index.svelte';
	import Dragonflies from '$lib/components/Dragonflies/index.svelte';
	import BackgroundText from '$lib/components/BackgroundText/index.svelte';
	import Title from '$lib/components/Title/index.svelte';
	// import SectionLink from '$lib/components/SectionLink/index3.svelte';
	import SectionLink from '$lib/components/SectionLink/index3.svelte';
	import Announcement from '$lib/components/Announcement/index.svelte';
	import Noise from '$lib/components/Noise/index.svelte';
</script>

<div class="wrapper-scenery">
	<div class="wrapper-gradient"></div>
	<div class="wrapper-dragonflies"><Dragonflies /></div>
	<!-- <div class="wrapper-background-text"><BackgroundText /></div> -->
	<div class="wrapper-shadersee"><ShaderSee /></div>
	<div class="wrapper-title"><Title /></div>
	<div class="wrapper-section-links">
		<!-- <SectionLink /> -->
		<!-- <SectionLink
			sectionLink="about"
			sectionTitle="A"
			randomOffset={1000}
			style="top: 200px; left: 150px; border-radius: 31% 49% 56% 52% / 62% 44% 47% 38%; width: 120px; height: 100px;"
		>
			This is the default slot
		</SectionLink>
		<SectionLink
			sectionLink="events"
			sectionTitle="E"
			randomOffset={10000}
			style="top: 270px; left: 180px; border-radius: 51% 49% 48% 42% / 62% 44% 56% 48%; width: 130px; height: 100px; "
		>
			This is the default slot
		</SectionLink>
		<SectionLink
			sectionLink="resources"
			sectionTitle="R"
			style="top: 330px; left: 130px; border-radius: 51% 49% 48% 52% / 62% 44% 56% 38%; width: 120px; height: 100px;"
		>
		</SectionLink> -->
	</div>
	<div class="wrapper-announcement">
		<Announcement>Our next meetup is on Jan 25. Get your tickets now!</Announcement>
	</div>
	<div class="wrapper-on-top"><Noise /></div>
</div>

<style lang="scss">
	@import './styles/variables.scss';
	.wrapper-scenery {
		position: relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
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
		right: 0;
	}
</style>
