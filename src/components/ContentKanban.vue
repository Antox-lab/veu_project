<template lang="pug">
transition(name="carnival")
  .cardSection(v-if="showAnimate")
    img(:src="photo" :alt="status" :title="status")
    .infoSection
      h2(:title="title") {{name}}
      .dateSection
        div
          span Completed date:!{' '}
          span.dateFormat {{date}}
        button(title="Details" v-if="editable")
          img(src="../assets/details_small.png" alt="Details" @click="getDetailsTaskIndex")
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'

export default defineComponent({
  name: 'ContentKanban',
  props: {
    name: String,
    title: String,
    photo: String,
    date: String,
    status: String,
    editable: Boolean
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
    margin: 1rem 0 0 0;
    display: flex;
    justify-content: space-between;
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
      width: 2.2rem;
      height: 2.2rem;
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
