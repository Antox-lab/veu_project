<template lang="pug">
base-content(title="tasks")
  div(v-for="(item, i) in items" :key="i")
    hr
    content-tasks(:name="i + 1 + '. ' + item.name"
    :image="item.photo"
    :message="item.message"
    :time="item.time"
    :alt="item.alt"
    :title="item.alt")
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BaseContent from '../components/BaseContent.vue'
import ContentTasks from '../components/ContentTasks.vue'
import ITask from '../types/tasks.interfaces'

const taskData: ITask[] = [
  {
    name: 'Vue introduce',
    message: 'Make a project using vue js.',
    photo: 'img/check.png',
    time: '24.10.21',
    alt: 'Done'
  },
  {
    name: 'Components introduce',
    message: 'Create separate components for active content',
    photo: 'img/check.png',
    time: '25.10.21',
    alt: 'Done'
  },
  {
    name: 'Application migration',
    message: 'Save application logic from the previous project',
    photo: 'img/message.png',
    time: '26.10.21',
    alt: 'In process'
  },
  {
    name: 'Data as array',
    message: 'Load content data from a dataset',
    photo: 'img/check.png',
    time: '27.10.21',
    alt: 'Done'
  },
  {
    name: 'GitHub push',
    message: 'Create a repository on GitHub',
    photo: 'img/message.png',
    time: '28.10.21',
    alt: 'In process'
  }
]

export default defineComponent({
  name: 'Tasks',
  components: {
    BaseContent,
    ContentTasks
  },
  data () {
    return {
      items: taskData
    }
  }
})
</script>

<style lang="scss">
hr {
  margin: 0 5rem;
  opacity: 0.3;
  border-style: dashed;
}
</style>
