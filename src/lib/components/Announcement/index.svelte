<script lang="ts">
	import Fa from 'svelte-fa';
	import {
		faEnvelope,
		faTicket,
		faArrowRight,
		faBullhorn
	} from '@fortawesome/free-solid-svg-icons';
</script>

<div class="wrapper">
	<a href="https://lu.ma/2bvp84e5" class="social-link" target="_blank">
		<p class="vertical-text">
			Next meetup is on 5th April
			<Fa icon={faArrowRight} scale={0.8} />
			<Fa icon={faTicket} scale={1} /> get your tickets here. Topic is "Quantum Canvas - Freeing the
			Qubit For Art"
		</p>
	</a>
</div>

<div class="loudspeaker">
	<Fa icon={faBullhorn} scale={1} />
</div>

<style lang="scss">
	.wrapper {
		position: absolute;
		left: 2rem;
		top: 1rem;
		padding: 0.2rem;
		backdrop-filter: blur(2px);
		border: 3px dotted var(--col-accent-3);
		border-radius: 12px;
		width: 270px;
		overflow: hidden;
		pointer-events: all;
		z-index: 100;

		@media (max-width: 450px) {
			width: 230px;
		}
	}

	.loudspeaker {
		position: absolute;
		left: 0.5rem;
		top: 1.5rem;
	}

	.vertical-text {
		font-family: var(--font-main);
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
