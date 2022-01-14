<template lang="pug">
base-content(title="kanban")
  .buttonsSection
    button.findButton(title="Find task" v-if="formShow" @click="formShow = !formShow")
      img(src="img/find.png" alt="Find")
    button.findButton(title="Clear find" v-if="clearButtonShow" @click="getDataAdd")
      img(src="img/clear_find.png" alt="Find")
    p.resultCaption(v-if="clearButtonShow") Find {{findText}} for:
    span.resultValue(v-if="clearButtonShow") {{findResult}}
  modal-find(v-if="!formShow"
  titleForm="Find data"
  @closeModal="getCloseFindWindow"
  @findTasksParams="fromFind($event)")
  task-details-modal(v-if="!detailsShow"
  titleForm="Details data"
  :itemIndex="taskIndex"
  :photo="items[taskIndex].photo"
  :name="items[taskIndex].name"
  :message="items[taskIndex].message"
  :status="items[taskIndex].status"
  :time="items[taskIndex].time"
  :editData="editableComponent(items[taskIndex].status)"
  @closeModal="getDataAdd"
  @closeEditModal="getDataAdd")
  .headSection
    .headItem
      .headItemRow
        p.headCaption To Do
        span.headCaptionCount Cards count: {{countToDo}}
    .headItem
      .headItemRow
        p.headCaption In Progress
        span.headCaptionCount Cards count: {{countInProgress}}
    .headItem
      .headItemRow
        p.headCaption Done
        span.headCaptionCount Cards count: {{countDone}}
  hr
  .headSection
    .headItem(@dragenter.prevent
      @dragover.prevent
      @drop="onDropToDo($event)"
      :class="{cardItem: checkItems(itemsToDo)}")
      p.dropCaption(v-if="checkItems(itemsToDo)") Drop here...
      div(v-for="(item, i) in itemsToDo"
      :key="'col1'+i")
        kanban-task(
        draggable="true"
        :name="item.name"
        :title="item.name"
        :status="item.status"
        :date="item.time"
        :overTime="isOverTime(item.time)"
        :oneDayTime="isOneDayTime(item.time)"
        @dragstart="onDrag($event, item.listIndex)"
        @getDetailsTaskIndex="taskDetails(item.listIndex)")
    .headItem(@dragenter.prevent
      @dragover.prevent
      @drop="onDropInprogress($event)"
      :class="{cardItem: checkItems(itemsInProgress)}")
      p.dropCaption(v-if="checkItems(itemsInProgress)") Drop here...
      div(v-for="(item, i) in itemsInProgress"
      :key="'col2'+i")
        kanban-task(
        draggable="true"
        :name="item.name"
        :title="item.name"
        :status="item.status"
        :date="item.time"
        :overTime="isOverTime(item.time)"
        :oneDayTime="isOneDayTime(item.time)"
        @dragstart="onDrag($event, item.listIndex)"
        @getDetailsTaskIndex="taskDetails(item.listIndex)")
    .headItem(@dragenter.prevent
      @dragover.prevent
      @drop="onDropDone($event)"
      :class="{cardItem: checkItems(itemsDone)}")
      p.dropCaption(v-if="checkItems(itemsDone)") Drop here...
      div(v-for="(item, i) in itemsDone"
      :key="'col3'+i")
        kanban-task(
        :name="item.name"
        :title="item.name"
        :status="item.status"
        :date="item.time"
        :overTime="false"
        :oneDayTime="false"
        @dragstart="onDrag($event, item.listIndex)"
        @getDetailsTaskIndex="taskDetails(item.listIndex)")
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'
import BaseContent from '../components/BaseContent.vue'
import KanbanTask from '../components/contentKanban/KanbanTask.vue'
import TaskDetailsModal from '../modals/TaskDetailsModal.vue'
import ModalFind from '../modals/ModalFind.vue'
import ITasks from '../types/tasks.interfaces'
import { todosStatus, todosIcons } from '../types/enums'
import { useDetails, useEditable, useLoadData } from '../components/use/methodsUseCards'

