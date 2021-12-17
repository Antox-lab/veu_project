<template lang="pug">
base-content(title="kanban")
  base-modal(v-if="!detailsShow" title="Details data" @closeModal="getDataAdd")
    task-details-modal(:itemIndex="taskIndex"
    :photo="items[taskIndex].photo"
    :name="items[taskIndex].name"
    :message="items[taskIndex].message"
    :status="items[taskIndex].status"
    :time="items[taskIndex].time"
    @closeEditModal="getDataAdd")
  .headSection
    each item in ['To Do', 'In Progress', 'Done']
      .headItem
        p.headCaption=item
  hr
  .headSection
    .headItem(@dragenter.prevent
      @dragover.prevent
      @drop="onDropToDo($event)"
      :class="{cardItem: checkItems(itemsToDo)}")
      p.dropCaption(v-if="checkItems(itemsToDo)") Drop here...
      div(v-for="(item, i) in itemsToDo"
      :key="'col1'+i")
        content-kanban(
        draggable="true"
        :photo="item.photo"
        :name="item.name"
        :title="item.name"
        :status="item.status"
        :date="item.time"
        :editable="editableComponent(item.status)"
        @dragstart="onDrag($event, item.listIndex)"
        @getDetailsTaskIndex="taskDetails(item.listIndex)")
    .headItem(@dragenter.prevent
      @dragover.prevent
      @drop="onDropInprogress($event)"
      :class="{cardItem: checkItems(itemsInProgress)}")
      p.dropCaption(v-if="checkItems(itemsInProgress)") Drop here...
      div(v-for="(item, i) in itemsInProgress"
      :key="'col2'+i")
        content-kanban(
        draggable="true"
        :photo="item.photo"
        :name="item.name"
        :title="item.name"
        :status="item.status"
        :date="item.time"
        :editable="editableComponent(item.status)"
        @dragstart="onDrag($event, item.listIndex)"
        @getDetailsTaskIndex="taskDetails(item.listIndex)")
    .headItem(@dragenter.prevent
      @dragover.prevent
      @drop="onDropDone($event)"
      :class="{cardItem: checkItems(itemsDone)}")
      p.dropCaption(v-if="checkItems(itemsDone)") Drop here...
      div(v-for="(item, i) in itemsDone"
      :key="'col3'+i")
        content-kanban(
        :photo="item.photo"
        :name="item.name"
        :title="item.name"
        :status="item.status"
        :date="item.time"
        :editable="editableComponent(item.status)")
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import BaseContent from '../components/BaseContent.vue'
import BaseModal from '../components/BaseModal.vue'
import ContentKanban from '../components/ContentKanban.vue'
import TaskDetailsModal from '../components/TaskDetailsModal.vue'
import ITasks from '../types/tasks.interfaces'
import { todosStatus, todosIcons } from '../types/enums'

export default defineComponent({
  name: 'Kanban',
  components: {
    BaseContent,
    BaseModal,
    ContentKanban,
    TaskDetailsModal
  },
  setup () {
    const items = ref([] as ITasks[])
    const itemsToDo = ref([] as ITasks[])
    const itemsInProgress = ref([] as ITasks[])
    const itemsDone = ref([] as ITasks[])
    const formShow = ref(false)
    const detailsShow = ref(true)
    const taskIndex = ref(0)

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
      if (status === todosStatus.done) {
        return false
      }
      return true
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
      checkItems
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
  margin-bottom: 0.4rem;
}

hr {
  margin: 0 2.5rem;
  opacity: 0.3;
  border-style: dashed;
}

</style>
