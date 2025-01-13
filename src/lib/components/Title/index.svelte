<div class="wrapper">
	<div class="full-name">Creative Coding Crafts Space</div>
	<div class="abbr">
		<h1 class="background">c<span class="num">3</span>s</h1>
		<h1 class="foreground">c<span class="num">3</span>s</h1>
	</div>
</div>

<style lang="scss">
	$base-font-size-title: min(max(250px, 25vw), 400px);
	$height-adjusted-font-size-title: min(max(250px, 20vw), 370px);

	.wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		flex-direction: column;
		// border: 1px solid red;
	}
	.full-name {
		font-family: 'bitcount-grid-double-circle', sans-serif;
		font-weight: 400;
		font-style: normal;
		font-size: calc($base-font-size-title * 0.07);
		color: #dae2cb;
		line-height: 1;
		text-transform: uppercase;
	}
	.abbr {
		position: relative;
		margin-top: -20px;
	}
	h1 {
		line-height: 0.7;
		font-size: $base-font-size-title;
		font-family: 'sudo', 'lores-9-plus-wide', sans-serif;
		font-weight: 400;
		font-style: normal;
		.num {
			font-size: calc($base-font-size-title * 0.72);
		}
		&.foreground {
			position: absolute;
			top: -10px;
			color: #dae2cb; // #9c75db; // #221d34; // #dae2cb; // #54448e;
		}
		&.background {
			color: #6cb6a5;
		}
	}

	@media (max-height: 800px) {
		h1 {
			font-size: $height-adjusted-font-size-title;
			.num {
				font-size: calc($height-adjusted-font-size-title * 0.72);
			}
		}
	}
</style>
