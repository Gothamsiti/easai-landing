<template lang="pug">
header#mainHeader(v-if="menu")
    .wrap
        NuxtLink.brand(:to="$__url('/')" :aria-label="label('goToHome', 'Homepage')") {{ menu.brand }}
        nav.links(:aria-label="label('mainNavigation', 'Navigazione principale')")
            StoryblokComponent(v-for="item of menu.itemsLeft" :blok="item" :key="item._uid" v-editable="item")
        .actions
            LanguageSelector
            StoryblokComponent(v-for="item of menu.itemsRight" :blok="item" :key="item._uid" v-editable="item")
</template>
<script setup>
    const { $__ } = useNuxtApp();
    // finché le label non sono su Storyblok $__ restituisce la chiave: in quel caso si usa il fallback
    const label = (key, fallback) => { const s = $__(key); return s && s !== key ? s : fallback; };
    const { sbEditor } = useStoryblokEditor();
    const { story } = await useAsyncGothamStoryblok('system/mainmenu', { isEditor: sbEditor.value });
    const menu = computed(() => story.value?.content || null);
</script>
<style lang="scss">
header#mainHeader{
    position: relative;
    z-index: 10;
    .wrap{
        width: 100%;
        max-width: 114rem;
        margin-inline: auto;
        padding-inline: 2rem;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1.6rem;
        padding-block: 2.2rem;
    }
    .brand{
        font-weight: 700;
        font-size: 1.6rem;
        letter-spacing: -0.01em;
    }
    .links{
        display: flex;
        gap: 2.8rem;
        font-size: 1.47rem;
        .BodyCTA{
            color: $ink;
            &:hover{
                color: $violet;
            }
        }
    }
    .actions{
        display: flex;
        align-items: center;
        gap: 1.6rem;
    }
    @media (max-width: 900px){
        .links{
            display: none;
        }
    }
    @media (max-width: 640px){
        .BodyCTA .icon{
            display: none;
        }
    }
}
</style>
