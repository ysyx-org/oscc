<script setup>
const { host } = location
</script>
<template>
	<div class="left">
		<h1 style="line-height: 1.25em; font-size: 3.5em;">一生一芯</h1>
		<p class="detail">从零创造属于你的 RISC-V 处理器</p>
		<btn type="solid blue" class="intro-btn" :to="`/redirect/to/ysyx.${host}`">点击了解</btn>
	</div>
	<div class="right">
		<img src="../../assets/logo_ysyx-square.png" style="object-fit: contain; width: 100%;" alt="一生一芯">
	</div>
</template>

<style scoped lang="scss">
.left {
	.detail {
		line-height: 1em;
		font-size: 2em;
		padding-top: 1em;
		color: var(--ct-gray-light);
	}

	.intro-btn {
		width: 10em;
		line-height: 1.5em;
		font-size: 1.25em;
		margin: 3em 0 0;
	}
}

@media(max-width:960px) {
	.left .intro-btn {
		font-size: 1em;
	}
}
</style>