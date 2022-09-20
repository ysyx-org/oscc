<script setup>
import { ref, computed } from 'vue'
import rawJson from 'mdDir'
import PageBar from './jd search/pageBar.vue'

const
	showFilter = ref(true),
	currentPage = ref(1),
	itemPerPage = 6,
	pageAllArr = [],
	filterItem = {
		company: [],
		job: [],
		vModelCompany: [],
		vModelJob: []
	}

for (const name in rawJson) {
	pageAllArr.push({
		name,
		company: rawJson[name].company,
		job: rawJson[name].job,
		logo: rawJson[name].logo,
		text: rawJson[name].text
	})
	if (!(filterItem.company.includes(pageAllArr[pageAllArr.length - 1].company))) {
		filterItem.company.push(pageAllArr[pageAllArr.length - 1].company)
		filterItem.vModelCompany.push(ref(false))
	}
	if (!(filterItem.job.includes(pageAllArr[pageAllArr.length - 1].job))) {
		filterItem.job.push(pageAllArr[pageAllArr.length - 1].job)
		filterItem.vModelJob.push(ref(false))
	}
}

const
	pageFilterArr = computed(() => {
		currentPage.value = 1
		return pageAllArr.filter((item) => {
			return (filterItem.vModelCompany.every(item => !item.value) || filterItem.company.filter((_, i) => {
				return filterItem.vModelCompany[i].value
			}).includes(item.company)) &&
				(filterItem.vModelJob.every(item => !item.value) || filterItem.job.filter((_, i) => {
					return filterItem.vModelJob[i].value
				}).includes(item.job))
		})
	}),

	pageAll = computed(() => Math.ceil(pageFilterArr.value.length / itemPerPage)),

	toPage = (n) => {
		if (n >= 1 && n <= pageAll.value) {
			currentPage.value = n
		}
	},

	clear = () => {
		filterItem.vModelCompany.map(i => i.value = false)
		filterItem.vModelJob.map(i => i.value = false)
	}
</script>

<template>
	<div>
		<div :class="{'bg-shadow':!showFilter}" @click="showFilter=true"></div>
		<main>
			<!-- <div class="search">
                <h1>找到你的理想职位</h1>
                <input type="text" class="searchview" placeholder="按职位或关键词搜索">
            </div> -->
			<div class="row">
				<button class="option" @click="showFilter=!showFilter">筛选条件</button>
				<button class="clear" @click="clear">全部清除</button>
			</div>
			<div class="fr-container">
				<div class="filter">
					<div class="checkboxs">
						<h2 style="line-height: 2em;">公司</h2>
						<label class="box" v-for="(item, key) in filterItem.company" :key="key">
							<input type="checkbox" name="com" class="checkbox"
								v-model="filterItem.vModelCompany[key].value">
							<span>{{item}}</span>
						</label>
					</div>
					<div class="checkboxs">
						<h2 style="line-height: 2em;">职位</h2>
						<label class="box" v-for="(item, key) in filterItem.job" :key="key">
							<input type="checkbox" name="job" class="checkbox"
								v-model="filterItem.vModelJob[key].value">
							<span>{{item}}</span>
						</label>
					</div>
					<btn class="filter-btn" @click="showFilter=true">确定</btn>
				</div>
				<div class="results">
					<router-link
						v-for="(el, i) in pageFilterArr.slice((currentPage-1)*itemPerPage,(currentPage)*itemPerPage)"
						:key="i" :to="`/jd/${el.name}`" class="jd-content">
						<v-card direction="row" bg-color="var(--cf)" class="jd-card">
							<img :src="el.logo" alt="logo" class="jd-card-img">
							<div style="margin: auto 0 auto 2em;">
								<h2 style="line-height: 1.25em; margin-bottom: 0.5em;">{{ `${el.company} ${el.job}` }}
								</h2>
								<p style="line-height: 1.25em;">{{ el?.text }}</p>
							</div>
						</v-card>
					</router-link>
					<page-bar class="page-bar" :page-all="pageAll" :current-page="currentPage" @to-page="toPage">
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

	.search {
		margin: 0 auto 2em;
		width: 60%;

		h1 {
			text-align: center;
			padding: 1em 0;
		}

		input {
			width: 100%;
			font-size: 1.5em;
			height: 3em;
		}

		.searchview {
			background: 30px center no-repeat #f8f8f8;
			background-image: url(https://jobs.apple.com/static/images/search-grey.svg), none;
			-moz-background-size: 35px 35px;
			background-size: 35px 35px;
			-moz-border-radius: 4px;
			border-radius: 4px;
			padding: 0 2em 0 3.5em;
			-webkit-transition: border .2s;
			-moz-transition: border .2s;
			transition: border .2s;
		}
	}

	.row {
		margin: 0 auto 0.5em;
		width: 100%;

		button {
			border: none;
			text-align: left;
			cursor: pointer;
		}

		.option {
			margin-right: 2em;
			color: var(--c-brand-light);

			&:hover {
				text-decoration: underline;
			}
		}

		.clear {
			border-left: 1px solid var(--cb-gray);
			text-align: right;
			padding-left: 2em;
			color: var(--c-brand-light);

			&:hover {
				text-decoration: underline;
			}
		}
	}

	.fr-container {
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
				word-wrap: break-word;

				.jd-card {
					width: 100%;
					height: 10em;
					padding: 2em 2em 2em 4em;
					border-radius: 0;
					border-bottom: 1px solid var(--cb-gray);

					&-img {
						width: 5em;
					}
				}

			}

			.page-bar {
				margin: 2em auto;
				width: auto;
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

		.fr-container .filter {
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

		.fr-container .results {
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