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
import { defineComponent } from 'vue'
import ITitleBanner from '../types/titlebanner.interfaces'

const tBanner: ITitleBanner[] = [
  { name: 'User1', photo: './img/user_1.png' },
  { name: 'User2', photo: './img/user_2.png' },
  { name: 'User3', photo: './img/user_3.png' }
]

export default defineComponent({
  name: 'TitleBanner',
  data () {
    return {
      items: tBanner
    }
  }
})
</script>
