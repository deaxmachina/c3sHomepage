<script>
	import { processSanityTextConent } from '$lib/utils/sanity.js';
	// This data comes from what we return in the load function in +page.ts
	const { data } = $props();
	let { events } = data;
	$inspect(events);

	function isHtmlBlock(block) {
		return block._type === 'htmlBlock';
	}
</script>

<h1>Events</h1>

{#each events as event}
	{#each event.content as block}
		{#if isHtmlBlock(block)}
			{@html block.html} <!-- Safely render raw HTML -->
		{:else}
			<!-- Render regular Portable Text -->
			<p>{block.children[0]?.text}</p>
		{/if}
	{/each}
{/each}

<style lang="scss">
	:global(.test-more) {
		background-color: red;
	}
</style>
