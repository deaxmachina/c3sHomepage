<script lang="ts">
	let { children } = $props();
</script>

<div class="wrapper">
	<p class="vertical-text">{@render children()}</p>
</div>

<style lang="scss">
	@import '../../styles/variables.scss';

	.wrapper {
		position: absolute;
		left: 0;
		top: 0;
		width: 35px;
		padding: 0.5rem;
		height: 100%;
		background-color: #fa0089ca;
		backdrop-filter: blur(2px);
		transform: rotate(180deg);

		@media (max-width: 900px) {
			left: 0;
			top: 0;
			width: 100%;
			height: 35px;
			transform: rotate(0deg);
		}
	}
	.vertical-text {
		font-family: 'Della Respira', serif;
		font-family: 'Funnel Sans', serif;
		font-weight: 500;
		color: $col-bg;
		width: 100%;
		height: 100%;
		writing-mode: vertical-rl;
		animation: moveUp 15s linear infinite;

		@media (max-width: 900px) {
			writing-mode: horizontal-tb;
			animation: moveSide 15s linear infinite;
		}
	}

	@keyframes moveUp {
		0% {
			transform: translateY(100%); /* Start below the screen */
		}
		100% {
			transform: translateY(-100%); /* Move above the screen */
		}
	}

	@keyframes moveSide {
		0% {
			transform: translateX(100%);
		}
		100% {
			transform: translateX(-100%);
		}
	}
</style>
