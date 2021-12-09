<template lang="pug">
base-content(title="kanban")
  .headSection
    each item in ['To Do', 'In Progress', 'Done']
      .headItem
        p.headCaption=item
  hr
  .headSection
    .headItem
      div(v-for="(item, i) in itemsToDo" :key="i")
        content-kanban(
        :photo="item.photo"
        :name="abbreviatedTitle(item.name)"
        :title="item.name"
        :status="item.status"
        :date="item.time")
    .headItem
      div(v-for="(item, i) in itemsInProgress" :key="i")
        content-kanban(
        :photo="item.photo"
        :name="abbreviatedTitle(item.name)"
        :title="item.name"
        :status="item.status"
        :date="item.time")
    .headItem
      div(v-for="(item, i) in itemsDone" :key="i")
        content-kanban(
        :photo="item.photo"
        :name="abbreviatedTitle(item.name)"
        :title="item.name"
        :status="item.status"
        :date="item.time")
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BaseContent from '../components/BaseContent.vue'
import ContentKanban from '../components/ContentKanban.vue'
import ITasks from '../types/tasks.interfaces'

const kanbanToDoData: ITasks[] = []
const kanbanInProgressData: ITasks[] = []
const kanbanDoneData: ITasks[] = []

export default defineComponent({
  name: 'Kanban',
  components: {
    BaseContent,
    ContentKanban
  },
  data () {
    return {
      itemsToDo: kanbanToDoData,
      itemsInProgress: kanbanInProgressData,
      itemsDone: kanbanDoneData
    }
  },
  methods: {
    getFilteredArray: function (data: string, value: string) {
      return JSON.parse(data).filter((element: any) => {
        return element.status.includes(value)
      })
    },
    abbreviatedTitle: function (value: string) {
      if (value.length > 18) {
        return value.substring(0, 15) + '...'
      }
      return value
    }
  },
  created () {
    const data = sessionStorage.getItem('data')
    if (data) {
      this.itemsToDo = this.getFilteredArray(data, 'To Do')
      this.itemsInProgress = this.getFilteredArray(data, 'In progress')
      this.itemsDone = this.getFilteredArray(data, 'Done')
    }
  }
})
</script>

<style lang="scss" scoped>
$c87: #878787;

@mixin contextDisplay () {
  display: flex;
  justify-content: center;
}

.headSection {
  padding: 0;
  @include contextDisplay();
  align-items: flex-start;
}

.headItem {
  // border-bottom: 0.2rem dotted $c87;
  margin: 0 0.5rem;
  width: 30%;
  @include contextDisplay();
  flex-direction: column;
  align-items: stretch;
}

.headCaption {
  font-size: 1.6rem;
  font-weight: bold;
  color: $c87;
  margin-bottom: 0.4rem;
}

hr {
  margin: 0 2.5rem;
  opacity: 0.3;
  border-style: dashed;
}

</style>