export default defineComponent({
  name: 'Kanban',
  components: {
    BaseContent,
    KanbanTask,
    TaskDetailsModal,
    ModalFind
  },
  setup () {
    const itemsToDo = ref([] as ITasks[])
    const itemsInProgress = ref([] as ITasks[])
    const itemsDone = ref([] as ITasks[])
    const newItemsToDo = ref([] as ITasks[])
    const newItemsInProgress = ref([] as ITasks[])
    const newItemsDone = ref([] as ITasks[])
    const formShow = ref(true)
    const clearButtonShow = ref(false)
    const findText = ref('')
    const findResult = ref('')
    const store = useStore()

    const { items } = useLoadData()

    const { detailsShow, taskIndex, taskDetails } = useDetails(true)
    const { editableComponent } = useEditable()

    const countToDo = computed(() => {
      return itemsToDo.value.length
    })
    const countInProgress = computed(() => {
      return itemsInProgress.value.length
    })
    const countDone = computed(() => {
      return itemsDone.value.length
    })

    createListsData()

    function createListsData () {
      items.value = store.state.tasks.itemData
      itemsToDo.value = getFilteredArray(todosStatus.todo)
      itemsInProgress.value = getFilteredArray(todosStatus.inprogress)
      itemsDone.value = getFilteredArray(todosStatus.done)
      clearButtonShow.value = false
    }

    function getFilteredArray (status: todosStatus) {
      return items.value.filter((element: any, key: number) => {
        element.listIndex = key
        return element.status === status
      })
    }

    function getDataAdd () {
      createListsData()
      getCloseFindWindow()
    }

    function getCloseFindWindow () {
      formShow.value = true
      detailsShow.value = true
    }

    function onDrag (e: DragEvent, value: string) {
      if (e.dataTransfer) {
        e.dataTransfer.dropEffect = 'move'
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.setData('dragItem', value)
      }
    }

    function onDropToDo (e: DragEvent) {
      if (e.dataTransfer) {
        const itemDragIndex = parseInt(e.dataTransfer.getData('dragItem'))
        items.value[itemDragIndex].status = todosStatus.todo
        items.value[itemDragIndex].photo = todosIcons.todo
        store.commit('setData', items.value)
        createListsData()
      }
    }

    function onDropInprogress (e: DragEvent) {
      if (e.dataTransfer) {
        const itemDragIndex = parseInt(e.dataTransfer.getData('dragItem'))
        items.value[itemDragIndex].status = todosStatus.inprogress
        items.value[itemDragIndex].photo = todosIcons.inprogress
        store.commit('setData', items.value)
        createListsData()
      }
    }

    function onDropDone (e: DragEvent) {
      if (e.dataTransfer) {
        const itemDragIndex = parseInt(e.dataTransfer.getData('dragItem'))
        items.value[itemDragIndex].status = todosStatus.done
        items.value[itemDragIndex].photo = todosIcons.done
        store.commit('setData', items.value)
        createListsData()
      }
    }

    function checkItems (items: ITasks[]) {
      return !items.length
    }

    function parseDataNow (value: string) {
      const dd = value.slice(0, 2)
      const mm = value.slice(3, 5)
      const yy = value.slice(6)
      const getDate = new Date(`20${yy}-${mm}-${dd}`)
      const nowDate = new Date()
      return Math.ceil((getDate.getTime() - nowDate.getTime()) / (1000 * 60 * 60 * 24))
    }

    function isOverTime (value: string) {
      return parseDataNow(value) < 0
    }

    function isOneDayTime (value: string) {
      return parseDataNow(value) === 1
    }

    function parseDateValueToInt (value: string) {
      return parseInt(value.replace(/[^0-9]/g, ''))
    }

    function parseDateForItem (value: string) {
      const day = value.slice(0, 2)
      const month = value.slice(3, 5)
      const year = value.slice(6)
      return parseInt('20' + year + month + day)
    }

    function fromFind (findValue: string) {
      clearButtonShow.value = true
      if (findValue.length === 1) {
        findText.value = 'title'
        findResult.value = findValue[0]
        newItemsToDo.value = itemsToDo.value.filter((item) => {
          return item.name.includes(findValue[0])
        })
        newItemsInProgress.value = itemsInProgress.value.filter((item) => {
          return item.name.includes(findValue[0])
        })
        newItemsDone.value = itemsDone.value.filter((item) => {
          return item.name.includes(findValue[0])
        })
      } else {
        findText.value = 'date'
        findResult.value = 'from ' + findValue[0] + ' to ' + findValue[1]
        newItemsToDo.value = itemsToDo.value.filter((item) => {
          return parseDateForItem(item.time) >= parseDateValueToInt(findValue[0]) &&
          parseDateForItem(item.time) <= parseDateValueToInt(findValue[1])
        })
        newItemsInProgress.value = itemsInProgress.value.filter((item) => {
          return parseDateForItem(item.time) >= parseDateValueToInt(findValue[0]) &&
          parseDateForItem(item.time) <= parseDateValueToInt(findValue[1])
        })
        newItemsDone.value = itemsDone.value.filter((item) => {
          return parseDateForItem(item.time) >= parseDateValueToInt(findValue[0]) &&
          parseDateForItem(item.time) <= parseDateValueToInt(findValue[1])
        })
      }
      itemsToDo.value = newItemsToDo.value
      itemsInProgress.value = newItemsInProgress.value
      itemsDone.value = newItemsDone.value
      getCloseFindWindow()
    }

    return {
      items,
      itemsToDo,
      itemsInProgress,
      itemsDone,
      newItemsToDo,
      newItemsInProgress,
      newItemsDone,
      formShow,
      clearButtonShow,
      detailsShow,
      taskIndex,
      getFilteredArray,
      taskDetails,
      getDataAdd,
      getCloseFindWindow,
      editableComponent,
      onDrag,
      onDropToDo,
      onDropInprogress,
      onDropDone,
      checkItems,
      parseDataNow,
      isOverTime,
      isOneDayTime,
      countToDo,
      countInProgress,
      countDone,
      fromFind,
      findText,
      findResult
    }
  }
})
</script>

