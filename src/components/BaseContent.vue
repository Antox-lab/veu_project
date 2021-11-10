<template lang="pug">
.content
  h1.todayCaption {{title}}
  slot
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BaseContent',
  props: {
    title: String
  }
})
</script>

<style lang="scss">
.todayCaption {
  font-size: 1.4rem;
  color: #131313;
  padding: 3.5rem 0 3rem 3rem;
  opacity: 0.5;
  text-transform: uppercase;
}
</style>
