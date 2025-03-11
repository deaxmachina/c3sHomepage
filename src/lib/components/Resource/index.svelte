<script>
	let { imgUrlBuilder, processContent, eventResource } = $props();

	// console.log('eventResource', eventResource);

	function formatDate(dateString) {
		const months = [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec'
		];
		const [year, month] = dateString.split('-');
		return `${months[parseInt(month, 10) - 1]} ${year}`;
	}
</script>

<div class="wrapper-resource">
	<!-- Date  -->
	<div class="wrapper-date">{formatDate(eventResource.metadataForEvent.eventDate)}</div>

	<!-- Main image  -->
	<a href={eventResource.linkToResource} target="_blank" class="main-link">
		<div class="wrapper-img">
			<div class="platform">{eventResource.platform.join(', ')}</div>
			<div class="event-num">
				<span class="circle"></span>
				<span class="num">
					event #{eventResource.metadataForEvent.eventNumber}
				</span>
			</div>
			<img src={imgUrlBuilder.image(eventResource.resourceImage).url()} alt="" />
		</div>
	</a>

	<!-- Byline -->
	<div class="wrapper-byline">by {eventResource.authors.join(', ')}</div>

	<!-- Title -->
	<h3 class="title">{eventResource.resourceName}</h3>

	<!-- <div>Slug: {eventResource.slug.current}</div> -->
	<div class="wrapper-tools">
		{#each eventResource.toolsUsed as tool}
			<span>{tool}</span>
		{/each}
	</div>

	<div class="wrapper-event-description">
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
		<!-- Metadata about the event this resource came from
		<a href={eventResource.metadataForEvent.eventLink} target="_blank">
			{eventResource.metadataForEvent.eventName}
			<span>#{eventResource.metadataForEvent.eventNumber}</span>
		</a> -->
	</div>
</div>

<style lang="scss">
	$padding: 50px;
	$padding-sm: 20px;
	$base-width: 300px;
	$base-width-sm: 280px;
	$border-radius: 10px;
	$font-sm: 0.8rem;
	$spacing: 14px;

	* {
		font-family: var(--font-main);
		box-sizing: border-box;
	}

	.wrapper-resource {
		position: relative;
		width: calc($base-width + 2 * $padding);
		padding: $padding;
		padding-top: calc($padding * 0.5);
		@media (max-width: 600px) {
			width: calc($base-width-sm + 2 * $padding-sm);
			padding: $padding-sm;
		}
	}

	.wrapper-date {
		position: absolute;
		top: 0px;
		right: calc($padding + 10px);
		text-transform: uppercase;
		font-weight: 500;
		// color: var(--col-accent-3);
		@media (max-width: 600px) {
			top: 0px;
			right: calc($padding-sm + 10px);
		}
	}

	.wrapper-byline {
		position: absolute;
		top: 40px;
		right: calc($padding - 20px);
		writing-mode: vertical-rl;
		text-orientation: mixed;
		font-style: italic;
		font-weight: 100;
		font-size: $font-sm;
		opacity: 0.8;
		@media (max-width: 600px) {
			right: calc($padding-sm - 20px);
		}
	}

	.title {
		font-size: 1.3rem;
		margin-bottom: $spacing;
		line-height: 1.1;
		font-family: var(--font-fancy), sans-serif;
	}

	.main-link {
		color: var(--col-light);
		text-decoration: none;
		&:hover {
			img {
				// width: 100%;
				// height: 50%;
				transform: scale(1.2);
			}
		}
	}
	.wrapper-img {
		position: relative;
		border: 4px solid var(--col-see);
		background-color: var(--col-dark);

		border-radius: calc($border-radius * 1.8);
		max-width: $base-width;
		height: calc($base-width * 0.8);
		margin-bottom: $spacing;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		.platform {
			backdrop-filter: blur(4px);
			position: absolute;
			bottom: 16px;
			right: 18px;
			background-color: rgba(#7fd69e, 0.3);
			padding: 5px 10px;
			border-radius: $border-radius;
			font-size: $font-sm;
			font-weight: 400;
		}
		.event-num {
			display: flex;
			align-items: center;
			justify-content: center;
			backdrop-filter: blur(4px);
			border-radius: $border-radius;
			position: absolute;
			top: 14px;
			left: 16px;
			padding: 4px 8px;
			background-color: rgba(#221d34, 0.6);
			backdrop-filter: blur(4px);
			font-size: $font-sm;
			font-weight: 500;
			.circle {
				width: 12px;
				height: 12px;
				border-radius: 50%;
				margin-right: 4px;
				background: #221d34;
				display: inline-block;
			}
		}
		img {
			width: 90%;
			height: 90%;
			object-fit: cover;
			object-position: center;
			border-radius: $border-radius;
			transition: all 0.5s ease;
		}
	}

	.wrapper-tools {
		display: flex;
		margin-bottom: $spacing;
		span {
			display: inline-block;
			padding: 2px 7px;
			font-size: $font-sm;
			border: 2px solid var(--col-accent-1);
			color: var(--col-accent-1);
			border-radius: calc($border-radius * 0.8);
			margin-right: 10px;
		}
	}

	.wrapper-event-description {
		p {
			font-weight: 100;
		}
	}
</style>
