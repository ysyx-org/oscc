<script setup>
import { ref, computed } from 'vue'
import rawJson from 'mdDir'
import PageBar from './jd search/pageBar.vue'

const
	showFilter = ref(true),
	currentPage = ref(1),
	itemPerPage = 6,
	categories = { 'company': '公司', 'job': '职业' },
	itemAllArr = [],
	uniqueCategory = {}

for (const item in categories) {
	uniqueCategory[item] = {
		name: [],
		vModel: []
	}
}
for (const name in rawJson) {
	// base add in itemAllArr
	const tmpObj = {
		name,
		company: rawJson[name].company,
		job: rawJson[name].job,
		logo: rawJson[name].logo,
		subtitle: rawJson[name].subtitle
	}
	for (const item in categories) {
		// extra add in itemAllArr
		if (!(item in tmpObj)) {
			tmpObj[item] = rawJson[name][item]
		}
		// de-duplicate
		if (!(uniqueCategory[item].name.includes(rawJson[name][item]))) {
			uniqueCategory[item].name.push(rawJson[name][item])
			uniqueCategory[item].vModel.push(ref(false))
		}
	}
	itemAllArr.push(tmpObj)
}
const
	itemAfterFilter = computed(() => {
		// return to page 1 when filter
		currentPage.value = 1
		// filter items in itemAllArr
		return itemAllArr.filter((item) => {
			// check every category
			return Object.keys(categories).reduce((prev, cur) => {
				// if none is selected or the category items include itemAllArr item
				return (uniqueCategory[cur].vModel.every(item => !item.value) || uniqueCategory[cur].name.filter((_, i) => {
					return uniqueCategory[cur].vModel[i].value
				}).includes(item[cur])) && prev
			}, true)
		})
	}),

	pages = computed(() => Math.ceil(itemAfterFilter.value.length / itemPerPage)),

	toPage = n => {
		if (n >= 1 && n <= pages.value) {
			currentPage.value = n
		}
	},

	clear = () => {
		for (const item in categories) {
			uniqueCategory[item].vModel.map(i => i.value = false)
		}
	}
</script>

<template>
	<div>
		<div :class="{'bg-shadow':!showFilter}" @click="showFilter=true"></div>
		<main>
			<div class="row">
				<button class="option" @click="showFilter=!showFilter">筛选条件</button>
				<button class="clear" @click="clear">全部清除</button>
			</div>
			<div class="filter-res-container">
				<div class="filter">
					<div class="checkboxs" v-for="(alias, category, key) in categories" :key="key">
						<h2 style="line-height: 2em;">{{alias}}</h2>
						<label class="box" v-for="(item, key) in uniqueCategory[category].name" :key="key">
							<input type="checkbox" v-model="uniqueCategory[category].vModel[key].value">
							<span>{{item}}</span>
						</label>
					</div>
					<btn class="filter-btn" @click="showFilter=true">确定</btn>
				</div>
				<div class="results">
					<router-link
						v-for="(el, i) in itemAfterFilter.slice((currentPage - 1) * itemPerPage, currentPage * itemPerPage)"
						:key="i" :to="`/jd/${el.name}`" class="jd-content">
						<v-card bg-color="var(--cf)" class="jd-card">
							<img :src="el.logo" alt="logo" class="jd-card-img">
							<div style="margin: auto 0 auto 2em;">
								<h2 style="line-height: 1.25em; margin-bottom: 0.5em;">{{`${el.company} ${el.job}`}}
								</h2>
								<p style="line-height: 1.25em;">{{ el?.subtitle }}</p>
							</div>
						</v-card>
					</router-link>
					<page-bar class="page-bar" :page-all="pages" :current-page="currentPage" @to-page="toPage">
					</page-bar>
				</div>
			</div>
		</main>
	</div>

</template>

<style scoped lang="scss">
main {
	font-size: 1rem;
	margin: 5em auto;
	width: 80%;
	max-width: 80em;

	.row {
		margin: 0 auto 0.5em;
		width: 100%;

		button {
			border: none;
			text-align: left;
			cursor: pointer;

			&:hover {
				text-decoration: underline;
			}
		}

		.option {
			margin-right: 2em;
			color: var(--c-brand-light);
		}

		.clear {
			border-left: 1px solid var(--cb-gray);
			text-align: right;
			padding-left: 2em;
			color: var(--c-brand-light);
		}
	}

	.filter-res-container {
		display: flex;
		border-top: 1px solid var(--cb-gray);

		.filter {
			width: 15em;
			padding-bottom: 10em;
			border-right: 1px solid var(--cb-gray);
			display: v-bind('showFilter?"block":"none"');

			.checkboxs {
				padding: 2em 2em 0 0;

				.box {
					width: 100%;
					display: block;
					font-size: 1.2em;
					margin: 0.5em 0;
					cursor: pointer;

					input {
						cursor: pointer;
					}

					span {
						padding-left: 0.5em;
					}
				}
			}

			.filter-btn {
				display: none;
				margin: 2em;
				text-align: center;
			}
		}

		.results {
			width: v-bind('showFilter?"calc(100% - 15em)":"100%"');

			.jd-content {
				text-decoration: none;
				color: var(--ct);

				.jd-card {
					padding: 2em 2em 2em 4em;
					border-bottom: 1px solid var(--cb-gray);
					border-radius: 0;

					&-img {
						width: 5em;
					}
				}
			}

			.page-bar {
				margin-top: 2em;
				display: flex;
				justify-content: center;
			}
		}
	}
}

@media(max-width:960px) {
	main {
		font-size: 0.75rem;
		width: 90%;
		margin: 3em auto;

		.filter-res-container .filter {
			display: v-bind('!showFilter?"block":"none"');
			position: fixed;
			height: 100%;
			background-color: var(--cf);
			overflow: auto;
			border-radius: 5px;
			border: 1px solid var(--cb-gray);
			left: 0;
			top: 4em;
			z-index: 2;

			.checkboxs {
				padding: 2em 1em 0;
			}

			.filter-btn {
				display: block;
			}
		}

		.filter-res-container .results {
			width: 100%;

			.jd-content .jd-card {
				padding: 1em 0;
			}
		}
	}

	.bg-shadow {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 2;
		opacity: 0.6;
		background: var(--c-box-shadow);
	}
}
</style>