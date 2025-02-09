import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';

export default defineConfig({
	plugins: [sveltekit(), glsl()],
	optimizeDeps: {
		// exclude: ['gsap'],
		// include: ['gsap'],
		include: ['gsap/umd/TextPlugin'] // Explicitly include the UMD version
	},
	build: {
		rollupOptions: {
			external: ['gsap']
		}
	}
});
