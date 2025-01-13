<script>
	import '$lib/style.scss';
	import ShaderSee from '$lib/components/ShaderSea/index.svelte';
	import Dragonflies from '$lib/components/Dragonflies/index.svelte';
	import BackgroundText from '$lib/components/BackgroundText/index.svelte';
	import Title from '$lib/components/Title/index.svelte';
</script>

<div class="wrapper-scenery">
	<div class="wrapper-gradient"></div>
	<div class="wrapper-dragonflies"><Dragonflies /></div>
	<div class="wrapper-background-text"><BackgroundText /></div>
	<div class="wrapper-shadersee"><ShaderSee /></div>
	<div class="wrapper-title"><Title /></div>
</div>

<style lang="scss">
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
		background: linear-gradient(#221d34 70%, #4a7d6f 80%, #6cb6a5 90%, #96c3a6 100%);
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
</style>
