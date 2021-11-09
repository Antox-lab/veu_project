<template lang="pug">
content-bar(title="files")
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ContentBar from '../components/ContentBar.vue'

export default defineComponent({
  name: 'Files',
  components: {
    ContentBar
  }
})
</script>
