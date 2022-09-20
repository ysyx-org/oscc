<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import rawJson from 'mdDir'
// import rawJson from './assets/ban'
const
	route = useRoute(),
	isShow = ref(false),
	bgImg = computed(() => `url(${rawJson[route.params.name].banner})`),
	sortByCom = {}

// init sortByCom
for (const name of Object.getOwnPropertyNames(rawJson)) {
	const company = rawJson[name].company
	if (!(company in sortByCom)) {
		sortByCom[company] = {}
	}
	sortByCom[company][name] = rawJson[name].job
}
</script>

<template>
	<div class="jd-page">
		<div :class="{ 'bg-shadow': isShow }" @click="isShow = false"></div>
		<div class="icon-wrapper" @click="isShow = true">
			<div class="expand-icon">
				<span></span>
				<span></span>
				<span></span>
			</div>
		</div>
		<article>
			<aside :class="{ aside: isShow }">
				<div class="close" @click="isShow = false">
					<span></span>
					<span></span>
				</div>

				<ul style="border-bottom: 1px solid var(--ct-gray);">
					<ul v-for="(ulItem, ulName, ulKey) in sortByCom" :key="ulKey" class="sidebar-items">{{ulName}}
						<router-link v-for="(item, name, key) in ulItem" :key="key" :to="`/jd/${name}`"
							class="sidebar-item-link"
							:class="{ 'sidebar-item-select-link': route.params.name === name }" @click="isShow = false">
							<li class="sidebar-item" :class="{ 'sidebar-item-select': route.params.name === name }">
								{{ item }}
							</li>
						</router-link>
					</ul>
				</ul>
				<div class="btn-wrapper">
					<btn to="/jd/search" style="flex-grow:1;">
						查看全部 >>
					</btn>
				</div>
			</aside>
			<section>
				<div class="banner">
					<div class="text-wrapper">
						<h1>{{`${rawJson[route.params.name].company} - ${rawJson[route.params.name].job}`}}</h1>
						<p>欢迎您的投递与加入</p>
					</div>
				</div>
				<div markdown-body v-html="rawJson[route.params.name].md" class="md-content"></div>
				<footer class="jd-footer">
				</footer>
			</section>
		</article>
	</div>
</template>

<style lang="scss">
@import "@CR/markdown.scss";

.jd-page {
	font-size: 1rem;

	.bg-shadow {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 2;
		background: var(--c-box-shadow);
		opacity: 0.6;
		transition: opacity 5s;
		display: none;
	}

	.icon-wrapper .expand-icon {
		display: none;
		position: relative;
		width: 2em;
		height: 1.5em;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		padding: 0.2em;
		margin: 1em 1em;
		cursor: pointer;

		span {
			background-color: var(--ct-gray);
			width: 100%;
			height: 2px;
			border-radius: 2px;
		}
	}

	article {
		display: flex;
		width: 80%;
		max-width: 120em;
		min-width: 90em;
		margin: 0 auto 10vh;

		aside {
			width: 18em;
			flex: none;
			height: 100%;
			background-color: var(--cf-gray-light);
			border-radius: 10px;
			padding: 2em;
			margin: 4em 0;
			padding-bottom: 10em;

			.btn-wrapper {
				width: 100%;
				display: flex;
				margin-top: 1.5em;
				justify-content: center;

				.btn-all {
					color: var(--ct-gray);
					font-weight: bolder;
					font-size: 1.2em;
					text-decoration: none;
					text-align: center;
					margin-right: 1em;

					.text {
						line-height: 2em;
						border: 1px solid var(--ct-gray-light);
						padding: 0 2em;
						border-radius: 0.2em;
					}

					&:hover {
						color: var(--cf);

						.text {
							border: 1px solid var(--cf-next-next-level);
							background-color: var(--ct-gray-light);
						}
					}
				}
			}

			ul.sidebar-items {
				list-style-type: none;
				font-size: 1.5em;
				font-weight: bolder;

				.sidebar-item-link {
					text-decoration: none;
					color: var(--ct-gray);
					font-size: 0.8em;
					transition-duration: 0s;
					font-weight: normal;

					li.sidebar-item {
						margin: 1em;
						transition-duration: 0s;
					}

					&:hover {
						color: var(--c-brand);
						font-weight: 540;

					}
				}

				.sidebar-item-select-link {
					.sidebar-item-select {
						color: var(--c-brand);
						font-weight: bolder;
					}
				}
			}
		}


		section {
			height: 100%;
			width: calc(100% - 18em - 4em);
			border-radius: 10px;
			padding: 2em;
			margin: 2em 2em;

			.banner {
				background: no-repeat center center;
				background-size: cover;
				background-color: var(--cf-gray);
				border-radius: 10px;
				background-image: v-bind('bgImg');

				.text-wrapper {
					width: 90%;
					min-width: 20em;
					max-width: 60em;
					height: 40vh;
					margin: 0 auto 3em;
					text-align: center;
					display: flex;
					justify-content: center;
					align-items: center;
					flex-direction: column;
					color: white;

					h1 {
						color: white;
						font-size: 5em;
					}

					p {
						font-size: 2.5em;
					}
				}
			}

			.md-content {
				margin-bottom: 5em;
			}

			.jd-footer {
				padding-bottom: 1em;
				margin-bottom: 1em;
				border-bottom: 1px solid var(--cb-gray);
			}
		}
	}
}

@media(max-width: 960px) {
	.jd-page {
		font-size: 0.75rem;

		.bg-shadow {
			display: block;
			transition: all 0.5s ease 0s;
		}

		.aside {

			transform: translate(0);
			transition: opacity .25s, transform .5s cubic-bezier(.19, 1, .22, 1);
			overflow: auto;

			.close {
				display: flex;
				position: relative;
				flex-direction: column;
				justify-content: center;
				width: 2em;
				height: 2em;
				left: 11em;
				margin: 1em;
				cursor: pointer;

				span {
					display: inline-block;
					position: absolute;
					width: 100%;
					height: 2px;
					background-color: var(--ct-gray);
					border-radius: 2px;

					&:first-child {
						transform: rotate(45deg);
					}

					&:last-child {
						transform: rotate(-45deg);
					}
				}
			}
		}

		.icon-wrapper {
			width: 100%;
			margin: 1em 1em 0;

			.expand-icon {
				display: flex;
			}
		}

		.banner {
			font-size: 0.5em;

			.text-wrapper {
				height: 20vh;
			}
		}

		article {
			width: 100%;
			min-width: 1em;

			aside {
				display: block;
				position: fixed;
				z-index: 2;
				background-color: var(--cf);
				top: 2em;
				margin-top: 2em;
				transform: translate(-100%);
				transition: opacity .5s, transform .25s ease;
			}

			section {
				width: calc(100% - 2em);
				margin: 0 auto;
				padding: 1em;

				.banner {
					font-size: 0.5em;

					.text-wrapper {
						height: 20vh;
					}
				}
			}
		}
	}
}
</style>