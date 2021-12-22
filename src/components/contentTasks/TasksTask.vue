<template lang="pug">
div(:class="{addTaskAnimate: addAnimate}"
  :ref="(el) => { if (el) animatedRef[positionIndex] = el}")
  h2.taskName {{name}}
  .messageSection
    img.messageIcon(:src="image" :alt="alt" :title="title")
    .messageText {{message}}
    span.messageTime {{time}}
    button.taskButton(title="Delete task" @click="getDeleteTaskIndex")
      img(src="img/trash.png" alt="Trash")
    button.taskButton(title="Detailed task")
      img(src="img/details.png" alt="Details" @click="getDetailsTaskIndex")
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'

export default defineComponent({
  name: 'TasksTask',
  props: {
    name: String,
    image: String,
    message: String,
    time: String,
    alt: String,
    title: String,
    addAnimate: Boolean,
    positionIndex: Number
  },
  setup (props, { emit }) {
    const animatedRef = ref([])
    const slideAnimate = ref(false)

    onMounted(() => {
      animatedRef.value.forEach((element: HTMLElement, key) => {
        setTimeout(() => {
          if (!props.addAnimate) { element.classList.add('listTaskAnimate') }
        }, key * 300)
      })
    })

    function getDeleteTaskIndex () {
      emit('getDeleteTaskIndex')
    }

    function getDetailsTaskIndex () {
      emit('getDetailsTaskIndex')
    }

    return {
      slideAnimate,
      animatedRef,
      getDeleteTaskIndex,
      getDetailsTaskIndex
    }
  }
})
</script>

<style lang="scss">
$c13: #131313;

.messageIcon {
  width: 4rem;
  height: 4rem;
}

.messageText {
  font-size: 1.6rem;
  color: $c13;
  line-height: 2rem;
  padding: 0 0 0 2rem;
  margin: 0;
  width: 42rem;
  height: 5.5rem;
  cursor: pointer;
  transition: 0.3s;
  overflow: hidden;
  position: relative;
  &:hover {
    color: #808080;
  }
  &:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2rem;
    background: linear-gradient(180deg, transparent, #fff 100%);
  }
}

.messageTime {
  font-size: 1.4rem;
  color: $c13;
  text-align: right;
  opacity: 0.7;
  width: 7rem;
}

.taskName {
  margin: 1rem 0 0 10rem;
  font-style: italic;
  opacity: 0.8;
}

.taskButton {
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 2rem;
  padding: 0;
  & img {
    opacity: 0.4;
    transition: 0.3s;
    &:hover {
      opacity: 1;
    }
  }
}

@keyframes addNewTaskFrame {
  from,
  50%,
  to {opacity: 1}
  25%,
  75% {opacity: 0.5}
}

.addTaskAnimate {
  animation-name: addNewTaskFrame;
  animation-duration: 0.6s;
}

@keyframes taskListFrame {
  from,
  to {transform: scale(1, 1)}
  50% {transform: scale(1.05, 1.05)}
}

.listTaskAnimate {
  animation-name: taskListFrame;
  animation-duration: 0.6s;
}
</style>
