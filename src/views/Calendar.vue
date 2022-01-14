<template lang="pug">
base-content(title="calendar")
  content-calendar-navigate
  content-calendar-field
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BaseContent from '../components/BaseContent.vue'
import ContentCalendarField from '../components/сontentCalendar/ContentCalendarField.vue'
import ContentCalendarNavigate from '../components/сontentCalendar/ContentCalendarNavigate.vue'

export default defineComponent({
  name: 'Calendar',
  components: {
    BaseContent,
    ContentCalendarNavigate,
    ContentCalendarField
  }
})
</script>
