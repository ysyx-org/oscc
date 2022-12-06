<script setup>
import { ref, onMounted, watch } from 'vue'
import intro from './intro.vue'

const
	props = defineProps({
		bannerArr: {
			type: Array,
			required: true
		}
	})
let bannerArr = []
while (bannerArr.length < 3) {
	bannerArr = bannerArr.concat(props.bannerArr)
}

const
	BANNER_LEN = bannerArr.length,
	bannerScroll = ref(''),
	currentBan = ref(0),
	enterTrans = ref(null),
	leaveTrans = ref(null),
	setCls = (key) => {
		switch (key) {
			case currentBan.value ? currentBan.value - 1 : BANNER_LEN - 1:
				return "left"
			case currentBan.value + 1 === BANNER_LEN ? 0 : currentBan.value + 1:
				return "right"
			case currentBan.value:
				return "center"
			default:
				return "hide"
		}
	}
watch(currentBan, (newValue, oldValue) => {
	const trans = newValue === (oldValue ? oldValue - 1 : BANNER_LEN - 1) ? -50 : 50
	enterTrans.value = `translateX(${trans}%)`
	leaveTrans.value = `translateX(${-trans}%)`
})
onMounted(() => {
	bannerScroll.value.addEventListener('wheel', (event) => {
		event.preventDefault()
		if (event.deltaY > 0) {
			currentBan.value = (currentBan.value + 1) % BANNER_LEN
		} else if (event.deltaY < 0) {
			currentBan.value = (currentBan.value - 1 + BANNER_LEN) % BANNER_LEN
		}
	})
})
</script>

<template>
	<div class="banner-container">
		<Transition name="banner" mode="out-in">
			<intro :key="currentBan">
				<component :is="bannerArr[currentBan].component"></component>
			</intro>
		</Transition>
		<ul class="imgs" ref="bannerScroll">
			<li v-for="(_, key) in bannerArr" :key="key" :class="setCls(key)" @click="(currentBan = key)">
				<div class="img-wrapper">
					<img :src="bannerArr[key].logo" alt="" style="height: 100%; width: 100%; object-fit: contain;">
				</div>
			</li>
		</ul>
	</div>
</template>

<style scoped lang="scss">
.banner-container {
	--banner-width: 5em;

	padding-bottom: 3em;
	border-bottom: 1px solid var(--cb-gray);
	overflow: hidden;

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

	.imgs {
		position: relative;
		margin: 0 auto;
		width: calc(var(--banner-width) * 4);
		height: calc(var(--banner-width) + 2em);

		li {
			position: absolute;
			transition: 0.5s;
			left: calc(50% - var(--banner-width) / 2);
			top: calc(50% - var(--banner-width) / 2);
			list-style-type: none;
			cursor: pointer;

			.img-wrapper {
				width: var(--banner-width);
				height: var(--banner-width);
				border-radius: .5em;
				padding: 0.4em;
			}
		}

		.left {
			transform: translateX(calc(-3em - var(--banner-width))) scale(0.9);
			opacity: 0.4;
			filter: grayscale(1);
			z-index: 1;

			&:hover {
				opacity: 0.8;
				filter: grayscale(0);
			}
		}

		.center {
			border-radius: 0.5em;
			z-index: 2;
			box-shadow: 0 0 0.25em var(--cb-gray-dark);
			transform: scale(1.5);
		}

		.right {
			transform: translateX(calc(var(--banner-width) + 3em)) scale(0.9);
			opacity: 0.4;
			filter: grayscale(1);
			z-index: 1;

			&:hover {
				opacity: 0.8;
				filter: grayscale(0);
			}
		}

		.hide {
			opacity: 0;
		}
	}
}

@media(max-width:960px) {
	.banner-container {
		--banner-width: 4em;
	}
}
</style>