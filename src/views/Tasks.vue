<template lang="pug">
base-content(title="tasks")
  button.addButton(title="Add task" v-if="formShow" @click="visibleAddForm")
    img(src="../assets/add.png" alt="Trash")
  .formSection(v-if="!formShow")
    label(for="title") Title
    input.formElement(
      id="title"
      placeholder="Enter title"
      v-model="title"
      :class="{inputError: inputIndicate}"
      )
    label(for="description") Description
    textarea.formElement.formTextarea(
      id="description"
      placeholder="Enter text"
      v-model="description"
      :class="{inputError: textareaIndicate}"
      )
    .formButtonsSection
      button.formButton.buttonAdd(title="Add task" @click="pushTaskData") Add task
      button.formButton.buttonClose(@click="visibleAddForm") Close
    p(v-if="showError") {{errors}}
  div(v-for="(item, i) in items" :key="i")
    hr
    content-tasks(:name="i + 1 + '. ' + item.name"
    :image="item.photo"
    :message="item.message"
    :time="item.time"
    :alt="item.alt"
    :title="item.alt"
    :addAnimate="i == items.length - 1 && addTaskAnimate ? true : false"
    :slideAnimateIndex="i"
    @getTaskIndex="taskDelete(i)")
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BaseContent from '../components/BaseContent.vue'
import ContentTasks from '../components/ContentTasks.vue'
import ITasks from '../types/tasks.interfaces'
import IAddData from '../types/tasks.addData'

const taskData: ITasks[] = []

const addData: IAddData = {
  formShow: true,
  date: '',
  title: '',
  description: '',
  showError: false,
  errors: '',
  inputIndicate: false,
  textareaIndicate: false,
  addTaskAnimate: false
}

export default defineComponent({
  name: 'Tasks',
  components: {
    BaseContent,
    ContentTasks
  },
  data () {
    return {
      items: taskData,
      formShow: addData.formShow,
      date: addData.date,
      title: addData.title,
      description: addData.description,
      showError: addData.showError,
      errors: addData.errors,
      inputIndicate: addData.inputIndicate,
      textareaIndicate: addData.textareaIndicate,
      addTaskAnimate: addData.addTaskAnimate
    }
  },
  created () {
    fetch('data/taskData.json')
      .then((responce) => {
        return responce.json()
      })
      .then((data) => {
        this.items = data
      })
  },
  methods: {
    taskDelete: function (i: number) {
      this.items.splice(i, 1)
      this.addTaskAnimate = false
    },
    visibleAddForm: function () {
      this.formShow = !this.formShow
      this.clearAddForm()
      if (!this.formShow) {
        this.showError = false
        this.inputsIndicatorClear()
      }
    },
    clearAddForm: function () {
      this.title = ''
      this.description = ''
    },
    setNowData: function () {
      const date = new Date()
      const dd = date.getDate()
      const mm = date.getMonth() + 1
      const yy = date.getFullYear() % 100
      this.date = `${dd}.${mm}.${yy}`
      this.addTaskAnimate = true
    },
    pushTaskData: function () {
      this.inputsIndicatorClear()
      if (this.isFormValidate(this.title, this.description)) {
        this.setNowData()
        this.items.push({
          name: this.title[0].toUpperCase() + this.title.slice(1),
          message: this.description[0].toUpperCase() + this.description.slice(1),
          photo: 'img/resend.png',
          time: this.date,
          alt: 'New task'
        })
        this.visibleAddForm()
      } else {
        this.showError = true
      }
    },
    isFormValidate: function (title: string, description: string) {
      if (title === '') {
        this.errors = 'Forms input "Title" must not be empty!'
        this.inputIndicate = true
        return false
      }
      if (description === '') {
        this.errors = 'Forms input "Description" must not be empty!'
        this.textareaIndicate = true
        return false
      }
      if (title.length < 10 || title.length > 40) {
        this.errors = 'The size of the "Title" field should not be more than 40 and less than 10 characters'
        this.inputIndicate = true
        return false
      }
      if (description.length < 50 || description.length > 200) {
        this.errors = 'The size of the "Description" field should not be more than 200 and less than 50 characters'
        this.textareaIndicate = true
        return false
      }
      this.showError = false
      return true
    },
    inputsIndicatorClear: function () {
      this.inputIndicate = false
      this.textareaIndicate = false
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

p {
  font-size: 1.2rem;
  margin-top: 0;
  font-weight: bold;
  color: #346cdd;
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

.formButton {
  background: none;
  border: none;
  cursor: pointer;
  margin: 0 0 2rem 2rem;
  opacity: 0.7;
  transition: 0.3s;
    &:hover {
      opacity: 1;
      background-color: #555;
      color: #fff;
    }
}

.buttonAdd {
  border-bottom: 0.2rem solid green;
}

.buttonClose {
  border-bottom: 0.2rem solid red;
}

.formButtonsSection {
  margin-top: 1rem;
  display: flex;
}

.formElement {
  width: 80%;
  outline: none;
}

.formTextarea {
  resize: none;
  height: 4.5rem;
}

.formSection {
  margin: 0 0 2rem 2rem;
  padding-top: 1.5rem;
  border-radius: 1rem;
  background-color: #fff5ca;
  box-shadow: 0 0 5px grey;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.inputError {
  background: #ffe2e2;
}

label {
  font-size: 1.2rem;
  font-weight: bold;
  padding: 1rem 0 0.5rem 0;
}
</style>
