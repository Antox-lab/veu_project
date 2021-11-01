<template>
    <div class="toolInfo">
        <div class="toolUserInfo">
          <h1 id="complitedCount" class="pointerCursor" @click="setTasks">{{comlitedTasks}}</h1>
          <h2 id="complitedStatus">Completed Tasks</h2>
        </div>
        <div class="toolUserInfo">
          <h1 id="openCount">{{openTasks}}</h1>
          <h2 id="openStatus">Open Tasks</h2>
        </div>
      </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TasksStatus',
  data () {
    return {
      comlitedTasks: 372,
      openTasks: 11
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
