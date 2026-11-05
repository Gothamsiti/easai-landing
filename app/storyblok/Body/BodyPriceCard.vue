<template lang="pug">
article.BodyPriceCard.price-card(:class="blok.featured ? 'is-featured' : 'is-list'")
	span.pc-glow(v-if="blok.featured" aria-hidden="true")
	header
		p.pc-name
			span {{ blok.name }}
			em(v-if="blok.badge") {{ blok.badge }}
		p.pc-price
			s(v-if="blok.oldPrice") {{ blok.oldPrice }}
			strong {{ blok.price }}
			span(v-if="priceNote.length")
				template(v-for="(line, i) in priceNote" :key="i")
					br(v-if="i")
					| {{ line }}
			em.pc-off(v-if="blok.discount") {{ blok.discount }}
		p.pc-setup(v-if="blok.setupPrice")
			| {{ blok.setupLabel }}{{ ' ' }}
			template(v-if="blok.setupOldPrice")
				s {{ blok.setupOldPrice }}
				| {{ ' ' }}
			b {{ blok.setupPrice }}
			| {{ ' ' }}{{ blok.setupSuffix }}
	.pc-section(v-if="blok.tiers?.length")
		p.pc-label(v-if="blok.tiersTitle") {{ blok.tiersTitle }}
		ul.pc-tiers
			StoryblokComponent(v-for="tier in blok.tiers" :key="tier._uid" :blok="tier")
	.pc-section(v-if="includes.length")
		p.pc-label(v-if="blok.includesTitle") {{ blok.includesTitle }}
		ul.pc-list
			li(v-for="(item, i) in includes" :key="i") {{ item }}
	.pc-cta(v-if="blok.cta?.length")
		StoryblokComponent(v-for="cta in blok.cta" :key="cta._uid" :blok="cta")
</template>
<script setup>
	const {blok} = defineProps(["blok"]);
	// campi multilinea: una voce per riga
	const lines = (text) => String(text || '').split('\n').map(l => l.trim()).filter(Boolean);
	const priceNote = computed(() => lines(blok.priceNote));
	const includes = computed(() => lines(blok.includes));
</script>
