<script>
	import '$lib/style.scss';
	import ShaderSee from '$lib/components/ShaderSea/index.svelte';
	import Dragonflies from '$lib/components/Dragonflies/index.svelte';
</script>

<div class="wrapper-scenery">
	<div class="wrapper-gradient"></div>
	<div class="wrapper-dragonflies">
		<Dragonflies />
	</div>
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
		background: linear-gradient(rgba(2, 7, 10, 1) 80%, rgba(2, 7, 10, 0) 100%);
	}
	.wrapper-dragonflies {
		position: absolute;
		top: 0;
		left: 0;
	}
</style>
