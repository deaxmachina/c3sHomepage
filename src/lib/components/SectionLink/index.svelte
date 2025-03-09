<script lang="ts">
	import gsap from 'gsap';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	const options = [
		{ href: '/', id: 'home', displayName: 'Home' },
		{ href: '/about', id: 'about', displayName: 'About' },
		{ href: '/resources', id: 'resources', displayName: 'Resources' },
		{
			href: 'https://www.eventbrite.co.uk/o/creativecodingcrafts-space-90303892113',
			id: 'events',
			displayName: 'Events'
		},
		{ href: 'https://creativecodingbook.club/', id: 'bookclub', displayName: 'Bookclub' }
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
		gsap.timeline().to('.page', {
			opacity: 0,
			duration: 1,
			onComplete: () => {
				goto(href); // Navigate after animation
			}
		});
		// .fromTo(
		// 	'.about',
		// 	{ opacity: 0 },
		// 	{
		// 		opacity: 1,
		// 		duration: 1,
		// 		onComplete: () => {
		// 			console.log('completed animation');
		// 		}
		// 	}
		// );
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
				{#if !['bookclub', 'events'].includes(option.id)}
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
				{:else}
					<a
						class:selected={selectedOption === option.id}
						class:active={activeOption === option.id}
						href={option.href}
						class="hide-mobile"
						target="_blank"
						rel="noopener noreferrer"
					>
						{option.displayName}
					</a>
				{/if}
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.wrapper-section-link {
	}

	.sections {
		display: flex;
		flex-direction: row;
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
		font-weight: 400;
		// letter-spacing: 1.5px;
		border-radius: 8px;
		padding: 0.1rem 0.4rem;

		// background: linear-gradient(to left, #97d97c 50%, transparent 50%);
		background-size: 200% 100%;
		background-position: 0 0;
		transition: background-position 0.4s ease;
		&.active {
			// color: var(--col-dark);
			font-weight: 800;
			// background: #97d97c;
		}
		&.selected {
			// color: var(--col-dark);
			font-weight: 800;
			background-position: 100% 0;
		}
		&.hide-mobile {
			@media (max-width: 500px) {
				display: none;
			}
		}
	}
</style>
