<template lang="pug">
base-content(title="kanban")
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BaseContent from '../components/BaseContent.vue'

export default defineComponent({
  name: 'Kanban',
  components: {
    BaseContent
  }
})
</script>
