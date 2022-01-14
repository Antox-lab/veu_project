export default {
  state: {
    positionMonth: 0,
    positionJahr: 2022
  },
  mutations: {
    setPositionMonth (state: any, position: number) {
      state.positionMonth = position
    },
    setPositionJahr (state: any, position: number) {
      state.positionJahr = position
    }
  }
}
