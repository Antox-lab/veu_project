<template lang="pug">
.toolInfo
  .toolUserInfo
    h1#complitedCount.pointerCursor(@click="setTasks") {{comlitedTasks}}
    h2#complitedStatus Completed Tasks
  .toolUserInfo
    h1#openCount.pointerCursor(@click="goToTasks") {{openTasks}}
    h2#openStatus Open Tasks
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ISidebarTaskStatus from '../types/sidebartasksstatus.interfaces'

const dataTasks: ISidebarTaskStatus = {
  comlitedTasks: 372,
  openTasks: 11
}

export default defineComponent({
  name: 'SidebarTasksStatus',
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
    goToTasks: function () {
      this.openTasks > 0 ? this.$router.push('/Tasks') : alert('Sorry, there are no open tasks!')
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

<style lang="scss">

#complitedCount,
#openCount {
  color: #fff;
  font-size: 1.4rem;
  padding-bottom: 0.2rem;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

#complitedStatus,
#openStatus {
  color: #fff;
  opacity: 0.5;
  font-size: 1.2rem;
}
</style>
