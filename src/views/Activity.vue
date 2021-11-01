<template>
  <div class="content">
    <h1 class="todayCaption">TODAY</h1>
    <div v-for="(item, i) in items" :key="i">
      <ActivityToday
      :image="item.photo"
      :message="item.message"
      :time="item.time"
      :outpost="item.outpost"
      :images="item.images"
      @sendImageIndex="getImageIndex"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ActivityToday from '../components/ActivityToday.vue'

export default defineComponent({
  name: 'Activity',
  components: {
    ActivityToday
  },
  data () {
    return {
      items: [{
        message: 'Darika Samak mark as done Listing on Product Hunt so that we can reach as many potential users',
        photo: 'img/check.png',
        time: '8:40 PM',
        images: [],
        outpost: ''
      },
      {
        message: 'During a project build, it is necessary to evaluate the product design and development against project requirements and outcomes',
        photo: 'img/message.png',
        time: '7:32 PM',
        images: [],
        outpost: 'During a project build, it is necessary to evaluate the product design and development against project requirements and outcomes'
      },
      {
        message: 'Darika Samak uploaded 4 files on An option to search in current projects or in all projects',
        photo: 'img/resend.png',
        time: '6:02 PM',
        images: [
          { name: 'Image1', photo: './img/image_1.png' },
          { name: 'Image2', photo: './img/image_2.png' },
          { name: 'Image3', photo: './img/image_3.png' },
          { name: 'Image4', photo: './img/image_4.png' }
        ],
        outpost: ''
      }
      ]
    }
  },
  methods: {
    getImageIndex (dat: any) {
      this.$emit('sendIndex', dat)
    }
  }
})
</script>
