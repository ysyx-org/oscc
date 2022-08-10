<script setup>
// import {} from 'vue';
const props = defineProps({
	img: String,
	title: String,
	link: String,
	content: String
})
</script>

<template>
	<div class="timeline-item">
		<div class="timeline-content">
			<div class="timeline-img-content">
				<img class="timeline-img" :src="img" alt="新闻图片" />
			</div>
			<div class="timeline-right">
				<div class="timeline-title">
					<a :href="props.link" class="a">{{ props.title }}</a>
				</div>
				<div class="timeline-desc">{{ props.content }}</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.timeline-item {
	position: relative;
	.timeline-content {
		display: flex;
		background-color: #ccc;

		.timeline-img-content {
			width: 435px;
			height: 280px;
			margin: 10px;
			overflow: hidden;

			.timeline-img {
				width: auto;
				height: 285px;
				margin-left: -25%;

				&:hover {
					transform: scale(1.1);
					transition: all 0.5s ease 0.1s;
				}
			}
		}

		.timeline-right {
			display: flex;
			flex: 75%;
			flex-direction: column;
			margin-top: 30px;
			font-family: "Noto Sans CJK";

			.timeline-title {
				line-height: 50px;
				font-size: 22px;
				text-decoration: none;

				.a {
					text-decoration: none;
					color: #099ea5;
				}
			}

			.timeline-desc {
				margin-top: 5px;
				line-height: 28px;
				font-size: 16px;
				color: #3b3a3a;
				overflow: hidden;
			}
		}
	}
}
</style>
