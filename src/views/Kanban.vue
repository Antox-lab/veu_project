<template lang="pug">
content-bar(title="kanban")
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ContentBar from '../components/ContentBar.vue'

export default defineComponent({
  name: 'Kanban',
  components: {
    ContentBar
  }
})
</script>
