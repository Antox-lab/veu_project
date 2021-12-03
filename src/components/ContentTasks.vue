<template lang="pug">
div(:class="{addTaskAnimate: addAnimate}")
  h2.taskName(:class="{listTaskAnimate: slideAnimate}") {{name}} {{setSlideAnimate(slideAnimateIndex)}}
  .messageSection
    img.messageIcon(:src="image" :alt="alt" :title="title")
    p.messageText(:class="{listTaskAnimate: slideAnimate}") {{message}}
    span.messageTime {{time}}
    button.trashButton(title="Delete task" @click="getTaskIndex")
      img(src="../assets/trash.png" alt="Trash")
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ContentTasks',
  props: {
    name: String,
    image: String,
    message: String,
    time: String,
    alt: String,
    title: String,
    addAnimate: Boolean,
    slideAnimateIndex: Number
  },
  data () {
    return {
      slideAnimate: false
    }
  },
  methods: {
    getTaskIndex: function () {
      this.$emit('getTaskIndex')
    },
    setSlideAnimate (index: number) {
      if (!this.addAnimate) {
        setTimeout(() => {
          this.slideAnimate = true
        }, index * 200)
      }
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
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    color: #808080;
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

.trashButton {
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 2rem;
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
