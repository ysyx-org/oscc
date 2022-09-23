import { createRouter, createWebHistory } from 'vue-router'
// Compose the router
/**
 * @type {import('vue-router').RouteRecordRaw[]}
 */
export const routes = [
	{
		path: '/',
		component: () => import('./src/home.vue'),
		meta: { title: 'OSCC - 开源芯片社区' },
	}, {
		path: '/redirect:pathMatch(.*)',
		// Meta: { title: 'Redirect' },
		component: () => import('@CC/Redirect.vue')
	}, {
		path: '/:code',
		meta: {
			title: to => `${/^\d+$/g.test(to.params.code) && to.params.code || '404'} | 一生一芯计划`
		},
		component: () => import('@CC/StatusCode.vue')
	}, {
		path: '/jd/:name',
		name: 'jd',
		component: () => import('./src/jd.vue')
	}, {
		path: '/jd/search',
		component: () => import('./src/jd search.vue')
	}
]

export const router = createRouter({
	history: createWebHistory(),
	routes,
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		} else {
			return { top: 0 }
		}
	},
})

router.afterEach(to => {
	const title = to?.meta?.title
	if (typeof title === 'string') document.title = title
	else if (typeof title === 'function') document.title = title(to)
})
