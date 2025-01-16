<script lang="ts">
	let { children } = $props();
</script>

<div class="wrapper">
	<p class="vertical-text">{@render children()}</p>
</div>

<style lang="scss">
	.wrapper {
		width: 35px;
		padding: 0.5rem;
		height: 100vh;
		background-color: #6cb6a586;
		transform: rotate(180deg);
	}
	.vertical-text {
		font-family: 'Della Respira', serif;
		color: #dae2cb;
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
