<template lang="pug">
.baseSection
  .buttonsSection
    button(@click="positionMonth--") ◄
  .contextSection
    h1 {{nameMonth[positionMonth]}} {{positionJahr}}
  .buttonsSection
    button(@click="positionMonth++") ►
hr
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'ContentCalendarNavigate',
  setup () {
    const store = useStore()
    const positionJahr = ref(2022)
    const positionMonth = ref(0)
    const nameMonth = ref([
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'])

    watch(() => positionMonth.value, () => {
      if (positionMonth.value > 11) {
        positionMonth.value = 0
        positionJahr.value++
      }
      if (positionMonth.value < 0) {
        positionMonth.value = 11
        positionJahr.value--
      }
      store.commit('setPositionMonth', positionMonth.value)
      store.commit('setPositionJahr', positionJahr.value)
    })

    return {
      positionJahr,
      positionMonth,
      nameMonth
    }
  }
})
</script>

<style lang="scss" scoped>
.baseSection {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 2rem;
  margin: 0.2rem 2rem;
  background-color: #eee;
}

.buttonsSection {
  color: red;
}

.contextSection {
  color: gray;
}

button {
  font-size: 1.6rem;
  padding: 0 0.5rem;
  background: none;
  border: none;
  color: silver;
  cursor: pointer;
  transition: 0.5s;
  &:hover {
    color: black;
  }
}

h1 {
  font-size: 1.4rem;
  margin: 0.4rem 0;
}

hr {
  margin: 0.2rem 2rem;
  opacity: 0.3;
  border-style: dashed;
}
</style>
