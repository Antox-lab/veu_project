export default {
  state: {
    notificationCount: 0,
    dataApp: {
      name: 'Jane',
      status: 'Owner',
      photo: 'img/user_active.png'
    }
  },
  mutations: {
    setNotificationCount (state: any, index: number) {
      state.notificationCount = index
    }
  }
}
