<script>
	import '$lib/style.scss';
	import ShaderSee from '$lib/components/ShaderSea/index.svelte';
	import Dragonflies from '$lib/components/Dragonflies/index.svelte';
	import BackgroundText from '$lib/components/BackgroundText/index.svelte';
</script>

<div class="wrapper-scenery">
	<div class="wrapper-gradient"></div>
	<div class="wrapper-dragonflies"><Dragonflies /></div>
	<div class="wrapper-background-text"><BackgroundText /></div>
	<div class="wrapper-shadersee"><ShaderSee /></div>
</div>

<style lang="scss">
	.wrapper-scenery {
		position: relative;
	}
	.wrapper-gradient {
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		// background: linear-gradient(rgba(2, 7, 10, 1) 80%, rgba(2, 7, 10, 0) 100%);
		background: linear-gradient(#221d34 80%, #4a7d6f 90%, #6cb6a5 100%);
	}
	.wrapper-background-text {
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 50vh;
		opacity: 0.2;
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
		width: 100vw;
		height: 100vh;
	}
</style>
