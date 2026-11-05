<template lang="pug">
li.BodyPriceTier
	span {{ blok.label }}
	b
		s(v-if="blok.oldPrice") {{ blok.oldPrice }}
		| {{ blok.price }}
</template>
<script setup>
	const {blok} = defineProps(["blok"]);
</script>
