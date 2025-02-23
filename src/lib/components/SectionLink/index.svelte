<script lang="ts">
	import gsap from 'gsap';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	const options = [
		{ href: '/', id: 'home', displayName: 'Home' },
		{ href: '/about', id: 'about', displayName: 'About' },
		{ href: '/events', id: 'events', displayName: 'Events' },
		{ href: '/resources', id: 'resources', displayName: 'Resources' }
	];

	let selectedOption = $state('home');
	let activeOption = $state('home');

	// GSAP animation to navigate manually to new route
	function handleNavigation(event, href) {
		event.preventDefault(); // Stop immediate navigation
		if (page.url.pathname === href) return; // Don't do anything if current route is selected again
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
				<a
					class:selected={selectedOption === option.id}
					class:active={activeOption === option.id}
					href={option.href}
					onclick={(event) => {
						activeOption = option.id;
						handleNavigation(event, option.href);
					}}
				>
					{option.displayName}
				</a>
			</div>
		{/each}
	</div>
</div>

<!-- #97d97c -->

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
		display: inline-block;
		position: relative;
		margin-bottom: 5px;
		width: 100%;
		text-align: right;
	}

	a {
		color: white;
		font-family: 'Funnel Sans', serif;
		text-transform: uppercase;
		text-decoration: none;
		text-align: right;
		color: var(--col-text-and-accent);
		font-size: max(0.6770833333vw, 12px);
		line-height: 0;
		font-weight: 500;
		// letter-spacing: 1.5px;
		border-radius: 8px;
		padding: 0.1rem 0.4rem;

		background: linear-gradient(to left, #97d97c 50%, transparent 50%);
		background-size: 200% 100%;
		background-position: 0 0;
		transition: background-position 0.4s ease;
		&.active {
			color: var(--col-dark);
			font-weight: 800;
			background: #97d97c;
		}
		&.selected {
			color: var(--col-dark);
			background-position: 100% 0;
		}
	}
</style>
