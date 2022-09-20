/* eslint-env node, browser */
import '@CR/global.css'
import '@CR/fa/all.min.css'
// Mount app
import { createApp, onMounted } from 'vue'
import App from './src/index.vue'
import { router } from './router'
import { createPinia } from 'pinia'
import * as componentList from './common.js'
const Vue = createApp(App)
Vue.use(router)
	.use(createPinia())
Object
	.entries(componentList)
	.forEach(([name, el]) => Vue.component(name, el))
Vue.mount('#app')
