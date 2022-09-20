import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import { resolve, dirname } from 'path'
import vue from '@vitejs/plugin-vue'
import vitePluginMd2Vue from './plugins/vite-plugin-md2vue.js'
// https://vitejs.dev/config/
const entry = dirname(import.meta.url.replace(/^file:\/\//ig, ''))
console.log({ entry })
export default defineConfig({
	plugins: [vue(), VitePWA(), vitePluginMd2Vue('./src/docs/jd')],
	publicDir: 'common/public',
	resolve: {
		// eslint-disable-next-line spellcheck/spell-checker
		dedupe: ['vue'],
		alias: {
			'@': resolve(entry),
			'@C': resolve(entry, 'common'),
			'@CR': resolve(entry, 'common/res'),
			'@CL': resolve(entry, 'common/lib'),
			'@CS': resolve(entry, 'common/store'),
			'@CC': resolve(entry, 'common/components'),
		},
	},
	server: {
		host: true
	}
})
