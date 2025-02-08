<script lang="ts">
	import Fa from 'svelte-fa';
	import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
	import { faGithub, faDiscord, faBluesky, faXTwitter } from '@fortawesome/free-brands-svg-icons';

	const scale = 1.3;
</script>

<div class="wrapper">
	<a href="https://discord.gg/HGH7uEpy99" class="social-link" target="_blank">
		<Fa icon={faDiscord} {scale} />
	</a>

	<a href="" class="social-link" target="_blank">
		<Fa icon={faBluesky} {scale} />
	</a>

	<a href="" class="social-link" target="_blank">
		<Fa icon={faXTwitter} {scale} />
	</a>

	<a href="mailto:cccspace@gmail.com" class="social-link" target="_blank">
		<Fa icon={faEnvelope} {scale} />
	</a>
</div>

<style lang="scss">
	.wrapper {
		position: absolute;
		background: none;
		z-index: 100;
		left: 50px;
		bottom: 12px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: 'Funnel Sans', serif;
		@media (max-width: 900px) {
			left: 8px;
			bottom: 10px;
		}
	}
	a.social-link {
		color: var(--col-dark);
		margin: 0 5px;
		width: 30px;
		height: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.3s ease;
		&:hover {
			color: var(--col-accent-3);
		}
		@media (max-width: 900px) {
			margin: 0 2px;
		}
	}
</style>
