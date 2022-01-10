<template lang="pug">
base-modal(:title="titleForm")
  .statusSection
    img(:src="setPhoto" :atl="status")
    .statusTextSection
      .status
        span Status:
        p(v-if="!formEdit") {{status}}
        select.formStatusElement(v-else v-model="statusModel" @change="formInput")
          option(v-for="item in options" :value="item.value") {{item.text}}
  hr
  .formSection
    span Completed date:
    p(v-if="!formEdit") {{completedDate}}
    input.formElement(v-else type="date"
    v-model="dateModel"
    @input="formInput"
    :min="minDate"
    required)
    span Title:
    p(v-if="!formEdit") {{name}}
    input.formElement(v-else v-model="nameModel" @input="formInput")
    span Description:
    p(v-if="!formEdit") {{message}}
    textarea.formElement(v-else v-model="messageModel" @input="formInput")
  hr
  .formButtonsSection(v-if="editData")
    button.formButton.formButtonSave(@click="editDataTask(itemIndex)" v-if="visibleSaveButton") Save
    button.formButton.formButtonCancel(@click="setCancel") {{buttonCaption}}
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch, computed } from 'vue'
import { todosStatus, todosIcons } from '../types/enums'
import BaseModal from './BaseModal.vue'
import { useLoadData } from '../components/use/methodsUseCards'

export default defineComponent({
  name: 'TaskDetailsModal',
  components: {
    BaseModal
  },
  props: {
    itemIndex: Number,
    name: String,
    photo: String as PropType<todosIcons>,
    message: String,
    time: String,
    status: String as PropType<todosStatus>,
    titleForm: String,
    editData: Boolean
  },
  emits: ['closeEditModal'],
  setup (props, { emit }) {
    const buttonCaption = ref('Edit')
    const formEdit = ref(false)
    const visibleSaveButton = ref(false)
    const nameModel = ref(props.name)
    const messageModel = ref(props.message)
    const statusModel = ref(props.status)
    const dateModel = ref(getDateValue(props.time as string))
    const options = ref([
      { text: todosStatus.todo, value: todosStatus.todo },
      { text: todosStatus.inprogress, value: todosStatus.inprogress },
      { text: todosStatus.done, value: todosStatus.done }
    ])
    const minDate = ref(getDateNow())
    const setPhoto = ref(props.photo)

    const { items } = useLoadData()

    const completedDate = computed(() => {
      return props.time
    })

    watch(() => statusModel.value, () => {
      switch (statusModel.value) {
        case todosStatus.todo: {
          setPhoto.value = todosIcons.todo
          break
        }
        case todosStatus.inprogress: {
          setPhoto.value = todosIcons.inprogress
          break
        }
        case todosStatus.done: {
          setPhoto.value = todosIcons.done
          break
        }
        default: break
      }
    })

    function setCancel () {
      formEdit.value = !formEdit.value
      if (formEdit.value) {
        buttonCaption.value = 'Cancel'
      } else {
        emit('closeEditModal', false)
      }
    }

    function editDataTask (index: number) {
      const newItem = items.value[index]
      newItem.name = nameModel.value as string
      newItem.message = messageModel.value as string
      newItem.time = setDateValue(dateModel.value) as string
      items.value[index] = newItem
      switch (statusModel.value) {
        case todosStatus.todo: {
          items.value[index].status = todosStatus.todo
          items.value[index].photo = todosIcons.todo
          break
        }
        case todosStatus.inprogress: {
          items.value[index].status = todosStatus.inprogress
          items.value[index].photo = todosIcons.inprogress
          break
        }
        case todosStatus.done: {
          items.value[index].status = todosStatus.done
          items.value[index].photo = todosIcons.done
          break
        }
        default: break
      }
      sessionStorage.setItem('data', JSON.stringify(items.value))
      emit('closeEditModal', false)
    }

    function getDateNow () {
      const dateNow = new Date()
      return `${dateNow.getFullYear()}-${dateNow.getMonth() + 1}-${dateNow.getDate()}` as string
    }

    function getDateValue (value: string) {
      const dd = value.slice(0, 2)
      const mm = value.slice(3, 5)
      const yy = value.slice(6)
      return `20${yy}-${mm}-${dd}`
    }

    function setDateValue (value: string) {
      const dd = value.slice(8)
      const mm = value.slice(5, 7)
      const yy = value.slice(2, 4)
      return `${dd}.${mm}.${yy}`
    }

    function formInput () {
      if (props.name === nameModel.value &&
      props.message === messageModel.value &&
      props.status === statusModel.value &&
      props.time === setDateValue(dateModel.value)) {
        visibleSaveButton.value = false
      } else {
        visibleSaveButton.value = true
      }
    }

    return {
      buttonCaption,
      formEdit,
      setCancel,
      editDataTask,
      items,
      nameModel,
      messageModel,
      statusModel,
      dateModel,
      visibleSaveButton,
      formInput,
      getDateNow,
      getDateValue,
      setDateValue,
      options,
      minDate,
      setPhoto,
      completedDate
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

.formStatusElement {
  margin: 0;
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
  margin: 0.5rem 0;
}
.statusSection {
  display: flex;
}
.statusTextSection {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 1rem;
  width: 50%;
}

p {
  margin: 0 0 1rem 2rem;
  font-size: 1.2rem;
}

span {
  margin: 0;
  font-size: 1.2rem;
  font-weight: bold;
  color: #1c9acc;
}

</style>
