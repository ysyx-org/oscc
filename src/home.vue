<script setup>
import { ref, computed } from 'vue'
import intro from './home/intro.vue'
import oscc from './home/intro/oscc.vue'
import ysyx from './home/intro/ysyx.vue'
import rawJson from 'mdDir'

const
	bannerArr = [
		{
			logo: new URL('./assets/ysyx.png', import.meta.url).href,
			component: oscc,
		},
		{
			logo: new URL('./assets/ysyx-square.png', import.meta.url).href,
			component: ysyx,
		},
		{
			logo: new URL('./assets/ysyx.png', import.meta.url).href,
			component: oscc,
		},
		{
			logo: new URL('./assets/ysyx-square.png', import.meta.url).href,
			component: ysyx,
		},
	],
	currentBan = ref(0),
	showPerBar = 3,
	[showAverFloor, showAverCeil] = [Math.floor(showPerBar / 2), Math.ceil(showPerBar / 2)],
	showArr = computed(() => {
		if (currentBan.value > bannerArr.length - showAverCeil || currentBan.value < showAverFloor) {
			return [...bannerArr.slice(currentBan.value - showAverFloor), ...bannerArr.slice(0, (currentBan.value + showAverCeil) % bannerArr.length)]
		}
		return [...bannerArr.slice(currentBan.value - showAverFloor, currentBan.value + showAverCeil)]
	}),
	showJd = []

for (const name of Object.getOwnPropertyNames(rawJson)) {
	if (rawJson[name]?.showInHome) {
		showJd.push({
			name,
			logo: rawJson[name].logo,
			company: rawJson[name].company,
			job: rawJson[name].job,
			text: rawJson[name].text,
		})
	}
}
</script>

<template>
	<div class="home-page">
		<div class="banner-container">
			<intro>
				<TransitionGroup name="list">
					<div class="intro-wrapper" v-for="(item,key) in bannerArr" :key="key" v-show="currentBan === key">
						<component :is="item.component"></component>
					</div>
				</TransitionGroup>
			</intro>
			<div class="outer-container">
				<div class="inner-container">
					<div class="img-wrapper" v-for="(item, key) in showArr" :key="key"
						:class="{ imgWrapperSelect: key === Math.floor(showPerBar / 2) }"
						@click="currentBan = (key + bannerArr.length + currentBan - Math.floor(showPerBar / 2)) % bannerArr.length">
						<img :src="item.logo" alt="logo" :class="{ imgSelect: key === Math.floor(showPerBar / 2) }">
					</div>
				</div>
			</div>
		</div>

		<div class="jd-container">
			<h1 style="text-align: center;width: 100%;margin-bottom: 1em;">招聘信息 JD </h1>
			<div class="jd-content-wrapper">
				<router-link v-for="(el, i) in showJd" :key="i" :to="`/jd/${el.name}`" class="jd-content">
					<v-card direction="row" class="jd-card">
						<img :src="el.logo" alt="logo" class="jd-card-img">
						<div style="margin: auto 0 auto 2em;">
							<h2 style="line-height: 1.25em; margin-bottom: 0.5em;">{{ `${el?.company} - ${el?.job}` }}</h2>
							<p style="line-height: 1.25em;">{{ el?.text }}</p>
						</div>
					</v-card>
				</router-link>
				<div class="btn-wrapper">
					<btn to="/jd/search" style="width: 15em;">
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

		.list-move,
		.list-enter-active,
		.list-leave-active {
			transition: all .5s ease;
		}

		.list-enter-from,
		.list-leave-to {
			opacity: 0;
			transform: translateX(-100%);
		}

		.list-leave-from,
		.list-leave-to,
		.list-leave-active {
			position: absolute;
			top: 0;
		}


		// 滑动框高度与宽
		$scrollWidth: 4em;
		$scrollHeight : 6em;
		$marginLeft: 1em;

		.outer-container {
			position: relative;
			overflow: hidden;
			width: v-bind('`${6 * showPerBar}em`');
			height: $scrollHeight+ 4em;
			margin: 0 auto;

			.inner-container {
				display: flex;
				position: absolute;
				flex-direction: row;
				width: 100%;
				overflow-x: scroll;
				overflow-y: hidden;
				justify-content: center;

				&::-webkit-scrollbar {
					display: none;
				}

				.img-wrapper {
					width: $scrollWidth + 0.5em;
					height: $scrollHeight+ 4em;
					position: relative;
					border-radius: 0.5em;
					display: flex;
					justify-content: center;
					align-items: center;

					img {
						width: $scrollWidth ;
						height: $scrollHeight - 2em;
						object-fit: contain;
						display: block;
						border-radius: 0.5em;
						opacity: 0.4;
						filter: grayscale(1);
						padding: 0.3em;
						cursor: pointer;
					}

					img.imgSelect {
						box-shadow: 0 0 0.25em var(--cb-gray-dark);
						opacity: 1;
						filter: grayscale(0);
						transform: scale(2);
					}

					&:hover {

						img:not(.imgSelect) {
							z-index: 2;
							transform: scale(1.1);
							opacity: 0.8;
						}
					}
				}

				.imgWrapperSelect {
					width: 13em;
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
			height: auto;
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
			justify-content: center;

			.jd-content {
				width: calc((100% - 4em) / 2);
				text-decoration: none;
				color: var(--ct);
				word-wrap: break-word;
				margin: 1em;

				.jd-card {
					width: 100%;
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
			$scrollWidth: 3em;
			$scrollHeight: 5em;
			$marginLeft: 0.75em;
			padding-top: 0em;

			.outer-container {
				width: v-bind('`${6 * showPerBar}em`');
				height: $scrollHeight+4em;

				.inner-container .img-wrapper {
					width: $scrollWidth + 0.5em;
					height: $scrollHeight+ 4em;

					img {
						width: $scrollWidth;
						height: $scrollHeight - 2em;
						border-radius: 0.2em;
					}
				}

				.inner-container .imgWrapperSelect {
					width: 8em;
				}
			}
		}

		.jd-container {
			.btn-wrapper {
				width: 100%;
				margin: 1em auto;
				justify-content: center;
				flex-grow: 1;
			}

			.jd-content-wrapper {
				width: 100%;
				padding: 1.5em;
				min-width: 20em;

				.jd-content {
					width: 90%;
					min-width: 0em;
					padding: 0.5em;
					margin: 0.2em;

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