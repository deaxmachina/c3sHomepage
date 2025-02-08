<script lang="ts">
	import { stores } from '$lib/stores/stores.svelte';
	import Toggle from './Toggle.svelte';
</script>

<div class="wrapper">
	<Toggle />
</div>

<style lang="scss">
	.wrapper {
		position: absolute;
		right: 15px;
		top: 10px;

		button {
			border: none;
			padding: 0.3rem 1rem;
			background: var(--col-accent-3);
		}
	}
</style>