<style lang="scss" scoped>
$c87: #878787;
$c9: #1c9acc;

@mixin contextDisplay () {
  display: flex;
  justify-content: center;
}

.buttonsSection {
  display: flex;
  align-items: center;
  margin: 0 0 2rem 2rem;
}

.dropCaption {
  font-size: 1.4rem;
  color: $c87;
}

.findButton {
  background: none;
  border: none;
  cursor: pointer;
  & img {
    opacity: 0.4;
    transition: 0.3s;
    &:hover {
      opacity: 1;
    }
  }
}

.headSection {
  padding: 0;
  @include contextDisplay();
  flex-direction: row;
  align-items: flex-start;
}

.headItem {
  margin: 0 0.5rem;
  width: 30%;
  @include contextDisplay();
  flex-direction: column;
  align-items: stretch;
}

.headItemRow {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: center;
  text-align: center;
  margin-bottom: 0.4rem;
  border-left: 0.1rem dashed $c87;
  border-right: 0.1rem dashed $c87;
}

.cardItem {
  margin-top: 1rem;
  background-color: #ffe;
  border: 0.1rem dashed $c87;
  align-items: center;
  transition: 0.3s;
    &:hover {
      border: 0.1rem dashed silver;
      background-color: #fffffc;
    }
}

.headCaption {
  font-size: 1.6rem;
  font-weight: bold;
  color: $c87;
  margin: 0 0 0.4rem;
}

.headCaptionCount {
  font-size: 1.2rem;
  color: $c9;
  margin: 0 0 0.4rem;
  font-style: italic;
}

.resultCaption {
  font-size: 1.4rem;
  margin-left: 1rem;
  font-style: italic;
}

.resultValue {
  font-size: 1.4rem;
  margin-left: 0.5rem;
  font-weight: bold;
  color: $c9;
}

hr {
  margin: 0 2.5rem;
  opacity: 0.3;
  border-style: dashed;
}

</style>
