<template lang="pug">
base-content(title="kanban")
  button.findButton(title="Find task" v-if="formShow" @click="formShow = !formShow")
    img(src="img/find.png" alt="Find")
  modal-find(v-if="!formShow"
  titleForm="Find data"
  @closeModal="getDataAdd")
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
        :photo="item.photo"
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
        :photo="item.photo"
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
        :photo="item.photo"
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
import BaseContent from '../components/BaseContent.vue'
import KanbanTask from '../components/contentKanban/KanbanTask.vue'
import TaskDetailsModal from '../modals/TaskDetailsModal.vue'
import ModalFind from '../modals/ModalFind.vue'
import ITasks from '../types/tasks.interfaces'
import { todosStatus, todosIcons } from '../types/enums'

export default defineComponent({
  name: 'Kanban',
  components: {
    BaseContent,
    KanbanTask,
    TaskDetailsModal,
    ModalFind
  },
  setup () {
    const items = ref([] as ITasks[])
    const itemsToDo = ref([] as ITasks[])
    const itemsInProgress = ref([] as ITasks[])
    const itemsDone = ref([] as ITasks[])
    const formShow = ref(true)
    const detailsShow = ref(true)
    const taskIndex = ref(0)

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
      const data = sessionStorage.getItem('data')
      if (data) {
        items.value = JSON.parse(data)
        itemsToDo.value = getFilteredArray(data, todosStatus.todo)
        itemsInProgress.value = getFilteredArray(data, todosStatus.inprogress)
        itemsDone.value = getFilteredArray(data, todosStatus.done)
      }
    }

    function getFilteredArray (data: string, status: todosStatus) {
      return JSON.parse(data).filter((element: any, key: number) => {
        element.listIndex = key
        return element.status === status
      })
    }

    function taskDetails (i: number) {
      detailsShow.value = false
      taskIndex.value = i
    }

    function getDataAdd () {
      const data = sessionStorage.getItem('data')
      if (data) {
        items.value = JSON.parse(data)
      }
      createListsData()
      formShow.value = true
      detailsShow.value = true
    }

    function editableComponent (status: string) {
      return status !== todosStatus.done
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
        sessionStorage.setItem('data', JSON.stringify(items.value))
        createListsData()
      }
    }

    function onDropInprogress (e: DragEvent) {
      if (e.dataTransfer) {
        const itemDragIndex = parseInt(e.dataTransfer.getData('dragItem'))
        items.value[itemDragIndex].status = todosStatus.inprogress
        items.value[itemDragIndex].photo = todosIcons.inprogress
        sessionStorage.setItem('data', JSON.stringify(items.value))
        createListsData()
      }
    }

    function onDropDone (e: DragEvent) {
      if (e.dataTransfer) {
        const itemDragIndex = parseInt(e.dataTransfer.getData('dragItem'))
        items.value[itemDragIndex].status = todosStatus.done
        items.value[itemDragIndex].photo = todosIcons.done
        sessionStorage.setItem('data', JSON.stringify(items.value))
        createListsData()
      }
    }

    function checkItems (items: ITasks[]) {
      if (items.length) {
        return false
      }
      return true
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
      if (parseDataNow(value) < 0) {
        return true
      }
      return false
    }

    function isOneDayTime (value: string) {
      if (parseDataNow(value) === 1) {
        return true
      }
      return false
    }

    return {
      items,
      itemsToDo,
      itemsInProgress,
      itemsDone,
      formShow,
      detailsShow,
      taskIndex,
      getFilteredArray,
      taskDetails,
      getDataAdd,
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
      countDone
    }
  }
})
</script>

<style lang="scss" scoped>
$c87: #878787;

@mixin contextDisplay () {
  display: flex;
  justify-content: center;
}

.dropCaption {
  font-size: 1.4rem;
  color: $c87;
}

.findButton {
  background: none;
  border: none;
  cursor: pointer;
  margin: 0 0 2rem 2rem;
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
  color: #1c9acc;
  margin: 0 0 0.4rem;
  font-style: italic;
}

hr {
  margin: 0 2.5rem;
  opacity: 0.3;
  border-style: dashed;
}

</style>
