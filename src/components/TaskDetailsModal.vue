<template lang="pug">
.statusSection
  img(:src="photo" :atl="status")
  .statusTextSection
    .status
      span Status:
      p {{status}}
    .status
      span Date:
      p {{time}}
hr
.formSection
  span Name:
  p(v-if="!formEdit") {{name}}
  input.formElement(v-else v-model="nameModel" @input="formInput")
  span Message:
  p(v-if="!formEdit") {{message}}
  textarea.formElement(v-else v-model="messageModel" @input="formInput")
hr
.formButtonsSection
  button.formButton.formButtonSave(@click="editDataTask(itemIndex)" v-if="visibleSaveButton") Save
  button.formButton.formButtonCancel(@click="setEdit") {{buttonCaption}}
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ITasks from '../types/tasks.interfaces'

export default defineComponent({
  name: 'TaskDetailsModal',
  props: {
    itemIndex: Number,
    name: String,
    photo: String,
    message: String,
    time: String,
    status: String
  },
  emits: ['closeEditModal'],
  setup (props, { emit }) {
    const buttonCaption = ref('Edit')
    const formEdit = ref(false)
    const visibleSaveButton = ref(false)
    const items = ref([] as ITasks[])
    const nameModel = ref(props.name)
    const messageModel = ref(props.message)

    const loadData = sessionStorage.getItem('data')
    if (loadData) {
      items.value = JSON.parse(loadData)
    }

    function setEdit () {
      formEdit.value = !formEdit.value
      if (formEdit.value) {
        buttonCaption.value = 'Cancel'
      } else {
        emit('closeEditModal', false)
      }
    }

    function editDataTask (index: number) {
      items.value[index].name = nameModel.value as string
      items.value[index].message = messageModel.value as string
      sessionStorage.setItem('data', JSON.stringify(items.value))
      emit('closeEditModal', false)
    }

    function formInput () {
      if (props.name === nameModel.value && props.message === messageModel.value) {
        visibleSaveButton.value = false
      } else {
        visibleSaveButton.value = true
      }
    }

    return {
      buttonCaption,
      formEdit,
      setEdit,
      editDataTask,
      items,
      nameModel,
      messageModel,
      visibleSaveButton,
      formInput
    }
  }
})
</script>

<style lang="scss" scoped>
$saveColor: #009c1a;

.formButton {
  background: none;
  border-radius: 1rem;
  cursor: pointer;
  margin:0.4rem;
  padding: 0.3rem 1rem;
  opacity: 0.7;
  transition: 0.3s;
    &:hover {
      opacity: 1;
      color: #fff;
    }
}

.formButtonSave {
  border: 0.1rem solid gray;
    &:hover {
      background-color: $saveColor;
      border-color: $saveColor;
    }
}

.formButtonCancel {
  border: 0.1rem solid gray;
    &:hover {
      background-color: #555;
    }
}

.formButtonsSection {
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.formElement {
  width: 100%;
  margin: 0 0 1rem 0;
  padding: 0.1rem;
  outline: none;
  resize: none;
}

.formSection {
  padding-top: 0.5rem;
  display: flex;
  flex-direction: column;
}

.status {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 0.1rem dashed #555;
  margin: 0.3rem 0;
}
.statusSection {
  display: flex;
}
.statusTextSection {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 1rem;
  width: 35%;
}

p {
  margin: 0;
  font-size: 1.2rem;
}

span {
  margin: 0;
  font-size: 1.2rem;
  font-weight: bold;
  color: #1c9acc;
}

</style>
