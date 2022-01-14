<template lang="pug">
div
    .messageSection
      img.messageIcon(:src="image" alt="Check")
      p.messageText {{message}}
      span.messageTime {{time}}

    div(v-if="outpost")
      p.messageOutpost {{outpost}}
    div.messageOutpostImages(v-if="images")
        img.outpostImages.pointerCursor(
          v-for="(img, i) in images"
          :src="img.imageItem"
          :alt="img.name"
          :key="i"
          @click="getImageIndex({value: i})"
          )
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import IContentActivity from '../types/contentactivity.interfaces'

export default defineComponent({
  name: 'ContentActivity',
  props: {
    image: String,
    message: String,
    outpost: String,
    time: String,
    images: Array
  },
  setup () {
    const store = useStore()

    function getImageIndex (activity: IContentActivity) {
      store.commit('setNotificationCount', activity.value)
    }

    return {
      getImageIndex
    }
  }
})
</script>

<style lang="scss">
$c13: #131313;

.messageIcon {
  width: 4rem;
  height: 4rem;
}

.messageText {
  font-size: 1.6rem;
  color: $c13;
  line-height: 2rem;
  padding: 0 12.5rem 0 2rem;
  margin: 0;
  width: 42rem;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    color: #808080;
  }
}

.messageTime {
  font-size: 1.4rem;
  color: $c13;
  text-align: right;
  opacity: 0.7;
  width: 7rem;
}

.messageOutpostImages {
  display: flex;
  flex-direction: row;
  margin: -1rem 0 3rem 9rem;
}
</style>
