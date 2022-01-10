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
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import ISidebarTaskStatus from '../types/sidebartasksstatus.interfaces'

const dataTasks: ISidebarTaskStatus = {
  comlitedTasks: 372,
  openTasks: 11
}

export default defineComponent({
  name: 'SidebarTasksStatus',
  setup () {
    const comlitedTasks = ref(dataTasks.comlitedTasks)
    const openTasks = ref(dataTasks.openTasks)
    const router = useRouter()

    function setTasks () {
      openTasks.value > 0 ? isAboveZero() : alert('Sorry, there are no open tasks!')
    }

    function goToTasks () {
      openTasks.value > 0 ? router.push('/Tasks') : alert('Sorry, there are no open tasks!')
    }

    function isAboveZero () {
      if (confirm('Are you sure you want to change the number of tasks?')) {
        comlitedTasks.value += 1
        openTasks.value -= 1
      }
    }

    return {
      comlitedTasks,
      openTasks,
      setTasks,
      goToTasks,
      isAboveZero
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
