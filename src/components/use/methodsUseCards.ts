import { ref } from 'vue'
import { useStore } from 'vuex'
import { todosStatus } from '../../types/enums'
import ITasks from '../../types/tasks.interfaces'

export function useDetails (visibled: boolean): any {
  const detailsShow = ref(visibled)
  const taskIndex = ref(0)

  function taskDetails (i: number): void {
    detailsShow.value = false
    taskIndex.value = i
  }

  return {
    detailsShow,
    taskIndex,
    taskDetails
  }
}

export function useEditable (): any {
  function editableComponent (status: string): boolean {
    return status !== todosStatus.done
  }

  return {
    editableComponent
  }
}

export function useLoadData (): any {
  const items = ref([] as ITasks[])
  const store = useStore()

  items.value = store.state.tasks.itemData

  return {
    items
  }
}
