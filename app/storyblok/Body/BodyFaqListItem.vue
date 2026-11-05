<template lang="pug">
details.BodyFaqListItem
    summary {{ blok.title }}
    .p
        StoryblokRichText(:document="blok.text" :components="richTextComponents")
</template>
<script setup>
    import RichTextImage from '~/storyblok/system/RichTextImage.vue';
    const {blok} = defineProps(["blok"]);
    const richTextComponents = {image: RichTextImage};
    provideRichTextImageConfig(() => ({document: blok.text, sizes: '(max-width: 500px) 100vw, 50vw'}));
</script>
<style lang="scss">
.BodyFaqListItem{
    border-bottom: 1px solid $line;
    summary{
        display: flex;
        justify-content: space-between;
        gap: 1.6rem;
        padding: 2.2rem 0;
        font-weight: 600;
        font-size: 1.85rem;
        cursor: pointer;
        list-style: none;
        &::-webkit-details-marker{
            display: none;
        }
        &::after{
            content: "+";
            font-weight: 400;
            font-size: 2.4rem;
            line-height: 1;
            color: $magenta;
        }
    }
    &[open] summary::after{
        content: "−";
    }
    .p{
        max-width: 44em;
        padding-bottom: 2.2rem;
        color: $muted;
        font-size: 1.7rem;
    }
}
</style>
