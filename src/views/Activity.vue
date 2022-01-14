<template lang="pug">
base-content(title="activity")
    div(v-for="(item, i) in items" :key="i")
      content-activity(:image="item.photo"
      :message="item.message"
      :time="item.time"
      :outpost="item.outpost"
      :images="item.images")
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import BaseContent from '../components/BaseContent.vue'
import ContentActivity from '../components/ContentActivity.vue'
import IActivity from '../types/activity.interfaces'

export default defineComponent({
  name: 'Activity',
  components: {
    BaseContent,
    ContentActivity
  },
  setup () {
    const store = useStore()
    const items = ref(store.state.activity.dataActivity as IActivity[])

    return {
      items
    }
  }
})
</script>
