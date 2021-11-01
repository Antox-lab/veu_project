<template>
<div>
    <h2 class="taskName">{{name}}</h2>
    <div class="messageSection">
      <img class="messageIcon" :src=image :alt=alt :title=title />
      <p class="messageText">
        {{message}}
      </p>
      <span class="messageTime">{{time}}</span>
    </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TasksToday',
  props: {
    name: String,
    image: String,
    message: String,
    time: String,
    alt: String,
    title: String
  }
})
</script>

<style lang="scss">
.taskName {
  margin: 1rem 0 0 10rem;
  font-style: italic;
  opacity: 0.8;
}
</style>
