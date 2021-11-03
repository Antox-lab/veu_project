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
import IActivityToday from '../types/activitytoday.interfaces'

export default defineComponent({
  name: 'ActivityToday',
  methods: {
    getImageIndex: function (activity: IActivityToday) {
      this.$emit('sendImageIndex', activity.value)
    }
  },
  props: {
    image: String,
    message: String,
    outpost: String,
    time: String,
    images: Array
  }
})
</script>
