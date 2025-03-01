<script>
	import gsap from 'gsap';

	import App from '$lib/App.svelte';

	$effect(() => {
		gsap.timeline().fromTo(
			'.page',
			{ opacity: 0 },
			{
				opacity: 1,
				duration: 1
			}
		);
	});
</script>

<div class="page">
	<App />
</div>
