<template lang="pug">
transition(name="carnival")
  .cardSection(v-if="showAnimate"
    :class="{owerTimeAlert: overTime}")
    .oneDaIindicate(v-if="oneDayTime") !
    img(:src="photo" :alt="status" :title="status")
    .infoSection
      h2(:title="title") {{name}}
      .dateSection
        div
          span Completed date:!{' '}
          span.dateFormat {{date}}
        button(title="Details")
          img(src="img/details_small.png" alt="Details" @click="getDetailsTaskIndex")
</template>

<script lang="ts">
import { defineComponent, PropType, ref, onMounted } from 'vue'
import { todosStatus, todosIcons } from '../../types/enums'

export default defineComponent({
  name: 'KanbanTask',
  props: {
    name: String,
    title: String,
    photo: String as PropType<todosIcons>,
    date: String,
    status: String as PropType<todosStatus>,
    overTime: Boolean,
    oneDayTime: Boolean
  },
  setup (props, { emit }) {
    const showAnimate = ref(false)

    onMounted(() => {
      showAnimate.value = true
    })

    function getDetailsTaskIndex () {
      emit('getDetailsTaskIndex')
    }

    return {
      showAnimate,
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
  margin-bottom: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cardSection {
    position: relative;
    margin: 1rem 0 0 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: #ccc;
    border-radius: 0.7rem;
    width: 100%;
}

.dateFormat {
  font-weight: bold;
  color: #1c9acc;
}

.dateSection {
  display: flex;
  justify-content: space-between;
  align-items: center;
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

.oneDaIindicate {
  display: flex;
  position: absolute;
  width: 1.3rem;
  height: 1.3rem;
  left: 0.5rem;
  top: 0.5rem;
  border-radius: 1rem;
  background-color: orange;
  color: white;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: bold;
}

.owerTimeAlert {
  background-color: #faa;
}

.infoSection {
  margin: 0.5rem;
  padding: 0.5rem;
  background-color: #eee;
  border-radius: 0.5rem;
  width: 65%;
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

</style>
