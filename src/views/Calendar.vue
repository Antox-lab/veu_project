<template lang="pug">
base-content(title="calendar")
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BaseContent from '../components/BaseContent.vue'

export default defineComponent({
  name: 'Calendar',
  components: {
    BaseContent
  }
})
</script>
