<script lang="ts">
	import * as THREE from 'three';
	import fragmentShader from './shaders/fragmentShader.glsl';
	import vertexShader from './shaders/vertexShader.glsl';
	import { stores } from '$lib/stores/stores.svelte';

	let { colours } = stores;

	let canvas: HTMLCanvasElement;
	let colHills = $derived(colours.colSee); // $derived(colours.colBg); // TODO: add another var here
	const hillValue = 0;

	// Sizes
	const getHeight = (width: number) => {
		return width > 1000 ? width * 0.3 : width * 1;
	};
	let widthContainer = $state(0);
	let heightContainer = $state(0);
	let windowWidth = $state(0);
	let width = $derived(widthContainer);
	let height = $derived(heightContainer); // $derived(getHeight(width));
	let aspect = $derived(width / height);

	// Initialise
	let scene: THREE.Scene = undefined;

	let geometryPlane: THREE.PlaneGeometry = undefined;
	let materialPlane: THREE.ShaderMaterial = undefined;
	let meshPlane = undefined;

	let camera: THREE.PerspectiveCamera = undefined;
	let renderer: THREE.WebGLRenderer = undefined;
	let clock: THREE.Clock = undefined;

	interface Texture {
		linesCount: number;
		width: number;
		height: number;
		canvas: HTMLCanvasElement;
		context: CanvasRenderingContext2D;
		instance: THREE.CanvasTexture;
	}
	let texture: Partial<Texture> = {};

	$effect(() => {
		/************************************
		 ************** Texture **************
		 ************************************/
		texture.linesCount = 8;
		texture.width = 32;
		texture.height = 128;
		texture.canvas = document.createElement('canvas');
		texture.canvas.width = texture.width;
		texture.canvas.height = texture.height;

		texture.context = texture.canvas.getContext('2d')!;
		texture.instance = new THREE.CanvasTexture(texture.canvas);
		texture.instance.wrapS = THREE.RepeatWrapping;
		texture.instance.wrapT = THREE.RepeatWrapping;

		texture.context.clearRect(0, 0, texture.width, texture.height);

		texture.context.globalAlpha = 1;
		texture.context.fillStyle = colHills;
		texture.context.fillRect(0, 0, texture.width, Math.round(texture.height * 0.1));
		const smallLinesCount = texture.linesCount - 1;
		for (let i = 0; i < smallLinesCount; i++) {
			texture.context.globalAlpha = 0.9;
			texture.context.fillRect(
				0,
				Math.round(texture.height / (smallLinesCount + 1)) * (i + 1),
				texture.width,
				Math.round(texture.height * 0.003 * i)
			);
		}

		// Scene
		scene = new THREE.Scene();

		/************************************
		 *********** Plane Object ************
		 ************************************/
		// Geometry
		geometryPlane = new THREE.PlaneGeometry(3, 4, 1000, 1000);

		// Material
		materialPlane = new THREE.ShaderMaterial({
			vertexShader: vertexShader,
			fragmentShader: fragmentShader,
			side: THREE.DoubleSide,
			transparent: true,
			blending: THREE.AdditiveBlending,
			uniforms: {
				uTime: { value: 0 },
				uTexture: { value: texture.instance },
				uElevation: { value: 1 },
				uHeightHill: { value: hillValue }
			}
		});

		// Mesh
		meshPlane = new THREE.Mesh(geometryPlane, materialPlane);
		meshPlane.scale.set(10, 10, 10);
		meshPlane.rotation.x = Math.PI * 0.44;
		meshPlane.rotation.z = Math.PI;

		meshPlane.position.y -= 2;
		scene.add(meshPlane);

		/************************************
		 ************** Camera ***************
		 ************************************/
		camera = new THREE.PerspectiveCamera(65, aspect, 0.1, 100);
		// camera.position.y = -0.2;
		camera.position.y = 0.2;
		camera.position.z = 2;
		scene.add(camera);

		/************************************
		 ************* Renderer **************
		 ************************************/
		renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
		renderer.setSize(width, height);
		// renderer.setClearColor(colBg);
		renderer.setClearColor(0x000000, 0); // Black with 0 alpha (fully transparent)

		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

		/************************************
		 ********** Functionality ************
		 ************************************/
		// Animate
		let id: number;
		clock = new THREE.Clock();

		const tick = () => {
			const elapsedTime = clock.getElapsedTime();

			// Update the material, e.g. the uniforms
			materialPlane.uniforms.uTime.value = elapsedTime;
			materialPlane.uniforms.uElevation.value = 1 - Math.sin(elapsedTime) * 0.3;

			// Render
			renderer.render(scene, camera);

			// Call tick function again on the next frame
			id = window.requestAnimationFrame(tick);
		};
		tick();

		return () => {
			window.cancelAnimationFrame(id); // Stop the animation
			scene = null;
			camera = null;
		};
	});

	// Update camera based on aspect i.e. width and height
	$effect(() => {
		if (camera && aspect) {
			camera.aspect = aspect;
			camera.updateProjectionMatrix();
		}
	});

	// Update the render based on size i.e. width and height
	$effect(() => {
		if (renderer && scene && camera && width && height) {
			renderer.setSize(width, height);
			renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
			renderer.render(scene, camera);
		}
	});
</script>

<svelte:window bind:innerWidth={windowWidth} />

<div
	class="wrapper"
	id="shader-colours-wrapper"
	bind:clientWidth={widthContainer}
	bind:clientHeight={heightContainer}
>
	<canvas bind:this={canvas}></canvas>
</div>

<style lang="scss">
	#shader-colours-wrapper {
		margin: auto;
		cursor: crosshair;
		width: 100%;
		height: 100%;
	}
	canvas {
		width: 100%;
		height: 100%;
	}
</style>
