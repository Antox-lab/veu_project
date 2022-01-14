<template lang="pug">
#titleBanner.titleBannersItem
  img.usersIcon(
    v-for="(img, i) in items"
    :src="img.photo"
    :alt="img.name"
    :title="img.name"
    :key="i"
    )
  button.buttons.buttonShare Share
  button.buttons.buttonChat
    img(src="../assets/CombinedShape@1x.svg" alt="Combined")
    |  Chat
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import IHeaderTitlebanner from '../types/headertitlebanner.interfaces'

export default defineComponent({
  name: 'HeaderTitlebanner',
  setup () {
    const store = useStore()
    const items = ref(store.state.header.titleBannerItems as IHeaderTitlebanner[])

    return {
      items
    }
  }
})
</script>

<style lang="scss">
.usersIcon {
  width: 3rem;
  height: 3rem;
  padding-left: 0.5rem;
}
</style>
