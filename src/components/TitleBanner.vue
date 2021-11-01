<template>
<div id="titleBanner" class="titleBannersItem">
  <img class="usersIcon"
  v-for="(img, i) in items"
  :src="img.photo"
  :alt="img.name"
  :title="img.name"
  :key="i"/>
            <button class="buttons buttonShare">Share</button>
            <button class="buttons buttonChat">
              <img src="../assets/CombinedShape@1x.svg" alt="Combined" />
              Chat
            </button>
          </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TitleBanner',
  data () {
    return {
      items: [
        { name: 'User1', photo: './img/user_1.png' },
        { name: 'User2', photo: './img/user_2.png' },
        { name: 'User3', photo: './img/user_3.png' }
      ]
    }
  }
})
</script>
