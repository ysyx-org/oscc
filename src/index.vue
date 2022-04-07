<script setup>
import ColorSchemeSwitch from '../common/components/header/ColorSchemeSwitch.vue';
</script>
<template>
	<v-body style="--header-height: 0px">
		<router-view />
	</v-body>
	<container
		round
		next-level
		:pad="false"
		style="position: fixed; top: 1em; right: 1em;"
	>
		<color-scheme-switch />
	</container>
</template>