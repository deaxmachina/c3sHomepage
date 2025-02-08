<script lang="ts">
	import { processContent } from '$lib/utils/sanity';

	// This data comes from what we return in the load function in +page.ts
	const { data } = $props();
	let { event } = data;
	$inspect(event);
</script>

<!-- Just for the event content -->
{#each event.content as content}
	{@const processedContent = processContent(content)}
	{#if processedContent}
		{#if processedContent.type === 'text'}
			<p>{processedContent.textToRender}</p>
		{:else if processedContent.type === 'image'}
			<img src={processedContent.url} alt={processedContent.alt} />
		{:else if processedContent.type === 'html'}
			{@html processedContent.htmlToRender}
		{/if}
	{/if}
{/each}
