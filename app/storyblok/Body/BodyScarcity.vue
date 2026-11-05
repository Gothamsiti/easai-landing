<template lang="pug">
.BodyScarcity(role="group" :aria-label="blok.ariaLabel || undefined")
	.item
		.bar(aria-hidden="true")
			i(v-for="n in total" :key="n" :class="{taken: n > free}")
		span
			span.num {{ free }}
			|  {{ blok.slotsLabel }} {{ total }}
	.item
		span
			span.num {{ days }}
			|  {{ blok.daysLabel }}
</template>
<script setup>
	const {blok} = defineProps(["blok"]);
	const total = computed(() => Number(blok.totalSlots) || 0);
	const free = computed(() => Math.min(total.value, Number(blok.freeSlots) || 0));
	// il conto dei giorni è calcolato dopo l'idratazione per non dipendere dalla data del render server
	const now = ref(null);
	onMounted(() => now.value = Date.now());
	const days = computed(() => {
		if (!blok.deadline) return '';
		const end = new Date(String(blok.deadline).replace(' ', 'T')).getTime();
		return Math.max(0, Math.ceil((end - (now.value ?? Date.now())) / 86400000));
	});
</script>
<style lang="scss">
.BodyScarcity{
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 1rem 3.6rem;
	padding-top: 2.8rem;
	position: relative;
	.item{
		display: flex;
		align-items: center;
		gap: 1.2rem;
		font-size: 1.6rem;
	}
	.bar{
		display: flex;
		gap: .4rem;
		i{
			display: block;
			width: 1rem;
			height: 1rem;
			border-radius: 50%;
			background: $ink;
			&.taken{
				background: transparent;
				box-shadow: inset 0 0 0 1.5px $line;
			}
		}
	}
	.num{
		font-weight: 700;
		font-variant-numeric: tabular-nums;
	}
}
</style>
