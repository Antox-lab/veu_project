<template lang="pug">
base-content(title="activity")
    div(v-for="(item, i) in items" :key="i")
      content-activity(:image="item.photo"
      :message="item.message"
      :time="item.time"
      :outpost="item.outpost"
      :images="item.images"
      @sendImageIndex="getImageIndex")
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BaseContent from '../components/BaseContent.vue'
import ContentActivity from '../components/ContentActivity.vue'
import IActivity from '../types/activity.interfaces'

const dataActivity: IActivity[] = [
  {
    message: 'Darika Samak mark as done Listing on Product Hunt so that we can reach as many potential users',
    photo: 'img/check.png',
    time: '8:40 PM'
  },
  {
    message:
      'During a project build, it is necessary to evaluate the product design and development against project requirements and outcomes',
    photo: 'img/message.png',
    time: '7:32 PM',
    outpost:
      'During a project build, it is necessary to evaluate the product design and development against project requirements and outcomes'
  },
  {
    message: 'Darika Samak uploaded 4 files on An option to search in current projects or in all projects',
    photo: 'img/resend.png',
    time: '6:02 PM',
    images: [
      { name: 'Image1', imageItem: './img/image_1.png' },
      { name: 'Image2', imageItem: './img/image_2.png' },
      { name: 'Image3', imageItem: './img/image_3.png' },
      { name: 'Image4', imageItem: './img/image_4.png' }
    ]
  }
]

export default defineComponent({
  name: 'Activity',
  components: {
    BaseContent,
    ContentActivity
  },
  data () {
    return {
      items: dataActivity
    }
  },
  methods: {
    getImageIndex (data: number) {
      this.$emit('sendIndex', data)
    }
  }
})
</script>
