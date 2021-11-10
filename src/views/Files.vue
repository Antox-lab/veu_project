<template lang="pug">
base-content(title="files")
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BaseContent from '../components/BaseContent.vue'

export default defineComponent({
  name: 'Files',
  components: {
    BaseContent
  }
})
</script>
