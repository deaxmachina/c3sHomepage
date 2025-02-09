<script lang="ts">
	import { imgUrlBuilder, processContent } from '$lib/utils/sanity';

	// This data comes from what we return in the load function in +page.ts
	const { data } = $props();
	let { eventResources } = data;
	$inspect(eventResources);
</script>

<h1>Resources</h1>

<div class="wrapper">
	{#each eventResources as eventResource}
		<div class="wrapper-resource">
			<img src={imgUrlBuilder.image(eventResource.resourceImage).url()} alt="" />
			<h3>{eventResource.resourceName}</h3>
			<div>Slug: {eventResource.slug.current}</div>
			<div>Date created: {eventResource._createdAt}</div>
			<div>
				Tools:
				{#each eventResource.toolsUsed as tool}
					<span>{tool}, </span>
				{/each}
			</div>
			<div>
				Type:
				{#each eventResource.resourceType as resourceType}
					<span>{resourceType}, </span>
				{/each}
			</div>
			<div>
				Authors:
				{#each eventResource.authors as author}
					<span>{author}, </span>
				{/each}
			</div>
			<div>
				Platform:
				{#each eventResource.platform as platform}
					<span>{platform}, </span>
				{/each}
			</div>
			<div>
				<em>Event description</em>
				{#each eventResource.eventDescription as content}
					{@const processedContent = processContent(content)}
					{#if processedContent}
						{#if processedContent.type === 'text'}
							<p>{processedContent.textToRender}</p>
						{:else if processedContent.type === 'html'}
							{@html processedContent.htmlToRender}
						{/if}
					{/if}
				{/each}
			</div>
			<div>
				Metadata about the event this resource came from
				<a href={eventResource.metadataForEvent.eventLink} target="_blank">
					{eventResource.metadataForEvent.eventName}
					<span>#{eventResource.metadataForEvent.eventNumber}</span>
				</a>
				<div>{eventResource.metadataForEvent.eventDate}</div>
			</div>
		</div>
	{/each}
</div>

<style lang="scss">
	.wrapper {
		display: flex;
		flex-wrap: wrap;
		padding: 20px;
	}
	.wrapper-resource {
		border: 2px solid rgb(220, 220, 220);
		width: 500px;
		border-radius: 10px;
		padding: 20px;
	}

	img {
		width: 100%;
		max-width: 300px;
		height: 300px;
		object-fit: cover;
		object-position: center;
	}
</style>
