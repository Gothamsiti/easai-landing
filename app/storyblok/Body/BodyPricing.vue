<template lang="pug">
.BodyPricing
	.price-cards
		StoryblokComponent(v-for="card in blok.cards" :key="card._uid" :blok="card")
	p.price-foot(v-if="blok.note") {{ blok.note }}
</template>
<script setup>
	const {blok} = defineProps(["blok"]);
</script>
