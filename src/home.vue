<script setup>
import oscc from './home/intro/oscc.vue'
import ysyx from './home/intro/ysyx.vue'
import HomeBanner from './home/banner.vue'
const
	bannerArr = [
		{
			logo: new URL('./assets/logo_xin.png', import.meta.url).href,
			component: oscc,
		},
		{
			logo: new URL('./assets/logo_ysyx-square.png', import.meta.url).href,
			component: ysyx,
		},
	]
</script>

<template>
	<div class="home-page">
		<HomeBanner :banner-arr="bannerArr" style="flex: 1;"></HomeBanner>
		<v-footer />
	</div>
</template>

<style lang="scss" scoped>
.home-page {
	font-size: 1rem;
	display: flex;
	flex-direction: column;
	flex: 1;

	[oscc-logo-brand] {
		fill: var(--c-brand-dark);
		fill: var(--ct-gray-light);
	}

	[oscc-logo-orange] {
		fill: #f7931e;
		fill: var(--ct-gray-light);
	}

	[sub-site-list] * {
		color: var(--ct-gray);
		font-size: 1.1em;
		flex-grow: 1;
		padding: 1em;
	}
}

@media(max-width:960px) {
	.home-page {
		font-size: 0.75rem;
	}
}
</style>