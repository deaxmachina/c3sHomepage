<div class="wrapper">
	<div class="full-name">Creative Coding Crafts Space</div>
	<div class="abbr">
		<h1 class="background">c<span class="num">3</span>s</h1>
		<h1 class="foreground">c<span class="num">3</span>s</h1>
	</div>
</div>

<style lang="scss">
	.wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		flex-direction: column;
	}
	.full-name {
		font-family: 'bitcount-grid-double-circle', sans-serif;
		font-weight: 400;
		font-style: normal;
		font-size: 1.5rem;
		color: #dae2cb;
		line-height: 1;
		text-transform: uppercase;
	}
	.abbr {
		position: relative;
		// border: 2px solid red;
		margin-top: -50px;
	}
	h1 {
		line-height: 1;
		font-size: 15rem;
		font-family: 'lores-9-plus-wide', sans-serif;
		font-weight: 400;
		font-style: normal;
		.num {
			font-size: 12.5rem;
		}
		&.foreground {
			color: #221d34;
		}
		&.background {
			position: absolute;
			top: -10px;
			color: #9c75db;
		}
	}
</style>
