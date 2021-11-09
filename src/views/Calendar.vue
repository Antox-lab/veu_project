<template lang="pug">
content-bar(title="calendar")
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ContentBar from '../components/ContentBar.vue'

export default defineComponent({
  name: 'Calendar',
  components: {
    ContentBar
  }
})
</script>
