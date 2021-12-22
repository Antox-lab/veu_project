<template lang="pug">
base-content(title="tasks")
  button.addButton(title="Add task" v-if="formShow" @click="formShow = !formShow")
    img(src="../assets/add.png" alt="Add")
  modal-add(v-if="!formShow"
  titleForm="Add data"
  @closeModal="getDataAdd"
  @closeAddModal="getDataAdd")
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
  div(v-for="(item, i) in items" :key="i")
    hr
    tasks-task(
    :name="i + 1 + '. ' + item.name"
    :image="item.photo"
    :message="item.message"
    :time="item.time"
    :alt="item.status"
    :title="item.status"
    :addAnimate="i == items.length - 1 && addTaskAnimate ? true : false"
    :positionIndex="i"
    @getDeleteTaskIndex="taskDelete(i)"
    @getDetailsTaskIndex="taskDetails(i)")
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BaseContent from '../components/BaseContent.vue'
import TasksTask from '../components/contentTasks/TasksTask.vue'
import ModalAdd from '../modals/ModalAdd.vue'
import TaskDetailsModal from '../modals/TaskDetailsModal.vue'
import ITasks from '../types/tasks.interfaces'
import IAddData from '../types/tasks.addData'
import { todosStatus } from '../types/enums'

const addData: IAddData = {
  formShow: true,
  addTaskAnimate: false
}

export default defineComponent({
  name: 'Tasks',
  components: {
    BaseContent,
    TasksTask,
    ModalAdd,
    TaskDetailsModal
  },
  data () {
    return {
      items: [] as ITasks[],
      formShow: addData.formShow,
      detailsShow: addData.formShow,
      addTaskAnimate: addData.addTaskAnimate,
      taskIndex: 0
    }
  },
  created () {
    const data = sessionStorage.getItem('data')
    if (data) {
      this.items = JSON.parse(data)
    }
  },
  methods: {
    taskDelete: function (i: number) {
      this.items.splice(i, 1)
      this.addTaskAnimate = false
      sessionStorage.setItem('data', JSON.stringify(this.items))
    },
    taskDetails: function (i: number) {
      this.detailsShow = false
      this.taskIndex = i
    },
    getDataAdd: function () {
      const data = sessionStorage.getItem('data')
      if (data) {
        this.items = JSON.parse(data)
      }
      this.formShow = true
      this.detailsShow = true
    },
    editableComponent: function (status: string) {
      if (status === todosStatus.done) {
        return false
      }
      return true
    }
  }
})
</script>

<style lang="scss" scoped>
hr {
  margin: 0 5rem;
  opacity: 0.3;
  border-style: dashed;
}

.addButton {
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
</style>
