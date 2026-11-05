<template lang="pug">
footer#MainFooter
	StoryblokComponent(v-if="_footer.body?.length" v-for="item of _footer.body" :blok="item" :key="item._uid")
</template>
<script setup>
	const {blok} = defineProps(["blok"]);
	const { sbEditor } = useStoryblokEditor();
	const { story: {value : { content : _footer } } } = await useAsyncGothamStoryblok('system/mainfooter',{ isEditor: sbEditor.value });
</script>
<style lang="scss">
#MainFooter{
	position: relative;
	width: 100%;
}
</style>
