<template lang="pug">
.baseSection
  - const dataRoute = ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.']
  each name, key in dataRoute
    - if (key === 0 || key === 6)
      .contextSection.contextSectionWorkEnd
          h1=name
    - else
      .contextSection
          h1=name
hr
.baseSection.baseSectionWrap
  .contextSectionWrap(
  v-for="(item, i) in itemsData"
  :key="i"
  :class="{isDay: item.day != 0}")
    h2(v-if="item.day != 0") {{item.day}}
    .contentWrap(v-if="item.indexes && item.indexes.length")
      .contentTask(
      v-for="(item, i) in item.indexes"
      :key="'d'+i"
      :class="{colorTodo: item.color == 0, colorInprogress: item.color == 1, colorDone: item.color == 2}"
      @click="modalDataShow(item.index)")
        h2.contentTitle {{item.name}}
task-details-modal(v-if="!detailsShow"
  titleForm="Details data"
  :itemIndex="taskIndex"
  :photo="items[taskIndex].photo"
  :name="items[taskIndex].name"
  :message="items[taskIndex].message"
  :status="items[taskIndex].status"
  :time="items[taskIndex].time"
  :editData="false"
  @closeModal="getDataAdd")
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useStore } from 'vuex'
import TaskDetailsModal from '../../modals/TaskDetailsModal.vue'
import { todosStatus } from '../../types/enums'
import { useDetails, useLoadData } from '../use/methodsUseCards'

export default defineComponent({
  name: 'ContentCalendarField',
  components: {
    TaskDetailsModal
  },
  setup () {
    const store = useStore()
    const itemsData = ref([] as any[])
    const itemsCount = ref(42)
    const statusColor = ref(0)

    const { items } = useLoadData()
    const { detailsShow, taskIndex } = useDetails(true)

    function buildCalendar (yy: number, mm: number) {
      const monthDays = []
      const date = new Date(yy, mm, 1)
      const month = date.getMonth()
      const year = date.getFullYear()
      const daysCount = new Date(year, month + 1, 0).getDate()
      const firstDayPosition = new Date(year, month, 1).getDay()
      for (let i = 0; i < itemsCount.value; i++) {
        if (i < firstDayPosition || i > (firstDayPosition + daysCount - 1)) {
          monthDays.push({
            day: 0
          })
        } else {
          const currentDate = setParseDate(i - firstDayPosition + 1, month + 1, year)
          const currentObject = [] as any[]
          items.value.forEach((item: any, key: number) => {
            if (currentDate === item.addDate) {
              currentObject.push({
                name: item.name,
                index: key,
                color: getStatusColor(item.status)
              })
            }
          })
          monthDays.push({
            day: i - firstDayPosition + 1,
            indexes: currentObject
          })
        }
      }
      itemsData.value = monthDays
    }

    buildCalendar(store.state.calendar.positionJahr, store.state.calendar.positionMonth)

    watch(() => store.state.calendar.positionMonth, () => {
      buildCalendar(store.state.calendar.positionJahr, store.state.calendar.positionMonth)
    })

    function setParseDate (day: number, month: number, year: number) {
      const dd = fixDateZero(day)
      const mm = fixDateZero(month)
      return `${dd}.${mm}.${year}`
    }

    function fixDateZero (value: number) {
      if (value < 10) {
        return '0' + value
      }
      return value
    }

    function modalDataShow (index: number) {
      detailsShow.value = false
      taskIndex.value = index
    }

    function getDataAdd () {
      detailsShow.value = true
    }

    function getStatusColor (status: string) {
      switch (status) {
        case todosStatus.todo: {
          return 0
        }
        case todosStatus.inprogress: {
          return 1
        }
        default: {
          return 2
        }
      }
    }

    return {
      items,
      statusColor,
      modalDataShow,
      getDataAdd,
      detailsShow,
      taskIndex,
      itemsData
    }
  }
})
</script>

<style lang="scss" scoped>
$task: #1c9acc;

@mixin content() {
  color: gray;
  border: 0.1rem solid gray;
  margin: 0.2rem 0;
  width: 13.5%;
}

.baseSection {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 0.2rem 2rem;
}

.baseSectionWrap {
  flex-wrap: wrap;
}

.colorTodo {
  background-color: SaddleBrown;
}

.colorInprogress {
  background-color: blue;
}

.colorDone {
  background-color: green;
}

.contextSection {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fffff1;
  @include content();
  height: 3.5rem;
  padding: 1rem 0;
}

.contextSectionWorkEnd {
  background-color: #ffebeb;
}

.contextSectionWrap {
  display: flex;
  justify-content: space-between;
  border-radius: 0.4rem;
  @include content();
  height: 5rem;
  padding: 0;
}

.contentTask {
  display: flex;
  // background-color: $task;
  border-radius: 0.6rem;
  margin: 0.1rem;
  padding: 0 0.1rem;
  width: 60%;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background-color: gray;
  }
}

.contentTitle {
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.contentWrap {
  display: flex;
  flex-direction: column;
}

.isDay {
  background-color: #e5fbff;
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
  color: black;
  margin: 0.4rem 0;
}

h2 {
  font-size: 1rem;
  font-weight: bold;
  color: $task;
  margin: 0.2rem;
}

hr {
  margin: 0.2rem 2rem;
  opacity: 0.3;
  border-style: dashed;
}
</style>
