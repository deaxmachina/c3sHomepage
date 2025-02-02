<!-- // Source: https://codepen.io/t_afif/pen/PoEebrz -->

<script>
	import { stores } from '$lib/stores/stores.svelte';

	let { colours } = stores;

	const lightMode = () => {
		colours.colBg = '#eaeace';
		colours.colDark = '#eaeace';
		colours.colStrokeWingsDragonfly = '#221d34';
		colours.colTextAndAccent = '#221d34';
		colours.colTextTitleMain = '#221d34';
		colours.colTextSubtitleMain = '#221d34';
		colours.colTextTitleAccent = '#6cb6a5';

		stores.colourMode = 'light';
	};

	const darkMode = () => {
		colours.colBg = '#221d34';
		colours.colDark = '#221d34';
		colours.colStrokeWingsDragonfly = '#eaeace';
		colours.colTextAndAccent = '#eaeace';
		colours.colTextTitleMain = '#eaeace';
		colours.colTextSubtitleMain = '#eaeace';
		colours.colTextTitleAccent = '#97d97c'; //'#fa008a'; // '#221d34'; // #6cb6a5 // #7fd69e // #97d97c

		stores.colourMode = 'dark';
	};

	$effect(() => {
		if (stores.isDarkMode) {
			setTimeout(() => {
				darkMode();
			}, 400);
		} else {
			setTimeout(() => {
				lightMode();
			}, 400);
		}
	});
</script>

<input type="checkbox" bind:checked={stores.isDarkMode} />

<!-- <input type="checkbox" checked style="--s:70px" /> -->

<style lang="scss">
	input {
		--s: 26px; /* adjust this to control the size*/

		height: calc(var(--s) + var(--s) / 5);
		width: auto; /* some browsers need this */
		aspect-ratio: 2.25;
		border-radius: var(--s);
		margin: calc(var(--s) / 2);
		display: grid;
		cursor: pointer;
		background-color: #97d97c;
		box-sizing: content-box;
		overflow: hidden;
		transition: 0.3s 0.1s;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
	}
	input:before {
		content: '';
		padding: calc(var(--s) / 10);
		--_g: radial-gradient(
			circle closest-side at calc(100% - var(--s) / 2) 50%,
			#221d34 96%,
			#221d3400
		);
		background:
			var(--_g) 0 / var(--_p, var(--s)) 100% no-repeat content-box,
			var(--_g) var(--_p, 0) / var(--s) 100% no-repeat content-box,
			#eaeace;
		mix-blend-mode: darken;
		filter: blur(calc(var(--s) / 12)) contrast(11);
		transition:
			0.4s,
			background-position 0.4s 0.1s,
			padding cubic-bezier(0, calc(var(--_i, -1) * 200), 1, calc(var(--_i, -1) * 200)) 0.25s 0.1s;
	}
	input:checked {
		background-color: #fa008a;
	}
	input:checked:before {
		padding: calc(var(--s) / 10 + 0.05px) calc(var(--s) / 10);
		--_p: 100%;
		--_i: 1;
	}
</style>
