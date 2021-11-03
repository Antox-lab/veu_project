<template lang="pug">
.toolInfo
  .toolUserInfo
    h1#complitedCount.pointerCursor(@click="setTasks") {{comlitedTasks}}
    h2#complitedStatus Completed Tasks
  .toolUserInfo
    h1#openCount {{openTasks}}
    h2#openStatus Open Tasks
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ITaskStatus from '../types/tasksstatus.interfaces'

const dataTasks: ITaskStatus = {
  comlitedTasks: 372,
  openTasks: 11
}

export default defineComponent({
  name: 'TasksStatus',
  data () {
    return {
      comlitedTasks: dataTasks.comlitedTasks,
      openTasks: dataTasks.openTasks
    }
  },
  methods: {
    setTasks: function () {
      this.openTasks > 0 ? this.isAboveZero() : alert('Sorry, there are no open tasks!')
    },
    isAboveZero: function () {
      if (confirm('Are you sure you want to change the number of tasks?')) {
        this.comlitedTasks += 1
        this.openTasks -= 1
      }
    }
  }
})
</script>
