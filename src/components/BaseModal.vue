<template lang="pug">
.modalBackground(:class="{modalVisible: !modalShow}")
    .modalArea
      .buttonArea
        h2.modalTitle {{title}}
        button.buttons.buttonShare(@click="setModalClose") X
      hr
      slot
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import IBaseModal from '../types/baseModal.interfaces'

const dataBaseModal: IBaseModal = {
  modalShow: true
}

export default defineComponent({
  name: 'BaseModal',
  props: {
    title: String
  },
  setup (props, { emit }) {
    const modalShow = ref(dataBaseModal.modalShow)

    function setModalClose () {
      modalShow.value = false
      emit('closeModal')
    }

    return {
      modalShow,
      setModalClose
    }
  }
})

</script>

<style lang="scss" scoped>
.buttonArea {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modalBackground {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    z-index: 1;
}

.modalArea {
    position: absolute;
    background-color: #fff;
    padding: 1.5rem;
    border-radius: 1rem;
    width: 52rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.modalTitle {
    font-size: 1.4rem;
    color: #131313;
    opacity: 0.5;
    text-transform: uppercase;
}

.modalVisible {
    display: none;
}

</style>
