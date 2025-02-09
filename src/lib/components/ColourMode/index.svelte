<script lang="ts">
	import { stores } from '$lib/stores/stores.svelte';
	import Toggle from './Toggle.svelte';
</script>

<div class="wrapper">
	<Toggle />
</div>

<style lang="scss">
	.wrapper {
		// position: absolute;
		// right: 15px;
		// top: 10px;
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		flex-direction: column;

		@media (max-width: 900px) {
			right: 0px;
		}

		button {
			border: none;
			padding: 0.3rem 1rem;
			background: var(--col-accent-3);
		}
	}
</style>
