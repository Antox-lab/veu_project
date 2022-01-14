<template lang="pug">
base-content(title="files")
  content-files
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BaseContent from '../components/BaseContent.vue'
import ContentFiles from '../components/ContentFiles.vue'

export default defineComponent({
  name: 'Files',
  components: {
    BaseContent,
    ContentFiles
  }
})
</script>
