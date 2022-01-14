import { ref } from 'vue'
import { useStore } from 'vuex'
import { todosStatus } from '../../types/enums'
import ITasks from '../../types/tasks.interfaces'

export function useDetails (bol: boolean) {
  const detailsShow = ref(bol)
  const taskIndex = ref(0)

  function taskDetails (i: number) {
    detailsShow.value = false
    taskIndex.value = i
  }

  return {
    detailsShow,
    taskIndex,
    taskDetails
  }
}

export function useEditable () {
  function editableComponent (status: string) {
    return status !== todosStatus.done
  }

  return {
    editableComponent
  }
}

export function useLoadData () {
  const items = ref([] as ITasks[])
  const store = useStore()

  items.value = store.state.tasks.itemData

  return {
    items
  }
}
