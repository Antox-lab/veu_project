import { ILayout } from '../../types/layout.interfaces'

export default {
  state: {
    notificationCount: 0 as number,
    dataApp: {
      name: 'Jane',
      status: 'Owner',
      photo: 'img/user_active.png'
    } as ILayout
  },
  mutations: {
    setNotificationCount (state: { notificationCount: number }, index: number): void {
      state.notificationCount = index
    }
  }
}
