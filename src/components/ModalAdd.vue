<template lang="pug">
.formSection
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
p(v-if="showError") {{errors}}
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ITasks from '../types/tasks.interfaces'
import IModalAdd from '../types/modalAdd.interface'
import { todosStatus, todosIcons } from '../types/enums'

const dataModalAdd: IModalAdd = {
  data: '',
  title: '',
  description: '',
  showError: false,
  errors: '',
  inputIndicate: false,
  textareaIndicate: false,
  formShow: false,
  addTaskAnimate: false
}

export default defineComponent({
  name: 'ModalAdd',
  emits: ['closeAddModal'],
  setup (props, { emit }) {
    const inputIndicate = ref(dataModalAdd.inputIndicate)
    const textareaIndicate = ref(dataModalAdd.textareaIndicate)
    const errors = ref(dataModalAdd.errors)
    const showError = ref(dataModalAdd.showError)
    const data = ref(dataModalAdd.data)
    const addTaskAnimate = ref(dataModalAdd.addTaskAnimate)
    const title = ref(dataModalAdd.title)
    const description = ref(dataModalAdd.description)
    const formShow = ref(dataModalAdd.formShow)
    const items = ref([] as ITasks[])

    const loadData = sessionStorage.getItem('data')
    if (loadData) {
      items.value = JSON.parse(loadData)
    }

    function setNowData () {
      const date = new Date()
      const dd = date.getDate()
      const mm = date.getMonth() + 1
      const yy = date.getFullYear() % 100
      data.value = `${dd}.${mm}.${yy}`
      addTaskAnimate.value = true
    }

    function pushTaskData () {
      inputsIndicatorClear()
      if (isFormValidate(title.value, description.value)) {
        setNowData()
        items.value.push({
          name: title.value[0].toUpperCase() + title.value.slice(1),
          message: description.value[0].toUpperCase() + description.value.slice(1),
          photo: todosIcons.todo,
          time: data.value,
          status: todosStatus.todo
        })
        sessionStorage.setItem('data', JSON.stringify(items.value))
        visibleAddForm()
        emit('closeAddModal', false)
      } else {
        showError.value = true
      }
    }

    function visibleAddForm () {
      formShow.value = !formShow.value
      clearAddForm()
      if (!formShow.value) {
        showError.value = false
        inputsIndicatorClear()
      }
    }

    function clearAddForm () {
      title.value = ''
      description.value = ''
    }

    function isFormValidate (title: string, description: string) {
      if (title === '') {
        errors.value = 'Forms input "Title" must not be empty!'
        inputIndicate.value = true
        return false
      }
      if (description === '') {
        errors.value = 'Forms input "Description" must not be empty!'
        textareaIndicate.value = true
        return false
      }
      if (title.length < 10 || title.length > 40) {
        errors.value = 'The size of the "Title" field should not be more than 40 and less than 10 characters'
        inputIndicate.value = true
        return false
      }
      if (description.length < 50 || description.length > 200) {
        errors.value = 'The size of the "Description" field should not be more than 200 and less than 50 characters'
        textareaIndicate.value = true
        return false
      }
      showError.value = false
      return true
    }

    function inputsIndicatorClear () {
      inputIndicate.value = false
      textareaIndicate.value = false
    }

    return {
      inputIndicate,
      textareaIndicate,
      errors,
      showError,
      setNowData,
      data,
      title,
      description,
      pushTaskData,
      clearAddForm,
      isFormValidate,
      inputsIndicatorClear,
      visibleAddForm
    }
  }
})
</script>

<style lang="scss" scoped>

.formButton {
  background: none;
  border: none;
  cursor: pointer;
  margin: 0;
  padding: 0.3rem 1rem;
  opacity: 0.7;
  transition: 0.3s;
    &:hover {
      opacity: 1;
      background-color: #555;
      color: #fff;
    }
}

.buttonAdd {
  border: 0.1rem solid gray;
  border-radius: 1rem;
}

.formButtonsSection {
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.formElement {
  width: 90%;
  outline: none;
}

.formSection {
  padding-top: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.formTextarea {
  resize: none;
  height: 4.5rem;
}

.inputError {
  background: #ffe2e2;
}

label {
  align: center;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 1rem 0 0.5rem 0;
}

p {
  font-size: 1rem;
  margin-top: 0;
  font-weight: bold;
  color: #346cdd;
}
</style>
