<script lang="ts">
	import { stores } from '$lib/stores/stores.svelte';
	import Toggle from './Toggle.svelte';

	let { colours } = stores;
</script>

<div class="wrapper">
	<!-- <button onclick={lightMode}>light</button> -->
	<!-- <button onclick={darkMode}>dark</button> -->
	<Toggle />
</div>

<style lang="scss">
	.wrapper {
		position: absolute;
		right: 40px;
		top: 10px;

		button {
			border: none;
			padding: 0.3rem 1rem;
			background: var(--col-accent-3);
		}
	}
</style>
