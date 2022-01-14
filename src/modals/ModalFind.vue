<template lang="pug">
base-modal(:title="titleForm")
  div
    .inputSection
      input.formElement(type="radio" checked id="textValue" value="text" v-model="result")
      label(for="textValue") Title
    .inputSection
      input.formElement(type="radio" id="dateValue" value="date" v-model="result")
      label(for="dateValue") Completed date
  hr
  .formSection
    label Find elements by {{result}}
    .inputFindSection(v-if="isFindText")
      input.formElementText(type="text" v-model="textValue")
    .inputFindSection(v-if="!isFindText")
      div
        label From:
        input.formElementDate(type="date" v-model="dateFromValue" :max="dateToValue")
      div
        label To:
        input.formElementDate(type="date" v-model="dateToValue" :min="dateFromValue")
  hr
  .formButtonsSection
    button.formButton(title="Find task" @click="sendFindValues") Find task
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import BaseModal from '../modals/BaseModal.vue'

export default defineComponent({
  name: 'ModalFind',
  components: {
    BaseModal
  },
  emits: ['findTasksParams'],
  props: {
    titleForm: String
  },
  setup (props, { emit }) {
    const result = ref('text')
    const isFindText = ref(true)
    const textValue = ref('')
    const dateFromValue = ref('')
    const dateToValue = ref('')

    watch(() => result.value, () => {
      switch (result.value) {
        case 'text': {
          isFindText.value = true
          break
        }
        case 'date': {
          isFindText.value = false
          break
        }
        default: {
          break
        }
      }
    })

    function sendFindValues () {
      if (isFindText.value) {
        emit('findTasksParams', [textValue.value])
      } else {
        emit('findTasksParams', [dateFromValue.value, dateToValue.value])
      }
    }

    return {
      result,
      textValue,
      dateFromValue,
      dateToValue,
      isFindText,
      sendFindValues
    }
  }
})
</script>

<style lang="scss" scoped>
.formElement {
  margin: 0.3rem;
  padding: 0;
}

.formElementText {
  width: 90%;
  outline: none;
}

.formElementDate {
  margin-left: 0.4rem;
  outline: none;
}

.formButton {
  background: none;
  border: 0.1rem solid gray;
  border-radius: 1rem;
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

.formButtonsSection {
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.formSection {
  padding-top: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.inputSection {
  padding-top: 0.5rem;
  display: flex;
  align-items: center;
}

.inputFindSection {
  padding-top: 0.5rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

hr {
  margin: 1.5rem 0;
}

label {
  align: center;
  color: #1c9acc;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 1rem 0 0.5rem 0;
}
</style>
