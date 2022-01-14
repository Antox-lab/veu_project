<template lang="pug">
base-modal(:title="titleForm")
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
      label(for="dateItem") Completed date
      input.formElement(
        type="date"
        id="dateItem"
        v-model="completedDate"
        :class="{inputError: dataIndicate}")
  .formButtonsSection
    button.formButton.buttonAdd(title="Add task" @click="pushTaskData") Add task
  p(v-if="showError") {{errors}}
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import BaseModal from './BaseModal.vue'
import IModalAdd from '../types/modalAdd.interface'
import { todosStatus, todosIcons } from '../types/enums'
// import { useLoadData } from '../components/use/methodsUseCards'

const dataModalAdd: IModalAdd = {
  completedDate: '',
  title: '',
  description: '',
  showError: false,
  errors: '',
  inputIndicate: false,
  textareaIndicate: false,
  dataIndicate: false,
  formShow: false,
  addTaskAnimate: false
}

export default defineComponent({
  name: 'ModalAdd',
  components: {
    BaseModal
  },
  props: {
    titleForm: String
  },
  emits: ['closeAddModal'],
  setup (props, { emit }) {
    const store = useStore()
    const inputIndicate = ref(dataModalAdd.inputIndicate)
    const textareaIndicate = ref(dataModalAdd.textareaIndicate)
    const dataIndicate = ref(dataModalAdd.dataIndicate)
    const errors = ref(dataModalAdd.errors)
    const showError = ref(dataModalAdd.showError)
    const addTaskAnimate = ref(dataModalAdd.addTaskAnimate)
    const title = ref(dataModalAdd.title)
    const description = ref(dataModalAdd.description)
    const completedDate = ref(dataModalAdd.completedDate)
    const formShow = ref(dataModalAdd.formShow)

    function setParseData () {
      const dd = completedDate.value.slice(8)
      const mm = completedDate.value.slice(5, 7)
      const yy = completedDate.value.slice(2, 4)
      completedDate.value = `${dd}.${mm}.${yy}`
      addTaskAnimate.value = true
    }

    function setParseDataNow () {
      const nowDate = new Date()
      const dd = fixDateZero(nowDate.getDate())
      const mm = fixDateZero(nowDate.getMonth() + 1)
      const yy = nowDate.getFullYear()
      return `${dd}.${mm}.${yy}`
    }

    function fixDateZero (value: number) {
      if (value < 10) {
        return '0' + value
      }
      return value
    }

    function pushTaskData () {
      inputsIndicatorClear()
      if (isFormValidate(title.value, description.value)) {
        setParseData()
        store.commit('pushItem', {
          name: title.value[0].toUpperCase() + title.value.slice(1),
          message: description.value[0].toUpperCase() + description.value.slice(1),
          photo: todosIcons.todo,
          time: completedDate.value,
          status: todosStatus.todo,
          addDate: setParseDataNow()
        })
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
      if (completedDate.value === '') {
        errors.value = 'Forms input "Completed date" must not be empty!'
        dataIndicate.value = true
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
      dataIndicate,
      errors,
      showError,
      setParseData,
      setParseDataNow,
      completedDate,
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
