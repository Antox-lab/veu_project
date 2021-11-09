<template lang="pug">
div
  h2.taskName {{name}}
  .messageSection
    img.messageIcon(:src="image" :alt="alt" :title="title")
    p.messageText {{message}}
    span.messageTime {{time}}
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

.taskName {
  margin: 1rem 0 0 10rem;
  font-style: italic;
  opacity: 0.8;
}
</style>
