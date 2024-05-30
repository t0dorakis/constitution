import { defineConfig } from 'vite'
import eslintPlugin from '@nabla/vite-plugin-eslint'

/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [eslintPlugin()],
})
