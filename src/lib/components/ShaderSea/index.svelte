<script lang="ts">
	import * as THREE from 'three';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
	import fragmentShader from './shaders/fragmentShader.glsl';
	import vertexShader from './shaders/vertexShader.glsl';

	let canvas: HTMLCanvasElement;
	// Options -- these will be props
	const colBg = '#011627';
	const colHills = '#ebebeb';
	const hillValue = 0.15;

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
	let controls: THREE.OrbitControls = undefined;
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
		texture.linesCount = 10;
		texture.width = 32;
		texture.height = 128;
		texture.canvas = document.createElement('canvas');
		texture.canvas.width = texture.width;
		texture.canvas.height = texture.height;
		texture.canvas.style.position = 'fixed';
		texture.canvas.style.top = '0';
		texture.canvas.style.left = '0';
		texture.canvas.style.zIndex = '1';

		texture.context = texture.canvas.getContext('2d')!;
		texture.instance = new THREE.CanvasTexture(texture.canvas);
		texture.instance.wrapS = THREE.RepeatWrapping;
		texture.instance.wrapT = THREE.RepeatWrapping;

		texture.context.clearRect(0, 0, texture.width, texture.height);
		texture.context.globalAlpha = 1;
		texture.context.fillStyle = colHills;
		texture.context.fillRect(0, 0, texture.width, Math.round(texture.height * 0.08));
		const smallLinesCount = texture.linesCount - 1;
		for (let i = 0; i < smallLinesCount; i++) {
			texture.context.globalAlpha = 0.5;
			texture.context.fillRect(
				0,
				Math.round(texture.height / (smallLinesCount + 1)) * (i + 1),
				texture.width,
				Math.round(texture.height * 0.01)
			);
		}

		// Scene
		scene = new THREE.Scene();

		/************************************
		 *********** Plane Object ************
		 ************************************/
		// Geometry
		geometryPlane = new THREE.PlaneGeometry(3, 3, 1000, 1000);
		geometryPlane.rotateX(-Math.PI * 0.5);

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
				uHeightHill: { value: 0.4 }
			}
		});

		// Mesh
		meshPlane = new THREE.Mesh(geometryPlane, materialPlane);
		meshPlane.scale.set(10, 10, 10);
		meshPlane.rotation.z = Math.PI;
		meshPlane.rotation.x = Math.PI * 0.05;
		meshPlane.position.y -= 2;
		scene.add(meshPlane);

		/************************************
		 ************** Camera ***************
		 ************************************/
		camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 100);
		camera.position.y = -0.3;
		camera.position.z = 1.2;
		scene.add(camera);

		// Controls
		controls = new OrbitControls(camera, canvas);
		controls.enableDamping = true;

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
			materialPlane.uniforms.uElevation.value = 1 - Math.sin(elapsedTime) * 0.1;

			// Update the controls
			controls.update();

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
			controls = null;
			//empty(this.modelContainer);
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

	// Update the value of the hills (height)
	$effect(() => {
		if (materialPlane && texture) {
			materialPlane.uniforms.uHeightHill.value = hillValue;
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
		width: 100vw;
		height: 100vh;
		position: absolute;
		bottom: -10px;
		border: 2px solid red;
	}
	canvas {
		width: 100%;
		height: 100%;
		background-color: rgb(1, 7, 22);
	}
</style>
