<script lang="ts">
	import { imgUrlBuilder, processContent } from '$lib/utils/sanity';

	// This data comes from what we return in the load function in +page.ts
	const { data } = $props();
	let { events } = data;
	$inspect(events);
</script>

<div class="wrapper">
	{#each events as event}
		<a href="/events/{event.slug}">
			<h1>{event.eventName}</h1>
		</a>
		<h3>Tech stack:</h3>
		{#each event.tech as tech}
			<span>{tech}</span>,
		{/each}
		<h3>Date: {event.eventDate}</h3>
		<img style:width="300px" src={imgUrlBuilder.image(event.image).url()} alt="" />

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
	{/each}
</div>

<style lang="scss">
	.wrapper {
		z-index: 100;
	}
	:global(.test-more) {
		background-color: red;
	}
</style>
