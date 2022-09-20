<script setup>
</script>

<template>
	<div>
		<slot></slot>
	</div>
</template>

<style scoped lang="scss">
:deep(.intro-wrapper) {
	width: 80%;
	max-width: 80em;
	min-width: 60em;
	height: 70vh;
	max-height: 60em;
	display: flex;
	margin: 0 auto;
	padding: 4em 0;

	.list-enter-active,
	.list-leave-active {
		transition: all 0.5s ease;
	}

	.list-enter-from,
	.list-leave-to {
		opacity: 0;
		transform: translateX(30px);
	}

	.left {
		margin: auto 0;
		position: relative;
		flex-grow: 1;
		flex-shrink: 0;
		width: 50%;
		text-align: left;
		padding: 2em;

		.name,
		.slogan {
			line-height: 1.25em;
			font-size: 3.5em;
		}

		.detail {
			line-height: 1em;
			font-size: 2em;
			padding-top: 1em;
			color: var(--ct-gray-light);
		}

		.intro-btn {
			display: inline-block;
			text-align: center;
			text-decoration: none;
			border: 1px solid var(--ct-blue);
			margin-top: 3em;
			color: white;
			background-color: var(--cb-blue);
			border-radius: 1.5em;
			padding: 0 2em;
			line-height: 3em;
		}
	}

	.right {
		order: 2;
		width: 50%;
		height: 100%;
		padding: 2em;
		display: flex;
		justify-content: center;


		.img {
			width: 100%;
			height: 100%;
			object-fit: contain;
		}
	}
}

@media(max-width:960px) {
	:deep(.intro-wrapper) {
		flex-direction: column-reverse;
		width: 100%;
		min-width: 20em;
		height: 60vh;
		max-height: 60em;
		padding: 4em 1.5em 0;

		.left {
			width: 100%;
			height: 70%;
			text-align: center;
			padding: 0;
			display: flex;
			flex-direction: column;
			justify-content: center;
		}

		.right {
			width: 100%;
			height: 30%;
			padding: 0;
		}
	}
}
</style>