<script lang="ts">
	import { imgUrlBuilder, processContent } from '$lib/utils/sanity';
	import Resource from '$lib/components/Resource/index.svelte';

	// This data comes from what we return in the load function in +page.ts
	const { data } = $props();
	let { eventResources } = data;
	$inspect(eventResources);
</script>

<div class="wrapper-resources">
	<div class="wrapper">
		{#each eventResources as eventResource}
			<Resource {imgUrlBuilder} {processContent} {eventResource}></Resource>
		{/each}
	</div>
</div>

<style lang="scss">
	.wrapper-resources {
		background-color: var(--col-bg);
		color: var(--col-text-and-accent);
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
	.wrapper {
		position: relative;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		padding: 50px;
		max-width: 1600px;
		@media (max-width: 600px) {
			padding: 50px 0;
		}
	}
	.noise {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}
</style>
