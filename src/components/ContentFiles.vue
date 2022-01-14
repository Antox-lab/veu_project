<template lang="pug">
.contentSection
  .numberSection
    h1 #
  hr.sectionLine.headLine
  .nameSection
    h1 Name
hr.sectionLine.headLine
.dataSection(v-for="(item, i) in items" :key="'level_'+i")
  div(v-if="item.images")
    div(v-for="(im, i) in item.images" :key="i")
      .contentSection(:class="{sectionColor: i % 2 === 0}")
        .numberSection
          h2 {{i + 1}}
        .nameDataSection
          h2 {{im.name}}
      hr.sectionLine
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import TaskDetailsModal from '../modals/TaskDetailsModal.vue'
import IActivity from '../types/activity.interfaces'

export default defineComponent({
  name: 'ContentFiles',
  components: {
    TaskDetailsModal
  },
  setup () {
    const store = useStore()
    const items = ref(store.state.activity.dataActivity as IActivity[])

    return {
      items
    }
  }
})
</script>

<style lang="scss" scoped>
$line: #777;

@mixin sections($width) {
  width: $width;
  margin: 0.2rem;
  text-align: center;
  align-content: center;
}

.contentSection {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 2rem;
}

.dataSection {
  margin: 0.2rem 0;
}

.nameSection {
  @include sections(85%);
}

.headLine {
  opacity: 0.3;
  border-style: dashed;
}

.numberSection {
  @include sections(15%);
}

.sectionColor {
  background-color: #eee;
}

.sectionLine {
  margin: 0.2rem 2rem;
}

.nameDataSection {
  width: 80%;
  margin: 0.2rem;
  align-content: center;
}

h1 {
  font-size: 1.6rem;
  font-weight: bold;
  color: $line;
  margin: 0.2rem;
}

h2 {
  font-size: 1.4rem;
  font-weight: normal;
  font-style: italic;
  color: $line;
  margin: 0.2rem;
}
</style>
