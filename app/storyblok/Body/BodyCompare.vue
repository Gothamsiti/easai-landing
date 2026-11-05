<template lang="pug">
.BodyCompare(:style="{'--split': split + '%'}")
	.frame
		.head(v-if="blok.headLeft || blok.headRight")
			span {{ blok.headLeft }}
			span {{ blok.headRight }}
		.area(ref="$area")
			.layer.cad
				imageItem(:blok="blok.cad" :priority="true" sizes="(max-width: 700px) 100vw, 680px")
			.layer.photo
				imageItem(:blok="blok.photo" :priority="true" sizes="(max-width: 700px) 100vw, 680px")
				span.tag(v-if="blok.photoTag") {{ blok.photoTag }}
			.line(aria-hidden="true")
			button.knob(type="button" :aria-label="blok.knobLabel || 'Trascina per confrontare'" @pointerdown="onDown" @pointermove="onMove" @pointerup="onUp" @pointercancel="onUp" @keydown="onKey" :class="{dragging}")
				Icon(name="gotham:arrow-right" aria-hidden="true")
	.ctrl
		span {{ blok.cadLabel }}
		input(type="range" min="0" max="100" v-model.number="split" :aria-label="blok.rangeLabel || 'Sposta il confronto'")
		span {{ blok.photoLabel }}
</template>
<script setup>
	const {blok} = defineProps(["blok"]);
	const split = ref(50);
	const dragging = ref(false);
	const $area = ref();
	const clamp = (v) => Math.min(100, Math.max(0, v));
	const fromPointer = (e) => {
		const r = $area.value.getBoundingClientRect();
		split.value = clamp(((e.clientX - r.left) / r.width) * 100);
	};
	const onDown = (e) => {
		dragging.value = true;
		try { e.currentTarget.setPointerCapture(e.pointerId); } catch (err) {}
		fromPointer(e);
		e.preventDefault();
	};
	const onMove = (e) => { if (dragging.value) fromPointer(e); };
	const onUp = () => { dragging.value = false; };
	const onKey = (e) => {
		if (e.key === 'ArrowLeft') { split.value = clamp(split.value - 5); e.preventDefault(); }
		if (e.key === 'ArrowRight') { split.value = clamp(split.value + 5); e.preventDefault(); }
	};
</script>
<style lang="scss">
.BodyCompare{
	position: relative;
	display: grid;
	gap: 1.4rem;
	width: 100%;
	max-width: 68rem;
	margin: 0 auto;
	.frame{
		overflow: hidden;
		border-radius: 2.2rem;
		background: $white;
		box-shadow: 0 30px 80px -30px rgba(17, 34, 39, .45), 0 0 0 1px rgba(11, 11, 15, .05);
	}
	.head{
		display: flex;
		justify-content: space-between;
		gap: .8rem;
		padding: 1.2rem 1.8rem;
		border-bottom: 1px solid $line;
		font-family: $font-mono;
		font-size: 1.15rem;
		letter-spacing: .04em;
		color: $muted;
	}
	.area{
		position: relative;
		aspect-ratio: 1448 / 1086;
		overflow: hidden;
		background-color: $white;
		background-image: linear-gradient(rgba($petrol,.07) 1px, transparent 1px), linear-gradient(90deg, rgba($petrol,.07) 1px, transparent 1px);
		background-size: 4.1436% 5.5249%;
	}
	.layer{
		position: absolute;
		inset: 0;
		.imageItem{
			width: 100%;
			height: 100%;
			svg, img{
				display: block;
				width: 100%;
				height: 100%;
				object-fit: cover;
				user-select: none;
				-webkit-user-drag: none;
				pointer-events: none;
			}
		}
		&.photo{
			clip-path: inset(0 0 0 var(--split));
			background: #E4E4E4;
		}
	}
	.tag{
		position: absolute;
		right: 1.6rem;
		bottom: 1.2rem;
		font-family: $font-mono;
		font-size: 1.1rem;
		letter-spacing: .06em;
		text-transform: uppercase;
		color: #626C70;
	}
	.line{
		position: absolute;
		top: 0;
		bottom: 0;
		left: var(--split);
		width: 2px;
		margin-left: -1px;
		background: $ink;
		pointer-events: none;
	}
	.knob{
		position: absolute;
		top: 50%;
		left: var(--split);
		width: 4.8rem;
		height: 4.8rem;
		margin: -2.4rem 0 0 -2.4rem;
		padding: 0;
		display: grid;
		place-items: center;
		border: 0;
		border-radius: 50%;
		background: $ink;
		color: $white;
		cursor: grab;
		touch-action: none;
		box-shadow: 0 6px 20px -6px rgba(0,0,0,.45), 0 0 0 4px rgba(255,255,255,.7);
		transition: transform .15s;
		&:hover{ transform: scale(1.08); }
		&.dragging{ cursor: grabbing; transform: scale(1.12); }
		.iconify{ font-size: 2.2rem; }
	}
	.ctrl{
		display: flex;
		align-items: center;
		gap: 1.2rem;
		padding: 1rem 1.6rem;
		background: rgba(255,255,255,.75);
		border-radius: 99rem;
		font-size: 1.3rem;
		font-weight: 600;
		letter-spacing: .06em;
		text-transform: uppercase;
		input{
			flex: 1;
			min-width: 0;
			accent-color: $teal;
		}
	}
}
</style>
