<script lang="ts">
	let { children } = $props();
</script>

<div class="wrapper">
	<p class="vertical-text">{@render children()}</p>
</div>

<style lang="scss">
	@import '../../styles/variables.scss';

	.wrapper {
		width: 35px;
		padding: 0.5rem;
		height: 100vh;
		background-color: #fa0089b3;
		transform: rotate(180deg);
		backdrop-filter: blur(2px);
		// border-left: 1px solid #221d34;
	}
	.vertical-text {
		font-family: 'Della Respira', serif;
		font-family: 'Funnel Sans', serif;
		font-weight: 500;

		color: $col-bg;
		width: 100%;
		height: 100%;
		writing-mode: vertical-rl;
		animation: moveUp 15s linear infinite; /* Animation duration and repetition */
	}

	@keyframes moveUp {
		0% {
			transform: translateY(100%); /* Start below the screen */
		}
		100% {
			transform: translateY(-100%); /* Move above the screen */
		}
	}
</style>
