<script lang="ts">
	import Fa from 'svelte-fa';
	import { faEnvelope, faTicket, faArrowRight } from '@fortawesome/free-solid-svg-icons';
</script>

<div class="wrapper">
	<a href="https://x.com/CCCraftsSpace" class="social-link" target="_blank">
		<p class="vertical-text">
			Next meetup is on Jan 25!
			<Fa icon={faArrowRight} scale={0.8} />
			<Fa icon={faTicket} scale={1} />
		</p>
	</a>
</div>

<style lang="scss">
	.wrapper {
		position: absolute;
		left: 1rem;
		top: 1rem;
		padding: 0.2rem;
		backdrop-filter: blur(2px);
		border: 3px dotted var(--col-accent-3);
		border-radius: 12px;
		width: 270px;
		overflow: hidden;
		pointer-events: all;
		z-index: 100;
	}

	.vertical-text {
		font-family: 'Funnel Sans', serif;
		font-weight: 500;
		padding: 0 5px 0 8px;
		width: 100%;
		display: inline-block;
		white-space: nowrap;
		animation: scrollText 15s linear infinite;
	}

	@keyframes scrollText {
		0% {
			transform: translateX(100%);
		}
		50% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(-100%);
		}
	}

	a,
	p,
	div {
		text-decoration: none;
		color: var(--col-accent-3);
	}
</style>
