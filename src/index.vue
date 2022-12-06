<script setup>
import NavLink from "@CC/header/NavLink.vue";
import ColorSchemeSwitch from "@CC/header/ColorSchemeSwitch.vue";
import { router } from "../router";
// Loading animation params
import { ref } from "vue";
const loading = ref(false);
// Router loading animation
router.beforeEach((to, from, next) => {
	loading.value = true;
	next();
});
router.beforeResolve((to, from, next) => {
	loading.value = false;
	next();
});

</script>

<template>
	<v-header :loading="loading">
		<template #title>
			<svg alt="OSCC logo" class="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 432.18 200">
				<g>
					<path oscc-logo-brand
						d="M169.56,102.58l17.5-24.37C175,69.69,168,61.87,168,50c0-10.73,3.06-12.26,4.21-12.83C176.54,35,184.91,35,193,35c19.43,0,24,.63,24.84,10.1a5,5,0,0,0,5,4.57h20a5,5,0,0,0,5-5.35c-1.21-16.43-8.14-27.87-20.66-34.06C216.51,5,204,5,193,5s-23.54,0-34.21,5.33C145,17.23,138,30.58,138,50,138,75.35,153.11,90.85,169.56,102.58ZM308.36,68a60.72,60.72,0,0,1,91.41-14,4.74,4.74,0,0,0,6.46-.24l17.5-17.5a4.76,4.76,0,0,0-.22-6.92A94.67,94.67,0,0,0,358.08,5c-40.22.79-74.5,26.94-87.5,63H308ZM205.61,90.21l-17.53,24.41C206.71,126.38,218,134.92,218,150c0,10.73-3.06,12.26-4.21,12.83C209.46,165,201.09,165,193,165c-19.22,0-24-.72-24.84-10.46a5,5,0,0,0-5-4.54h-20a5,5,0,0,0-5,5.35c1.2,16.39,8.1,27.87,20.54,34.16C169.59,195,182.57,195,193,195c11,0,23.54,0,34.21-5.33C241,182.77,248,169.42,248,150,248,119.12,225.58,102.85,205.61,90.21ZM110,121a21,21,0,1,1,5-41.39c-.2-25-1.2-40.6-6.24-51.95C98.64,5,74.45,5,60,5S21.36,5,11.29,27.66C5,41.82,5,62.48,5,100s0,58.18,6.29,72.34C21.36,195,45.55,195,60,195s38.64,0,48.71-22.66c4.93-11.1,6-26.22,6.23-50.33l-1.25-1.34A20.75,20.75,0,0,1,110,121ZM81.29,160.16c-1,2.27-2.15,4.84-21.29,4.84s-20.28-2.57-21.29-4.84C35,151.82,35,131.2,35,100s0-51.82,3.71-60.16C39.72,37.57,40.86,35,60,35s20.28,2.57,21.29,4.84C85,48.18,85,68.8,85,100S85,151.82,81.29,160.16Zm342.44,3.57-17.5-17.5a4.73,4.73,0,0,0-6.44-.26A60.8,60.8,0,0,1,299.27,97.13,58.51,58.51,0,0,1,300,90.2H265.51q-.43,4.17-.5,8.45a95,95,0,0,0,158.51,72A4.76,4.76,0,0,0,423.73,163.73ZM174,123.91,202.54,84.2H305.93l19.53,19.91a4.91,4.91,0,0,0,3.54,1.5h17.09a15,15,0,1,0-.37-10.2H331.07L311.54,75.5A4.91,4.91,0,0,0,308,74H200a5,5,0,0,0-4,2.09l-28.5,39.71H131.14l-8-8.58a15,15,0,1,0-7.56,6.69l9.78,10.5A5,5,0,0,0,129,126h41A5,5,0,0,0,174,123.91Z" />
					<path oscc-logo-orange
						d="M327.94,67.94l9.65,9.64a5,5,0,0,0,6.36.59c15.51-11,42.41-3.71,42.84,21.83-.43,25.54-27.33,32.81-42.84,21.83a5,5,0,0,0-6.37.59l-9.64,9.64a5,5,0,0,0,.53,7.54c28.67,22.14,80.71,8.94,81.53-39.6-.81-48.54-52.86-61.74-81.53-39.6A5,5,0,0,0,327.94,67.94Z" />
				</g>
			</svg>
			<div style="flex-grow: 1"></div>
			<ColorSchemeSwitch style="margin-right: 8px; color: white;" />
		</template>
		<template #nav>
			<nav-link class="nav-links" to="/" title="主页"><i class="fa fa-home"></i>主页 </nav-link>
			<nav-link class="nav-links" to="/research" title="工程实践">工程实践</nav-link>
		</template>
	</v-header>

	<v-body >
		<router-view />
	</v-body>
	<container round next-level :pad="false" style="position: fixed; top: 1em; right: 1em">
		<color-scheme-switch />
	</container>
</template>

<style scoped>
/* Header elements layout */

.logo {
	height: 2em;
}

[oscc-logo-brand] {
	fill: var(--c-brand-dark);
}

[oscc-logo-orange] {
	fill: #f7931e;
}

[collapse="false"] .nav-links {
	color: white;
}
</style>
