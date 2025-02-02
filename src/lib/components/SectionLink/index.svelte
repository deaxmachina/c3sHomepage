<script lang="ts">
	const options = [
		{ href: '/', id: 'home', displayName: 'Home' },
		{ href: '/', id: 'about', displayName: 'About' },
		{ href: '/', id: 'events', displayName: 'Events' },
		{ href: '/', id: 'resources', displayName: 'Resources' }
	];

	let selectedOption = $state('home');
	let activeOption = $state('home');
</script>

<div class="wrapper-section-link">
	<div class="sections">
		{#each options as option}
			<!-- svelte-ignore a11y_mouse_events_have_key_events -->
			<div class="selection">
				<a
					href={option.href}
					class:selected={selectedOption === option.id}
					onmouseover={() => (selectedOption = option.id)}
					onmouseout={() => (selectedOption = null)}
				>
					{option.displayName}

					<div
						class="triangle"
						class:active={activeOption === option.id}
						class:selected={selectedOption === option.id}
					></div>
				</a>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.wrapper-section-link {
		// width: 100%;
		position: absolute;
		top: 60px;
		right: -130px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-direction: column;
		z-index: 100;
		background-color: none;
		padding: 0.7rem 1rem 0rem 1rem;
		// background-color: #4a7d6f9a; // #221d347a; // #4a7d6f7b;
		// backdrop-filter: blur(2px);
		border-radius: 0 0 14px 0;
		// border-radius: 20px 20px 0 0;
		transform: translateX(-50%);
		// border: 1px solid #221d34;
		border-top: none;
		width: 200px;
	}
	.sections {
		display: flex;
		flex-direction: column;
	}

	.selection {
		position: relative;
		margin-bottom: 5px;
		width: 100%;
	}

	a {
		display: inline-block;
		position: relative;
		color: white;
		font-family: 'Funnel Sans', serif;
		text-transform: uppercase;
		text-decoration: none;
		color: var(--col-text-and-accent);

		font-size: max(0.6770833333vw, 12px);
		line-height: 0;
		font-weight: 500;
		&.selected {
			font-weight: 800;
		}
	}

	$dim-marker: 14px;
	.triangle {
		position: absolute;
		z-index: -1;
		left: calc($dim-marker - $dim-marker * 2 - 6px);
		top: calc($dim-marker * 0.5 * -1);
		width: $dim-marker;
		height: $dim-marker;
		background: #96d97c39;
		border-radius: calc($dim-marker * 0.5);
		transition: all 0.5s ease;
		&.active {
			background: #97d97c;
		}
		&.selected {
			background: #97d97c;
			width: calc(100% + $dim-marker * 2 + 6px);
		}
	}
</style>
