import { Commit } from 'vuex'
import ITasks from '../../types/tasks.interfaces'

export default {
  state: {
    itemData: [] as ITasks[]
  },
  mutations: {
    setData (state: { itemData: ITasks[] }, data: []): void {
      state.itemData = data
    },
    taskDelete (state: { itemData: ITasks[] }, index: number): void {
      state.itemData.splice(index, 1)
      localStorage.setItem('data', JSON.stringify(state.itemData))
    },
    pushItem (state: { itemData: ITasks[] }, item: ITasks): void {
      state.itemData.push(item)
      localStorage.setItem('data', JSON.stringify(state.itemData))
    },
    editItem (state: { itemData: ITasks[] }, item: ITasks[]): void {
      state.itemData[item[0] as unknown as number] = item[1]
      localStorage.setItem('data', JSON.stringify(state.itemData))
    }
  },
  actions: {
    getData ({ commit }: {commit: Commit}): void {
      fetch('data/taskData.json')
        .then((responce) => {
          return responce.json()
        })
        .then((data) => {
          commit('setData', data)
        })
    },
    getDataStorage ({ commit }: {commit: Commit}): void {
      const loadData = localStorage.getItem('data')
      if (loadData) {
        commit('setData', JSON.parse(loadData))
      }
    }
  }
}
