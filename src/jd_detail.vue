<script setup>
import { ref, onBeforeUpdate } from 'vue'
import { useRoute, } from 'vue-router'
import rawJson from 'mdDir'

const
	route = useRoute(),
	showExpand = ref(false),
	sortByCom = {}

for (const name in rawJson) {
	if (!(rawJson[name].company in sortByCom)) {
		sortByCom[rawJson[name].company] = {}
	}
	sortByCom[rawJson[name].company][name] = rawJson[name].subtitle
}
if (!route.params?.name) {
	route.params.name = Object.keys(rawJson)[0]
}
onBeforeUpdate(() => {
	if (!route.params?.name) {
		route.params.name = Object.keys(rawJson)[0]
	}
})
</script>

<template>
	<div class="jd-page">
		<div :class="{ 'bg-shadow': showExpand }" @click="showExpand = false"></div>
		<div class="icon-wrapper" @click="showExpand = true">
			<div class="expand-icon">
				<span></span>
				<span></span>
				<span></span>
			</div>
		</div>
		<article>
			<aside :class="{ aside: showExpand }">
				<div class="close" @click="showExpand = false">
					<span></span>
					<span></span>
				</div>

				<div style="border-bottom: 1px solid var(--ct-gray);">
					<ul v-for="(ulItem, ulName, ulKey) in sortByCom" :key="ulKey" class="sidebar-items">{{ ulName }}
						<router-link v-for="(item, name, key) in ulItem" :key="key" :to="`/research/${name}`"
							class="sidebar-item-link" @click="showExpand = false">
							<li class="sidebar-item" :class="{ 'sidebar-item-select': route.params.name === name }">
								{{ item }}
							</li>
						</router-link>
					</ul>
				</div>
			</aside>
			<section>
				<div markdown-body v-html="rawJson[route.params?.name]?.md" style="margin-bottom: 5em;"></div>
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
		min-width: 80em;
		margin: 0 auto 3vh;

		aside {
			width: 18em;
			flex: none;
			height: 100%;
			background-color: var(--cf-gray-light);
			border-radius: 10px;
			padding: 2em;
			margin: 4em 0;
			padding-bottom: 10em;

			ul.sidebar-items {
				list-style-type: none;
				font-size: 1.2em;
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

				.sidebar-item-select {
					color: var(--c-brand);
					font-weight: bolder;
				}
			}
		}

		section {
			height: 100%;
			width: calc(100% - 18em);
			border-radius: 10px;
			padding: 4em;

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

		.icon-wrapper {
			width: 100%;
			margin: 1em 1em 0;

			.expand-icon {
				display: flex;
			}
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
				width: 100%;
				margin: 0 auto;
				padding: 2em;
			}
		}
	}
}
</style>