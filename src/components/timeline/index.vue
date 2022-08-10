<script setup>
import { computed, onMounted, ref } from 'vue'
const
	props = defineProps({
		/**
		 * V  Vertical (left)
		 * VL Vertical left
		 * VR Vertical right
		 * H  Horizontal (top)
		 * HT Horizontal top
		 * HB Horizontal bottom
		 */
		type: {
			type: String,
			default: 'V'
		}
	}),
	el = ref(null),
	className = computed(() => {
		const [direction, align = ''] = (props.type || 'V').split('');
		return [
			{V: 'vertical', H: 'horizontal'}[direction.toUpperCase()],
			(() => {
				switch (align.toUpperCase()) {
					case 'R':
					case 'B':
						return 'end';
					default:
						return 'start';
				}
			})()
		]
	})

function passProps(el) {
	el.style.setProperty(
		'--date',
		JSON.stringify(el.getAttribute('date'))
	);
}

onMounted(() => {
	for (const child of el.value.children) {
		passProps(child);
	}
	const observer = new MutationObserver((list, observer) => {
		// console.log(el.value.innerHTML)
		for (const child of el.value.children) {
			passProps(child);
		}
	})
	observer.observe(el.value, { attributes: true, childList: true, subtree: true })
})
</script>

<template>
	<div class="timeline-wrapper" :class="className" :ref="(_el) => (el = _el)">
		<slot></slot>
	</div>
</template>


<style scoped lang="scss">
.timeline-wrapper {
	display: flex;
	flex-direction: column;
	align-items: stretch;
	position: relative;
	padding-left: 8rem;
	padding-right: 2rem;
	--date: "N/A";
	&:deep > * {
		margin: 1rem 0;
		position: relative;
		&:first-child {
			margin-top: 0;
		}
		&:last-child {
			margin-bottom: 0;
		}
		&::before {
			font-size: 1rem;
			content: var(--date);
			display: block;
			position: absolute;
			top: 0;
			left: -2rem;
		}
	}
	&::before {
		content: "";
		display: block;
		width: 0.2rem;
		background-color: var(--c-brand);
		position: absolute;
		top: 0;
		left: 4rem;
		height: 100%;
	}
}
</style>
