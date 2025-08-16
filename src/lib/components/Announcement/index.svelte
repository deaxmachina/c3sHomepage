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
	<a href="https://lu.ma/9kf45v58?tk=H8DEXV" class="social-link" target="_blank">
		<p class="text">
			Next meetup is on 30 Aug. Come learn about live coding / algoraves & Strudel and Hydra~ Click
			here for tickets.
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

	.text {
		font-family: var(--font-main);
		font-weight: 500;
		padding: 0 5px 0 8px;
		width: 280%;
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
