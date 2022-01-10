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
import IHeaderTitlebanner from '../types/headertitlebanner.interfaces'

const titleBannerItems: IHeaderTitlebanner[] = [
  { name: 'User1', photo: './img/user_1.png' },
  { name: 'User2', photo: './img/user_2.png' },
  { name: 'User3', photo: './img/user_3.png' }
]

export default defineComponent({
  name: 'HeaderTitlebanner',
  setup () {
    const items = ref(titleBannerItems)

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
