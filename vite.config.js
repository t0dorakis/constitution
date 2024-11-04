import { defineConfig } from 'vite'
import eslintPlugin from '@nabla/vite-plugin-eslint'
import glsl from 'vite-plugin-glsl'
import { viteSingleFile } from 'vite-plugin-singlefile'

/** @type {import('vite').UserConfig} */
export default defineConfig({
    plugins: [eslintPlugin(), glsl(), viteSingleFile()],
    assetsInclude: ['**/*.md', '**/*.glb'],
})
