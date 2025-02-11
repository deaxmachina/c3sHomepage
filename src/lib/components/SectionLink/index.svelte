<script lang="ts">
	import gsap from 'gsap';
	import { goto } from '$app/navigation';

	const options = [
		{ href: '/', id: 'home', displayName: 'Home' },
		{ href: '/about', id: 'about', displayName: 'About' },
		{ href: '/events', id: 'events', displayName: 'Events' },
		{ href: '/resources', id: 'resources', displayName: 'Resources' }
	];

	let selectedOption = $state('home');
	let activeOption = $state('home');

	// GSAP
	// TODO: This animation shold only happen when navigating between different routes
	// atm it happen even if you click on the same route again
	function handleNavigation(event, href) {
		event.preventDefault(); // Stop immediate navigation
		// This is a hacky way to animate the current route out and only then
		// navigate to the route we intend to go to; and then animate that new route in
		// Here .layout-wrapper is the wrapper around the whole page in +layout.svelte
		gsap
			.timeline()
			.to('.layout-wrapper', {
				opacity: 0,
				filter: 'invert(1)',
				// filter: 'invert(1)blur(4px)',
				// filter: 'invert(1)blur(4px)',filter: 'invert(1) grayscale(1) contrast(2)', // Full negative effect
				duration: 0.5,
				onComplete: () => {
					goto(href); // Navigate after animation
				}
			})
			.to('.layout-wrapper', {
				opacity: 1,
				filter: 'invert(0)',
				// filter: 'invert(0)blur(0px)',
				// filter: 'invert(0) grayscale(0) contrast(1)', // Reset to normal
				duration: 0.5
			});
	}
</script>

<div class="wrapper-section-link">
	<div class="sections">
		{#each options as option}
			<!-- svelte-ignore a11y_mouse_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="selection"
				class:selected={selectedOption === option.id}
				class:active={activeOption === option.id}
				onmouseover={() => (selectedOption = option.id)}
				onmouseout={() => (selectedOption = null)}
			>
				<a href={option.href} onclick={(event) => handleNavigation(event, option.href)}>
					{option.displayName}
				</a>
				<div
					class="triangle"
					class:active={activeOption === option.id}
					class:selected={selectedOption === option.id}
				></div>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.wrapper-section-link {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		flex-direction: column;
		// z-index: 100;
		background-color: none;

		@media (max-width: 900px) {
			right: 12px;
		}
	}
	.sections {
		display: flex;
		flex-direction: column;
	}

	.selection {
		display: inline;
		position: relative;
		margin-bottom: 10px;
		width: 100%;
		text-align: right;
	}

	a {
		display: inline-block;
		color: white;
		font-family: 'Funnel Sans', serif;
		text-transform: uppercase;
		text-decoration: none;
		text-align: right;
		color: var(--col-text-and-accent);
		font-size: max(0.6770833333vw, 12px);
		line-height: 0;
		font-weight: 500;
		margin-right: 20px;
		letter-spacing: 1.5px;
		&.selected {
			color: var(--col-dark);
		}
		&.active {
			font-weight: 800;
		}
	}

	$dim-marker: 16px;
	.triangle {
		position: absolute;
		right: 0;
		z-index: -1;
		//left: calc($dim-marker - $dim-marker * 2 - 6px);
		top: 2px;
		// top: calc($dim-marker * 0.5 * -1);
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
			width: 120%;
			// width: calc($dim-marker * 2 + 6px);
		}
	}
</style>
