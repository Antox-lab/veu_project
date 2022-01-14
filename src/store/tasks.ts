export default {
  state: {
    itemData: []
  },
  mutations: {
    setData (state: any, data: []) {
      state.itemData = data
    },
    taskDelete (state: any, index: number) {
      state.itemData.splice(index, 1)
      localStorage.setItem('data', JSON.stringify(state.itemData))
    },
    pushItem (state: any, item: any) {
      state.itemData.push(item)
      localStorage.setItem('data', JSON.stringify(state.itemData))
    },
    editItem (state: any, item: any) {
      state.itemData[item[0]] = item[1]
      localStorage.setItem('data', JSON.stringify(state.itemData))
    }
  },
  actions: {
    getData ({ commit }: {commit: any}) {
      fetch('data/taskData.json')
        .then((responce) => {
          return responce.json()
        })
        .then((data) => {
          commit('setData', data)
        })
    },
    getDataStorage ({ commit }: {commit: any}) {
      const loadData = localStorage.getItem('data')
      if (loadData) {
        commit('setData', JSON.parse(loadData))
      }
    }
  }
}
