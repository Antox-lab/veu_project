<template lang="pug">
transition(name="carnival")
  .cardSection(v-if="showAnimate"
    :class="{owerTimeAlert: overTime}")
    h2(:title="title") {{name}}
    .infoSection
      .oneDayIindicate(v-if="oneDayTime") !
      img(:src="getImage" :alt="status" :title="status")
      .dateSection
        span Completed date:!{' '}
        span.dateFormat {{completedDate}}
        button(title="Details")
          img(src="img/details_small.png" alt="Details" @click="getDetailsTaskIndex")
</template>

<script lang="ts">
import { defineComponent, PropType, ref, onMounted, computed } from 'vue'
import { todosStatus, todosIcons } from '../../types/enums'

export default defineComponent({
  name: 'KanbanTask',
  props: {
    name: String,
    title: String,
    date: String,
    status: String as PropType<todosStatus>,
    overTime: Boolean,
    oneDayTime: Boolean
  },
  setup (props, { emit }) {
    const showAnimate = ref(false)

    const completedDate = computed(() => {
      return props.date
    })

    const getImage = computed(() => {
      if (props.status === todosStatus.todo) {
        return todosIcons.todo
      } else if (props.status === todosStatus.inprogress) {
        return todosIcons.inprogress
      } else {
        return todosIcons.done
      }
    })

    onMounted(() => {
      showAnimate.value = true
    })

    function getDetailsTaskIndex () {
      emit('getDetailsTaskIndex')
    }

    return {
      showAnimate,
      completedDate,
      getImage,
      getDetailsTaskIndex
    }
  }
})
</script>

<style lang="scss" scoped>
img {
  margin: 0.5rem;
  border-radius: 0.5rem;
}

h2 {
  margin: 0.1rem 0;
  width: 90%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cardSection {
    position: relative;
    margin: 1rem 0 0 0;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    background-color: #ddd;
    border-radius: 0.7rem;
    width: 100%;
    user-select: none;
}

.dateFormat {
  font-weight: bold;
  color: #1c9acc;
}

.dateSection {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 0.2rem;
    & button {
      width: 1.6rem;
      height: 1.6rem;
      border: none;
      border-radius: 0.8rem;
      cursor: pointer;
      padding: 0;
      text-align: center;
        & img {
          margin: 0;
          opacity: 0.4;
          transition: 0.3s;
            &:hover {
              opacity: 1;
            }
        }
    }
}

.oneDayIindicate {
  display: flex;
  position: absolute;
  width: 1.3rem;
  height: 1.3rem;
  left: 0.6rem;
  top: 2.5rem;
  border-radius: 1rem;
  background-color: orange;
  color: white;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: bold;
}

.owerTimeAlert {
  background-color: #ff6666;
}

.infoSection {
  display: flex;
  flex-direction: row;
  margin: 0.5rem;
  background-color: #eee;
  border-radius: 0.5rem;
  width: 95%;
}

@keyframes carnivalFrame {
  from, to, 50% {transform: rotate(0deg)}
  25%, 75% {transform: rotate(2deg)}
}

.carnival-enter-active {
  animation-name: carnivalFrame;
  animation-duration: 0.6s;
}

.carnival-enter-from {
  animation-name: carnivalFrame;
}

//Responsive
@media screen and (max-width: 768px) {
  .dateSection {
    flex-direction: column;
  }

  .infoSection {
    flex-direction: column;
    align-items: center;
  }
}

</style>
