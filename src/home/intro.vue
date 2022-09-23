<template>
	<div class="intro-wrapper">
		<slot></slot>
	</div>
</template>

<style scoped lang="scss">
.intro-wrapper {
	width: 80%;
	min-width: 60em;
	max-width: 80em;
	height: 70vh;
	max-height: 60em;
	display: flex;
	margin: 0 auto;
	padding: 4em 0;

	:deep(.left) {
		width: 50%;
		margin: auto 0;
		text-align: left;
		padding: 2em;
	}

	:deep(.right) {
		width: 50%;
		padding: 2em;
		display: flex;
		justify-content: center;
	}
}

@media(max-width:960px) {
	.intro-wrapper {
		flex-direction: column-reverse;
		width: 100%;
		min-width: 20em;
		height: 60vh;
		max-height: 60em;
		padding: 4em 1.5em 0;

		:deep(.left) {
			width: 100%;
			height: 70%;
			text-align: center;
			padding: 0;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}

		:deep(.right) {
			width: 100%;
			height: 30%;
			padding: 0;
		}
	}
}
</style>