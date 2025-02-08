<script>
	// This data comes from what we return in the load function in +page.ts
	const { data } = $props();
	let { eventResources } = data;
	$inspect(eventResources);
</script>

<h1>Resources</h1>

<div>
	{#each eventResources as eventResource}
		<div>{eventResource.resourceName}</div>
		<div>{eventResource.resourceDescription}</div>
	{/each}
</div>
