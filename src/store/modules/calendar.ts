export default {
  state: {
    positionMonth: 0 as number,
    positionJahr: 2022 as number
  },
  mutations: {
    setPositionMonth (state: { positionMonth: number }, position: number): void {
      state.positionMonth = position
    },
    setPositionJahr (state: { positionJahr: number }, position: number): void {
      state.positionJahr = position
    }
  }
}
