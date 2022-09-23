<script setup>
import { ref, computed } from 'vue'
import intro from './home/intro.vue'
import oscc from './home/intro/oscc.vue'
import ysyx from './home/intro/ysyx.vue'
import rawJson from 'mdDir'

const
	showLogoNum = 3,
	bannerArr = [
		{
			logo: new URL('./assets/logo_xin.png', import.meta.url).href,
			component: oscc,
		},
		{
			logo: new URL('./assets/logo_ysyx-square.png', import.meta.url).href,
			component: ysyx,
		},
	],
	currentBan = ref(0),
	showAverFloor = Math.floor(showLogoNum / 2),
	showLogoArr = computed(() => {
		const tmpArr = [(currentBan.value + showAverFloor) % bannerArr.length]
		for (let i = 1; i < showLogoNum; i++) {
			tmpArr.unshift((tmpArr[0] - 1 + bannerArr.length) % bannerArr.length)
		}
		return tmpArr
	}),
	enterTrans = ref(null),
	leaveTrans = ref(null),
	clickLogo = (key) => {
		currentBan.value = (key + bannerArr.length + currentBan.value - showAverFloor) % bannerArr.length
		enterTrans.value = `translateX(${(key > showAverFloor) ? '' : '-'}50%)`
		leaveTrans.value = `translateX(${(key < showAverFloor) ? '' : '-'}50%)`
	},
	showJd = []
// select jd show in home page
for (const name in rawJson) {
	if (rawJson[name]?.showInHome) {
		showJd.push({
			name,
			logo: rawJson[name].logo,
			company: rawJson[name].company,
			job: rawJson[name].job,
			subtitle: rawJson[name].subtitle,
		})
	}
}
</script>

<template>
	<div class="home-page">
		<div class="banner-container">
			<Transition name="banner" mode="out-in">
				<intro :key="currentBan">
					<component :is="bannerArr[currentBan].component"></component>
				</intro>
			</Transition>
			<div class="outer-container">
				<div class="inner-container">
					<div class="img-wrapper" v-for="(item, key) in showLogoArr" :key="key"
						:class="{ imgWrapperSelect: key === showAverFloor }" @click="clickLogo(key)">
						<img :src="bannerArr[item].logo" alt="logo" :class="{ imgSelect: key === showAverFloor }">
					</div>
				</div>
			</div>
		</div>

		<div class="jd-container">
			<h1 style="text-align: center; width: 100%; margin-bottom: 1em;">招聘信息 JD </h1>
			<div class="jd-content-wrapper">
				<router-link v-for="(el, key) in showJd" :key="key" :to="`/research/${el.name}`" class="jd-content">
					<v-card class="jd-card">
						<img :src="el.logo" alt="logo" class="jd-card-img">
						<div style="margin: auto 0 auto 2em;">
							<h2 style="line-height: 1.25em; margin-bottom: 0.5em;">{{ `${el?.company} - ${el?.job}` }}
							</h2>
							<p style="line-height: 1.25em;">{{ el?.subtitle }}</p>
						</div>
					</v-card>
				</router-link>
				<div class="btn-wrapper">
					<btn to="/research" style="width: 15em;">
						查看全部 >>
					</btn>
				</div>
			</div>
		</div>
		<v-footer />
	</div>
</template>

<style lang="scss" scoped>
.home-page {
	font-size: 1rem;

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

	.banner-container {
		padding-bottom: 4em;
		border-bottom: 1px solid var(--cb-gray);

		.banner-enter-active,
		.banner-leave-active {
			transition: all .3s ease;
		}

		.banner-enter-from {
			opacity: 0;
			transform: v-bind('enterTrans');
		}

		.banner-leave-to {
			opacity: 0;
			transform: v-bind('leaveTrans');
		}

		$imgWrapperWidth: 4em;
		$imgWrapperHeight : $imgWrapperWidth * 2;

		.outer-container {
			position: relative;
			overflow: hidden;
			width: v-bind('`${5 * (showLogoNum + 0.75)}em`');
			height: $imgWrapperHeight;
			margin: 0 auto;

			.inner-container {
				display: flex;
				overflow-x: scroll;
				overflow-y: hidden;

				&::-webkit-scrollbar {
					display: none;
				}

				.img-wrapper {
					width: $imgWrapperWidth;
					margin: 0 0.5em;
					height: $imgWrapperHeight;
					border-radius: 0.5em;
					display: flex;
					justify-content: center;
					align-items: center;

					img {
						width: $imgWrapperWidth ;
						height: $imgWrapperWidth;
						object-fit: contain;
						border-radius: 0.5em;
						opacity: 0.4;
						filter: grayscale(1);
						padding: 0.3em;
						cursor: pointer;
					}

					&:hover {

						img:not(.imgSelect) {
							opacity: 0.8;
							filter: grayscale(0);
						}
					}
				}

				.imgWrapperSelect {
					transform: scale(1.75);
					flex: auto;

					.imgSelect {
						box-shadow: 0 0 0.25em var(--cb-gray-dark);
						opacity: 1;
						filter: grayscale(0);
					}
				}
			}
		}
	}

	.jd-container {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		padding: 4em 0;
		border-bottom: 1px solid var(--cb-gray);

		.btn-wrapper {
			width: 100%;
			display: flex;
			margin-right: 0.64em;
			justify-content: right;
		}

		.jd-content-wrapper {
			width: 80%;
			min-width: 50em;
			max-width: 80em;
			display: flex;
			flex-wrap: wrap;

			.jd-content {
				width: 50%;
				text-decoration: none;
				color: var(--ct);
				padding: 1em;

				.jd-card {
					height: 100%;
					padding: 2em;

					&-img {
						width: 5em;
					}
				}
			}
		}
	}
}

@media(max-width:960px) {
	.home-page {
		font-size: 0.75rem;

		.banner-container {
			padding-top: 0em;

			$imgWrapperWidth: 3em;
			$imgWrapperHeight: $imgWrapperWidth * 2;

			.outer-container {
				width: v-bind('`${4 * (showLogoNum + 0.75)}em`');
				height: $imgWrapperHeight;

				.inner-container .img-wrapper {
					width: $imgWrapperWidth;
					height: $imgWrapperHeight;

					img {
						width: $imgWrapperWidth;
						height: $imgWrapperWidth;
						border-radius: 0.2em;
					}
				}
			}
		}

		.jd-container {
			.btn-wrapper {
				margin: 1em auto;
				justify-content: center;
			}

			.jd-content-wrapper {
				width: 90%;
				min-width: 20em;
				max-width: 60em;

				.jd-content {
					width: 100%;
					min-width: none;
					padding: 0.75em;

					.jd-card {
						padding: 1em;

						&-img {
							width: 4em;
						}
					}
				}
			}
		}
	}
}
</style>