import { defineConfig } from 'vite'
import eslintPlugin from '@nabla/vite-plugin-eslint'
import glsl from 'vite-plugin-glsl'

/** @type {import('vite').UserConfig} */
export default defineConfig({
    plugins: [eslintPlugin(), glsl()],
    assetsInclude: ['**/*.md', '**/*.glb'],
})
