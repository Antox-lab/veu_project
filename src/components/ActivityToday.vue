<template>
<div>
    <div class="messageSection">
      <img class="messageIcon" :src=image alt="Check" />
      <p class="messageText">
        {{message}}
      </p>
      <span class="messageTime">{{time}}</span>
    </div>
    <div v-if="outpost">
      <p class="messageOutpost">{{outpost}}</p>
    </div>
    <div v-if="images" class="messageOutpostImages">
        <img class="outpostImages pointerCursor"
        v-for="(img, i) in images"
        :src="img.photo"
        :alt="img.name"
        :key="i"
        @click="getImageIndex(i)"/>
    </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ActivityToday',
  methods: {
    getImageIndex: function (value: number) {
      this.$emit('sendImageIndex', value)
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
