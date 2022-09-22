<script setup>
const props = defineProps({
	pageAll: Number,
	currentPage: {
		type: Number,
		default: 1
	}
})
</script>

<template>
	<ul class="pagination ">
		<li>
			<div @click="$emit('toPage', currentPage - 1)">«</div>
		</li>
		<li v-for="index in Array.from({length: props.pageAll}, (_, i) => 1 + i)" :key="index">
			<div @click="$emit('toPage', index)" :class="{'active':index === props.currentPage}">
				{{index}}
			</div>
		</li>
		<li>
			<div @click="$emit('toPage', currentPage + 1)">»</div>
		</li>
	</ul>
</template>


<style lang="scss" scoped>
ul.pagination {
	display: inline-block;
	padding: 0;
	margin: 0;
	width: 100%;
}

ul.pagination li {
	display: inline;
}

ul.pagination li div {
	padding: 0.5em 1em;
	text-decoration: none;
	transition: background-color .3s;
	border: 1px solid var(--cb-gray);
	margin: 0.25em;
	cursor: pointer;
}

ul.pagination li div.active {
	background-color: var(--ct-gray-light);
	color: var(--cf);
	border: 1px solid var(--ct-gray-light);
}

ul.pagination li div:hover:not(.active) {
	background-color: var(--cf-next-level);
}
</style>